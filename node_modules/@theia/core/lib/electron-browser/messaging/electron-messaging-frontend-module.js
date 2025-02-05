"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
const frontend_application_contribution_1 = require("../../browser/frontend-application-contribution");
const electron_ws_connection_source_1 = require("./electron-ws-connection-source");
const electron_ipc_connection_source_1 = require("./electron-ipc-connection-source");
const electron_local_ws_connection_source_1 = require("./electron-local-ws-connection-source");
const electron_frontend_id_provider_1 = require("./electron-frontend-id-provider");
const frontend_id_provider_1 = require("../../browser/messaging/frontend-id-provider");
const connection_source_1 = require("../../browser/messaging/connection-source");
const service_connection_provider_1 = require("../../browser/messaging/service-connection-provider");
const ws_connection_provider_1 = require("../../browser/messaging/ws-connection-provider");
const connection_management_1 = require("../../common/messaging/connection-management");
const ws_connection_source_1 = require("../../browser/messaging/ws-connection-source");
const backendServiceProvider = Symbol('backendServiceProvider2');
const localServiceProvider = Symbol('localServiceProvider');
exports.messagingFrontendModule = new inversify_1.ContainerModule(bind => {
    bind(connection_management_1.ConnectionCloseService).toDynamicValue(ctx => ws_connection_provider_1.WebSocketConnectionProvider.createProxy(ctx.container, connection_management_1.connectionCloseServicePath)).inSingletonScope();
    bind(electron_ws_connection_source_1.ElectronWebSocketConnectionSource).toSelf().inSingletonScope();
    bind(ws_connection_source_1.WebSocketConnectionSource).toService(electron_ws_connection_source_1.ElectronWebSocketConnectionSource);
    bind(electron_ipc_connection_source_1.ElectronIpcConnectionSource).toSelf().inSingletonScope();
    bind(frontend_application_contribution_1.FrontendApplicationContribution).toService(electron_ipc_connection_source_1.ElectronIpcConnectionSource);
    bind(electron_local_ws_connection_source_1.ElectronLocalWebSocketConnectionSource).toSelf().inSingletonScope();
    bind(backendServiceProvider).toDynamicValue(ctx => {
        const container = ctx.container.createChild();
        container.bind(service_connection_provider_1.ServiceConnectionProvider).toSelf().inSingletonScope();
        container.bind(connection_source_1.ConnectionSource).toService(electron_ws_connection_source_1.ElectronWebSocketConnectionSource);
        return container.get(service_connection_provider_1.ServiceConnectionProvider);
    }).inSingletonScope();
    bind(localServiceProvider).toDynamicValue(ctx => {
        const container = ctx.container.createChild();
        container.bind(service_connection_provider_1.ServiceConnectionProvider).toSelf().inSingletonScope();
        container.bind(connection_source_1.ConnectionSource).toService(electron_local_ws_connection_source_1.ElectronLocalWebSocketConnectionSource);
        return container.get(service_connection_provider_1.ServiceConnectionProvider);
    }).inSingletonScope();
    bind(electron_ipc_connection_source_1.ElectronMainConnectionProvider).toDynamicValue(ctx => {
        const container = ctx.container.createChild();
        container.bind(service_connection_provider_1.ServiceConnectionProvider).toSelf().inSingletonScope();
        container.bind(connection_source_1.ConnectionSource).toService(electron_ipc_connection_source_1.ElectronIpcConnectionSource);
        return container.get(service_connection_provider_1.ServiceConnectionProvider);
    }).inSingletonScope();
    bind(service_connection_provider_1.LocalConnectionProvider).toDynamicValue(ctx => {
        const localPort = (0, electron_local_ws_connection_source_1.getLocalPort)();
        if (localPort) {
            // Return new web socket provider that connects to local app
            return ctx.container.get(localServiceProvider);
        }
        else {
            // Return the usual web socket provider that already established its connection
            // That way we don't create a second socket connection
            return ctx.container.get(backendServiceProvider);
        }
    }).inSingletonScope();
    bind(service_connection_provider_1.RemoteConnectionProvider).toService(backendServiceProvider);
    bind(frontend_application_contribution_1.FrontendApplicationContribution).toService(electron_ws_connection_source_1.ElectronWebSocketConnectionSource);
    bind(electron_frontend_id_provider_1.ElectronFrontendIdProvider).toSelf().inSingletonScope();
    bind(frontend_id_provider_1.FrontendIdProvider).toService(electron_frontend_id_provider_1.ElectronFrontendIdProvider);
    bind(ws_connection_provider_1.WebSocketConnectionProvider).toSelf().inSingletonScope();
});
//# sourceMappingURL=electron-messaging-frontend-module.js.map