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
exports.NotebookMarkdownCellRenderer = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const markdown_renderer_1 = require("@theia/core/lib/browser/markdown-rendering/markdown-renderer");
const markdown_string_1 = require("@theia/core/lib/common/markdown-rendering/markdown-string");
const notebook_cell_list_view_1 = require("./notebook-cell-list-view");
const notebook_cell_editor_1 = require("./notebook-cell-editor");
const inversify_1 = require("@theia/core/shared/inversify");
const monaco_editor_1 = require("@theia/monaco/lib/browser/monaco-editor");
const core_1 = require("@theia/core");
const notebook_context_manager_1 = require("../service/notebook-context-manager");
const notebook_options_1 = require("../service/notebook-options");
const notebook_code_cell_view_1 = require("./notebook-code-cell-view");
const mark = require("advanced-mark.js");
const notebook_cell_editor_service_1 = require("../service/notebook-cell-editor-service");
const notebook_cell_status_bar_service_1 = require("../service/notebook-cell-status-bar-service");
const label_parser_1 = require("@theia/core/lib/browser/label-parser");
let NotebookMarkdownCellRenderer = class NotebookMarkdownCellRenderer {
    render(notebookModel, cell) {
        return React.createElement(MarkdownCell, { markdownRenderer: this.markdownRenderer, commandRegistry: this.commandRegistry, monacoServices: this.monacoServices, notebookOptionsService: this.notebookOptionsService, cell: cell, notebookModel: notebookModel, notebookContextManager: this.notebookContextManager, notebookCellEditorService: this.notebookCellEditorService, notebookCellStatusBarService: this.notebookCellStatusBarService, labelParser: this.labelParser });
    }
    renderSidebar(notebookModel, cell) {
        return React.createElement("div", { className: 'theia-notebook-markdown-sidebar' });
    }
    renderDragImage(cell) {
        var _a;
        const dragImage = document.createElement('div');
        dragImage.style.width = ((_a = this.notebookContextManager.context) === null || _a === void 0 ? void 0 : _a.clientWidth) + 'px';
        const markdownString = new markdown_string_1.MarkdownStringImpl(cell.source, { supportHtml: true, isTrusted: true });
        const markdownElement = this.markdownRenderer.render(markdownString).element;
        dragImage.appendChild(markdownElement);
        return dragImage;
    }
};
exports.NotebookMarkdownCellRenderer = NotebookMarkdownCellRenderer;
tslib_1.__decorate([
    (0, inversify_1.inject)(markdown_renderer_1.MarkdownRenderer),
    tslib_1.__metadata("design:type", Object)
], NotebookMarkdownCellRenderer.prototype, "markdownRenderer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(monaco_editor_1.MonacoEditorServices),
    tslib_1.__metadata("design:type", monaco_editor_1.MonacoEditorServices)
], NotebookMarkdownCellRenderer.prototype, "monacoServices", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_context_manager_1.NotebookContextManager),
    tslib_1.__metadata("design:type", notebook_context_manager_1.NotebookContextManager)
], NotebookMarkdownCellRenderer.prototype, "notebookContextManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.CommandRegistry),
    tslib_1.__metadata("design:type", core_1.CommandRegistry)
], NotebookMarkdownCellRenderer.prototype, "commandRegistry", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_options_1.NotebookOptionsService),
    tslib_1.__metadata("design:type", notebook_options_1.NotebookOptionsService)
], NotebookMarkdownCellRenderer.prototype, "notebookOptionsService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_cell_editor_service_1.NotebookCellEditorService),
    tslib_1.__metadata("design:type", notebook_cell_editor_service_1.NotebookCellEditorService)
], NotebookMarkdownCellRenderer.prototype, "notebookCellEditorService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(notebook_cell_status_bar_service_1.NotebookCellStatusBarService),
    tslib_1.__metadata("design:type", notebook_cell_status_bar_service_1.NotebookCellStatusBarService)
], NotebookMarkdownCellRenderer.prototype, "notebookCellStatusBarService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(label_parser_1.LabelParser),
    tslib_1.__metadata("design:type", label_parser_1.LabelParser)
], NotebookMarkdownCellRenderer.prototype, "labelParser", void 0);
exports.NotebookMarkdownCellRenderer = NotebookMarkdownCellRenderer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], NotebookMarkdownCellRenderer);
function MarkdownCell({ markdownRenderer, monacoServices, cell, notebookModel, notebookContextManager, notebookOptionsService, commandRegistry, notebookCellEditorService, notebookCellStatusBarService, labelParser }) {
    const [editMode, setEditMode] = React.useState(cell.editing);
    let empty = false;
    React.useEffect(() => {
        const listener = cell.onDidRequestCellEditChange(cellEdit => setEditMode(cellEdit));
        return () => listener.dispose();
    }, [editMode]);
    React.useEffect(() => {
        if (!editMode) {
            const instance = new mark(markdownContent);
            cell.onMarkdownFind = options => {
                instance.unmark();
                if (empty) {
                    return [];
                }
                return searchInMarkdown(instance, options);
            };
            return () => {
                cell.onMarkdownFind = undefined;
                instance.unmark();
            };
        }
    }, [editMode, cell.source]);
    let markdownContent = React.useMemo(() => {
        const markdownString = new markdown_string_1.MarkdownStringImpl(cell.source, { supportHtml: true, isTrusted: true });
        const rendered = markdownRenderer.render(markdownString).element;
        const children = [];
        rendered.childNodes.forEach(child => {
            if (child instanceof HTMLElement) {
                children.push(child);
            }
        });
        return children;
    }, [cell.source]);
    if (markdownContent.length === 0) {
        const italic = document.createElement('i');
        italic.className = 'theia-notebook-empty-markdown';
        italic.innerText = core_1.nls.localizeByDefault('Empty markdown cell, double-click or press enter to edit.');
        italic.style.pointerEvents = 'none';
        markdownContent = [italic];
        empty = true;
    }
    return editMode ?
        (React.createElement("div", { className: 'theia-notebook-markdown-editor-container', key: "code", ref: ref => (0, notebook_cell_list_view_1.observeCellHeight)(ref, cell) },
            React.createElement(notebook_cell_editor_1.CellEditor, { notebookModel: notebookModel, cell: cell, monacoServices: monacoServices, notebookContextManager: notebookContextManager, notebookCellEditorService: notebookCellEditorService, fontInfo: notebookOptionsService.editorFontInfo }),
            React.createElement(notebook_code_cell_view_1.NotebookCodeCellStatus, { cell: cell, notebook: notebookModel, commandRegistry: commandRegistry, cellStatusBarService: notebookCellStatusBarService, labelParser: labelParser, onClick: () => cell.requestFocusEditor() }))) :
        (React.createElement("div", { className: 'theia-notebook-markdown-content', key: "markdown", onDoubleClick: () => cell.requestEdit(), ref: node => {
                node === null || node === void 0 ? void 0 : node.replaceChildren(...markdownContent);
                (0, notebook_cell_list_view_1.observeCellHeight)(node, cell);
            } }));
}
function searchInMarkdown(instance, options) {
    const matches = [];
    const markOptions = {
        className: 'theia-find-match',
        diacritics: false,
        caseSensitive: options.matchCase,
        acrossElements: true,
        separateWordSearch: false,
        each: node => {
            matches.push(new MarkdownEditorFindMatch(node));
        }
    };
    if (options.regex || options.wholeWord) {
        let search = options.search;
        if (options.wholeWord) {
            if (!options.regex) {
                search = escapeRegExp(search);
            }
            search = '\\b' + search + '\\b';
        }
        instance.markRegExp(new RegExp(search, options.matchCase ? '' : 'i'), markOptions);
    }
    else {
        instance.mark(options.search, markOptions);
    }
    return matches;
}
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
class MarkdownEditorFindMatch {
    constructor(node) {
        this.node = node;
        this._selected = false;
    }
    get selected() {
        return this._selected;
    }
    set selected(selected) {
        this._selected = selected;
        const className = 'theia-find-match-selected';
        if (this.node instanceof HTMLElement) {
            if (selected) {
                this.node.classList.add(className);
            }
            else {
                this.node.classList.remove(className);
            }
        }
    }
    show() {
        if (this.node instanceof HTMLElement) {
            this.node.scrollIntoView({
                behavior: 'instant',
                block: 'center'
            });
        }
    }
}
//# sourceMappingURL=notebook-markdown-cell-view.js.map