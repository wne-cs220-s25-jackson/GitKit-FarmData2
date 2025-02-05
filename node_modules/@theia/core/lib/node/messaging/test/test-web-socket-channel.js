"use strict";
/* eslint-disable @theia/runtime-import-check */
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.TestWebSocketChannelSetup = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../../../common");
const ws_connection_source_1 = require("../../../browser/messaging/ws-connection-source");
const inversify_1 = require("inversify");
const service_connection_provider_1 = require("../../../browser/messaging/service-connection-provider");
const messaging_frontend_module_1 = require("../../../browser/messaging/messaging-frontend-module");
const socket_io_client_1 = require("socket.io-client");
const websocketUrl = Symbol('testWebsocketUrl');
class TestWebsocketConnectionSource extends ws_connection_source_1.WebSocketConnectionSource {
    createWebSocketUrl(path) {
        return this.websocketUrl;
    }
    createWebSocket(url) {
        return (0, socket_io_client_1.io)(url);
    }
}
tslib_1.__decorate([
    (0, inversify_1.inject)(websocketUrl),
    tslib_1.__metadata("design:type", String)
], TestWebsocketConnectionSource.prototype, "websocketUrl", void 0);
class TestWebSocketChannelSetup {
    constructor({ server, path }) {
        const address = server.address();
        let url;
        if (address.family === 'IPv6') {
            url = `ws://[${address.address}]:${address.port}${common_1.servicesPath}`;
        }
        else {
            url = `ws://${address.address}:${address.port}${common_1.servicesPath}`;
        }
        this.connectionProvider = this.createConnectionProvider(url);
    }
    createConnectionProvider(socketUrl) {
        const container = new inversify_1.Container();
        container.bind(websocketUrl).toConstantValue(socketUrl);
        container.load(messaging_frontend_module_1.messagingFrontendModule);
        container.rebind(ws_connection_source_1.WebSocketConnectionSource).to(TestWebsocketConnectionSource);
        return container.get(service_connection_provider_1.RemoteConnectionProvider);
    }
}
exports.TestWebSocketChannelSetup = TestWebSocketChannelSetup;
//# sourceMappingURL=test-web-socket-channel.js.map