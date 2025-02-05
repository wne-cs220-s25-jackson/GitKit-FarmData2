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
exports.PluginVsCodeFileHandler = exports.isVSCodePluginFile = void 0;
const tslib_1 = require("tslib");
const filenamify = require("filenamify");
const inversify_1 = require("@theia/core/shared/inversify");
const fs = require("@theia/core/shared/fs-extra");
const plugin_vscode_environment_1 = require("../common/plugin-vscode-environment");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const plugin_vscode_utils_1 = require("./plugin-vscode-utils");
const isVSCodePluginFile = (pluginPath) => Boolean(pluginPath && (pluginPath.endsWith('.vsix') || pluginPath.endsWith('.tgz')));
exports.isVSCodePluginFile = isVSCodePluginFile;
let PluginVsCodeFileHandler = class PluginVsCodeFileHandler {
    async accept(resolvedPlugin) {
        return resolvedPlugin.isFile().then(file => {
            if (!file) {
                return false;
            }
            return (0, exports.isVSCodePluginFile)(resolvedPlugin.path());
        });
    }
    async handle(context) {
        const id = this.getNormalizedExtensionId(context.pluginEntry().id());
        const extensionDeploymentDir = await (0, plugin_vscode_utils_1.unpackToDeploymentDir)(this.environment, context.pluginEntry().path(), id);
        context.pluginEntry().updatePath(extensionDeploymentDir);
        console.log(`root path: ${context.pluginEntry().rootPath}`);
        const originalPath = context.pluginEntry().originalPath();
        if (originalPath && originalPath !== extensionDeploymentDir) {
            const tempDirUri = await this.environment.getTempDirUri();
            if (originalPath.startsWith(file_uri_1.FileUri.fsPath(tempDirUri))) {
                try {
                    await fs.remove(file_uri_1.FileUri.fsPath(originalPath));
                }
                catch (e) {
                    console.error(`[${id}]: failed to remove temporary files: "${originalPath}"`, e);
                }
            }
        }
    }
    getNormalizedExtensionId(pluginId) {
        return filenamify(pluginId, { replacement: '_' }).replace(/\.vsix$/, '');
    }
};
exports.PluginVsCodeFileHandler = PluginVsCodeFileHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_vscode_environment_1.PluginVSCodeEnvironment),
    tslib_1.__metadata("design:type", plugin_vscode_environment_1.PluginVSCodeEnvironment)
], PluginVsCodeFileHandler.prototype, "environment", void 0);
exports.PluginVsCodeFileHandler = PluginVsCodeFileHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginVsCodeFileHandler);
//# sourceMappingURL=plugin-vscode-file-handler.js.map