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
exports.NotebookOutlineContribution = exports.NotebookCellOutlineNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const notebook_editor_widget_service_1 = require("../service/notebook-editor-widget-service");
const outline_view_service_1 = require("@theia/outline-view/lib/browser/outline-view-service");
const outline_view_widget_1 = require("@theia/outline-view/lib/browser/outline-view-widget");
const core_1 = require("@theia/core");
const common_1 = require("../../common");
const notebook_service_1 = require("../service/notebook-service");
var NotebookCellOutlineNode;
(function (NotebookCellOutlineNode) {
    function is(element) {
        return browser_1.TreeNode.is(element)
            && outline_view_widget_1.OutlineSymbolInformationNode.is(element)
            && (0, core_1.isObject)(element)
            && element.uri instanceof core_1.URI
            && element.uri.scheme === common_1.CellUri.cellUriScheme;
    }
    NotebookCellOutlineNode.is = is;
})(NotebookCellOutlineNode || (exports.NotebookCellOutlineNode = NotebookCellOutlineNode = {}));
let NotebookOutlineContribution = class NotebookOutlineContribution {
    constructor() {
        this.editorListeners = new core_1.DisposableCollection();
        this.editorModelListeners = new core_1.DisposableCollection();
    }
    onStart() {
        this.notebookEditorWidgetService.onDidChangeFocusedEditor(editor => this.updateOutline(editor));
        this.outlineViewService.onDidSelect(node => this.selectCell(node));
        this.outlineViewService.onDidTapNode(node => this.selectCell(node));
    }
    async updateOutline(editor) {
        if (editor && !editor.isDisposed) {
            await editor.ready;
            this.currentEditor = editor;
            this.editorListeners.dispose();
            this.editorListeners.push(editor.onDidChangeVisibility(() => {
                if (this.currentEditor === editor && !editor.isVisible) {
                    this.outlineViewService.publish([]);
                }
            }));
            if (editor.model) {
                this.editorModelListeners.dispose();
                this.editorModelListeners.push(editor.model.onDidChangeSelectedCell(() => {
                    if (editor === this.currentEditor) {
                        this.updateOutline(editor);
                    }
                }));
                const roots = editor && editor.model && await this.createRoots(editor.model);
                this.outlineViewService.publish(roots || []);
            }
        }
    }
    async createRoots(model) {
        return model.cells.map(cell => ({
            id: cell.uri.toString(),
            iconClass: cell.cellKind === common_1.CellKind.Markup ? (0, browser_1.codicon)('markdown') : (0, browser_1.codicon)('code'),
            parent: undefined,
            children: [],
            selected: model.selectedCell === cell,
            expanded: false,
            uri: cell.uri,
        }));
    }
    selectCell(node) {
        if (NotebookCellOutlineNode.is(node)) {
            const parsed = common_1.CellUri.parse(node.uri);
            const model = parsed && this.notebookService.getNotebookEditorModel(parsed.notebook);
            const cell = model === null || model === void 0 ? void 0 : model.cells.find(c => c.handle === (parsed === null || parsed === void 0 ? void 0 : parsed.handle));
            if (model && cell) {
                model.setSelectedCell(cell);
            }
        }
    }
};
exports.NotebookOutlineContribution = NotebookOutlineContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_editor_widget_service_1.NotebookEditorWidgetService),
    tslib_1.__metadata("design:type", notebook_editor_widget_service_1.NotebookEditorWidgetService)
], NotebookOutlineContribution.prototype, "notebookEditorWidgetService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(outline_view_service_1.OutlineViewService),
    tslib_1.__metadata("design:type", outline_view_service_1.OutlineViewService)
], NotebookOutlineContribution.prototype, "outlineViewService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], NotebookOutlineContribution.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_service_1.NotebookService),
    tslib_1.__metadata("design:type", notebook_service_1.NotebookService)
], NotebookOutlineContribution.prototype, "notebookService", void 0);
exports.NotebookOutlineContribution = NotebookOutlineContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookOutlineContribution);
//# sourceMappingURL=notebook-outline-contribution.js.map