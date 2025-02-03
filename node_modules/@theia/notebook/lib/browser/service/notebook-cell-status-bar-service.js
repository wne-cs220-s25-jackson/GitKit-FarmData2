"use strict";
// *****************************************************************************
// Copyright (C) 2024 TypeFox and others.
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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookCellStatusBarService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
let NotebookCellStatusBarService = class NotebookCellStatusBarService {
    constructor() {
        this.onDidChangeProvidersEmitter = new core_1.Emitter();
        this.onDidChangeProviders = this.onDidChangeProvidersEmitter.event;
        this.onDidChangeItemsEmitter = new core_1.Emitter();
        this.onDidChangeItems = this.onDidChangeItemsEmitter.event;
        this.providers = [];
    }
    registerCellStatusBarItemProvider(provider) {
        this.providers.push(provider);
        let changeListener;
        if (provider.onDidChangeStatusBarItems) {
            changeListener = provider.onDidChangeStatusBarItems(() => this.onDidChangeItemsEmitter.fire());
        }
        this.onDidChangeProvidersEmitter.fire();
        return core_1.Disposable.create(() => {
            changeListener === null || changeListener === void 0 ? void 0 : changeListener.dispose();
            const idx = this.providers.findIndex(p => p === provider);
            this.providers.splice(idx, 1);
        });
    }
    async getStatusBarItemsForCell(notebookUri, cellIndex, viewType, token) {
        const providers = this.providers.filter(p => p.viewType === viewType || p.viewType === '*');
        return Promise.all(providers.map(async (p) => {
            var _a;
            try {
                return (_a = await p.provideCellStatusBarItems(notebookUri, cellIndex, token)) !== null && _a !== void 0 ? _a : { items: [] };
            }
            catch (e) {
                console.error(e);
                return { items: [] };
            }
        }));
    }
    dispose() {
        this.onDidChangeItemsEmitter.dispose();
        this.onDidChangeProvidersEmitter.dispose();
    }
};
exports.NotebookCellStatusBarService = NotebookCellStatusBarService;
exports.NotebookCellStatusBarService = NotebookCellStatusBarService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookCellStatusBarService);
//# sourceMappingURL=notebook-cell-status-bar-service.js.map