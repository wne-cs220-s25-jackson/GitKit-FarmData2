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
exports.NotebookEditor = void 0;
class NotebookEditor {
    constructor(id, 
    // private readonly _proxy: MainThreadNotebookEditorsShape,
    notebookData, visibleRanges, selections, viewColumn) {
        this.id = id;
        this.notebookData = notebookData;
        this.selections = [];
        this.visibleRanges = [];
        this.internalVisible = false;
        this.selections = selections;
        this.visibleRanges = visibleRanges;
        this.viewColumn = viewColumn;
    }
    get apiEditor() {
        if (!this.editor) {
            const that = this;
            this.editor = {
                get notebook() {
                    return that.notebookData.apiNotebook;
                },
                get selection() {
                    return that.selections[0];
                },
                set selection(selection) {
                    this.selections = [selection];
                },
                get selections() {
                    return that.selections;
                },
                set selections(value) {
                    // if (!Array.isArray(value) || !value.every(extHostTypes.NotebookRange.isNotebookRange)) {
                    //     throw illegalArgument('selections');
                    // }
                    that.selections = value;
                    that.trySetSelections(value);
                },
                get visibleRanges() {
                    return that.visibleRanges;
                },
                revealRange(range, revealType) {
                    // that._proxy.$tryRevealRange(
                    //     that.id,
                    //     extHostConverter.NotebookRange.from(range),
                    //     revealType ?? extHostTypes.NotebookEditorRevealType.Default
                    // );
                },
                get viewColumn() {
                    return that.viewColumn;
                },
            };
            NotebookEditor.apiEditorsToExtHost.set(this.editor, this);
        }
        return this.editor;
    }
    get visible() {
        return this.internalVisible;
    }
    acceptVisibility(value) {
        this.internalVisible = value;
    }
    acceptVisibleRanges(value) {
        this.visibleRanges = value;
    }
    acceptSelections(selections) {
        this.selections = selections;
    }
    trySetSelections(value) {
        // NB Unimplemented: implement "selections"
        // this._proxy.$trySetSelections(this.id, value.map(extHostConverter.NotebookRange.from));
    }
    acceptViewColumn(value) {
        this.viewColumn = value;
    }
}
exports.NotebookEditor = NotebookEditor;
NotebookEditor.apiEditorsToExtHost = new WeakMap();
//# sourceMappingURL=notebook-editor.js.map