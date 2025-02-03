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
var LocalDirectoryPluginDeployerResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDirectoryPluginDeployerResolver = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const fs = require("@theia/core/shared/fs-extra");
const path = require("path");
const local_plugin_deployer_resolver_1 = require("./local-plugin-deployer-resolver");
let LocalDirectoryPluginDeployerResolver = LocalDirectoryPluginDeployerResolver_1 = class LocalDirectoryPluginDeployerResolver extends local_plugin_deployer_resolver_1.LocalPluginDeployerResolver {
    get supportedScheme() {
        return LocalDirectoryPluginDeployerResolver_1.LOCAL_DIR;
    }
    async resolveFromLocalPath(pluginResolverContext, localPath) {
        const files = await fs.readdir(localPath);
        files.forEach(file => pluginResolverContext.addPlugin(file, path.resolve(localPath, file)));
    }
};
exports.LocalDirectoryPluginDeployerResolver = LocalDirectoryPluginDeployerResolver;
LocalDirectoryPluginDeployerResolver.LOCAL_DIR = 'local-dir';
exports.LocalDirectoryPluginDeployerResolver = LocalDirectoryPluginDeployerResolver = LocalDirectoryPluginDeployerResolver_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LocalDirectoryPluginDeployerResolver);
//# sourceMappingURL=local-directory-plugin-deployer-resolver.js.map