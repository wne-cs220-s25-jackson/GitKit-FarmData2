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
exports.PluginDeployerContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_protocol_1 = require("../../common/plugin-protocol");
const core_1 = require("@theia/core");
let PluginDeployerContribution = class PluginDeployerContribution {
    initialize() {
        this.pluginDeployer.start().catch(error => this.logger.error('Initializing plugin deployer failed.', error));
        return Promise.resolve();
    }
};
exports.PluginDeployerContribution = PluginDeployerContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], PluginDeployerContribution.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_protocol_1.PluginDeployer),
    tslib_1.__metadata("design:type", Object)
], PluginDeployerContribution.prototype, "pluginDeployer", void 0);
exports.PluginDeployerContribution = PluginDeployerContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginDeployerContribution);
//# sourceMappingURL=plugin-deployer-contribution.js.map