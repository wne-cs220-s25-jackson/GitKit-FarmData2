"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.messagingFrontendModule = void 0;
const inversify_1 = require("inversify");
const frontend_id_provider_1 = require("./frontend-id-provider");
const ws_connection_source_1 = require("./ws-connection-source");
const service_connection_provider_1 = require("./service-connection-provider");
const connection_source_1 = require("./connection-source");
const connection_management_1 = require("../../common/messaging/connection-management");
const ws_connection_provider_1 = require("./ws-connection-provider");
const backendServiceProvider = Symbol('backendServiceProvider');
exports.messagingFrontendModule = new inversify_1.ContainerModule(bind => {
    bind(connection_management_1.ConnectionCloseService).toDynamicValue(ctx => ws_connection_provider_1.WebSocketConnectionProvider.createProxy(ctx.container, connection_management_1.connectionCloseServicePath)).inSingletonScope();
    bind(frontend_id_provider_1.BrowserFrontendIdProvider).toSelf().inSingletonScope();
    bind(frontend_id_provider_1.FrontendIdProvider).toService(frontend_id_provider_1.BrowserFrontendIdProvider);
    bind(ws_connection_source_1.WebSocketConnectionSource).toSelf().inSingletonScope();
    bind(backendServiceProvider).toDynamicValue(ctx => {
        bind(service_connection_provider_1.ServiceConnectionProvider).toSelf().inSingletonScope();
        const container = ctx.container.createChild();
        container.bind(connection_source_1.ConnectionSource).toService(ws_connection_source_1.WebSocketConnectionSource);
        return container.get(service_connection_provider_1.ServiceConnectionProvider);
    }).inSingletonScope();
    bind(service_connection_provider_1.LocalConnectionProvider).toService(backendServiceProvider);
    bind(service_connection_provider_1.RemoteConnectionProvider).toService(backendServiceProvider);
    bind(ws_connection_provider_1.WebSocketConnectionProvider).toSelf().inSingletonScope();
});
//# sourceMappingURL=messaging-frontend-module.js.map