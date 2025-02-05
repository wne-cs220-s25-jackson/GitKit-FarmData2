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
exports.PluginTheiaDeployerParticipant = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_theia_environment_1 = require("../common/plugin-theia-environment");
let PluginTheiaDeployerParticipant = class PluginTheiaDeployerParticipant {
    async onWillStart(context) {
        const pluginsDirUri = await this.environments.getPluginsDirUri();
        context.userEntries.push(pluginsDirUri.withScheme('local-dir').toString());
    }
};
exports.PluginTheiaDeployerParticipant = PluginTheiaDeployerParticipant;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_theia_environment_1.PluginTheiaEnvironment),
    tslib_1.__metadata("design:type", plugin_theia_environment_1.PluginTheiaEnvironment)
], PluginTheiaDeployerParticipant.prototype, "environments", void 0);
exports.PluginTheiaDeployerParticipant = PluginTheiaDeployerParticipant = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginTheiaDeployerParticipant);
//# sourceMappingURL=plugin-theia-deployer-participant.js.map