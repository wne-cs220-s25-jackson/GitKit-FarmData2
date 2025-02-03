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
exports.NavigatorContextKeyService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
let NavigatorContextKeyService = class NavigatorContextKeyService {
    get explorerViewletVisible() {
        return this._explorerViewletVisible;
    }
    /** True if Explorer view has keyboard focus. */
    get explorerViewletFocus() {
        return this._explorerViewletFocus;
    }
    /** True if File Explorer section has keyboard focus. */
    get filesExplorerFocus() {
        return this._filesExplorerFocus;
    }
    get explorerResourceIsFolder() {
        return this._explorerResourceIsFolder;
    }
    /**
     * True when the Explorer or editor file is a file system resource that can be handled from a file system provider.
     */
    get isFileSystemResource() {
        return this._isFileSystemResource;
    }
    init() {
        this._explorerViewletVisible = this.contextKeyService.createKey('explorerViewletVisible', false);
        this._explorerViewletFocus = this.contextKeyService.createKey('explorerViewletFocus', false);
        this._filesExplorerFocus = this.contextKeyService.createKey('filesExplorerFocus', false);
        this._explorerResourceIsFolder = this.contextKeyService.createKey('explorerResourceIsFolder', false);
        this._isFileSystemResource = this.contextKeyService.createKey('isFileSystemResource', false);
    }
};
exports.NavigatorContextKeyService = NavigatorContextKeyService;
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], NavigatorContextKeyService.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NavigatorContextKeyService.prototype, "init", null);
exports.NavigatorContextKeyService = NavigatorContextKeyService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NavigatorContextKeyService);
//# sourceMappingURL=navigator-context-key-service.js.map