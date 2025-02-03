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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveMonacoUndoRedoHandler = exports.FocusedMonacoUndoRedoHandler = exports.AbstractMonacoUndoRedoHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const codeEditorService_1 = require("@theia/monaco-editor-core/esm/vs/editor/browser/services/codeEditorService");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
let AbstractMonacoUndoRedoHandler = class AbstractMonacoUndoRedoHandler {
    undo(item) {
        item.trigger('MonacoUndoRedoHandler', 'undo', undefined);
    }
    redo(item) {
        item.trigger('MonacoUndoRedoHandler', 'redo', undefined);
    }
};
exports.AbstractMonacoUndoRedoHandler = AbstractMonacoUndoRedoHandler;
exports.AbstractMonacoUndoRedoHandler = AbstractMonacoUndoRedoHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], AbstractMonacoUndoRedoHandler);
let FocusedMonacoUndoRedoHandler = class FocusedMonacoUndoRedoHandler extends AbstractMonacoUndoRedoHandler {
    constructor() {
        super(...arguments);
        this.priority = 10000;
        this.codeEditorService = standaloneServices_1.StandaloneServices.get(codeEditorService_1.ICodeEditorService);
    }
    select() {
        const focusedEditor = this.codeEditorService.getFocusedCodeEditor();
        if (focusedEditor && focusedEditor.hasTextFocus()) {
            return focusedEditor;
        }
        return undefined;
    }
};
exports.FocusedMonacoUndoRedoHandler = FocusedMonacoUndoRedoHandler;
exports.FocusedMonacoUndoRedoHandler = FocusedMonacoUndoRedoHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FocusedMonacoUndoRedoHandler);
let ActiveMonacoUndoRedoHandler = class ActiveMonacoUndoRedoHandler extends AbstractMonacoUndoRedoHandler {
    constructor() {
        super(...arguments);
        this.priority = 0;
        this.codeEditorService = standaloneServices_1.StandaloneServices.get(codeEditorService_1.ICodeEditorService);
    }
    select() {
        const focusedEditor = this.codeEditorService.getActiveCodeEditor();
        if (focusedEditor) {
            focusedEditor.focus();
            return focusedEditor;
        }
        return undefined;
    }
};
exports.ActiveMonacoUndoRedoHandler = ActiveMonacoUndoRedoHandler;
exports.ActiveMonacoUndoRedoHandler = ActiveMonacoUndoRedoHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ActiveMonacoUndoRedoHandler);
//# sourceMappingURL=monaco-undo-redo-handler.js.map