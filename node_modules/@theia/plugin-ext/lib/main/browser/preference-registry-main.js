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
exports.PreferenceRegistryMainImpl = exports.getPreferences = void 0;
const preferences_1 = require("@theia/core/lib/browser/preferences");
const plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
const types_impl_1 = require("../../plugin/types-impl");
const browser_1 = require("@theia/workspace/lib/browser");
const disposable_1 = require("@theia/core/lib/common/disposable");
function getPreferences(preferenceProviderProvider, rootFolders) {
    const folders = rootFolders.map(root => root.resource.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return preferences_1.PreferenceScope.getScopes().reduce((result, scope) => {
        result[scope] = {};
        const provider = preferenceProviderProvider(scope);
        if (scope === preferences_1.PreferenceScope.Folder) {
            for (const f of folders) {
                const folderPrefs = provider.getPreferences(f);
                result[scope][f] = folderPrefs;
            }
        }
        else {
            result[scope] = provider.getPreferences();
        }
        return result;
    }, {});
}
exports.getPreferences = getPreferences;
class PreferenceRegistryMainImpl {
    constructor(prc, container) {
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = prc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.PREFERENCE_REGISTRY_EXT);
        this.preferenceService = container.get(preferences_1.PreferenceService);
        const preferenceProviderProvider = container.get(preferences_1.PreferenceProviderProvider);
        const preferenceServiceImpl = container.get(preferences_1.PreferenceServiceImpl);
        const workspaceService = container.get(browser_1.WorkspaceService);
        this.toDispose.push(preferenceServiceImpl.onPreferencesChanged(changes => {
            // it HAS to be synchronous to propagate changes before update/remove response
            const roots = workspaceService.tryGetRoots();
            const data = getPreferences(preferenceProviderProvider, roots);
            const eventData = Object.values(changes).map(({ scope, newValue, domain, preferenceName }) => {
                const extScope = scope === preferences_1.PreferenceScope.User ? undefined : domain === null || domain === void 0 ? void 0 : domain[0];
                return { preferenceName, newValue, scope: extScope };
            });
            this.proxy.$acceptConfigurationChanged(data, eventData);
        }));
    }
    dispose() {
        this.toDispose.dispose();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async $updateConfigurationOption(target, key, value, resource, withLanguageOverride) {
        const scope = this.parseConfigurationTarget(target, resource);
        const effectiveKey = this.getEffectiveKey(key, scope, withLanguageOverride, resource);
        await this.preferenceService.set(effectiveKey, value, scope, resource);
    }
    async $removeConfigurationOption(target, key, resource, withLanguageOverride) {
        const scope = this.parseConfigurationTarget(target, resource);
        const effectiveKey = this.getEffectiveKey(key, scope, withLanguageOverride, resource);
        await this.preferenceService.set(effectiveKey, undefined, scope, resource);
    }
    parseConfigurationTarget(target, resource) {
        if (typeof target === 'boolean') {
            return target ? preferences_1.PreferenceScope.User : preferences_1.PreferenceScope.Workspace;
        }
        switch (target) {
            case types_impl_1.ConfigurationTarget.Global:
                return preferences_1.PreferenceScope.User;
            case types_impl_1.ConfigurationTarget.Workspace:
                return preferences_1.PreferenceScope.Workspace;
            case types_impl_1.ConfigurationTarget.WorkspaceFolder:
                return preferences_1.PreferenceScope.Folder;
            default:
                return resource ? preferences_1.PreferenceScope.Folder : preferences_1.PreferenceScope.Workspace;
        }
    }
    // If the caller does not set `withLanguageOverride = true`, we have to check whether the setting exists with that override already.
    getEffectiveKey(key, scope, withLanguageOverride, resource) {
        if (withLanguageOverride) {
            return key;
        }
        const overridden = this.preferenceService.overriddenPreferenceName(key);
        if (!overridden) {
            return key;
        }
        const value = this.preferenceService.inspectInScope(key, scope, resource, withLanguageOverride);
        return value === undefined ? overridden.preferenceName : key;
    }
}
exports.PreferenceRegistryMainImpl = PreferenceRegistryMainImpl;
//# sourceMappingURL=preference-registry-main.js.map