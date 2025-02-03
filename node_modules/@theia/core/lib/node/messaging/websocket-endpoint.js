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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketEndpoint = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const socket_io_1 = require("socket.io");
const ws_request_validators_1 = require("../ws-request-validators");
const messaging_listeners_1 = require("./messaging-listeners");
const default_messaging_service_1 = require("./default-messaging-service");
let WebsocketEndpoint = class WebsocketEndpoint {
    constructor() {
        this.checkAliveTimeout = 30000; // 30 seconds
        this.maxHttpBufferSize = 1e8; // 100 MB
        this.wsHandlers = new default_messaging_service_1.ConnectionHandlers();
    }
    registerConnectionHandler(spec, callback) {
        this.wsHandlers.push(spec, callback);
    }
    onStart(server) {
        const socketServer = new socket_io_1.Server(server, {
            pingInterval: this.checkAliveTimeout,
            pingTimeout: this.checkAliveTimeout * 2,
            maxHttpBufferSize: this.maxHttpBufferSize
        });
        // Accept every namespace by using /.*/
        socketServer.of(/.*/).on('connection', async (socket) => {
            const request = socket.request;
            // Socket.io strips the `origin` header of the incoming request
            // We provide a `fix-origin` header in the `WebSocketConnectionProvider`
            request.headers.origin = request.headers['fix-origin'];
            if (await this.allowConnect(socket.request)) {
                await this.handleConnection(socket);
                this.messagingListener.onDidWebSocketUpgrade(socket.request, socket);
            }
            else {
                socket.disconnect(true);
            }
        });
    }
    async allowConnect(request) {
        try {
            return this.wsRequestValidator.allowWsUpgrade(request);
        }
        catch (e) {
            return false;
        }
    }
    async handleConnection(socket) {
        const pathname = socket.nsp.name;
        if (pathname && !this.wsHandlers.route(pathname, socket)) {
            console.error('Cannot find a ws handler for the path: ' + pathname);
        }
    }
};
exports.WebsocketEndpoint = WebsocketEndpoint;
tslib_1.__decorate([
    (0, inversify_1.inject)(ws_request_validators_1.WsRequestValidator),
    tslib_1.__metadata("design:type", ws_request_validators_1.WsRequestValidator)
], WebsocketEndpoint.prototype, "wsRequestValidator", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(messaging_listeners_1.MessagingListener),
    tslib_1.__metadata("design:type", messaging_listeners_1.MessagingListener)
], WebsocketEndpoint.prototype, "messagingListener", void 0);
exports.WebsocketEndpoint = WebsocketEndpoint = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WebsocketEndpoint);
//# sourceMappingURL=websocket-endpoint.js.map