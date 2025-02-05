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
exports.VSXEnvironmentImpl = void 0;
const tslib_1 = require("tslib");
const uri_1 = require("@theia/core/lib/common/uri");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_vscode_cli_contribution_1 = require("@theia/plugin-ext-vscode/lib/node/plugin-vscode-cli-contribution");
const vsx_cli_1 = require("./vsx-cli");
let VSXEnvironmentImpl = class VSXEnvironmentImpl {
    constructor() {
        var _a;
        this._registryUri = new uri_1.default(((_a = process.env['VSX_REGISTRY_URL']) === null || _a === void 0 ? void 0 : _a.trim()) || 'https://open-vsx.org');
    }
    async getRateLimit() {
        return this.vsxCli.ovsxRateLimit;
    }
    async getRegistryUri() {
        return this._registryUri.toString(true);
    }
    async getRegistryApiUri() {
        return this._registryUri.resolve('api').toString(true);
    }
    async getVscodeApiVersion() {
        return this.pluginVscodeCli.vsCodeApiVersionPromise;
    }
    async getOvsxRouterConfig() {
        return this.vsxCli.ovsxRouterConfig;
    }
};
exports.VSXEnvironmentImpl = VSXEnvironmentImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_vscode_cli_contribution_1.PluginVsCodeCliContribution),
    tslib_1.__metadata("design:type", plugin_vscode_cli_contribution_1.PluginVsCodeCliContribution)
], VSXEnvironmentImpl.prototype, "pluginVscodeCli", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(vsx_cli_1.VsxCli),
    tslib_1.__metadata("design:type", vsx_cli_1.VsxCli)
], VSXEnvironmentImpl.prototype, "vsxCli", void 0);
exports.VSXEnvironmentImpl = VSXEnvironmentImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VSXEnvironmentImpl);
//# sourceMappingURL=vsx-environment-impl.js.map