"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.ElectronWebContentChannel = exports.ElectronMessagingContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const default_messaging_service_1 = require("../../node/messaging/default-messaging-service");
const channel_1 = require("../../common/message-rpc/channel");
const common_1 = require("../../common");
const uint8_array_message_buffer_1 = require("../../common/message-rpc/uint8-array-message-buffer");
const electron_api_main_1 = require("../electron-api-main");
const electron_messaging_service_1 = require("./electron-messaging-service");
const electron_connection_handler_1 = require("./electron-connection-handler");
/**
 * This component replicates the role filled by `MessagingContribution` but for Electron.
 * Unlike the WebSocket based implementation, we do not expect to receive
 * connection events. Instead, we'll create channels based on incoming `open`
 * events on the `ipcMain` channel.
 * This component allows communication between renderer process (frontend) and electron main process.
 */
let ElectronMessagingContribution = class ElectronMessagingContribution {
    constructor() {
        this.channelHandlers = new default_messaging_service_1.ConnectionHandlers();
        /**
         * Each electron window has a main channel and its own multiplexer to route multiple client messages the same IPC connection.
         */
        this.openChannels = new Map();
        this.wsHandlers = new default_messaging_service_1.ConnectionHandlers();
    }
    init() {
        electron_api_main_1.TheiaRendererAPI.onIpcData((sender, data) => this.handleIpcEvent(sender, data));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ipcChannel(spec, callback) {
        this.channelHandlers.push(spec, callback);
    }
    onStart() {
        for (const contribution of this.messagingContributions.getContributions()) {
            contribution.configure(this);
        }
        for (const connectionHandler of this.connectionHandlers.getContributions()) {
            this.channelHandlers.push(connectionHandler.path, (params, channel) => {
                connectionHandler.onConnection(channel);
            });
        }
    }
    handleIpcEvent(sender, data) {
        var _a;
        // Get the multiplexer for a given window id
        try {
            const windowChannel = (_a = this.openChannels.get(sender.id)) !== null && _a !== void 0 ? _a : this.createWindowChannel(sender);
            windowChannel.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(data));
        }
        catch (error) {
            console.error('IPC: Failed to handle message', { error, data });
        }
    }
    // Creates a new channel for a given sender/window
    createWindowChannel(sender) {
        const mainChannel = new ElectronWebContentChannel(sender);
        const multiplexer = new channel_1.ChannelMultiplexer(mainChannel);
        multiplexer.onDidOpenChannel(openEvent => {
            const { channel, id } = openEvent;
            if (this.channelHandlers.route(id, channel)) {
                console.debug(`Opening channel for service path '${id}'.`);
                channel.onClose(() => console.debug(`Closing channel on service path '${id}'.`));
            }
        });
        sender.once('did-navigate', () => this.deleteChannel(sender.id, 'Window was refreshed'));
        sender.once('destroyed', () => this.deleteChannel(sender.id, 'Window was closed'));
        this.openChannels.set(sender.id, mainChannel);
        return mainChannel;
    }
    deleteChannel(senderId, reason) {
        const channel = this.openChannels.get(senderId);
        if (channel) {
            this.openChannels.delete(senderId);
            channel.onCloseEmitter.fire({
                reason: reason
            });
        }
    }
    registerConnectionHandler(spec, callback) {
        this.wsHandlers.push(spec, callback);
    }
};
exports.ElectronMessagingContribution = ElectronMessagingContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(electron_messaging_service_1.ElectronMessagingService.Contribution),
    tslib_1.__metadata("design:type", Object)
], ElectronMessagingContribution.prototype, "messagingContributions", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(electron_connection_handler_1.ElectronConnectionHandler),
    tslib_1.__metadata("design:type", Object)
], ElectronMessagingContribution.prototype, "connectionHandlers", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ElectronMessagingContribution.prototype, "init", null);
exports.ElectronMessagingContribution = ElectronMessagingContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronMessagingContribution);
/**
 * Used to establish a connection between the ipcMain and the Electron frontend (window).
 * Messages a transferred via electron IPC.
 */
class ElectronWebContentChannel extends channel_1.AbstractChannel {
    constructor(sender) {
        super();
        this.sender = sender;
        // Make the message emitter public so that we can easily forward messages received from the ipcMain.
        this.onMessageEmitter = new common_1.Emitter();
    }
    getWriteBuffer() {
        const writer = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
        writer.onCommit(buffer => {
            if (!this.sender.isDestroyed()) {
                electron_api_main_1.TheiaRendererAPI.sendData(this.sender, buffer);
            }
        });
        return writer;
    }
}
exports.ElectronWebContentChannel = ElectronWebContentChannel;
//# sourceMappingURL=electron-messaging-contribution.js.map