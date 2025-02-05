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
exports.ServiceConnectionProvider = exports.RemoteConnectionProvider = exports.LocalConnectionProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const channel_1 = require("../../common/message-rpc/channel");
const promise_util_1 = require("../../common/promise-util");
const connection_source_1 = require("./connection-source");
/**
 * Service id for the local connection provider
 */
exports.LocalConnectionProvider = Symbol('LocalConnectionProvider');
/**
 * Service id for the remote connection provider
 */
exports.RemoteConnectionProvider = Symbol('RemoteConnectionProvider');
/**
 * This class manages the channels for remote services in the back end.
 *
 * Since we have the ability to use a remote back end via SSH, we need to distinguish
 * between two types of services: those that will be redirected to the remote back end
 * and those which must remain in the local back end. For example the service that manages
 * the remote ssh connections and port forwarding to the remote instance must remain local
 * while e.g. the file system service will run in the remote back end. For each set
 * of services, we will bind an instance of this class to {@linkcode LocalConnectionProvider}
 * and {@linkcode RemoteConnectionProvider} respectively.
 */
let ServiceConnectionProvider = class ServiceConnectionProvider {
    constructor() {
        this.channelHandlers = new Map();
        this.channelReadyDeferred = new promise_util_1.Deferred();
    }
    static createProxy(container, path, arg) {
        return container.get(exports.RemoteConnectionProvider).createProxy(path, arg);
    }
    static createLocalProxy(container, path, arg) {
        return container.get(exports.LocalConnectionProvider).createProxy(path, arg);
    }
    static createHandler(container, path, arg) {
        const remote = container.get(exports.RemoteConnectionProvider);
        const local = container.get(exports.LocalConnectionProvider);
        remote.createProxy(path, arg);
        if (remote !== local) {
            local.createProxy(path, arg);
        }
    }
    createProxy(path, arg) {
        const factory = arg instanceof common_1.RpcProxyFactory ? arg : new common_1.RpcProxyFactory(arg);
        this.listen(path, (_, c) => factory.listen(c), true);
        return factory.createProxy();
    }
    get channelReady() {
        return this.channelReadyDeferred.promise;
    }
    init() {
        this.connectionSource.onConnectionDidOpen(channel => this.handleChannelCreated(channel));
    }
    /**
     * This method must be invoked by subclasses when they have created the main channel.
     * @param mainChannel
     */
    handleChannelCreated(channel) {
        channel.onClose(() => {
            this.handleChannelClosed(channel);
        });
        this.channelMultiplexer = new channel_1.ChannelMultiplexer(channel);
        this.channelReadyDeferred.resolve();
        for (const entry of this.channelHandlers.entries()) {
            this.openChannel(entry[0], entry[1]);
        }
    }
    handleChannelClosed(channel) {
        this.channelReadyDeferred = new promise_util_1.Deferred();
    }
    /**
     * Install a connection handler for the given path.
     */
    listen(path, handler, reconnect) {
        this.openChannel(path, handler).then(() => {
            if (reconnect) {
                this.channelHandlers.set(path, handler);
            }
        });
    }
    async openChannel(path, handler) {
        await this.channelReady;
        const newChannel = await this.channelMultiplexer.open(path);
        handler(path, newChannel);
    }
};
exports.ServiceConnectionProvider = ServiceConnectionProvider;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceConnectionProvider.prototype, "init", null);
tslib_1.__decorate([
    (0, inversify_1.inject)(connection_source_1.ConnectionSource),
    tslib_1.__metadata("design:type", Object)
], ServiceConnectionProvider.prototype, "connectionSource", void 0);
exports.ServiceConnectionProvider = ServiceConnectionProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ServiceConnectionProvider);
//# sourceMappingURL=service-connection-provider.js.map