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
exports.NotebookStatusBarContribution = exports.NOTEBOOK_CELL_SELECTION_STATUS_BAR_ID = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const notebook_editor_widget_1 = require("../notebook-editor-widget");
const core_1 = require("@theia/core");
const notebook_actions_contribution_1 = require("./notebook-actions-contribution");
exports.NOTEBOOK_CELL_SELECTION_STATUS_BAR_ID = 'notebook-cell-selection-position';
let NotebookStatusBarContribution = class NotebookStatusBarContribution {
    canHandle(widget) {
        return widget instanceof notebook_editor_widget_1.NotebookEditorWidget;
    }
    activate(statusBar, widget) {
        widget.ready.then(model => {
            this.onDeactivate = model.onDidChangeSelectedCell(() => {
                this.updateStatusbar(statusBar, widget);
            });
        });
        this.updateStatusbar(statusBar, widget);
    }
    deactivate(statusBar) {
        var _a;
        (_a = this.onDeactivate) === null || _a === void 0 ? void 0 : _a.dispose();
        this.updateStatusbar(statusBar);
    }
    async updateStatusbar(statusBar, editor) {
        const model = await (editor === null || editor === void 0 ? void 0 : editor.ready);
        if (!model || model.cells.length === 0 || !model.selectedCell) {
            statusBar.removeElement(exports.NOTEBOOK_CELL_SELECTION_STATUS_BAR_ID);
            return;
        }
        const selectedCellIndex = model.cells.indexOf(model.selectedCell) + 1;
        statusBar.setElement(exports.NOTEBOOK_CELL_SELECTION_STATUS_BAR_ID, {
            text: core_1.nls.localizeByDefault('Cell {0} of {1}', selectedCellIndex, model.cells.length),
            alignment: browser_1.StatusBarAlignment.RIGHT,
            priority: 100,
            command: notebook_actions_contribution_1.NotebookCommands.CENTER_ACTIVE_CELL.id,
            arguments: [editor]
        });
    }
};
exports.NotebookStatusBarContribution = NotebookStatusBarContribution;
exports.NotebookStatusBarContribution = NotebookStatusBarContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookStatusBarContribution);
//# sourceMappingURL=notebook-status-bar-contribution.js.map