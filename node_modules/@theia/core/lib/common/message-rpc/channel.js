"use strict";
// *****************************************************************************
// Copyright (C) 2021 Red Hat, Inc. and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMultiplexer = exports.MessageTypes = exports.ForwardingChannel = exports.BasicChannel = exports.AbstractChannel = void 0;
const disposable_1 = require("../disposable");
const event_1 = require("../event");
;
/**
 *  Reusable abstract {@link Channel} implementation that sets up
 *  the basic channel event listeners and offers a generic close method.
 */
class AbstractChannel {
    get onClose() {
        return this.onCloseEmitter.event;
    }
    ;
    get onError() {
        return this.onErrorEmitter.event;
    }
    ;
    get onMessage() {
        return this.onMessageEmitter.event;
    }
    ;
    constructor() {
        this.onCloseEmitter = new event_1.Emitter();
        this.onErrorEmitter = new event_1.Emitter();
        this.onMessageEmitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDispose.pushAll([this.onCloseEmitter, this.onErrorEmitter, this.onMessageEmitter]);
    }
    close() {
        this.toDispose.dispose();
    }
}
exports.AbstractChannel = AbstractChannel;
/**
 * A very basic {@link AbstractChannel} implementation which takes a function
 * for retrieving the {@link WriteBuffer} as constructor argument.
 */
class BasicChannel extends AbstractChannel {
    constructor(writeBufferProvider) {
        super();
        this.writeBufferProvider = writeBufferProvider;
    }
    getWriteBuffer() {
        return this.writeBufferProvider();
    }
}
exports.BasicChannel = BasicChannel;
/**
 * Helper class to implement the single channels on a {@link ChannelMultiplexer}. Simply forwards write requests to
 * the given write buffer source i.e. the main channel of the {@link ChannelMultiplexer}.
 */
class ForwardingChannel extends AbstractChannel {
    constructor(id, closeHandler, writeBufferSource) {
        super();
        this.id = id;
        this.closeHandler = closeHandler;
        this.writeBufferSource = writeBufferSource;
    }
    getWriteBuffer() {
        return this.writeBufferSource();
    }
    close() {
        super.close();
        this.closeHandler();
    }
}
exports.ForwardingChannel = ForwardingChannel;
/**
 * The different message types used in the messaging protocol of the {@link ChannelMultiplexer}
 */
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["Open"] = 1] = "Open";
    MessageTypes[MessageTypes["Close"] = 2] = "Close";
    MessageTypes[MessageTypes["AckOpen"] = 3] = "AckOpen";
    MessageTypes[MessageTypes["Data"] = 4] = "Data";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
/**
 * The write buffers in this implementation immediately write to the underlying
 * channel, so we rely on writers to the multiplexed channels to always commit their
 * messages and always in one go.
 */
class ChannelMultiplexer {
    get onDidOpenChannel() {
        return this.onOpenChannelEmitter.event;
    }
    constructor(underlyingChannel) {
        this.underlyingChannel = underlyingChannel;
        this.pendingOpen = new Map();
        this.openChannels = new Map();
        this.onOpenChannelEmitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDispose.pushAll([
            this.underlyingChannel.onMessage(buffer => this.handleMessage(buffer())),
            this.underlyingChannel.onClose(event => this.onUnderlyingChannelClose(event)),
            this.underlyingChannel.onError(error => this.handleError(error)),
            this.onOpenChannelEmitter
        ]);
    }
    handleError(error) {
        this.openChannels.forEach(channel => {
            channel.onErrorEmitter.fire(error);
        });
    }
    onUnderlyingChannelClose(event) {
        if (!this.toDispose.disposed) {
            this.toDispose.push(disposable_1.Disposable.create(() => {
                this.pendingOpen.clear();
                this.openChannels.forEach(channel => {
                    channel.onCloseEmitter.fire(event !== null && event !== void 0 ? event : { reason: 'Multiplexer main channel has been closed from the remote side!' });
                });
                this.openChannels.clear();
            }));
            this.dispose();
        }
    }
    handleMessage(buffer) {
        const type = buffer.readUint8();
        const id = buffer.readString();
        switch (type) {
            case MessageTypes.AckOpen: {
                return this.handleAckOpen(id);
            }
            case MessageTypes.Open: {
                return this.handleOpen(id);
            }
            case MessageTypes.Close: {
                return this.handleClose(id);
            }
            case MessageTypes.Data: {
                return this.handleData(id, buffer);
            }
        }
    }
    handleAckOpen(id) {
        // edge case: both side try to open a channel at the same time.
        const resolve = this.pendingOpen.get(id);
        if (resolve) {
            const channel = this.createChannel(id);
            this.pendingOpen.delete(id);
            this.openChannels.set(id, channel);
            resolve(channel);
            this.onOpenChannelEmitter.fire({ id, channel });
        }
        else {
            console.error(`not expecting ack-open on for ${id}`);
        }
    }
    handleOpen(id) {
        if (!this.openChannels.has(id)) {
            const channel = this.createChannel(id);
            this.openChannels.set(id, channel);
            const resolve = this.pendingOpen.get(id);
            if (resolve) {
                // edge case: both side try to open a channel at the same time.
                resolve(channel);
            }
            this.underlyingChannel.getWriteBuffer().writeUint8(MessageTypes.AckOpen).writeString(id).commit();
            this.onOpenChannelEmitter.fire({ id, channel });
        }
        else {
            console.error(`channel already open: ${id}`);
        }
    }
    handleClose(id) {
        const channel = this.openChannels.get(id);
        if (channel) {
            channel.onCloseEmitter.fire({ reason: 'Channel has been closed from the remote side' });
            this.openChannels.delete(id);
        }
    }
    handleData(id, data) {
        const channel = this.openChannels.get(id);
        if (channel) {
            channel.onMessageEmitter.fire(() => data.sliceAtReadPosition());
        }
    }
    createChannel(id) {
        return new ForwardingChannel(id, () => this.closeChannel(id), () => this.prepareWriteBuffer(id));
    }
    // Prepare the write buffer for the channel with the give, id. The channel id has to be encoded
    // and written to the buffer before the actual message.
    prepareWriteBuffer(id) {
        const underlying = this.underlyingChannel.getWriteBuffer();
        underlying.writeUint8(MessageTypes.Data);
        underlying.writeString(id);
        return underlying;
    }
    closeChannel(id) {
        this.underlyingChannel.getWriteBuffer()
            .writeUint8(MessageTypes.Close)
            .writeString(id)
            .commit();
        this.openChannels.delete(id);
    }
    open(id) {
        if (this.openChannels.has(id) || this.pendingOpen.has(id)) {
            throw new Error(`Another channel with the id '${id}' is already open.`);
        }
        const result = new Promise((resolve, reject) => {
            this.pendingOpen.set(id, resolve);
        });
        this.underlyingChannel.getWriteBuffer().writeUint8(MessageTypes.Open).writeString(id).commit();
        return result;
    }
    getOpenChannel(id) {
        return this.openChannels.get(id);
    }
    dispose() {
        this.toDispose.dispose();
    }
}
exports.ChannelMultiplexer = ChannelMultiplexer;
//# sourceMappingURL=channel.js.map