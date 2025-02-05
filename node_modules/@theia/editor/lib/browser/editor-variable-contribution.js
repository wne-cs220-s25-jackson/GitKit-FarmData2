"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.EditorVariableContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const editor_manager_1 = require("./editor-manager");
let EditorVariableContribution = class EditorVariableContribution {
    registerVariables(variables) {
        variables.registerVariable({
            name: 'lineNumber',
            description: 'The current line number in the currently opened file',
            resolve: () => {
                const editor = this.getCurrentEditor();
                return editor ? `${editor.cursor.line + 1}` : undefined;
            }
        });
        variables.registerVariable({
            name: 'selectedText',
            description: 'The current selected text in the active file',
            resolve: () => {
                const editor = this.getCurrentEditor();
                return editor === null || editor === void 0 ? void 0 : editor.document.getText(editor.selection);
            }
        });
        variables.registerVariable({
            name: 'currentText',
            description: 'The current text in the active file',
            resolve: () => {
                const editor = this.getCurrentEditor();
                return editor === null || editor === void 0 ? void 0 : editor.document.getText();
            }
        });
    }
    getCurrentEditor() {
        const currentEditor = this.editorManager.currentEditor;
        if (!currentEditor) {
            return undefined;
        }
        return currentEditor.editor;
    }
};
exports.EditorVariableContribution = EditorVariableContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(editor_manager_1.EditorManager),
    tslib_1.__metadata("design:type", editor_manager_1.EditorManager)
], EditorVariableContribution.prototype, "editorManager", void 0);
exports.EditorVariableContribution = EditorVariableContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorVariableContribution);
//# sourceMappingURL=editor-variable-contribution.js.map