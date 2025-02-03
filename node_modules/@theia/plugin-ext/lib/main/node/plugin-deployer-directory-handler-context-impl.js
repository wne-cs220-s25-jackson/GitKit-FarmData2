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
exports.PluginDeployerDirectoryHandlerContextImpl = void 0;
const path = require("path");
const fs_1 = require("fs");
class PluginDeployerDirectoryHandlerContextImpl {
    constructor(pluginDeployerEntry) {
        this.pluginDeployerEntry = pluginDeployerEntry;
    }
    async copy(origin, target) {
        const entries = await fs_1.promises.readdir(origin, { withFileTypes: true });
        await fs_1.promises.mkdir(target, { recursive: true });
        await Promise.all(entries.map(async (entry) => {
            const item = entry.name;
            const itemPath = path.resolve(origin, item);
            const targetPath = path.resolve(target, item);
            if (entry.isDirectory()) {
                return this.copy(itemPath, targetPath);
            }
            if (entry.isFile()) {
                return fs_1.promises.copyFile(itemPath, targetPath);
            }
        }));
    }
    pluginEntry() {
        return this.pluginDeployerEntry;
    }
}
exports.PluginDeployerDirectoryHandlerContextImpl = PluginDeployerDirectoryHandlerContextImpl;
//# sourceMappingURL=plugin-deployer-directory-handler-context-impl.js.map