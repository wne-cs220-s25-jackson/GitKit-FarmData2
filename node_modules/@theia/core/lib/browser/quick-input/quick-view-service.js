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
var QuickViewService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickViewService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const context_key_service_1 = require("../context-key-service");
const quick_access_1 = require("./quick-access");
const quick_input_service_1 = require("./quick-input-service");
let QuickViewService = QuickViewService_1 = class QuickViewService {
    constructor() {
        this.items = [];
        this.hiddenItemLabels = new Set();
    }
    registerItem(item) {
        const quickOpenItem = {
            label: item.label,
            execute: () => item.open(),
            when: item.when
        };
        this.items.push(quickOpenItem);
        this.items.sort((a, b) => a.label.localeCompare(b.label));
        return common_1.Disposable.create(() => {
            const index = this.items.indexOf(quickOpenItem);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        });
    }
    hideItem(label) {
        this.hiddenItemLabels.add(label);
    }
    showItem(label) {
        this.hiddenItemLabels.delete(label);
    }
    registerQuickAccessProvider() {
        this.quickAccessRegistry.registerQuickAccessProvider({
            getInstance: () => this,
            prefix: QuickViewService_1.PREFIX,
            placeholder: '',
            helpEntries: [{ description: 'Open View', needsEditor: false }]
        });
    }
    getPicks(filter, token) {
        const items = this.items.filter(item => (item.when === undefined || this.contextKexService.match(item.when)) &&
            (!this.hiddenItemLabels.has(item.label)));
        return (0, quick_input_service_1.filterItems)(items, filter);
    }
};
exports.QuickViewService = QuickViewService;
QuickViewService.PREFIX = 'view ';
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_access_1.QuickAccessRegistry),
    tslib_1.__metadata("design:type", Object)
], QuickViewService.prototype, "quickAccessRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], QuickViewService.prototype, "contextKexService", void 0);
exports.QuickViewService = QuickViewService = QuickViewService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], QuickViewService);
//# sourceMappingURL=quick-view-service.js.map