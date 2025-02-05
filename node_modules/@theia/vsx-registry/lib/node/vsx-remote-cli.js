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
exports.VsxRemoteCli = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_ext_1 = require("@theia/plugin-ext");
let VsxRemoteCli = class VsxRemoteCli {
    async enhanceArgs(context) {
        const deployedPlugins = await this.pluginDeployerHandler.getDeployedPlugins();
        // Plugin IDs can be duplicated between frontend and backend plugins, so we create a set first
        const installPluginArgs = Array.from(new Set(deployedPlugins
            .filter(plugin => plugin.type === plugin_ext_1.PluginType.User)
            .map(p => `--install-plugin=${p.metadata.model.id}`)));
        return installPluginArgs;
    }
};
exports.VsxRemoteCli = VsxRemoteCli;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_ext_1.PluginDeployerHandler),
    tslib_1.__metadata("design:type", Object)
], VsxRemoteCli.prototype, "pluginDeployerHandler", void 0);
exports.VsxRemoteCli = VsxRemoteCli = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VsxRemoteCli);
//# sourceMappingURL=vsx-remote-cli.js.map