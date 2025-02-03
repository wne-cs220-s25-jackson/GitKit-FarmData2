"use strict";
// *****************************************************************************
// Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.LocalPluginDeployerResolver = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const fs = require("@theia/core/shared/fs-extra");
const path = require("path");
const node_1 = require("@theia/core/lib/node");
const uri_1 = require("@theia/core/lib/common/uri");
let LocalPluginDeployerResolver = class LocalPluginDeployerResolver {
    async resolve(pluginResolverContext) {
        const localPath = await this.resolveLocalPluginPath(pluginResolverContext, this.supportedScheme);
        if (localPath) {
            await this.resolveFromLocalPath(pluginResolverContext, localPath);
        }
    }
    accept(pluginId) {
        return pluginId.startsWith(this.supportedScheme);
    }
    async resolveLocalPluginPath(pluginResolverContext, expectedScheme) {
        const localUri = new uri_1.default(pluginResolverContext.getOriginId());
        if (localUri.scheme !== expectedScheme) {
            return null;
        }
        let fsPath = node_1.FileUri.fsPath(localUri);
        if (!path.isAbsolute(fsPath)) {
            fsPath = path.resolve(process.cwd(), fsPath);
        }
        if (!await fs.pathExists(fsPath)) {
            console.warn(`The local plugin referenced by ${pluginResolverContext.getOriginId()} does not exist.`);
            return null;
        }
        return fsPath;
    }
};
exports.LocalPluginDeployerResolver = LocalPluginDeployerResolver;
exports.LocalPluginDeployerResolver = LocalPluginDeployerResolver = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LocalPluginDeployerResolver);
//# sourceMappingURL=local-plugin-deployer-resolver.js.map