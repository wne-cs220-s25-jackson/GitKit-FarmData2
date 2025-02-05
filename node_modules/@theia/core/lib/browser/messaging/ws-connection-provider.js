"use strict";
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
exports.WebSocketConnectionProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const service_connection_provider_1 = require("./service-connection-provider");
(0, inversify_1.decorate)((0, inversify_1.injectable)(), common_1.RpcProxyFactory);
(0, inversify_1.decorate)((0, inversify_1.unmanaged)(), common_1.RpcProxyFactory, 0);
/**
 * @deprecated This class serves to keep API compatibility for a while.
 * Use the {@linkcode RemoteConnectionProvider} as the injection symbol and {@linkcode ServiceConnectionProvider} as the type instead.
 */
let WebSocketConnectionProvider = class WebSocketConnectionProvider {
    static createProxy(container, path, arg) {
        return service_connection_provider_1.ServiceConnectionProvider.createProxy(container, path, arg);
    }
    static createLocalProxy(container, path, arg) {
        return service_connection_provider_1.ServiceConnectionProvider.createLocalProxy(container, path, arg);
    }
    static createHandler(container, path, arg) {
        return service_connection_provider_1.ServiceConnectionProvider.createHandler(container, path, arg);
    }
    createProxy(path, factory) {
        return this.remoteConnectionProvider.createProxy(path, factory);
    }
};
exports.WebSocketConnectionProvider = WebSocketConnectionProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(service_connection_provider_1.RemoteConnectionProvider),
    tslib_1.__metadata("design:type", service_connection_provider_1.ServiceConnectionProvider)
], WebSocketConnectionProvider.prototype, "remoteConnectionProvider", void 0);
exports.WebSocketConnectionProvider = WebSocketConnectionProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WebSocketConnectionProvider);
//# sourceMappingURL=ws-connection-provider.js.map