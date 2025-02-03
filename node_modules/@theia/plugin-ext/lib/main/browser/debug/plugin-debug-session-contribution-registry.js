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
exports.PluginDebugSessionContributionRegistry = void 0;
const tslib_1 = require("tslib");
const debug_session_contribution_1 = require("@theia/debug/lib/browser/debug-session-contribution");
const inversify_1 = require("@theia/core/shared/inversify");
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const disposable_1 = require("@theia/core/lib/common/disposable");
/**
 * Plugin debug session contribution registry implementation with functionality
 * to register / unregister plugin contributions.
 */
let PluginDebugSessionContributionRegistry = class PluginDebugSessionContributionRegistry {
    constructor() {
        this.contribs = new Map();
    }
    init() {
        for (const contrib of this.contributions.getContributions()) {
            this.contribs.set(contrib.debugType, contrib);
        }
    }
    get(debugType) {
        return this.contribs.get(debugType);
    }
    registerDebugSessionContribution(contrib) {
        const { debugType } = contrib;
        if (this.contribs.has(debugType)) {
            console.warn(`Debug session contribution already registered for ${debugType}`);
            return disposable_1.Disposable.NULL;
        }
        this.contribs.set(debugType, contrib);
        return disposable_1.Disposable.create(() => this.unregisterDebugSessionContribution(debugType));
    }
    unregisterDebugSessionContribution(debugType) {
        this.contribs.delete(debugType);
    }
};
exports.PluginDebugSessionContributionRegistry = PluginDebugSessionContributionRegistry;
tslib_1.__decorate([
    (0, inversify_1.inject)(contribution_provider_1.ContributionProvider),
    (0, inversify_1.named)(debug_session_contribution_1.DebugSessionContribution),
    tslib_1.__metadata("design:type", Object)
], PluginDebugSessionContributionRegistry.prototype, "contributions", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PluginDebugSessionContributionRegistry.prototype, "init", null);
exports.PluginDebugSessionContributionRegistry = PluginDebugSessionContributionRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginDebugSessionContributionRegistry);
//# sourceMappingURL=plugin-debug-session-contribution-registry.js.map