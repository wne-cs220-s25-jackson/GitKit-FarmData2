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
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcProtocol = void 0;
const cancellation_1 = require("../cancellation");
const disposable_1 = require("../disposable");
const event_1 = require("../event");
const promise_util_1 = require("../promise-util");
const rpc_message_encoder_1 = require("./rpc-message-encoder");
/**
 * Establish a RPC protocol on top of a given channel. By default the rpc protocol is bi-directional, meaning it is possible to send
 * requests and notifications to the remote side (i.e. acts as client) as well as receiving requests and notifications from the remote side (i.e. acts as a server).
 * Clients can get a promise for a remote request result that will be either resolved or
 * rejected depending on the success of the request. Keeps track of outstanding requests and matches replies to the appropriate request
 * Currently, there is no timeout handling for long running requests implemented.
 * The bi-directional mode can be reconfigured using the {@link RpcProtocolOptions} to construct an RPC protocol instance that acts only as client or server instead.
 */
class RpcProtocol {
    get onNotification() {
        return this.onNotificationEmitter.event;
    }
    constructor(channel, requestHandler, options = {}) {
        var _a, _b, _c;
        this.channel = channel;
        this.requestHandler = requestHandler;
        this.pendingRequests = new Map();
        this.pendingRequestCancellationEventListeners = new Map();
        this.nextMessageId = 0;
        this.onNotificationEmitter = new event_1.Emitter();
        this.cancellationTokenSources = new Map();
        this.toDispose = new disposable_1.DisposableCollection();
        this.encoder = (_a = options.encoder) !== null && _a !== void 0 ? _a : new rpc_message_encoder_1.MsgPackMessageEncoder();
        this.decoder = (_b = options.decoder) !== null && _b !== void 0 ? _b : new rpc_message_encoder_1.MsgPackMessageDecoder();
        this.toDispose.push(this.onNotificationEmitter);
        channel.onClose(event => {
            this.pendingRequests.forEach(pending => pending.reject(new Error(event.reason)));
            this.pendingRequests.clear();
            this.pendingRequestCancellationEventListeners.forEach(disposable => disposable.dispose());
            this.pendingRequestCancellationEventListeners.clear();
            this.toDispose.dispose();
        });
        this.toDispose.push(channel.onMessage(readBuffer => this.handleMessage(this.decoder.parse(readBuffer()))));
        this.mode = (_c = options.mode) !== null && _c !== void 0 ? _c : 'default';
        if (this.mode !== 'clientOnly' && requestHandler === undefined) {
            console.error('RPCProtocol was initialized without a request handler but was not set to clientOnly mode.');
        }
    }
    handleMessage(message) {
        if (this.mode !== 'clientOnly') {
            switch (message.type) {
                case 5 /* RpcMessageType.Cancel */: {
                    this.handleCancel(message.id);
                    return;
                }
                case 1 /* RpcMessageType.Request */: {
                    this.handleRequest(message.id, message.method, message.args);
                    return;
                }
                case 2 /* RpcMessageType.Notification */: {
                    this.handleNotify(message.method, message.args, message.id);
                    return;
                }
            }
        }
        if (this.mode !== 'serverOnly') {
            switch (message.type) {
                case 3 /* RpcMessageType.Reply */: {
                    this.handleReply(message.id, message.res);
                    return;
                }
                case 4 /* RpcMessageType.ReplyErr */: {
                    this.handleReplyErr(message.id, message.err);
                    return;
                }
            }
        }
        // If the message was not handled until here, it is incompatible with the mode.
        console.warn(`Received message incompatible with this RPCProtocol's mode '${this.mode}'. Type: ${message.type}. ID: ${message.id}.`);
    }
    handleReply(id, value) {
        const replyHandler = this.pendingRequests.get(id);
        if (replyHandler) {
            this.pendingRequests.delete(id);
            replyHandler.resolve(value);
        }
        else {
            throw new Error(`No reply handler for reply with id: ${id}`);
        }
        this.disposeCancellationEventListener(id);
    }
    handleReplyErr(id, error) {
        const replyHandler = this.pendingRequests.get(id);
        if (replyHandler) {
            this.pendingRequests.delete(id);
            replyHandler.reject(error);
        }
        else {
            throw new Error(`No reply handler for error reply with id: ${id}`);
        }
        this.disposeCancellationEventListener(id);
    }
    disposeCancellationEventListener(id) {
        const toDispose = this.pendingRequestCancellationEventListeners.get(id);
        if (toDispose) {
            this.pendingRequestCancellationEventListeners.delete(id);
            toDispose.dispose();
        }
    }
    sendRequest(method, args) {
        // The last element of the request args might be a cancellation token. As these tokens are not serializable we have to remove it from the
        // args array and the `CANCELLATION_TOKEN_KEY` string instead.
        const cancellationToken = args.length && cancellation_1.CancellationToken.is(args[args.length - 1]) ? args.pop() : undefined;
        const id = this.nextMessageId++;
        const reply = new promise_util_1.Deferred();
        if (cancellationToken) {
            args.push(RpcProtocol.CANCELLATION_TOKEN_KEY);
        }
        this.pendingRequests.set(id, reply);
        // register disposable before output.commit() even when not available yet
        const disposableWrapper = new disposable_1.DisposableWrapper();
        this.pendingRequestCancellationEventListeners.set(id, disposableWrapper);
        const output = this.channel.getWriteBuffer();
        this.encoder.request(output, id, method, args);
        output.commit();
        if (cancellationToken === null || cancellationToken === void 0 ? void 0 : cancellationToken.isCancellationRequested) {
            this.sendCancel(id);
        }
        else {
            const disposable = cancellationToken === null || cancellationToken === void 0 ? void 0 : cancellationToken.onCancellationRequested(() => this.sendCancel(id));
            if (disposable) {
                disposableWrapper.set(disposable);
            }
        }
        return reply.promise;
    }
    sendNotification(method, args) {
        // If the notification supports a CancellationToken, it needs to be treated like a request
        // because cancellation does not work with the simplified "fire and forget" approach of simple notifications.
        if (args.length && cancellation_1.CancellationToken.is(args[args.length - 1])) {
            this.sendRequest(method, args);
            return;
        }
        const output = this.channel.getWriteBuffer();
        this.encoder.notification(output, method, args, this.nextMessageId++);
        output.commit();
    }
    sendCancel(requestId) {
        const output = this.channel.getWriteBuffer();
        this.encoder.cancel(output, requestId);
        output.commit();
    }
    handleCancel(id) {
        const cancellationTokenSource = this.cancellationTokenSources.get(id);
        if (cancellationTokenSource) {
            cancellationTokenSource.cancel();
        }
    }
    async handleRequest(id, method, args) {
        const output = this.channel.getWriteBuffer();
        // Check if the last argument of the received args is the key for indicating that a cancellation token should be used
        // If so remove the key from the args and create a new cancellation token.
        const addToken = args.length && args[args.length - 1] === RpcProtocol.CANCELLATION_TOKEN_KEY ? args.pop() : false;
        if (addToken) {
            const tokenSource = new cancellation_1.CancellationTokenSource();
            this.cancellationTokenSources.set(id, tokenSource);
            args.push(tokenSource.token);
        }
        try {
            const result = await this.requestHandler(method, args);
            this.cancellationTokenSources.delete(id);
            this.encoder.replyOK(output, id, result);
            output.commit();
        }
        catch (err) {
            // In case of an error the output buffer might already contains parts of an message.
            // => Dispose the current buffer and retrieve a new, clean one for writing the response error.
            if (disposable_1.Disposable.is(output)) {
                output.dispose();
            }
            const errorOutput = this.channel.getWriteBuffer();
            this.cancellationTokenSources.delete(id);
            this.encoder.replyErr(errorOutput, id, err);
            errorOutput.commit();
        }
    }
    async handleNotify(method, args, id) {
        if (this.toDispose.disposed) {
            return;
        }
        this.onNotificationEmitter.fire({ method, args });
    }
}
exports.RpcProtocol = RpcProtocol;
RpcProtocol.CANCELLATION_TOKEN_KEY = 'add.cancellation.token';
//# sourceMappingURL=rpc-protocol.js.map