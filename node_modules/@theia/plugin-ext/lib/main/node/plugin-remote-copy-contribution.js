"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
exports.PluginRemoteCopyContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_cli_contribution_1 = require("./plugin-cli-contribution");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
let PluginRemoteCopyContribution = class PluginRemoteCopyContribution {
    async copy(registry) {
        var _a, _b;
        const localDir = this.pluginCliContribution.localDir();
        const defaultPlugins = (_b = (_a = process.env.THEIA_DEFAULT_PLUGINS) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
        await Promise.all([localDir, ...defaultPlugins]
            .filter(pluginDir => pluginDir && pluginDir.startsWith('local-dir:'))
            .map(async (pluginDir) => {
            const fsPath = file_uri_1.FileUri.fsPath(pluginDir);
            await registry.directory(fsPath, 'plugins');
        }));
    }
};
exports.PluginRemoteCopyContribution = PluginRemoteCopyContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_cli_contribution_1.PluginCliContribution),
    tslib_1.__metadata("design:type", plugin_cli_contribution_1.PluginCliContribution)
], PluginRemoteCopyContribution.prototype, "pluginCliContribution", void 0);
exports.PluginRemoteCopyContribution = PluginRemoteCopyContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginRemoteCopyContribution);
//# sourceMappingURL=plugin-remote-copy-contribution.js.map