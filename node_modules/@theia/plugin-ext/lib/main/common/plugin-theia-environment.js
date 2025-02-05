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
exports.PluginTheiaEnvironment = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const uri_1 = require("@theia/core/lib/common/uri");
let PluginTheiaEnvironment = class PluginTheiaEnvironment {
    async getPluginsDirUri() {
        if (!this._pluginsDirUri) {
            const configDir = new uri_1.default(await this.environments.getConfigDirUri());
            this._pluginsDirUri = configDir.resolve('plugins');
        }
        return this._pluginsDirUri;
    }
};
exports.PluginTheiaEnvironment = PluginTheiaEnvironment;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], PluginTheiaEnvironment.prototype, "environments", void 0);
exports.PluginTheiaEnvironment = PluginTheiaEnvironment = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginTheiaEnvironment);
//# sourceMappingURL=plugin-theia-environment.js.map