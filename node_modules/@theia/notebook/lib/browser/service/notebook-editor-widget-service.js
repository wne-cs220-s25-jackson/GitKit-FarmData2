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
exports.NotebookEditorWidgetService = void 0;
const tslib_1 = require("tslib");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const notebook_editor_widget_1 = require("../notebook-editor-widget");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
const notebook_context_keys_1 = require("../contributions/notebook-context-keys");
let NotebookEditorWidgetService = class NotebookEditorWidgetService {
    constructor() {
        this.notebookEditors = new Map();
        this.onNotebookEditorAddEmitter = new core_1.Emitter();
        this.onNotebookEditorRemoveEmitter = new core_1.Emitter();
        this.onDidAddNotebookEditor = this.onNotebookEditorAddEmitter.event;
        this.onDidRemoveNotebookEditor = this.onNotebookEditorRemoveEmitter.event;
        this.onDidChangeFocusedEditorEmitter = new core_1.Emitter();
        this.onDidChangeFocusedEditor = this.onDidChangeFocusedEditorEmitter.event;
        this.onDidChangeCurrentEditorEmitter = new core_1.Emitter();
        this.onDidChangeCurrentEditor = this.onDidChangeCurrentEditorEmitter.event;
        this.focusedEditor = undefined;
        this.currentEditor = undefined;
    }
    init() {
        this.applicationShell.onDidChangeActiveWidget(event => {
            this.notebookEditorFocusChanged(event.newValue, event.newValue instanceof notebook_editor_widget_1.NotebookEditorWidget);
        });
        this.applicationShell.onDidChangeCurrentWidget(event => {
            if (event.newValue instanceof notebook_editor_widget_1.NotebookEditorWidget || event.oldValue instanceof notebook_editor_widget_1.NotebookEditorWidget) {
                this.currentNotebookEditorChanged(event.newValue);
            }
        });
    }
    // --- editor management
    addNotebookEditor(editor) {
        if (this.notebookEditors.has(editor.id)) {
            console.warn('Attempting to add duplicated notebook editor: ' + editor.id);
        }
        this.notebookEditors.set(editor.id, editor);
        this.onNotebookEditorAddEmitter.fire(editor);
        if (editor.isVisible) {
            this.notebookEditorFocusChanged(editor, true);
        }
    }
    removeNotebookEditor(editor) {
        if (this.notebookEditors.has(editor.id)) {
            this.notebookEditors.delete(editor.id);
            this.onNotebookEditorRemoveEmitter.fire(editor);
        }
        else {
            console.warn('Attempting to remove not registered editor: ' + editor.id);
        }
    }
    getNotebookEditor(editorId) {
        return this.notebookEditors.get(editorId);
    }
    getNotebookEditors() {
        return Array.from(this.notebookEditors.values());
    }
    notebookEditorFocusChanged(editor, focus) {
        if (focus) {
            if (editor !== this.focusedEditor) {
                this.focusedEditor = editor;
                this.contextKeyService.setContext(notebook_context_keys_1.NOTEBOOK_EDITOR_FOCUSED, true);
                this.onDidChangeFocusedEditorEmitter.fire(this.focusedEditor);
            }
        }
        else if (this.focusedEditor) {
            this.focusedEditor = undefined;
            this.contextKeyService.setContext(notebook_context_keys_1.NOTEBOOK_EDITOR_FOCUSED, false);
            this.onDidChangeFocusedEditorEmitter.fire(undefined);
        }
    }
    currentNotebookEditorChanged(newEditor) {
        var _a, _b;
        if (newEditor instanceof notebook_editor_widget_1.NotebookEditorWidget) {
            this.currentEditor = newEditor;
            this.onDidChangeCurrentEditorEmitter.fire(newEditor);
        }
        else if (((_a = this.currentEditor) === null || _a === void 0 ? void 0 : _a.isDisposed) || !((_b = this.currentEditor) === null || _b === void 0 ? void 0 : _b.isVisible)) {
            this.currentEditor = undefined;
            this.onDidChangeCurrentEditorEmitter.fire(undefined);
        }
    }
};
exports.NotebookEditorWidgetService = NotebookEditorWidgetService;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], NotebookEditorWidgetService.prototype, "applicationShell", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], NotebookEditorWidgetService.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NotebookEditorWidgetService.prototype, "init", null);
exports.NotebookEditorWidgetService = NotebookEditorWidgetService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookEditorWidgetService);
//# sourceMappingURL=notebook-editor-widget-service.js.map