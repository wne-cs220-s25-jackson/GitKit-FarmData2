"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendOnlyServiceConnectionProvider = exports.FrontendOnlyConnectionSource = void 0;
const tslib_1 = require("tslib");
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
const common_1 = require("../../common");
const inversify_1 = require("inversify");
const service_connection_provider_1 = require("../../browser/messaging/service-connection-provider");
let FrontendOnlyConnectionSource = class FrontendOnlyConnectionSource {
    constructor() {
        this.onConnectionDidOpen = new common_1.Emitter().event;
    }
};
exports.FrontendOnlyConnectionSource = FrontendOnlyConnectionSource;
exports.FrontendOnlyConnectionSource = FrontendOnlyConnectionSource = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FrontendOnlyConnectionSource);
let FrontendOnlyServiceConnectionProvider = class FrontendOnlyServiceConnectionProvider extends service_connection_provider_1.ServiceConnectionProvider {
    constructor() {
        super(...arguments);
        this.onSocketDidOpen = common_1.Event.None;
        this.onSocketDidClose = common_1.Event.None;
        this.onIncomingMessageActivity = common_1.Event.None;
    }
    createProxy(path, target) {
        console.debug(`[Frontend-Only Fallback] Created proxy connection for ${path}`);
        const factory = target instanceof common_1.RpcProxyFactory ? target : new common_1.RpcProxyFactory(target);
        return factory.createProxy();
    }
    listen(path, handler, reconnect) {
        console.debug('[Frontend-Only Fallback] Listen to websocket connection requested');
    }
};
exports.FrontendOnlyServiceConnectionProvider = FrontendOnlyServiceConnectionProvider;
exports.FrontendOnlyServiceConnectionProvider = FrontendOnlyServiceConnectionProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FrontendOnlyServiceConnectionProvider);
//# sourceMappingURL=frontend-only-service-connection-provider.js.map