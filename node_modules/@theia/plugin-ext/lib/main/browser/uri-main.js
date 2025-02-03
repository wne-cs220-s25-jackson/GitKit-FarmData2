"use strict";
// *****************************************************************************
// Copyright (C) 2024 STMicroelectronics.
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
exports.UriMainImpl = void 0;
const common_1 = require("../../common");
const browser_1 = require("@theia/core/lib/browser");
const frontend_application_config_provider_1 = require("@theia/core/lib/browser/frontend-application-config-provider");
const hosted_plugin_1 = require("../../hosted/browser/hosted-plugin");
class UriMainImpl {
    constructor(rpc, container) {
        var _a, _b;
        this.handlers = new Set();
        this.proxy = rpc.getProxy(common_1.MAIN_RPC_CONTEXT.URI_EXT);
        this.openerService = container.get(browser_1.OpenerService);
        this.pluginSupport = container.get(hosted_plugin_1.HostedPluginSupport);
        this.openHandler = {
            id: 'theia-plugin-open-handler',
            canHandle: async (uri, options) => {
                if (uri.scheme !== frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().electron.uriScheme) {
                    return 0;
                }
                await this.pluginSupport.activateByUri(uri.scheme, uri.authority);
                if (this.handlers.has(uri.authority)) {
                    return 500;
                }
                return 0;
            },
            open: async (uri, options) => {
                if (!this.handlers.has(uri.authority)) {
                    throw new Error(`No plugin to handle this uri: : '${uri}'`);
                }
                this.proxy.$handleExternalUri(uri.toComponents());
            }
        };
        (_b = (_a = this.openerService).addHandler) === null || _b === void 0 ? void 0 : _b.call(_a, this.openHandler);
    }
    dispose() {
        var _a, _b;
        (_b = (_a = this.openerService).removeHandler) === null || _b === void 0 ? void 0 : _b.call(_a, this.openHandler);
        this.handlers.clear();
    }
    async $registerUriHandler(pluginId, extensionDisplayName) {
        this.handlers.add(pluginId);
    }
    async $unregisterUriHandler(pluginId) {
        this.handlers.delete(pluginId);
    }
}
exports.UriMainImpl = UriMainImpl;
//# sourceMappingURL=uri-main.js.map