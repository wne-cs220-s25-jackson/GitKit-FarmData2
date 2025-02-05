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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookEditorsMainImpl = void 0;
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/notebook/lib/browser");
const common_1 = require("../../../common");
const notebook_open_handler_1 = require("@theia/notebook/lib/browser/notebook-open-handler");
class NotebookEditorsMainImpl {
    constructor(rpc, container) {
        this.mainThreadEditors = new Map();
        this.proxy = rpc.getProxy(common_1.MAIN_RPC_CONTEXT.NOTEBOOK_EDITORS_EXT);
        this.notebookService = container.get(browser_1.NotebookService);
        this.notebookOpenHandler = container.get(notebook_open_handler_1.NotebookOpenHandler);
    }
    async $tryShowNotebookDocument(uriComponents, viewType, options) {
        const editor = await this.notebookOpenHandler.open(uri_1.URI.fromComponents(uriComponents), {
            notebookType: viewType
        });
        await editor.ready;
        return editor.id;
    }
    $tryRevealRange(id, range, revealType) {
        throw new Error('Method not implemented.');
    }
    $trySetSelections(id, range) {
        var _a;
        if (!this.mainThreadEditors.has(id)) {
            throw new Error('Editor not found');
        }
        const editor = this.mainThreadEditors.get(id);
        (_a = editor === null || editor === void 0 ? void 0 : editor.model) === null || _a === void 0 ? void 0 : _a.setSelectedCell(editor.model.cells[range[0].start]);
    }
    async handleEditorsAdded(editors) {
        for (const editor of editors) {
            this.mainThreadEditors.set(editor.id, editor);
            const model = await editor.ready;
            model.onDidChangeSelectedCell(e => {
                const newCellIndex = e.cell ? model.cells.indexOf(e.cell) : -1;
                this.proxy.$acceptEditorPropertiesChanged(editor.id, {
                    selections: {
                        selections: newCellIndex >= 0 ? [{ start: newCellIndex, end: newCellIndex }] : []
                    }
                });
            });
        }
    }
    handleEditorsRemoved(editorIds) {
        var _a;
        for (const id of editorIds) {
            (_a = this.mainThreadEditors.get(id)) === null || _a === void 0 ? void 0 : _a.dispose();
            this.mainThreadEditors.delete(id);
        }
    }
    dispose() {
    }
}
exports.NotebookEditorsMainImpl = NotebookEditorsMainImpl;
//# sourceMappingURL=notebook-editors-main.js.map