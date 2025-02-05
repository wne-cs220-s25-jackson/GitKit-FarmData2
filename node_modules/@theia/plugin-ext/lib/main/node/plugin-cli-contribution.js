"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
var PluginCliContribution_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginCliContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const local_directory_plugin_deployer_resolver_1 = require("./resolvers/local-directory-plugin-deployer-resolver");
let PluginCliContribution = PluginCliContribution_1 = class PluginCliContribution {
    constructor() {
        this._keepUncompressedInPlace = false;
    }
    configure(conf) {
        conf.option(PluginCliContribution_1.PLUGINS, {
            // eslint-disable-next-line max-len
            description: `Provides further refinement for the plugins. Example: --${PluginCliContribution_1.PLUGINS}=${local_directory_plugin_deployer_resolver_1.LocalDirectoryPluginDeployerResolver.LOCAL_DIR}:path/to/your/plugins`,
            type: 'string',
            nargs: 1
        });
        const maxLogSessionExample = `Example: --${PluginCliContribution_1.PLUGIN_MAX_SESSION_LOGS_FOLDERS}=5`;
        conf.option(PluginCliContribution_1.PLUGIN_MAX_SESSION_LOGS_FOLDERS, {
            description: `The maximum number of plugin logs sessions folders to retain. ${maxLogSessionExample}`,
            type: 'number',
            default: PluginCliContribution_1.DEFAULT_PLUGIN_MAX_SESSION_LOGS_FOLDERS,
            nargs: 1
        });
        conf.option(PluginCliContribution_1.UNCOMPRESSED_PLUGINS_IN_PLACE, {
            description: 'Whether user plugins that are stored on disk as uncompressed directories should be run in place or copied to temporary folder.',
            type: 'boolean',
            default: false,
        });
    }
    setArguments(args) {
        const pluginsArg = args[PluginCliContribution_1.PLUGINS];
        if (pluginsArg && String(pluginsArg).startsWith(`${local_directory_plugin_deployer_resolver_1.LocalDirectoryPluginDeployerResolver.LOCAL_DIR}:`)) {
            this._localDir = pluginsArg;
        }
        const maxSessionLogsFoldersArg = args[PluginCliContribution_1.PLUGIN_MAX_SESSION_LOGS_FOLDERS];
        if (maxSessionLogsFoldersArg && Number.isInteger(maxSessionLogsFoldersArg) && maxSessionLogsFoldersArg > 0) {
            this._maxSessionLogsFolders = maxSessionLogsFoldersArg;
        }
        this._keepUncompressedInPlace = Boolean(args[PluginCliContribution_1.UNCOMPRESSED_PLUGINS_IN_PLACE]);
    }
    localDir() {
        return this._localDir;
    }
    maxSessionLogsFolders() {
        return this._maxSessionLogsFolders;
    }
    copyUncompressedPlugins() {
        return !this._keepUncompressedInPlace;
    }
};
exports.PluginCliContribution = PluginCliContribution;
PluginCliContribution.PLUGINS = 'plugins';
PluginCliContribution.PLUGIN_MAX_SESSION_LOGS_FOLDERS = 'plugin-max-session-logs-folders';
PluginCliContribution.UNCOMPRESSED_PLUGINS_IN_PLACE = 'uncompressed-plugins-in-place';
/**
 * This is the default value used in VSCode, see:
 * - https://github.com/Microsoft/vscode/blob/613447d6b3f458ef7fee227e3876303bf5184580/src/vs/code/electron-browser/sharedProcess/contrib/logsDataCleaner.ts#L32
 */
PluginCliContribution.DEFAULT_PLUGIN_MAX_SESSION_LOGS_FOLDERS = 10;
exports.PluginCliContribution = PluginCliContribution = PluginCliContribution_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginCliContribution);
//# sourceMappingURL=plugin-cli-contribution.js.map