"use strict";
/********************************************************************************
 * Copyright (C) 2022 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectProxyResolver = void 0;
const http = require("http");
const https = require("https");
const tls = require("tls");
const proxy_agent_1 = require("@vscode/proxy-agent");
function connectProxyResolver(workspaceExt, configProvider) {
    const resolveProxy = (0, proxy_agent_1.createProxyResolver)({
        resolveProxy: async (url) => workspaceExt.resolveProxy(url),
        getHttpProxySetting: () => configProvider.getConfiguration('http').get('proxy'),
        log: () => { },
        getLogLevel: () => 0,
        proxyResolveTelemetry: () => { },
        useHostProxy: true,
        env: process.env,
    });
    const lookup = createPatchedModules(configProvider, resolveProxy);
    configureModuleLoading(lookup);
}
exports.connectProxyResolver = connectProxyResolver;
function createPatchedModules(configProvider, resolveProxy) {
    const defaultConfig = 'override';
    const proxySetting = {
        config: defaultConfig
    };
    const certSetting = {
        config: false
    };
    configProvider.onDidChangeConfiguration(() => {
        const httpConfig = configProvider.getConfiguration('http');
        proxySetting.config = (httpConfig === null || httpConfig === void 0 ? void 0 : httpConfig.get('proxySupport')) || defaultConfig;
        certSetting.config = !!(httpConfig === null || httpConfig === void 0 ? void 0 : httpConfig.get('systemCertificates'));
    });
    return {
        http: Object.assign(http, (0, proxy_agent_1.createHttpPatch)(http, resolveProxy, proxySetting, certSetting, true)),
        https: Object.assign(https, (0, proxy_agent_1.createHttpPatch)(https, resolveProxy, proxySetting, certSetting, true)),
        tls: Object.assign(tls, (0, proxy_agent_1.createTlsPatch)(tls))
    };
}
function configureModuleLoading(lookup) {
    const node_module = require('module');
    const original = node_module._load;
    node_module._load = function (request) {
        if (request === 'tls') {
            return lookup.tls;
        }
        if (request !== 'http' && request !== 'https') {
            return original.apply(this, arguments);
        }
        // Create a shallow copy of the http(s) module to work around extensions that apply changes to the modules
        // See for more info: https://github.com/microsoft/vscode/issues/93167
        return { ...lookup[request] };
    };
}
//# sourceMappingURL=plugin-host-proxy.js.map