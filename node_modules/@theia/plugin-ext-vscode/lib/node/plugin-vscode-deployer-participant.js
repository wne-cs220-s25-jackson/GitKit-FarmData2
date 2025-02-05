"use strict";
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
exports.PluginVSCodeDeployerParticipant = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const fs = require("@theia/core/shared/fs-extra");
const node_1 = require("@theia/core/lib/node");
const plugin_vscode_environment_1 = require("../common/plugin-vscode-environment");
const local_vsix_file_plugin_deployer_resolver_1 = require("./local-vsix-file-plugin-deployer-resolver");
let PluginVSCodeDeployerParticipant = class PluginVSCodeDeployerParticipant {
    async onWillStart(context) {
        const extensionDeploymentDirUri = await this.environments.getDeploymentDirUri();
        context.userEntries.push(extensionDeploymentDirUri.withScheme('local-dir').toString());
        const userExtensionDirUri = await this.environments.getUserExtensionsDirUri();
        const userExtensionDirPath = node_1.FileUri.fsPath(userExtensionDirUri);
        if (await fs.pathExists(userExtensionDirPath)) {
            const files = await fs.readdir(userExtensionDirPath);
            for (const file of files) {
                if (file.endsWith(local_vsix_file_plugin_deployer_resolver_1.LocalVSIXFilePluginDeployerResolver.FILE_EXTENSION)) {
                    const extensionUri = userExtensionDirUri.resolve(file).withScheme('local-file').toString();
                    console.log(`found drop-in extension "${extensionUri}"`);
                    context.userEntries.push(extensionUri);
                }
            }
        }
    }
};
exports.PluginVSCodeDeployerParticipant = PluginVSCodeDeployerParticipant;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_vscode_environment_1.PluginVSCodeEnvironment),
    tslib_1.__metadata("design:type", plugin_vscode_environment_1.PluginVSCodeEnvironment)
], PluginVSCodeDeployerParticipant.prototype, "environments", void 0);
exports.PluginVSCodeDeployerParticipant = PluginVSCodeDeployerParticipant = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginVSCodeDeployerParticipant);
//# sourceMappingURL=plugin-vscode-deployer-participant.js.map