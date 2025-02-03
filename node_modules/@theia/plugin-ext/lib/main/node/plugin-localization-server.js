"use strict";
// *****************************************************************************
// Copyright (C) 2021 TypeFox and others.
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
exports.PluginLocalizationServer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const plugin_protocol_1 = require("../../common/plugin-protocol");
const plugin_deployer_impl_1 = require("./plugin-deployer-impl");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
const localization_server_1 = require("@theia/core/lib/node/i18n/localization-server");
let PluginLocalizationServer = class PluginLocalizationServer extends localization_server_1.LocalizationServerImpl {
    constructor() {
        super(...arguments);
        this.pluginsDeployed = new promise_util_1.Deferred();
    }
    async initialize() {
        this.pluginDeployer.onDidDeploy(() => {
            this.pluginsDeployed.resolve();
        });
        await super.initialize();
    }
    async waitForInitialization() {
        await Promise.all([
            super.waitForInitialization(),
            this.pluginsDeployed.promise,
        ]);
    }
};
exports.PluginLocalizationServer = PluginLocalizationServer;
tslib_1.__decorate([
    (0, inversify_1.inject)(plugin_protocol_1.PluginDeployer),
    tslib_1.__metadata("design:type", plugin_deployer_impl_1.PluginDeployerImpl)
], PluginLocalizationServer.prototype, "pluginDeployer", void 0);
exports.PluginLocalizationServer = PluginLocalizationServer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginLocalizationServer);
//# sourceMappingURL=plugin-localization-server.js.map