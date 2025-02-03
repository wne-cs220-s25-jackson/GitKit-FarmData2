"use strict";
// *****************************************************************************
// Copyright (C) 2018-2019 Red Hat, Inc.
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
exports.doInitialization = void 0;
const plugin_ext_1 = require("@theia/plugin-ext");
const plugin_vscode_types_1 = require("../common/plugin-vscode-types");
process.env['VSCODE_PID'] = process.env['THEIA_PARENT_PID'];
const pluginsApiImpl = new Map();
const plugins = new Array();
let defaultApi;
let isLoadOverride = false;
let pluginApiFactory;
const doInitialization = (apiFactory, plugin) => {
    pluginsApiImpl.set(plugin.model.id, createVSCodeAPI(apiFactory, plugin));
    plugins.push(plugin);
    pluginApiFactory = apiFactory;
    if (!isLoadOverride) {
        overrideInternalLoad();
        isLoadOverride = true;
    }
};
exports.doInitialization = doInitialization;
function createVSCodeAPI(apiFactory, plugin) {
    const vscode = apiFactory(plugin);
    // override the version for vscode to be a VSCode version
    vscode.version = process.env['VSCODE_API_VERSION'] || plugin_vscode_types_1.VSCODE_DEFAULT_API_VERSION;
    return vscode;
}
function overrideInternalLoad() {
    const module = require('module');
    const vscodeModuleName = 'vscode';
    // save original load method
    const internalLoad = module._load;
    // if we try to resolve theia module, return the filename entry to use cache.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    module._load = function (request, parent, isMain) {
        if (request !== vscodeModuleName) {
            return internalLoad.apply(this, arguments);
        }
        const plugin = findPlugin(parent.filename);
        if (plugin) {
            const apiImpl = pluginsApiImpl.get(plugin.model.id);
            return apiImpl;
        }
        if (!defaultApi) {
            console.warn(`Could not identify plugin for 'Theia' require call from ${parent.filename}`);
            defaultApi = createVSCodeAPI(pluginApiFactory, plugin_ext_1.emptyPlugin);
        }
        return defaultApi;
    };
}
function findPlugin(filePath) {
    return plugins.find(plugin => filePath.startsWith(plugin.pluginFolder));
}
//# sourceMappingURL=plugin-vscode-init.js.map