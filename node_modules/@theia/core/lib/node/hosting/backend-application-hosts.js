"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.BackendApplicationHosts = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
/**
 * **Important: This component is not bound on Electron.**
 *
 * Component handling the different hosts the Theia backend should be reachable at.
 *
 * Hosts should be set through the `THEIA_HOSTS` environment variable as a comma-separated list of hosts.
 *
 * If you do not set this variable, we'll consider that we don't know where the application is hosted at.
 */
let BackendApplicationHosts = class BackendApplicationHosts {
    constructor() {
        this._hosts = new Set();
    }
    /**
     * Set of domains that the application is supposed to be reachable at.
     * If the set is empty it means that we don't know where we are hosted.
     * You can check for this with `.hasKnownHosts()`.
     */
    get hosts() {
        return this._hosts;
    }
    init() {
        const theiaHostsEnv = process.env['THEIA_HOSTS'];
        if (theiaHostsEnv) {
            theiaHostsEnv.split(',').forEach(host => {
                const trimmed = host.trim();
                if (trimmed.length > 0) {
                    this._hosts.add(trimmed);
                }
            });
        }
    }
    /**
     * Do we know where we are hosted?
     */
    hasKnownHosts() {
        return this._hosts.size > 0;
    }
};
exports.BackendApplicationHosts = BackendApplicationHosts;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BackendApplicationHosts.prototype, "init", null);
exports.BackendApplicationHosts = BackendApplicationHosts = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], BackendApplicationHosts);
//# sourceMappingURL=backend-application-hosts.js.map