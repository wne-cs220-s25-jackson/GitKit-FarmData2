"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
exports.NotebookTypeRegistry = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const notebook_open_handler_1 = require("./notebook-open-handler");
let NotebookTypeRegistry = class NotebookTypeRegistry {
    constructor() {
        this._notebookTypes = [];
    }
    get notebookTypes() {
        return this._notebookTypes;
    }
    registerNotebookType(type, providerName) {
        const toDispose = new core_1.DisposableCollection();
        toDispose.push(core_1.Disposable.create(() => {
            this._notebookTypes.splice(this._notebookTypes.indexOf(type), 1);
        }));
        this._notebookTypes.push(type);
        toDispose.push(this.notebookOpenHandler.registerNotebookType(type));
        toDispose.push(this.openWithService.registerHandler({
            id: type.type,
            label: type.displayName,
            providerName,
            canHandle: uri => this.notebookOpenHandler.canHandleType(uri, type),
            open: uri => this.notebookOpenHandler.open(uri, { notebookType: type.type })
        }));
        return toDispose;
    }
};
exports.NotebookTypeRegistry = NotebookTypeRegistry;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenWithService),
    tslib_1.__metadata("design:type", browser_1.OpenWithService)
], NotebookTypeRegistry.prototype, "openWithService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_open_handler_1.NotebookOpenHandler),
    tslib_1.__metadata("design:type", notebook_open_handler_1.NotebookOpenHandler)
], NotebookTypeRegistry.prototype, "notebookOpenHandler", void 0);
exports.NotebookTypeRegistry = NotebookTypeRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookTypeRegistry);
//# sourceMappingURL=notebook-type-registry.js.map