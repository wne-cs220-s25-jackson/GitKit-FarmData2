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
var LocalVSIXFilePluginDeployerResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalVSIXFilePluginDeployerResolver = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const inversify_1 = require("@theia/core/shared/inversify");
const local_plugin_deployer_resolver_1 = require("@theia/plugin-ext/lib/main/node/resolvers/local-plugin-deployer-resolver");
const plugin_vscode_environment_1 = require("../common/plugin-vscode-environment");
const plugin_vscode_file_handler_1 = require("./plugin-vscode-file-handler");
const plugin_vscode_utils_1 = require("./plugin-vscode-utils");
let LocalVSIXFilePluginDeployerResolver = LocalVSIXFilePluginDeployerResolver_1 = class LocalVSIXFilePluginDeployerResolver extends local_plugin_deployer_resolver_1.LocalPluginDeployerResolver {
    get supportedScheme() {
        return LocalVSIXFilePluginDeployerResolver_1.LOCAL_FILE;
    }
    accept(pluginId) {
        return super.accept(pluginId) && (0, plugin_vscode_file_handler_1.isVSCodePluginFile)(pluginId);
    }
    async resolveFromLocalPath(pluginResolverContext, localPath) {
        const extensionId = path.basename(localPath, LocalVSIXFilePluginDeployerResolver_1.FILE_EXTENSION);
        if (await (0, plugin_vscode_utils_1.existsInDeploymentDir)(this.environment, extensionId)) {
            console.log(`[${pluginResolverContext.getOriginId()}]: Target dir already exists in plugin deployment dir`);
            return;
        }
        const extensionDeploymentDir = await (0, plugin_vscode_utils_1.unpackToDeploymentDir)(this.environment, localPath, extensionId);
        pluginResolverContext.addPlugin(extensionId, extensionDeploymentDir);
    }
};
exports.LocalVSIXFilePluginDeployerResolver = LocalVSIXFilePluginDeployerResolver;
LocalVSIXFilePluginDeployerResolver.LOCAL_FILE = 'local-file';
LocalVSIXFilePluginDeployerResolver.FILE_EXTENSION = '.vsix';
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_vscode_environment_1.PluginVSCodeEnvironment),
    tslib_1.__metadata("design:type", plugin_vscode_environment_1.PluginVSCodeEnvironment)
], LocalVSIXFilePluginDeployerResolver.prototype, "environment", void 0);
exports.LocalVSIXFilePluginDeployerResolver = LocalVSIXFilePluginDeployerResolver = LocalVSIXFilePluginDeployerResolver_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LocalVSIXFilePluginDeployerResolver);
//# sourceMappingURL=local-vsix-file-plugin-deployer-resolver.js.map