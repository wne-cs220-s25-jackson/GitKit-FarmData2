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
exports.CustomEditorUndoRedoHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const custom_editor_widget_1 = require("./custom-editor-widget");
let CustomEditorUndoRedoHandler = class CustomEditorUndoRedoHandler {
    constructor() {
        this.priority = 190;
    }
    select() {
        const current = this.applicationShell.currentWidget;
        if (current instanceof custom_editor_widget_1.CustomEditorWidget) {
            return current;
        }
        return undefined;
    }
    undo(item) {
        item.undo();
    }
    redo(item) {
        item.redo();
    }
};
exports.CustomEditorUndoRedoHandler = CustomEditorUndoRedoHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    tslib_1.__metadata("design:type", browser_1.ApplicationShell)
], CustomEditorUndoRedoHandler.prototype, "applicationShell", void 0);
exports.CustomEditorUndoRedoHandler = CustomEditorUndoRedoHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], CustomEditorUndoRedoHandler);
//# sourceMappingURL=custom-editor-undo-redo-handler.js.map