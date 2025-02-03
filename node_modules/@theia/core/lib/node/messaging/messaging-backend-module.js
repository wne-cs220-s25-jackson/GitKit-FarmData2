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
exports.messagingBackendModule = void 0;
const inversify_1 = require("inversify");
const common_1 = require("../../common");
// import { BackendApplicationContribution } from '../backend-application';
const default_messaging_service_1 = require("./default-messaging-service");
const connection_container_module_1 = require("./connection-container-module");
const messaging_service_1 = require("./messaging-service");
const messaging_listeners_1 = require("./messaging-listeners");
const frontend_connection_service_1 = require("./frontend-connection-service");
const backend_application_1 = require("../backend-application");
const connection_management_1 = require("../../common/messaging/connection-management");
const websocket_frontend_connection_service_1 = require("./websocket-frontend-connection-service");
const websocket_endpoint_1 = require("./websocket-endpoint");
exports.messagingBackendModule = new inversify_1.ContainerModule(bind => {
    (0, common_1.bindContributionProvider)(bind, connection_container_module_1.ConnectionContainerModule);
    (0, common_1.bindContributionProvider)(bind, messaging_service_1.MessagingService.Contribution);
    bind(default_messaging_service_1.DefaultMessagingService).toSelf().inSingletonScope();
    bind(messaging_service_1.MessagingService.Identifier).toService(default_messaging_service_1.DefaultMessagingService);
    bind(backend_application_1.BackendApplicationContribution).toService(default_messaging_service_1.DefaultMessagingService);
    bind(default_messaging_service_1.MessagingContainer).toDynamicValue(({ container }) => container).inSingletonScope();
    bind(websocket_endpoint_1.WebsocketEndpoint).toSelf().inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).toService(websocket_endpoint_1.WebsocketEndpoint);
    bind(websocket_frontend_connection_service_1.WebsocketFrontendConnectionService).toSelf().inSingletonScope();
    bind(frontend_connection_service_1.FrontendConnectionService).toService(websocket_frontend_connection_service_1.WebsocketFrontendConnectionService);
    bind(messaging_listeners_1.MessagingListener).toSelf().inSingletonScope();
    (0, common_1.bindContributionProvider)(bind, messaging_listeners_1.MessagingListenerContribution);
    bind(common_1.ConnectionHandler).toDynamicValue(context => {
        const connectionService = context.container.get(frontend_connection_service_1.FrontendConnectionService);
        return new common_1.RpcConnectionHandler(connection_management_1.connectionCloseServicePath, () => ({
            markForClose: (channelId) => {
                connectionService.markForClose(channelId);
            }
        }));
    }).inSingletonScope();
});
//# sourceMappingURL=messaging-backend-module.js.map