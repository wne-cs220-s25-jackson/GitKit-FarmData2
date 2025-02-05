"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagingFrontendOnlyModule = void 0;
// *****************************************************************************
// Copyright (C) 2023 EclipseSource and others.
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
const inversify_1 = require("inversify");
const ws_connection_source_1 = require("../../browser/messaging/ws-connection-source");
const frontend_only_service_connection_provider_1 = require("./frontend-only-service-connection-provider");
const connection_source_1 = require("../../browser/messaging/connection-source");
const service_connection_provider_1 = require("../../browser/messaging/service-connection-provider");
// is loaded directly after the regular message frontend module
exports.messagingFrontendOnlyModule = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    unbind(ws_connection_source_1.WebSocketConnectionSource);
    bind(frontend_only_service_connection_provider_1.FrontendOnlyConnectionSource).toSelf().inSingletonScope();
    if (isBound(connection_source_1.ConnectionSource)) {
        rebind(connection_source_1.ConnectionSource).toService(frontend_only_service_connection_provider_1.FrontendOnlyConnectionSource);
    }
    else {
        bind(connection_source_1.ConnectionSource).toService(frontend_only_service_connection_provider_1.FrontendOnlyConnectionSource);
    }
    bind(frontend_only_service_connection_provider_1.FrontendOnlyServiceConnectionProvider).toSelf().inSingletonScope();
    if (isBound(service_connection_provider_1.LocalConnectionProvider)) {
        rebind(service_connection_provider_1.LocalConnectionProvider).toService(frontend_only_service_connection_provider_1.FrontendOnlyServiceConnectionProvider);
    }
    else {
        bind(service_connection_provider_1.LocalConnectionProvider).toService(frontend_only_service_connection_provider_1.FrontendOnlyServiceConnectionProvider);
    }
    if (isBound(service_connection_provider_1.RemoteConnectionProvider)) {
        rebind(service_connection_provider_1.RemoteConnectionProvider).toService(frontend_only_service_connection_provider_1.FrontendOnlyServiceConnectionProvider);
    }
    else {
        bind(service_connection_provider_1.RemoteConnectionProvider).toService(frontend_only_service_connection_provider_1.FrontendOnlyServiceConnectionProvider);
    }
});
//# sourceMappingURL=messaging-frontend-only-module.js.map