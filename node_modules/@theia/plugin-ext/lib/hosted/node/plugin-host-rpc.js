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
exports.PluginHostRPC = exports.AbstractPluginHostRPC = exports.PluginContainerModuleLoader = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const dynamic_require_1 = require("@theia/core/lib/node/dynamic-require");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_manager_1 = require("../../plugin/plugin-manager");
const plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
const plugin_context_1 = require("../../plugin/plugin-context");
const env_1 = require("../../plugin/env");
const preference_registry_1 = require("../../plugin/preference-registry");
const debug_ext_1 = require("../../plugin/debug/debug-ext");
const editors_and_documents_1 = require("../../plugin/editors-and-documents");
const workspace_1 = require("../../plugin/workspace");
const message_registry_1 = require("../../plugin/message-registry");
const clipboard_ext_1 = require("../../plugin/clipboard-ext");
const plugin_manifest_loader_1 = require("./plugin-manifest-loader");
const plugin_storage_1 = require("../../plugin/plugin-storage");
const webviews_1 = require("../../plugin/webviews");
const terminal_ext_1 = require("../../plugin/terminal-ext");
const secrets_ext_1 = require("../../plugin/secrets-ext");
const plugin_host_proxy_1 = require("./plugin-host-proxy");
const localization_ext_1 = require("../../plugin/localization-ext");
const rpc_protocol_1 = require("../../common/rpc-protocol");
const plugin_require_override_1 = require("./plugin-require-override");
exports.PluginContainerModuleLoader = Symbol('PluginContainerModuleLoader');
/**
 * Handle the RPC calls.
 *
 * @template PM is the plugin manager (ext) type
 * @template PAF is the plugin API factory type
 * @template EXT is the type identifying the `Ext` interfaces supported by the plugin manager
 */
let AbstractPluginHostRPC = class AbstractPluginHostRPC {
    constructor(name, backendInitPath, extRpc) {
        this.backendInitPath = backendInitPath;
        this.extRpc = extRpc;
        this.banner = `${name}(${process.pid}):`;
    }
    initialize() {
        (0, plugin_require_override_1.overridePluginDependencies)();
        this.pluginManager.setPluginHost(this.createPluginHost());
        const extInterfaces = this.createExtInterfaces();
        this.registerExtInterfaces(extInterfaces);
        this.apiFactory = this.createAPIFactory(extInterfaces);
        this.loadContainerModule(new inversify_1.ContainerModule(bind => bind(plugin_api_rpc_1.PluginManager).toConstantValue(this.pluginManager)));
    }
    async terminate() {
        await this.pluginManager.terminate();
    }
    registerExtInterfaces(extInterfaces) {
        for (const _key in this.extRpc) {
            if (Object.hasOwnProperty.call(this.extRpc, _key)) {
                const key = _key;
                // In case of present undefineds
                if (extInterfaces[key]) {
                    this.rpc.set(this.extRpc[key], extInterfaces[key]);
                }
            }
        }
        this.rpc.set(this.extRpc.$pluginManager, this.pluginManager);
    }
    initContext(contextPath, plugin) {
        const { name, version } = plugin.rawModel;
        console.debug(this.banner, 'initializing(' + name + '@' + version + ' with ' + contextPath + ')');
        try {
            const backendInit = (0, dynamic_require_1.dynamicRequire)(contextPath);
            backendInit.doInitialization(this.apiFactory, plugin);
        }
        catch (e) {
            console.error(e);
        }
    }
    getBackendPluginPath(pluginModel) {
        return pluginModel.entryPoint.backend;
    }
    /**
     * Create the {@link PluginHost} that is required by my plugin manager ext interface to delegate
     * critical behaviour such as loading and initializing plugins to me.
     */
    createPluginHost() {
        const { extensionTestsPath } = process.env;
        const self = this;
        return {
            loadPlugin(plugin) {
                console.debug(self.banner, 'PluginManagerExtImpl/loadPlugin(' + plugin.pluginPath + ')');
                // cleaning the cache for all files of that plug-in.
                // this prevents a memory leak on plugin host restart. See for reference:
                // https://github.com/eclipse-theia/theia/pull/4931
                // https://github.com/nodejs/node/issues/8443
                (0, dynamic_require_1.removeFromCache)(mod => mod.id.startsWith(plugin.pluginFolder));
                if (plugin.pluginPath) {
                    return (0, dynamic_require_1.dynamicRequire)(plugin.pluginPath);
                }
            },
            async init(raw) {
                console.log(self.banner, 'PluginManagerExtImpl/init()');
                const result = [];
                const foreign = [];
                for (const plg of raw) {
                    try {
                        const pluginModel = plg.model;
                        const pluginLifecycle = plg.lifecycle;
                        const rawModel = await (0, plugin_manifest_loader_1.loadManifest)(pluginModel.packagePath);
                        rawModel.packagePath = pluginModel.packagePath;
                        if (pluginModel.entryPoint.frontend) {
                            foreign.push({
                                pluginPath: pluginModel.entryPoint.frontend,
                                pluginFolder: pluginModel.packagePath,
                                pluginUri: pluginModel.packageUri,
                                model: pluginModel,
                                lifecycle: pluginLifecycle,
                                rawModel,
                                isUnderDevelopment: !!plg.isUnderDevelopment
                            });
                        }
                        else {
                            // Headless and backend plugins are, for now, very similar
                            let backendInitPath = pluginLifecycle.backendInitPath;
                            // if no init path, try to init as regular Theia plugin
                            if (!backendInitPath && self.backendInitPath) {
                                backendInitPath = __dirname + self.backendInitPath;
                            }
                            const pluginPath = self.getBackendPluginPath(pluginModel);
                            const plugin = {
                                pluginPath,
                                pluginFolder: pluginModel.packagePath,
                                pluginUri: pluginModel.packageUri,
                                model: pluginModel,
                                lifecycle: pluginLifecycle,
                                rawModel,
                                isUnderDevelopment: !!plg.isUnderDevelopment
                            };
                            if (backendInitPath) {
                                self.initContext(backendInitPath, plugin);
                            }
                            else {
                                const { name, version } = plugin.rawModel;
                                console.debug(self.banner, 'initializing(' + name + '@' + version + ' without any default API)');
                            }
                            result.push(plugin);
                        }
                    }
                    catch (e) {
                        console.error(self.banner, `Failed to initialize ${plg.model.id} plugin.`, e);
                    }
                }
                return [result, foreign];
            },
            initExtApi(extApi) {
                for (const api of extApi) {
                    try {
                        self.initExtApi(api);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            },
            loadTests: extensionTestsPath ? async () => {
                // Require the test runner via node require from the provided path
                let testRunner;
                let requireError;
                try {
                    testRunner = (0, dynamic_require_1.dynamicRequire)(extensionTestsPath);
                }
                catch (error) {
                    requireError = error;
                }
                // Execute the runner if it follows our spec
                if (testRunner && typeof testRunner.run === 'function') {
                    return new Promise((resolve, reject) => {
                        testRunner.run(extensionTestsPath, (error) => {
                            if (error) {
                                reject(error.toString());
                            }
                            else {
                                resolve(undefined);
                            }
                        });
                    });
                }
                throw new Error(requireError ?
                    requireError.toString() :
                    `Path ${extensionTestsPath} does not point to a valid extension test runner.`);
            } : undefined
        };
    }
};
exports.AbstractPluginHostRPC = AbstractPluginHostRPC;
tslib_1.__decorate([
    (0, inversify_1.inject)(rpc_protocol_1.RPCProtocol),
    tslib_1.__metadata("design:type", Object)
], AbstractPluginHostRPC.prototype, "rpc", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(exports.PluginContainerModuleLoader),
    tslib_1.__metadata("design:type", Function)
], AbstractPluginHostRPC.prototype, "loadContainerModule", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_manager_1.AbstractPluginManagerExtImpl),
    tslib_1.__metadata("design:type", Object)
], AbstractPluginHostRPC.prototype, "pluginManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AbstractPluginHostRPC.prototype, "initialize", null);
exports.AbstractPluginHostRPC = AbstractPluginHostRPC = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.unmanaged)()),
    tslib_1.__param(1, (0, inversify_1.unmanaged)()),
    tslib_1.__param(2, (0, inversify_1.unmanaged)()),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object])
], AbstractPluginHostRPC);
/**
 * The RPC handler for frontend-connection-scoped plugins (Theia and VSCode plugins).
 */
let PluginHostRPC = class PluginHostRPC extends AbstractPluginHostRPC {
    constructor() {
        super('PLUGIN_HOST', '/scanners/backend-init-theia.js', {
            $pluginManager: plugin_api_rpc_1.MAIN_RPC_CONTEXT.HOSTED_PLUGIN_MANAGER_EXT,
            editorsAndDocumentsExt: plugin_api_rpc_1.MAIN_RPC_CONTEXT.EDITORS_AND_DOCUMENTS_EXT,
            workspaceExt: plugin_api_rpc_1.MAIN_RPC_CONTEXT.WORKSPACE_EXT,
            preferenceRegistryExt: plugin_api_rpc_1.MAIN_RPC_CONTEXT.PREFERENCE_REGISTRY_EXT,
            storageExt: plugin_api_rpc_1.MAIN_RPC_CONTEXT.STORAGE_EXT,
            webviewExt: plugin_api_rpc_1.MAIN_RPC_CONTEXT.WEBVIEWS_EXT,
            secretsExt: plugin_api_rpc_1.MAIN_RPC_CONTEXT.SECRETS_EXT
        });
    }
    createExtInterfaces() {
        (0, plugin_host_proxy_1.connectProxyResolver)(this.workspaceExt, this.preferenceRegistryExt);
        return {
            envExt: this.envExt,
            storageExt: this.keyValueStorageProxy,
            debugExt: this.debugExt,
            editorsAndDocumentsExt: this.editorsAndDocumentsExt,
            messageRegistryExt: this.messageRegistryExt,
            workspaceExt: this.workspaceExt,
            preferenceRegistryExt: this.preferenceRegistryExt,
            clipboardExt: this.clipboardExt,
            webviewExt: this.webviewExt,
            terminalServiceExt: this.terminalServiceExt,
            secretsExt: this.secretsExt,
            localizationExt: this.localizationExt
        };
    }
    createAPIFactory(extInterfaces) {
        const { envExt, debugExt, preferenceRegistryExt, editorsAndDocumentsExt, workspaceExt, messageRegistryExt, clipboardExt, webviewExt, localizationExt } = extInterfaces;
        return (0, plugin_context_1.createAPIFactory)(this.rpc, this.pluginManager, envExt, debugExt, preferenceRegistryExt, editorsAndDocumentsExt, workspaceExt, messageRegistryExt, clipboardExt, webviewExt, localizationExt);
    }
    initExtApi(extApi) {
        if (extApi.backendInitPath) {
            const { containerModule, provideApi } = (0, dynamic_require_1.dynamicRequire)(extApi.backendInitPath);
            if (containerModule) {
                this.loadContainerModule(containerModule);
            }
            if (provideApi) {
                provideApi(this.rpc, this.pluginManager);
            }
        }
    }
};
exports.PluginHostRPC = PluginHostRPC;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_1.EnvExtImpl),
    tslib_1.__metadata("design:type", env_1.EnvExtImpl)
], PluginHostRPC.prototype, "envExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_api_rpc_1.LocalizationExt),
    tslib_1.__metadata("design:type", localization_ext_1.LocalizationExtImpl)
], PluginHostRPC.prototype, "localizationExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_storage_1.KeyValueStorageProxy),
    tslib_1.__metadata("design:type", plugin_storage_1.KeyValueStorageProxy)
], PluginHostRPC.prototype, "keyValueStorageProxy", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(debug_ext_1.DebugExtImpl),
    tslib_1.__metadata("design:type", debug_ext_1.DebugExtImpl)
], PluginHostRPC.prototype, "debugExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(editors_and_documents_1.EditorsAndDocumentsExtImpl),
    tslib_1.__metadata("design:type", editors_and_documents_1.EditorsAndDocumentsExtImpl)
], PluginHostRPC.prototype, "editorsAndDocumentsExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_registry_1.MessageRegistryExt),
    tslib_1.__metadata("design:type", message_registry_1.MessageRegistryExt)
], PluginHostRPC.prototype, "messageRegistryExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_1.WorkspaceExtImpl),
    tslib_1.__metadata("design:type", workspace_1.WorkspaceExtImpl)
], PluginHostRPC.prototype, "workspaceExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(preference_registry_1.PreferenceRegistryExtImpl),
    tslib_1.__metadata("design:type", preference_registry_1.PreferenceRegistryExtImpl)
], PluginHostRPC.prototype, "preferenceRegistryExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(clipboard_ext_1.ClipboardExt),
    tslib_1.__metadata("design:type", clipboard_ext_1.ClipboardExt)
], PluginHostRPC.prototype, "clipboardExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(webviews_1.WebviewsExtImpl),
    tslib_1.__metadata("design:type", webviews_1.WebviewsExtImpl)
], PluginHostRPC.prototype, "webviewExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(terminal_ext_1.TerminalServiceExtImpl),
    tslib_1.__metadata("design:type", terminal_ext_1.TerminalServiceExtImpl)
], PluginHostRPC.prototype, "terminalServiceExt", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(secrets_ext_1.SecretsExtImpl),
    tslib_1.__metadata("design:type", secrets_ext_1.SecretsExtImpl)
], PluginHostRPC.prototype, "secretsExt", void 0);
exports.PluginHostRPC = PluginHostRPC = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PluginHostRPC);
//# sourceMappingURL=plugin-host-rpc.js.map