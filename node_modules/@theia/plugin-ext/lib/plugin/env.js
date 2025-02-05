"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.EnvExtImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const rpc_protocol_1 = require("../common/rpc-protocol");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const uuid_1 = require("@theia/core/lib/common/uuid");
let EnvExtImpl = class EnvExtImpl {
    constructor() {
        this.envSessionId = (0, uuid_1.generateUuid)();
        this.envMachineId = (0, uuid_1.generateUuid)();
        this._remoteName = undefined;
    }
    initialize() {
        this.proxy = this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.ENV_MAIN);
    }
    getEnvVariable(envVarName) {
        return this.proxy.$getEnvVariable(envVarName).then(x => {
            if (x === null) {
                return undefined;
            }
            return x;
        });
    }
    getQueryParameter(queryParamName) {
        return this.queryParameters[queryParamName];
    }
    getQueryParameters() {
        return this.queryParameters;
    }
    setQueryParameters(queryParams) {
        this.queryParameters = queryParams;
    }
    setApplicationName(applicationName) {
        this.applicationName = applicationName;
    }
    setLanguage(lang) {
        this.lang = lang;
    }
    setUIKind(uiKind) {
        this.ui = uiKind;
    }
    setAppHost(appHost) {
        this.host = appHost;
    }
    setAppRoot(appRoot) {
        this.applicationRoot = appRoot;
    }
    setAppUriScheme(uriScheme) {
        this.appUriScheme = uriScheme;
    }
    getClientOperatingSystem() {
        return this.proxy.$getClientOperatingSystem();
    }
    get appName() {
        return this.applicationName;
    }
    get appRoot() {
        return this.applicationRoot;
    }
    get appHost() {
        return this.host;
    }
    get remoteName() {
        return this._remoteName;
    }
    get language() {
        return this.lang;
    }
    get machineId() {
        return this.envMachineId;
    }
    get sessionId() {
        return this.envSessionId;
    }
    get uriScheme() {
        return this.appUriScheme;
    }
    get uiKind() {
        return this.ui;
    }
};
exports.EnvExtImpl = EnvExtImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(rpc_protocol_1.RPCProtocol),
    tslib_1.__metadata("design:type", Object)
], EnvExtImpl.prototype, "rpc", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], EnvExtImpl.prototype, "initialize", null);
exports.EnvExtImpl = EnvExtImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], EnvExtImpl);
//# sourceMappingURL=env.js.map