"use strict";
// *****************************************************************************
// Copyright (C) 2015-2021 Red Hat, Inc.
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
exports.VsCodePluginScanner = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_ext_1 = require("@theia/plugin-ext");
const scanner_theia_1 = require("@theia/plugin-ext/lib/hosted/node/scanners/scanner-theia");
const environment_1 = require("@theia/core/shared/@theia/application-package/lib/environment");
const plugin_vscode_uri_1 = require("../common/plugin-vscode-uri");
const uiKind = environment_1.environment.electron.is() ? plugin_ext_1.UIKind.Desktop : plugin_ext_1.UIKind.Web;
let VsCodePluginScanner = class VsCodePluginScanner extends scanner_theia_1.TheiaPluginScanner {
    constructor() {
        super(...arguments);
        this.VSCODE_TYPE = 'vscode';
    }
    get apiType() {
        return this.VSCODE_TYPE;
    }
    getModel(plugin) {
        var _a, _b, _c, _d;
        // publisher can be empty on vscode extension development
        const publisher = (_a = plugin.publisher) !== null && _a !== void 0 ? _a : plugin_ext_1.PluginIdentifiers.UNPUBLISHED;
        // Only one entrypoint is valid in vscode extensions
        // Mimic choosing frontend (web extension) and backend (local/remote extension) as described here:
        // https://code.visualstudio.com/api/advanced-topics/extension-host#preferred-extension-location
        const entryPoint = {};
        // Act like codespaces when run in the browser (UIKind === 'web' and extensionKind is ['ui'])
        const preferFrontend = uiKind === plugin_ext_1.UIKind.Web && (((_b = plugin.extensionKind) === null || _b === void 0 ? void 0 : _b.length) === 1 && plugin.extensionKind[0] === 'ui');
        if (plugin.browser && (!plugin.main || preferFrontend)) {
            // Use frontend if available and there is no backend or frontend is preferred
            entryPoint.frontend = plugin.browser;
        }
        else {
            // Default to using backend
            entryPoint.backend = plugin.main;
        }
        if ((_c = plugin.theiaPlugin) === null || _c === void 0 ? void 0 : _c.headless) {
            // Support the Theia-specific extension for headless plugins
            entryPoint.headless = (_d = plugin.theiaPlugin) === null || _d === void 0 ? void 0 : _d.headless;
        }
        const result = {
            packagePath: plugin.packagePath,
            packageUri: this.pluginUriFactory.createUri(plugin).toString(),
            // see id definition: https://github.com/microsoft/vscode/blob/15916055fe0cb9411a5f36119b3b012458fe0a1d/src/vs/platform/extensions/common/extensions.ts#L167-L169
            id: `${publisher.toLowerCase()}.${plugin.name.toLowerCase()}`,
            name: plugin.name,
            publisher: publisher,
            version: plugin.version,
            displayName: plugin.displayName,
            description: plugin.description,
            engine: {
                type: this.VSCODE_TYPE,
                version: plugin.engines[this.VSCODE_TYPE]
            },
            entryPoint,
            iconUrl: plugin.icon && plugin_ext_1.PluginPackage.toPluginUrl(plugin, plugin.icon),
            l10n: plugin.l10n,
            readmeUrl: plugin_ext_1.PluginPackage.toPluginUrl(plugin, './README.md'),
            licenseUrl: plugin_ext_1.PluginPackage.toPluginUrl(plugin, './LICENSE')
        };
        return result;
    }
    /**
     * Maps extension dependencies to deployable extension dependencies.
     */
    getDependencies(plugin) {
        // Store the list of dependencies.
        const dependencies = new Map();
        // Iterate through the list of dependencies from `extensionDependencies` and `extensionPack`.
        for (const dependency of [plugin.extensionDependencies, plugin.extensionPack]) {
            if (dependency !== undefined) {
                // Iterate over the list of dependencies present, and add them to the collection.
                dependency.forEach((dep) => {
                    const dependencyId = dep.toLowerCase();
                    dependencies.set(dependencyId, plugin_vscode_uri_1.VSCodeExtensionUri.fromId(dependencyId).toString());
                });
            }
        }
        // Return the map of dependencies if present, else `undefined`.
        return dependencies.size > 0 ? dependencies : undefined;
    }
    getLifecycle(plugin) {
        return {
            startMethod: 'activate',
            stopMethod: 'deactivate',
            frontendModuleName: (0, plugin_ext_1.buildFrontendModuleName)(plugin),
            frontendInitPath: 'plugin-vscode-init-fe.js',
            backendInitPath: path.join(__dirname, 'plugin-vscode-init'),
        };
    }
};
exports.VsCodePluginScanner = VsCodePluginScanner;
exports.VsCodePluginScanner = VsCodePluginScanner = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VsCodePluginScanner);
//# sourceMappingURL=scanner-vscode.js.map