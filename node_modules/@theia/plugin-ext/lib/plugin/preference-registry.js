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
exports.PreferenceRegistryExtImpl = exports.TheiaWorkspace = exports.PreferenceScope = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
const os_1 = require("@theia/core/lib/common/os");
const vscode_uri_1 = require("@theia/core/shared/vscode-uri");
const map_1 = require("@theia/monaco-editor-core/esm/vs/base/common/map");
const configurationModels_1 = require("@theia/monaco-editor-core/esm/vs/platform/configuration/common/configurationModels");
const workspace_1 = require("@theia/monaco-editor-core/esm/vs/platform/workspace/common/workspace");
const uuid_1 = require("@theia/core/lib/common/uuid");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const rpc_protocol_1 = require("../common/rpc-protocol");
const types_1 = require("../common/types");
const workspace_2 = require("./workspace");
const cloneDeep = require("lodash.clonedeep");
const log_1 = require("@theia/monaco-editor-core/esm/vs/platform/log/common/log");
const injectionRe = /\b__proto__\b|\bconstructor\.prototype\b/;
var ConfigurationTarget;
(function (ConfigurationTarget) {
    ConfigurationTarget[ConfigurationTarget["Global"] = 1] = "Global";
    ConfigurationTarget[ConfigurationTarget["Workspace"] = 2] = "Workspace";
    ConfigurationTarget[ConfigurationTarget["WorkspaceFolder"] = 3] = "WorkspaceFolder"; // eslint-disable-line @typescript-eslint/no-shadow
})(ConfigurationTarget || (ConfigurationTarget = {}));
var PreferenceScope;
(function (PreferenceScope) {
    PreferenceScope[PreferenceScope["Default"] = 0] = "Default";
    PreferenceScope[PreferenceScope["User"] = 1] = "User";
    PreferenceScope[PreferenceScope["Workspace"] = 2] = "Workspace";
    PreferenceScope[PreferenceScope["Folder"] = 3] = "Folder";
})(PreferenceScope || (exports.PreferenceScope = PreferenceScope = {}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lookUp(tree, key) {
    if (!key) {
        return;
    }
    const parts = key.split('.');
    let node = tree;
    for (let i = 0; node && i < parts.length; i++) {
        node = node[parts[i]];
    }
    return node;
}
class TheiaWorkspace extends workspace_1.Workspace {
    constructor(ext) {
        var _a, _b;
        const folders = ((_a = ext.workspaceFolders) !== null && _a !== void 0 ? _a : []).map(folder => new workspace_1.WorkspaceFolder(folder));
        super((0, uuid_1.generateUuid)(), folders, false, (_b = ext.workspaceFile) !== null && _b !== void 0 ? _b : null, () => os_1.isOSX || os_1.isWindows);
    }
}
exports.TheiaWorkspace = TheiaWorkspace;
const logService = {
    _serviceBrand: undefined,
    onDidChangeLogLevel: new event_1.Emitter().event,
    getLevel: function () {
        return log_1.LogLevel.Info;
    },
    setLevel: function (level) {
    },
    trace: function (message, ...args) {
    },
    debug: function (message, ...args) {
    },
    info: function (message, ...args) {
    },
    warn: function (message, ...args) {
    },
    error: function (message, ...args) {
    },
    flush: function () {
    },
    dispose: function () {
    }
};
let PreferenceRegistryExtImpl = class PreferenceRegistryExtImpl {
    constructor() {
        this._onDidChangeConfiguration = new event_1.Emitter();
        this.onDidChangeConfiguration = this._onDidChangeConfiguration.event;
        this.OVERRIDE_KEY_TEST = /^\[([^\]]+)\]\./;
    }
    initialize() {
        this.proxy = this.rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.PREFERENCE_REGISTRY_MAIN);
    }
    init(data) {
        this.preferencesChanged(data);
    }
    $acceptConfigurationChanged(data, eventData) {
        this.preferencesChanged(data, eventData);
    }
    preferencesChanged(data, eventData) {
        this._preferences = this.parse(data);
        this._onDidChangeConfiguration.fire(this.toConfigurationChangeEvent(eventData !== null && eventData !== void 0 ? eventData : []));
    }
    getConfiguration(rawSection, rawScope, extensionId) {
        const overrides = this.parseConfigurationAccessOptions(rawScope);
        const preferences = this.toReadonlyValue(this._preferences.getValue(rawSection, overrides, new TheiaWorkspace(this.workspace)));
        const configuration = {
            has(key) {
                return typeof lookUp(preferences, key) !== 'undefined';
            },
            get: (key, defaultValue) => {
                const result = lookUp(preferences, key);
                if (typeof result === 'undefined') {
                    return defaultValue;
                }
                else {
                    let clonedConfig = undefined;
                    const cloneOnWriteProxy = (target, accessor) => {
                        let clonedTarget = undefined;
                        const cloneTarget = () => {
                            clonedConfig = clonedConfig ? clonedConfig : cloneDeep(preferences);
                            clonedTarget = clonedTarget ? clonedTarget : lookUp(clonedConfig, accessor);
                        };
                        if (!(0, types_1.isObject)(target)) {
                            return target;
                        }
                        return new Proxy(target, {
                            get: (targ, prop) => {
                                const config = Object.getOwnPropertyDescriptor(targ, prop);
                                // This check ensures that https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get#invariants are satisfied
                                if ((config === null || config === void 0 ? void 0 : config.configurable) === false && (config === null || config === void 0 ? void 0 : config.writable) === false) {
                                    return targ[prop];
                                }
                                if (typeof prop === 'string' && prop.toLowerCase() === 'tojson') {
                                    cloneTarget();
                                    return () => clonedTarget;
                                }
                                if (clonedConfig) {
                                    clonedTarget = clonedTarget ? clonedTarget : lookUp(clonedConfig, accessor);
                                    return clonedTarget[prop];
                                }
                                const res = targ[prop];
                                if (typeof prop === 'string') {
                                    return cloneOnWriteProxy(res, `${accessor}.${prop}`);
                                }
                                return res;
                            },
                            set: (targ, prop, val) => {
                                cloneTarget();
                                clonedTarget[prop] = val;
                                return true;
                            },
                            deleteProperty: (targ, prop) => {
                                cloneTarget();
                                delete clonedTarget[prop];
                                return true;
                            },
                            defineProperty: (targ, prop, descr) => {
                                cloneTarget();
                                Object.defineProperty(clonedTarget, prop, descr);
                                return true;
                            }
                        });
                    };
                    return cloneOnWriteProxy(result, key);
                }
            },
            update: (key, value, targetScope, withLanguageOverride) => {
                var _a;
                const resourceStr = (_a = overrides.resource) === null || _a === void 0 ? void 0 : _a.toString();
                const overrideSegment = overrides.overrideIdentifier ? `[${overrides.overrideIdentifier}].` : '';
                const preferenceKey = rawSection ? `${rawSection}.${key}` : key;
                const fullPath = overrideSegment + preferenceKey;
                if (typeof value !== 'undefined') {
                    return this.proxy.$updateConfigurationOption(targetScope, fullPath, value, resourceStr, withLanguageOverride);
                }
                else {
                    return this.proxy.$removeConfigurationOption(targetScope, fullPath, resourceStr, withLanguageOverride);
                }
            },
            inspect: (key) => {
                var _a, _b, _c, _d;
                const path = rawSection ? `${rawSection}.${key}` : key;
                const result = this._preferences.inspect(path, overrides, new TheiaWorkspace(this.workspace));
                if (!result) {
                    return undefined;
                }
                const configInspect = { key };
                configInspect.defaultValue = cloneDeep((_a = result.default) === null || _a === void 0 ? void 0 : _a.value);
                configInspect.globalValue = cloneDeep((_b = result.user) === null || _b === void 0 ? void 0 : _b.value);
                configInspect.workspaceValue = cloneDeep((_c = result.workspace) === null || _c === void 0 ? void 0 : _c.value);
                configInspect.workspaceFolderValue = cloneDeep((_d = result.workspaceFolder) === null || _d === void 0 ? void 0 : _d.value);
                return configInspect;
            }
        };
        if (typeof preferences === 'object') {
            (0, types_1.mixin)(configuration, preferences, false);
        }
        return Object.freeze(configuration);
    }
    toReadonlyValue(data) {
        const readonlyProxy = (target) => (0, types_1.isObject)(target)
            ? new Proxy(target, {
                get: (targ, prop) => {
                    const config = Object.getOwnPropertyDescriptor(targ, prop);
                    // This check ensures that https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get#invariants are satisfied
                    if ((config === null || config === void 0 ? void 0 : config.configurable) === false && (config === null || config === void 0 ? void 0 : config.writable) === false) {
                        return targ[prop];
                    }
                    return readonlyProxy(targ[prop]);
                },
                set: (targ, prop, val) => {
                    throw new Error(`TypeError: Cannot assign to read only property '${prop}' of object`);
                },
                deleteProperty: (targ, prop) => {
                    throw new Error(`TypeError: Cannot delete read only property '${prop}' of object`);
                },
                defineProperty: (targ, prop) => {
                    throw new Error(`TypeError: Cannot define property '${prop}' of a readonly object`);
                },
                setPrototypeOf: (targ) => {
                    throw new Error('TypeError: Cannot set prototype for a readonly object');
                },
                isExtensible: () => false,
                preventExtensions: () => true
            })
            : target;
        return readonlyProxy(data);
    }
    parse(data) {
        const defaultConfiguration = this.getConfigurationModel('Default', data[PreferenceScope.Default]);
        const userConfiguration = this.getConfigurationModel('User', data[PreferenceScope.User]);
        const workspaceConfiguration = this.getConfigurationModel('Workspace', data[PreferenceScope.Workspace]);
        const folderConfigurations = new map_1.ResourceMap();
        Object.keys(data[PreferenceScope.Folder]).forEach(resource => {
            folderConfigurations.set(vscode_uri_1.URI.parse(resource), this.getConfigurationModel(`Folder: ${resource}`, data[PreferenceScope.Folder][resource]));
        });
        function createEmptyModel() {
            return new configurationModels_1.ConfigurationModel({}, [], [], undefined, logService);
        }
        return new configurationModels_1.Configuration(defaultConfiguration, createEmptyModel(), /** policy configuration. */ createEmptyModel(), /** application configuration. */ userConfiguration, createEmptyModel(), /** remote configuration. */ workspaceConfiguration, folderConfigurations, configurationModels_1.ConfigurationModel.createEmptyModel(logService), new map_1.ResourceMap(), logService);
    }
    getConfigurationModel(label, data) {
        const parser = new configurationModels_1.ConfigurationModelParser(label, logService);
        const sanitized = this.sanitize(data);
        parser.parseRaw(sanitized);
        return parser.configurationModel;
    }
    /**
     * Creates a new object and assigns those keys of raw to it that are not likely to cause prototype pollution.
     * Also preprocesses override identifiers so that they take the form [identifier]: {...contents}.
     */
    sanitize(raw) {
        if (!(0, types_1.isObject)(raw)) {
            return raw;
        }
        const asObject = raw;
        const sanitized = Object.create(null);
        for (const key of Object.keys(asObject)) {
            if (!injectionRe.test(key)) {
                const override = this.OVERRIDE_KEY_TEST.exec(key);
                if (override) {
                    const overrideKey = `[${override[1]}]`;
                    const remainder = key.slice(override[0].length);
                    if (!(0, types_1.isObject)(sanitized[overrideKey])) {
                        sanitized[overrideKey] = Object.create(null);
                    }
                    sanitized[overrideKey][remainder] = this.sanitize(asObject[key]);
                }
                else {
                    sanitized[key] = this.sanitize(asObject[key]);
                }
            }
        }
        return sanitized;
    }
    toConfigurationChangeEvent(eventData) {
        return Object.freeze({
            affectsConfiguration: (section, scope) => {
                const { resource, overrideIdentifier } = this.parseConfigurationAccessOptions(scope);
                const sectionWithLanguage = overrideIdentifier ? `[${overrideIdentifier}].${section}` : section;
                return eventData.some(change => {
                    var _a, _b;
                    const matchesUri = !resource || !change.scope || (resource.toString() + '/').startsWith(change.scope.endsWith('/') ? change.scope : change.scope + '/');
                    const sliceIndex = overrideIdentifier ? 0 : ((_b = (_a = this.OVERRIDE_KEY_TEST.exec(change.preferenceName)) === null || _a === void 0 ? void 0 : _a[0].length) !== null && _b !== void 0 ? _b : 0);
                    const changedPreferenceName = sliceIndex ? change.preferenceName.slice(sliceIndex) : change.preferenceName;
                    return matchesUri && (sectionWithLanguage === changedPreferenceName
                        || sectionWithLanguage.startsWith(`${changedPreferenceName}.`)
                        || changedPreferenceName.startsWith(`${sectionWithLanguage}.`));
                });
            }
        });
    }
    parseConfigurationAccessOptions(scope) {
        if (!scope) {
            return {};
        }
        let overrideIdentifier = undefined;
        let resource;
        if ('uri' in scope || 'languageId' in scope) {
            resource = scope.uri;
        }
        else {
            resource = scope;
        }
        if ('languageId' in scope) {
            overrideIdentifier = scope.languageId;
        }
        return { resource, overrideIdentifier };
    }
};
exports.PreferenceRegistryExtImpl = PreferenceRegistryExtImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(rpc_protocol_1.RPCProtocol),
    tslib_1.__metadata("design:type", Object)
], PreferenceRegistryExtImpl.prototype, "rpc", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_2.WorkspaceExtImpl),
    tslib_1.__metadata("design:type", workspace_2.WorkspaceExtImpl)
], PreferenceRegistryExtImpl.prototype, "workspace", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PreferenceRegistryExtImpl.prototype, "initialize", null);
exports.PreferenceRegistryExtImpl = PreferenceRegistryExtImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferenceRegistryExtImpl);
//# sourceMappingURL=preference-registry.js.map