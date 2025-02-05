"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ViewContextKeyService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
let ViewContextKeyService = class ViewContextKeyService {
    get viewItem() {
        return this._viewItem;
    }
    get activeViewlet() {
        return this._activeViewlet;
    }
    get activePanel() {
        return this._activePanel;
    }
    get activeAuxiliary() {
        return this._activeAuxiliary;
    }
    get focusedView() {
        return this._focusedView;
    }
    init() {
        this._viewItem = this.contextKeyService.createKey('viewItem', '');
        this._activeViewlet = this.contextKeyService.createKey('activeViewlet', '');
        this._activePanel = this.contextKeyService.createKey('activePanel', '');
        this._activeAuxiliary = this.contextKeyService.createKey('activeAuxiliary', '');
        this._focusedView = this.contextKeyService.createKey('focusedView', '');
    }
    match(expression) {
        return !expression || this.contextKeyService.match(expression);
    }
};
exports.ViewContextKeyService = ViewContextKeyService;
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], ViewContextKeyService.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ViewContextKeyService.prototype, "init", null);
exports.ViewContextKeyService = ViewContextKeyService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ViewContextKeyService);
//# sourceMappingURL=view-context-key-service.js.map