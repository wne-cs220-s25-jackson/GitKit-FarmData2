"use strict";
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
exports.WebSocketConnectionSource = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../../common");
const socket_io_client_1 = require("socket.io-client");
const endpoint_1 = require("../endpoint");
const channel_1 = require("../../common/message-rpc/channel");
const uint8_array_message_buffer_1 = require("../../common/message-rpc/uint8-array-message-buffer");
const inversify_1 = require("inversify");
const frontend_id_provider_1 = require("./frontend-id-provider");
const frontend_application_config_provider_1 = require("../frontend-application-config-provider");
const socket_write_buffer_1 = require("../../common/messaging/socket-write-buffer");
const connection_management_1 = require("../../common/messaging/connection-management");
let WebSocketConnectionSource = class WebSocketConnectionSource {
    get socket() {
        return this._socket;
    }
    get onConnectionDidOpen() {
        return this.onConnectionDidOpenEmitter.event;
    }
    get onSocketDidOpen() {
        return this.onSocketDidOpenEmitter.event;
    }
    get onSocketDidClose() {
        return this.onSocketDidCloseEmitter.event;
    }
    get onIncomingMessageActivity() {
        return this.onIncomingMessageActivityEmitter.event;
    }
    constructor() {
        this.writeBuffer = new socket_write_buffer_1.SocketWriteBuffer();
        this.onConnectionDidOpenEmitter = new common_1.Emitter();
        this.onSocketDidOpenEmitter = new common_1.Emitter();
        this.onSocketDidCloseEmitter = new common_1.Emitter();
        this.onIncomingMessageActivityEmitter = new common_1.Emitter();
    }
    openSocket() {
        const url = this.createWebSocketUrl(common_1.servicesPath);
        this._socket = this.createWebSocket(url);
        this._socket.on('connect', () => {
            this.onSocketDidOpenEmitter.fire();
            this.handleSocketConnected();
        });
        this._socket.on('disconnect', () => {
            this.onSocketDidCloseEmitter.fire();
        });
        this._socket.on('error', reason => {
            if (this.currentChannel) {
                this.currentChannel.onErrorEmitter.fire(reason);
            }
            ;
        });
        this._socket.connect();
    }
    negogiateReconnect() {
        const reconnectListener = (hasConnection) => {
            this._socket.off(connection_management_1.ConnectionManagementMessages.RECONNECT, reconnectListener);
            if (hasConnection) {
                console.info(`reconnect succeeded on ${this.socket.id}`);
                this.writeBuffer.flush(this.socket);
            }
            else {
                if (frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().reloadOnReconnect) {
                    window.location.reload(); // this might happen in the preload module, when we have no window service yet
                }
                else {
                    console.info(`reconnect failed on ${this.socket.id}`);
                    this.currentChannel.onCloseEmitter.fire({ reason: 'reconnecting channel' });
                    this.currentChannel.close();
                    this.writeBuffer.drain();
                    this.socket.disconnect();
                    this.socket.connect();
                    this.negotiateInitialConnect();
                }
            }
        };
        this._socket.on(connection_management_1.ConnectionManagementMessages.RECONNECT, reconnectListener);
        console.info(`sending reconnect on ${this.socket.id}`);
        this._socket.emit(connection_management_1.ConnectionManagementMessages.RECONNECT, this.frontendIdProvider.getId());
    }
    negotiateInitialConnect() {
        const initialConnectListener = () => {
            console.info(`initial connect received on ${this.socket.id}`);
            this._socket.off(connection_management_1.ConnectionManagementMessages.INITIAL_CONNECT, initialConnectListener);
            this.connectNewChannel();
        };
        this._socket.on(connection_management_1.ConnectionManagementMessages.INITIAL_CONNECT, initialConnectListener);
        console.info(`sending initial connect on ${this.socket.id}`);
        this._socket.emit(connection_management_1.ConnectionManagementMessages.INITIAL_CONNECT, this.frontendIdProvider.getId());
    }
    handleSocketConnected() {
        if (this.currentChannel) {
            this.negogiateReconnect();
        }
        else {
            this.negotiateInitialConnect();
        }
    }
    connectNewChannel() {
        if (this.currentChannel) {
            this.currentChannel.close();
            this.currentChannel.onCloseEmitter.fire({ reason: 'reconnecting channel' });
        }
        this.writeBuffer.drain();
        this.currentChannel = this.createChannel();
        this.onConnectionDidOpenEmitter.fire(this.currentChannel);
    }
    createChannel() {
        const toDispose = new common_1.DisposableCollection();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const messageHandler = (data) => {
            this.onIncomingMessageActivityEmitter.fire();
            if (this.currentChannel) {
                // In the browser context socketIO receives binary messages as ArrayBuffers.
                // So we have to convert them to a Uint8Array before delegating the message to the read buffer.
                const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
                this.currentChannel.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(buffer));
            }
            ;
        };
        this._socket.on('message', messageHandler);
        toDispose.push(common_1.Disposable.create(() => {
            this.socket.off('message', messageHandler);
        }));
        const channel = new channel_1.ForwardingChannel('any', () => {
            toDispose.dispose();
        }, () => {
            const result = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
            result.onCommit(buffer => {
                if (this.socket.connected) {
                    this.socket.send(buffer);
                }
                else {
                    this.writeBuffer.buffer(buffer);
                }
            });
            return result;
        });
        return channel;
    }
    /**
     * @param path The handler to reach in the backend.
     */
    createWebSocketUrl(path) {
        // Since we are using Socket.io, the path should look like the following:
        // proto://domain.com/{path}
        return this.createEndpoint(path).getWebSocketUrl().withPath(path).toString();
    }
    createHttpWebSocketUrl(path) {
        return this.createEndpoint(path).getRestUrl().toString();
    }
    createEndpoint(path) {
        return new endpoint_1.Endpoint({ path });
    }
    /**
     * Creates a web socket for the given url
     */
    createWebSocket(url) {
        return (0, socket_io_client_1.io)(url, {
            path: this.createSocketIoPath(url),
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
            reconnectionAttempts: Infinity,
            extraHeaders: {
                // Socket.io strips the `origin` header
                // We need to provide our own for validation
                'fix-origin': window.location.origin
            }
        });
    }
    /**
     * Path for Socket.io to make its requests to.
     */
    createSocketIoPath(url) {
        if (location.protocol === endpoint_1.Endpoint.PROTO_FILE) {
            return '/socket.io';
        }
        let { pathname } = location;
        if (!pathname.endsWith('/')) {
            pathname += '/';
        }
        return pathname + 'socket.io';
    }
};
exports.WebSocketConnectionSource = WebSocketConnectionSource;
WebSocketConnectionSource.NO_CONNECTION = '<none>';
tslib_1.__decorate([
    (0, inversify_1.inject)(frontend_id_provider_1.FrontendIdProvider),
    tslib_1.__metadata("design:type", Object)
], WebSocketConnectionSource.prototype, "frontendIdProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WebSocketConnectionSource.prototype, "openSocket", null);
exports.WebSocketConnectionSource = WebSocketConnectionSource = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], WebSocketConnectionSource);
//# sourceMappingURL=ws-connection-source.js.map