"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.MonacoOutlineSymbolInformationNode = exports.MonacoOutlineContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/editor/lib/browser");
const core_1 = require("@theia/core");
const outline_view_service_1 = require("@theia/outline-view/lib/browser/outline-view-service");
const outline_view_widget_1 = require("@theia/outline-view/lib/browser/outline-view-widget");
const uri_1 = require("@theia/core/lib/common/uri");
const monaco_editor_1 = require("./monaco-editor");
const debounce = require("@theia/core/shared/lodash.debounce");
const monaco = require("@theia/monaco-editor-core");
const languageFeatures_1 = require("@theia/monaco-editor-core/esm/vs/editor/common/services/languageFeatures");
const standaloneServices_1 = require("@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices");
let MonacoOutlineContribution = class MonacoOutlineContribution {
    constructor() {
        this.toDisposeOnEditor = new core_1.DisposableCollection();
        this.canUpdateOutline = true;
        this.tokenSource = new monaco.CancellationTokenSource();
    }
    onStart(app) {
        // updateOutline and handleCurrentEditorChanged need to be called even when the outline view widget is closed
        // in order to update breadcrumbs.
        standaloneServices_1.StandaloneServices.get(languageFeatures_1.ILanguageFeaturesService).documentSymbolProvider.onDidChange(debounce(() => this.updateOutline()));
        this.editorManager.onCurrentEditorChanged(debounce(() => this.handleCurrentEditorChanged(), 50));
        this.handleCurrentEditorChanged();
        this.outlineViewService.onDidSelect(async (node) => {
            if (MonacoOutlineSymbolInformationNode.is(node) && node.parent) {
                const options = {
                    mode: 'reveal',
                    selection: node.range
                };
                await this.selectInEditor(node, options);
            }
        });
        this.outlineViewService.onDidOpen(async (node) => {
            if (MonacoOutlineSymbolInformationNode.is(node)) {
                const options = {
                    selection: {
                        start: node.range.start
                    }
                };
                await this.selectInEditor(node, options);
            }
        });
    }
    async selectInEditor(node, options) {
        // Avoid cyclic updates: Outline -> Editor -> Outline.
        this.canUpdateOutline = false;
        try {
            await this.editorManager.open(node.uri, options);
        }
        finally {
            this.canUpdateOutline = true;
        }
    }
    handleCurrentEditorChanged() {
        this.toDisposeOnEditor.dispose();
        this.toDisposeOnEditor.push(core_1.Disposable.create(() => this.roots = undefined));
        const editor = this.editorManager.currentEditor;
        if (editor) {
            const model = monaco_editor_1.MonacoEditor.get(editor).getControl().getModel();
            if (model) {
                this.toDisposeOnEditor.push(model.onDidChangeContent(() => {
                    this.roots = undefined; // Invalidate the previously resolved roots.
                    this.updateOutline();
                }));
            }
            this.toDisposeOnEditor.push(editor.editor.onSelectionChanged(selection => this.updateOutline(selection)));
        }
        this.updateOutline();
    }
    async updateOutline(editorSelection) {
        if (!this.canUpdateOutline) {
            return;
        }
        this.tokenSource.cancel();
        this.tokenSource = new monaco.CancellationTokenSource();
        const token = this.tokenSource.token;
        const editor = monaco_editor_1.MonacoEditor.get(this.editorManager.currentEditor);
        const model = editor && editor.getControl().getModel();
        const roots = model && await this.createRoots(model, token, editorSelection);
        if (token.isCancellationRequested) {
            return;
        }
        this.outlineViewService.publish(roots || []);
    }
    async createRoots(model, token, editorSelection) {
        var _a;
        model = model;
        if (this.roots && this.roots.length > 0) {
            // Reset the selection on the tree nodes, so that we can apply the new ones based on the `editorSelection`.
            const resetSelection = (node) => {
                node.selected = false;
                node.children.forEach(resetSelection);
            };
            this.roots.forEach(resetSelection);
        }
        else {
            this.roots = [];
            const providers = standaloneServices_1.StandaloneServices.get(languageFeatures_1.ILanguageFeaturesService).documentSymbolProvider.all(model);
            if (token.isCancellationRequested) {
                return [];
            }
            const uri = new uri_1.default(model.uri.toString());
            for (const provider of providers) {
                try {
                    const symbols = (_a = await provider.provideDocumentSymbols(model, token)) !== null && _a !== void 0 ? _a : [];
                    if (token.isCancellationRequested) {
                        return [];
                    }
                    const nodes = this.createNodes(uri, symbols);
                    if (providers.length > 1 && provider.displayName) {
                        const providerRoot = this.createProviderRootNode(uri, provider.displayName, nodes);
                        this.roots.push(providerRoot);
                    }
                    else {
                        this.roots.push(...nodes);
                    }
                }
                catch {
                    /* collect symbols from other providers */
                }
            }
        }
        this.applySelection(this.roots, editorSelection);
        return this.roots;
    }
    createProviderRootNode(uri, displayName, children) {
        const node = {
            uri,
            id: displayName,
            name: displayName,
            iconClass: '',
            range: this.asRange(new monaco.Range(1, 1, 1, 1)),
            fullRange: this.asRange(new monaco.Range(1, 1, 1, 1)),
            children,
            parent: undefined,
            selected: false,
            expanded: true
        };
        return node;
    }
    createNodes(uri, symbols) {
        symbols = symbols;
        let rangeBased = false;
        const ids = new Map();
        const roots = [];
        const nodesByName = symbols.sort(this.orderByPosition).reduce((result, symbol) => {
            const node = this.createNode(uri, symbol, ids);
            if (symbol.children) {
                MonacoOutlineSymbolInformationNode.insert(roots, node);
            }
            else {
                rangeBased = rangeBased || symbol.range.startLineNumber !== symbol.range.endLineNumber;
                const values = result.get(symbol.name) || [];
                values.push({ symbol, node });
                result.set(symbol.name, values);
            }
            return result;
        }, new Map());
        for (const nodes of nodesByName.values()) {
            for (const { node, symbol } of nodes) {
                if (!symbol.containerName) {
                    MonacoOutlineSymbolInformationNode.insert(roots, node);
                }
                else {
                    const possibleParents = nodesByName.get(symbol.containerName);
                    if (possibleParents) {
                        const parent = possibleParents.find(possibleParent => this.parentContains(symbol, possibleParent.symbol, rangeBased));
                        if (parent) {
                            node.parent = parent.node;
                            MonacoOutlineSymbolInformationNode.insert(parent.node.children, node);
                        }
                    }
                }
            }
        }
        if (!roots.length) {
            const nodes = nodesByName.values().next().value;
            if (nodes && !nodes[0].node.parent) {
                return [nodes[0].node];
            }
            return [];
        }
        return roots;
    }
    /**
     * Sets the selection on the sub-trees based on the optional editor selection.
     * Select the narrowest node that is strictly contains the editor selection.
     */
    applySelection(roots, editorSelection) {
        if (editorSelection) {
            for (const root of roots) {
                if (this.parentContains(editorSelection, root.fullRange, true)) {
                    const { children } = root;
                    root.selected = !root.expanded || !this.applySelection(children, editorSelection);
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Returns `true` if `candidate` is strictly contained inside `parent`
     *
     * If the argument is a `DocumentSymbol`, then `getFullRange` will be used to retrieve the range of the underlying symbol.
     */
    parentContains(candidate, parent, rangeBased) {
        // TODO: move this code to the `monaco-languageclient`: https://github.com/eclipse-theia/theia/pull/2885#discussion_r217800446
        const candidateRange = browser_1.Range.is(candidate) ? candidate : this.getFullRange(candidate);
        const parentRange = browser_1.Range.is(parent) ? parent : this.getFullRange(parent);
        const sameStartLine = candidateRange.start.line === parentRange.start.line;
        const startColGreaterOrEqual = candidateRange.start.character >= parentRange.start.character;
        const startLineGreater = candidateRange.start.line > parentRange.start.line;
        const sameEndLine = candidateRange.end.line === parentRange.end.line;
        const endColSmallerOrEqual = candidateRange.end.character <= parentRange.end.character;
        const endLineSmaller = candidateRange.end.line < parentRange.end.line;
        return (((sameStartLine && startColGreaterOrEqual || startLineGreater) &&
            (sameEndLine && endColSmallerOrEqual || endLineSmaller)) || !rangeBased);
    }
    /**
     * `monaco` to LSP `Range` converter. Converts the `1-based` location indices into `0-based` ones.
     */
    asRange(range) {
        const { startLineNumber, startColumn, endLineNumber, endColumn } = range;
        return {
            start: {
                line: startLineNumber - 1,
                character: startColumn - 1
            },
            end: {
                line: endLineNumber - 1,
                character: endColumn - 1
            }
        };
    }
    /**
     * Returns with a range enclosing this symbol not including leading/trailing whitespace but everything else like comments.
     * This information is typically used to determine if the clients cursor is inside the symbol to reveal in the symbol in the UI.
     * This allows to obtain the range including the associated comments.
     *
     * See: [`DocumentSymbol#range`](https://microsoft.github.io/language-server-protocol/specification#textDocument_documentSymbol) for more details.
     */
    getFullRange(documentSymbol) {
        return this.asRange(documentSymbol.range);
    }
    /**
     * The range that should be selected and revealed when this symbol is being picked, e.g the name of a function. Must be contained by the `getSelectionRange`.
     *
     * See: [`DocumentSymbol#selectionRange`](https://microsoft.github.io/language-server-protocol/specification#textDocument_documentSymbol) for more details.
     */
    getNameRange(documentSymbol) {
        return this.asRange(documentSymbol.selectionRange);
    }
    createNode(uri, symbol, ids, parent) {
        const id = this.createId(symbol.name, ids);
        const children = [];
        const node = {
            children,
            id,
            iconClass: monaco.languages.SymbolKind[symbol.kind].toString().toLowerCase(),
            name: this.getName(symbol),
            detail: this.getDetail(symbol),
            parent,
            uri,
            range: this.getNameRange(symbol),
            fullRange: this.getFullRange(symbol),
            selected: false,
            expanded: this.shouldExpand(symbol)
        };
        if (symbol.children) {
            for (const child of symbol.children) {
                MonacoOutlineSymbolInformationNode.insert(children, this.createNode(uri, child, ids, node));
            }
        }
        return node;
    }
    getName(symbol) {
        return symbol.name;
    }
    getDetail(symbol) {
        return symbol.detail;
    }
    createId(name, ids) {
        const counter = ids.get(name);
        const index = typeof counter === 'number' ? counter + 1 : 0;
        ids.set(name, index);
        return name + '_' + index;
    }
    shouldExpand(symbol) {
        return [
            monaco.languages.SymbolKind.Class,
            monaco.languages.SymbolKind.Enum, monaco.languages.SymbolKind.File,
            monaco.languages.SymbolKind.Interface, monaco.languages.SymbolKind.Module,
            monaco.languages.SymbolKind.Namespace, monaco.languages.SymbolKind.Object,
            monaco.languages.SymbolKind.Package, monaco.languages.SymbolKind.Struct
        ].indexOf(symbol.kind) !== -1;
    }
    orderByPosition(symbol, symbol2) {
        const startLineComparison = symbol.range.startLineNumber - symbol2.range.startLineNumber;
        if (startLineComparison !== 0) {
            return startLineComparison;
        }
        const startOffsetComparison = symbol.range.startColumn - symbol2.range.startColumn;
        if (startOffsetComparison !== 0) {
            return startOffsetComparison;
        }
        const endLineComparison = symbol.range.endLineNumber - symbol2.range.endLineNumber;
        if (endLineComparison !== 0) {
            return endLineComparison;
        }
        return symbol.range.endColumn - symbol2.range.endColumn;
    }
};
exports.MonacoOutlineContribution = MonacoOutlineContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(outline_view_service_1.OutlineViewService),
    tslib_1.__metadata("design:type", outline_view_service_1.OutlineViewService)
], MonacoOutlineContribution.prototype, "outlineViewService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.EditorManager),
    tslib_1.__metadata("design:type", browser_1.EditorManager)
], MonacoOutlineContribution.prototype, "editorManager", void 0);
exports.MonacoOutlineContribution = MonacoOutlineContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MonacoOutlineContribution);
var MonacoOutlineSymbolInformationNode;
(function (MonacoOutlineSymbolInformationNode) {
    function is(node) {
        return outline_view_widget_1.OutlineSymbolInformationNode.is(node) && 'uri' in node && 'range' in node;
    }
    MonacoOutlineSymbolInformationNode.is = is;
    function insert(nodes, node) {
        const index = nodes.findIndex(current => compare(node, current) < 0);
        if (index === -1) {
            nodes.push(node);
        }
        else {
            nodes.splice(index, 0, node);
        }
    }
    MonacoOutlineSymbolInformationNode.insert = insert;
    function compare(node, node2) {
        const startLineComparison = node.range.start.line - node2.range.start.line;
        if (startLineComparison !== 0) {
            return startLineComparison;
        }
        const startColumnComparison = node.range.start.character - node2.range.start.character;
        if (startColumnComparison !== 0) {
            return startColumnComparison;
        }
        const endLineComparison = node2.range.end.line - node.range.end.line;
        if (endLineComparison !== 0) {
            return endLineComparison;
        }
        return node2.range.end.character - node.range.end.character;
    }
    MonacoOutlineSymbolInformationNode.compare = compare;
})(MonacoOutlineSymbolInformationNode || (exports.MonacoOutlineSymbolInformationNode = MonacoOutlineSymbolInformationNode = {}));
//# sourceMappingURL=monaco-outline-contribution.js.map