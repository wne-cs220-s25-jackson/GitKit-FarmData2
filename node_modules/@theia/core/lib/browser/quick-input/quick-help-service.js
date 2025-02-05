"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
var QuickHelpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickHelpService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const quick_access_1 = require("./quick-access");
const quick_input_service_1 = require("./quick-input-service");
let QuickHelpService = QuickHelpService_1 = class QuickHelpService {
    getPicks(filter, token) {
        const { editorProviders, globalProviders } = this.getQuickAccessProviders();
        const result = editorProviders.length === 0 || globalProviders.length === 0 ?
            // Without groups
            [
                ...(editorProviders.length === 0 ? globalProviders : editorProviders)
            ] :
            // With groups
            [
                { type: 'separator', label: 'global commands' },
                ...globalProviders,
                { type: 'separator', label: 'editor commands' },
                ...editorProviders
            ];
        return result;
    }
    getQuickAccessProviders() {
        const globalProviders = [];
        const editorProviders = [];
        const providers = this.quickAccessRegistry.getQuickAccessProviders();
        for (const provider of providers.sort((providerA, providerB) => providerA.prefix.localeCompare(providerB.prefix))) {
            if (provider.prefix === QuickHelpService_1.PREFIX) {
                continue; // exclude help which is already active
            }
            for (const helpEntry of provider.helpEntries) {
                const prefix = helpEntry.prefix || provider.prefix;
                const label = prefix || '\u2026' /* ... */;
                (helpEntry.needsEditor ? editorProviders : globalProviders).push({
                    label,
                    ariaLabel: `${label}, ${helpEntry.description}`,
                    description: helpEntry.description,
                    execute: () => this.quickInputService.open(prefix)
                });
            }
        }
        return { editorProviders, globalProviders };
    }
    registerQuickAccessProvider() {
        this.quickAccessRegistry.registerQuickAccessProvider({
            getInstance: () => this,
            prefix: QuickHelpService_1.PREFIX,
            placeholder: 'Type "?" to get help on the actions you can take from here.',
            helpEntries: [{ description: 'Show all Quick Access Providers', needsEditor: false }]
        });
    }
};
exports.QuickHelpService = QuickHelpService;
QuickHelpService.PREFIX = '?';
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_access_1.QuickAccessRegistry),
    tslib_1.__metadata("design:type", Object)
], QuickHelpService.prototype, "quickAccessRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_input_service_1.QuickInputService),
    tslib_1.__metadata("design:type", Object)
], QuickHelpService.prototype, "quickInputService", void 0);
exports.QuickHelpService = QuickHelpService = QuickHelpService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], QuickHelpService);
//# sourceMappingURL=quick-help-service.js.map