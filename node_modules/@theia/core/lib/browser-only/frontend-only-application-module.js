"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendOnlyApplicationModule = exports.bindMessageService = void 0;
const inversify_1 = require("inversify");
const common_1 = require("../common");
const application_protocol_1 = require("../common/application-protocol");
const env_variables_1 = require("./../common/env-variables");
const frontend_application_bindings_1 = require("../browser/frontend-application-bindings");
Object.defineProperty(exports, "bindMessageService", { enumerable: true, get: function () { return frontend_application_bindings_1.bindMessageService; } });
const key_store_1 = require("../common/key-store");
const quick_pick_service_1 = require("../common/quick-pick-service");
const quick_input_1 = require("../browser/quick-input");
const request_1 = require("@theia/request");
const connection_status_service_1 = require("../browser/connection-status-service");
// is loaded directly after the regular frontend module
exports.frontendOnlyApplicationModule = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    if (isBound(common_1.CommandRegistry)) {
        rebind(common_1.CommandRegistry).toSelf().inSingletonScope();
    }
    else {
        bind(common_1.CommandRegistry).toSelf().inSingletonScope();
    }
    const stopwatch = {
        start: async (_name, _options) => -1,
        stop: async (_measurement, _message, _messageArgs) => { }
    };
    if (isBound(common_1.BackendStopwatch)) {
        rebind(common_1.BackendStopwatch).toConstantValue(stopwatch);
    }
    else {
        bind(common_1.BackendStopwatch).toConstantValue(stopwatch);
    }
    if (isBound(common_1.CommandRegistry)) {
        rebind(quick_pick_service_1.QuickPickService).to(quick_input_1.QuickPickServiceImpl).inSingletonScope();
    }
    else {
        bind(quick_pick_service_1.QuickPickService).to(quick_input_1.QuickPickServiceImpl).inSingletonScope();
    }
    const mockedApplicationServer = {
        getExtensionsInfos: async () => [],
        getApplicationInfo: async () => undefined,
        getApplicationRoot: async () => '',
        getApplicationPlatform: () => Promise.resolve('web'),
        getBackendOS: async () => common_1.OS.Type.Linux
    };
    if (isBound(application_protocol_1.ApplicationServer)) {
        rebind(application_protocol_1.ApplicationServer).toConstantValue(mockedApplicationServer);
    }
    else {
        bind(application_protocol_1.ApplicationServer).toConstantValue(mockedApplicationServer);
    }
    const varServer = {
        getExecPath: async () => '',
        getVariables: async () => [],
        getValue: async (_key) => undefined,
        getConfigDirUri: async () => '',
        getHomeDirUri: async () => '',
        getDrives: async () => []
    };
    if (isBound(env_variables_1.EnvVariablesServer)) {
        rebind(env_variables_1.EnvVariablesServer).toConstantValue(varServer);
    }
    else {
        bind(env_variables_1.EnvVariablesServer).toConstantValue(varServer);
    }
    const keyStoreService = {
        deletePassword: () => Promise.resolve(false),
        findCredentials: () => Promise.resolve([]),
        findPassword: () => Promise.resolve(undefined),
        setPassword: () => Promise.resolve(),
        getPassword: () => Promise.resolve(undefined)
    };
    if (isBound(key_store_1.KeyStoreService)) {
        rebind(key_store_1.KeyStoreService).toConstantValue(keyStoreService);
    }
    else {
        bind(key_store_1.KeyStoreService).toConstantValue(keyStoreService);
    }
    const requestService = {
        configure: () => Promise.resolve(),
        request: () => Promise.reject(),
        resolveProxy: () => Promise.resolve(undefined)
    };
    if (isBound(request_1.BackendRequestService)) {
        rebind(request_1.BackendRequestService).toConstantValue(requestService);
    }
    else {
        bind(request_1.BackendRequestService).toConstantValue(requestService);
    }
    const connectionStatusService = {
        currentStatus: connection_status_service_1.ConnectionStatus.ONLINE,
        onStatusChange: new common_1.Emitter().event
    };
    if (isBound(connection_status_service_1.ConnectionStatusService)) {
        rebind(connection_status_service_1.ConnectionStatusService).toConstantValue(connectionStatusService);
    }
    else {
        bind(connection_status_service_1.ConnectionStatusService).toConstantValue(connectionStatusService);
    }
});
//# sourceMappingURL=frontend-only-application-module.js.map