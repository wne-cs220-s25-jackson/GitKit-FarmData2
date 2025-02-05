"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.VsxCli = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const ovsx_client_1 = require("@theia/ovsx-client");
const fs = require("fs");
let VsxCli = class VsxCli {
    constructor() {
        this.pluginsToInstall = [];
    }
    configure(conf) {
        conf.option('ovsx-router-config', { description: 'JSON configuration file for the OVSX router client', type: 'string' });
        conf.option('ovsx-rate-limit', { description: 'Limits the number of requests to OVSX per second', type: 'number', default: ovsx_client_1.OVSX_RATE_LIMIT });
        conf.option('install-plugin', {
            alias: 'install-extension',
            nargs: 1,
            desc: 'Installs or updates a plugin. Argument is a path to the *.vsix file or a plugin id of the form "publisher.name[@version]"'
        });
    }
    async setArguments(args) {
        const { 'ovsx-router-config': ovsxRouterConfig } = args;
        if (typeof ovsxRouterConfig === 'string') {
            this.ovsxRouterConfig = JSON.parse(await fs.promises.readFile(ovsxRouterConfig, 'utf8'));
        }
        let pluginsToInstall = args.installPlugin;
        if (typeof pluginsToInstall === 'string') {
            pluginsToInstall = [pluginsToInstall];
        }
        if (Array.isArray(pluginsToInstall)) {
            this.pluginsToInstall = pluginsToInstall;
        }
        const ovsxRateLimit = args.ovsxRateLimit;
        this.ovsxRateLimit = typeof ovsxRateLimit === 'number' ? ovsxRateLimit : ovsx_client_1.OVSX_RATE_LIMIT;
    }
};
exports.VsxCli = VsxCli;
exports.VsxCli = VsxCli = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], VsxCli);
//# sourceMappingURL=vsx-cli.js.map