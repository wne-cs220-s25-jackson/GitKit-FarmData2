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
exports.ConnectionHandlers = exports.DefaultMessagingService = exports.MainChannel = exports.MessagingContainer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const messaging_service_1 = require("./messaging-service");
const connection_container_module_1 = require("./connection-container-module");
const Route = require("route-parser");
const channel_1 = require("../../common/message-rpc/channel");
const frontend_connection_service_1 = require("./frontend-connection-service");
exports.MessagingContainer = Symbol('MessagingContainer');
exports.MainChannel = Symbol('MainChannel');
let DefaultMessagingService = class DefaultMessagingService {
    constructor() {
        this.channelHandlers = new ConnectionHandlers();
    }
    initialize() {
        this.registerConnectionHandler(common_1.servicesPath, (_, socket) => this.handleConnection(socket));
        for (const contribution of this.contributions.getContributions()) {
            contribution.configure(this);
        }
    }
    registerConnectionHandler(path, callback) {
        this.frontendConnectionService.registerConnectionHandler(path, callback);
    }
    registerChannelHandler(spec, callback) {
        this.channelHandlers.push(spec, (params, channel) => callback(params, channel));
    }
    handleConnection(channel) {
        const multiplexer = new channel_1.ChannelMultiplexer(channel);
        const channelHandlers = this.getConnectionChannelHandlers(channel);
        multiplexer.onDidOpenChannel(event => {
            if (channelHandlers.route(event.id, event.channel)) {
                console.debug(`Opening channel for service path '${event.id}'.`);
                event.channel.onClose(() => console.info(`Closing channel on service path '${event.id}'.`));
            }
        });
    }
    createMainChannelContainer(socket) {
        const connectionContainer = this.container.createChild();
        connectionContainer.bind(exports.MainChannel).toConstantValue(socket);
        return connectionContainer;
    }
    getConnectionChannelHandlers(socket) {
        const connectionContainer = this.createMainChannelContainer(socket);
        (0, common_1.bindContributionProvider)(connectionContainer, common_1.ConnectionHandler);
        connectionContainer.load(...this.connectionModules.getContributions());
        const connectionChannelHandlers = new ConnectionHandlers(this.channelHandlers);
        const connectionHandlers = connectionContainer.getNamed(common_1.ContributionProvider, common_1.ConnectionHandler);
        for (const connectionHandler of connectionHandlers.getContributions(true)) {
            connectionChannelHandlers.push(connectionHandler.path, (_, channel) => {
                connectionHandler.onConnection(channel);
            });
        }
        return connectionChannelHandlers;
    }
};
exports.DefaultMessagingService = DefaultMessagingService;
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.MessagingContainer),
    tslib_1.__metadata("design:type", Object)
], DefaultMessagingService.prototype, "container", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(frontend_connection_service_1.FrontendConnectionService),
    tslib_1.__metadata("design:type", Object)
], DefaultMessagingService.prototype, "frontendConnectionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(connection_container_module_1.ConnectionContainerModule),
    tslib_1.__metadata("design:type", Object)
], DefaultMessagingService.prototype, "connectionModules", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(messaging_service_1.MessagingService.Contribution),
    tslib_1.__metadata("design:type", Object)
], DefaultMessagingService.prototype, "contributions", void 0);
exports.DefaultMessagingService = DefaultMessagingService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultMessagingService);
class ConnectionHandlers {
    constructor(parent) {
        this.parent = parent;
        this.handlers = [];
    }
    push(spec, callback) {
        const route = new Route(spec);
        const handler = (path, channel) => {
            const params = route.match(path);
            if (!params) {
                return false;
            }
            callback(params, channel);
            return route.reverse(params);
        };
        this.handlers.push(handler);
    }
    route(path, connection) {
        for (const handler of this.handlers) {
            try {
                const result = handler(path, connection);
                if (result) {
                    return result;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        if (this.parent) {
            return this.parent.route(path, connection);
        }
        return false;
    }
}
exports.ConnectionHandlers = ConnectionHandlers;
//# sourceMappingURL=default-messaging-service.js.map