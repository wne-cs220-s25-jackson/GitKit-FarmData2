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
exports.PluginVSCodeEnvironment = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const uri_1 = require("@theia/core/lib/common/uri");
let PluginVSCodeEnvironment = class PluginVSCodeEnvironment {
    async getUserExtensionsDirUri() {
        if (!this._userExtensionsDirUri) {
            const configDir = new uri_1.default(await this.environments.getConfigDirUri());
            this._userExtensionsDirUri = configDir.resolve('extensions');
        }
        return this._userExtensionsDirUri;
    }
    async getDeploymentDirUri() {
        if (!this._deployedPluginsUri) {
            const configDir = new uri_1.default(await this.environments.getConfigDirUri());
            this._deployedPluginsUri = configDir.resolve('deployedPlugins');
        }
        return this._deployedPluginsUri;
    }
    async getTempDirUri(prefix) {
        if (!this._tmpDirUri) {
            const configDir = new uri_1.default(await this.environments.getConfigDirUri());
            this._tmpDirUri = configDir.resolve('tmp');
        }
        if (prefix) {
            return this._tmpDirUri.resolve(prefix);
        }
        return this._tmpDirUri;
    }
};
exports.PluginVSCodeEnvironment = PluginVSCodeEnvironment;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], PluginVSCodeEnvironment.prototype, "environments", void 0);
exports.PluginVSCodeEnvironment = PluginVSCodeEnvironment = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginVSCodeEnvironment);
//# sourceMappingURL=plugin-vscode-environment.js.map