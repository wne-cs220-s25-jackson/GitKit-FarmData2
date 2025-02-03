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
exports.TreeModelImpl = exports.TreeModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("../../common/event");
const disposable_1 = require("../../common/disposable");
const logger_1 = require("../../common/logger");
const tree_1 = require("./tree");
const tree_selection_1 = require("./tree-selection");
const tree_expansion_1 = require("./tree-expansion");
const tree_navigation_1 = require("./tree-navigation");
const tree_iterator_1 = require("./tree-iterator");
const tree_search_1 = require("./tree-search");
const tree_focus_service_1 = require("./tree-focus-service");
/**
 * The tree model.
 */
exports.TreeModel = Symbol('TreeModel');
let TreeModelImpl = class TreeModelImpl {
    constructor() {
        this.onChangedEmitter = new event_1.Emitter();
        this.onOpenNodeEmitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
    }
    init() {
        this.toDispose.push(this.tree);
        this.toDispose.push(this.tree.onChanged(() => this.fireChanged()));
        this.toDispose.push(this.selectionService);
        this.toDispose.push(this.expansionService);
        this.toDispose.push(this.expansionService.onExpansionChanged(node => {
            this.fireChanged();
            this.handleExpansion(node);
        }));
        this.toDispose.push(this.onOpenNodeEmitter);
        this.toDispose.push(this.onChangedEmitter);
        this.toDispose.push(this.treeSearch);
    }
    dispose() {
        this.toDispose.dispose();
    }
    handleExpansion(node) {
        this.selectIfAncestorOfSelected(node);
    }
    /**
     * Select the given node if it is the ancestor of a selected node.
     */
    selectIfAncestorOfSelected(node) {
        if (!node.expanded && this.selectedNodes.some(selectedNode => tree_1.CompositeTreeNode.isAncestor(node, selectedNode))) {
            if (tree_selection_1.SelectableTreeNode.isVisible(node)) {
                this.selectNode(node);
            }
        }
    }
    get root() {
        return this.tree.root;
    }
    set root(root) {
        this.tree.root = root;
    }
    get onChanged() {
        return this.onChangedEmitter.event;
    }
    get onOpenNode() {
        return this.onOpenNodeEmitter.event;
    }
    fireChanged() {
        this.onChangedEmitter.fire(undefined);
    }
    get onNodeRefreshed() {
        return this.tree.onNodeRefreshed;
    }
    getNode(id) {
        return this.tree.getNode(id);
    }
    getFocusedNode() {
        return this.focusService.focusedNode;
    }
    validateNode(node) {
        return this.tree.validateNode(node);
    }
    async refresh(parent) {
        if (parent) {
            return this.tree.refresh(parent);
        }
        return this.tree.refresh();
    }
    // tslint:disable-next-line:typedef
    get selectedNodes() {
        return this.selectionService.selectedNodes;
    }
    // tslint:disable-next-line:typedef
    get onSelectionChanged() {
        return this.selectionService.onSelectionChanged;
    }
    get onExpansionChanged() {
        return this.expansionService.onExpansionChanged;
    }
    async expandNode(raw) {
        for (const node of this.getExpansionCandidates(raw)) {
            if (tree_expansion_1.ExpandableTreeNode.is(node)) {
                return this.expansionService.expandNode(node);
            }
        }
        return undefined;
    }
    *getExpansionCandidates(raw) {
        yield raw;
        yield this.getFocusedNode();
        yield* this.selectedNodes;
    }
    async collapseNode(raw) {
        for (const node of this.getExpansionCandidates(raw)) {
            if (tree_expansion_1.ExpandableTreeNode.is(node)) {
                return this.expansionService.collapseNode(node);
            }
        }
        return false;
    }
    async collapseAll(raw) {
        const node = raw || this.getFocusedNode();
        if (tree_selection_1.SelectableTreeNode.is(node)) {
            this.selectNode(node);
        }
        if (tree_1.CompositeTreeNode.is(node)) {
            return this.expansionService.collapseAll(node);
        }
        return false;
    }
    async toggleNodeExpansion(raw) {
        for (const node of raw ? [raw] : this.selectedNodes) {
            if (tree_expansion_1.ExpandableTreeNode.is(node)) {
                await this.expansionService.toggleNodeExpansion(node);
            }
        }
    }
    selectPrev() {
        const node = this.getPrevNode();
        this.selectNodeIfSelectable(node);
    }
    selectPrevNode(type = tree_selection_1.TreeSelection.SelectionType.DEFAULT) {
        const node = this.getPrevSelectableNode();
        if (node) {
            this.addSelection({ node, type });
        }
    }
    getPrevNode(node = this.getFocusedNode()) {
        const iterator = this.createBackwardTreeIterator(node);
        return iterator && this.doGetNode(iterator);
    }
    getPrevSelectableNode(node = this.getFocusedNode()) {
        if (!node) {
            return this.getNextSelectableNode(this.root);
        }
        const iterator = this.createBackwardIterator(node);
        return iterator && this.doGetNextNode(iterator, this.isVisibleSelectableNode.bind(this));
    }
    selectNext() {
        const node = this.getNextNode();
        this.selectNodeIfSelectable(node);
    }
    selectNextNode(type = tree_selection_1.TreeSelection.SelectionType.DEFAULT) {
        const node = this.getNextSelectableNode();
        if (node) {
            this.addSelection({ node, type });
        }
    }
    getNextNode(node = this.getFocusedNode()) {
        const iterator = this.createTreeIterator(node);
        return iterator && this.doGetNode(iterator);
    }
    getNextSelectableNode(node) {
        var _a;
        if (node === void 0) { node = (_a = this.getFocusedNode()) !== null && _a !== void 0 ? _a : this.root; }
        const iterator = this.createIterator(node);
        return iterator && this.doGetNextNode(iterator, this.isVisibleSelectableNode.bind(this));
    }
    selectNodeIfSelectable(node) {
        if (tree_selection_1.SelectableTreeNode.is(node)) {
            this.addSelection(node);
        }
    }
    doGetNode(iterator) {
        iterator.next();
        const result = iterator.next();
        return result.done ? undefined : result.value;
    }
    doGetNextNode(iterator, criterion) {
        // Skip the first item. // TODO: clean this up, and skip the first item in a different way without loading everything.
        iterator.next();
        let result = iterator.next();
        while (!result.done) {
            if (criterion(result.value)) {
                return result.value;
            }
            result = iterator.next();
        }
        return undefined;
    }
    isVisibleSelectableNode(node) {
        return tree_selection_1.SelectableTreeNode.isVisible(node);
    }
    createBackwardTreeIterator(node) {
        const { filteredNodes } = this.treeSearch;
        if (filteredNodes.length === 0) {
            return node ? new tree_iterator_1.BottomUpTreeIterator(node, { pruneCollapsed: false }) : undefined;
        }
        if (node && filteredNodes.indexOf(node) === -1) {
            return undefined;
        }
        return tree_iterator_1.Iterators.cycle(filteredNodes.slice().reverse(), node);
    }
    createBackwardIterator(node) {
        const { filteredNodes } = this.treeSearch;
        if (filteredNodes.length === 0) {
            return node ? new tree_iterator_1.BottomUpTreeIterator(node, { pruneCollapsed: true }) : undefined;
        }
        if (node && filteredNodes.indexOf(node) === -1) {
            return undefined;
        }
        return tree_iterator_1.Iterators.cycle(filteredNodes.slice().reverse(), node);
    }
    createTreeIterator(node) {
        const { filteredNodes } = this.treeSearch;
        if (filteredNodes.length === 0) {
            return node && new tree_iterator_1.TopDownTreeIterator(node, { pruneCollapsed: false });
        }
        if (node && filteredNodes.indexOf(node) === -1) {
            return undefined;
        }
        return tree_iterator_1.Iterators.cycle(filteredNodes, node);
    }
    createIterator(node) {
        const { filteredNodes } = this.treeSearch;
        if (filteredNodes.length === 0) {
            return node && this.createForwardIteratorForNode(node);
        }
        if (node && filteredNodes.indexOf(node) === -1) {
            return undefined;
        }
        return tree_iterator_1.Iterators.cycle(filteredNodes, node);
    }
    createForwardIteratorForNode(node) {
        return new tree_iterator_1.TopDownTreeIterator(node, { pruneCollapsed: true });
    }
    openNode(raw) {
        const node = raw !== null && raw !== void 0 ? raw : this.focusService.focusedNode;
        if (node) {
            this.doOpenNode(node);
            this.onOpenNodeEmitter.fire(node);
        }
    }
    doOpenNode(node) {
        if (tree_expansion_1.ExpandableTreeNode.is(node)) {
            this.toggleNodeExpansion(node);
        }
    }
    selectParent() {
        const node = this.getFocusedNode();
        if (node) {
            const parent = tree_selection_1.SelectableTreeNode.getVisibleParent(node);
            if (parent) {
                this.selectNode(parent);
            }
        }
    }
    async navigateTo(nodeOrId) {
        if (nodeOrId) {
            const node = typeof nodeOrId === 'string' ? this.getNode(nodeOrId) : nodeOrId;
            if (node) {
                this.navigationService.push(node);
                await this.doNavigate(node);
                return node;
            }
        }
        return undefined;
    }
    canNavigateForward() {
        return !!this.navigationService.next;
    }
    canNavigateBackward() {
        return !!this.navigationService.prev;
    }
    async navigateForward() {
        const node = this.navigationService.advance();
        if (node) {
            await this.doNavigate(node);
        }
    }
    async navigateBackward() {
        const node = this.navigationService.retreat();
        if (node) {
            await this.doNavigate(node);
        }
    }
    async doNavigate(node) {
        this.tree.root = node;
        if (tree_expansion_1.ExpandableTreeNode.is(node)) {
            await this.expandNode(node);
        }
        if (tree_selection_1.SelectableTreeNode.is(node)) {
            this.selectNode(node);
        }
    }
    addSelection(selectionOrTreeNode) {
        this.selectionService.addSelection(selectionOrTreeNode);
    }
    clearSelection() {
        this.selectionService.clearSelection();
    }
    selectNode(node) {
        this.addSelection(node);
    }
    toggleNode(node) {
        this.addSelection({ node, type: tree_selection_1.TreeSelection.SelectionType.TOGGLE });
    }
    selectRange(node) {
        this.addSelection({ node, type: tree_selection_1.TreeSelection.SelectionType.RANGE });
    }
    storeState() {
        return {
            selection: this.selectionService.storeState()
        };
    }
    restoreState(state) {
        if (state.selection) {
            this.selectionService.restoreState(state.selection);
        }
    }
    get onDidChangeBusy() {
        return this.tree.onDidChangeBusy;
    }
    markAsBusy(node, ms, token) {
        return this.tree.markAsBusy(node, ms, token);
    }
    get onDidUpdate() {
        return this.tree.onDidUpdate;
    }
    markAsChecked(node, checked) {
        this.tree.markAsChecked(node, checked);
    }
};
exports.TreeModelImpl = TreeModelImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], TreeModelImpl.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_1.Tree),
    tslib_1.__metadata("design:type", Object)
], TreeModelImpl.prototype, "tree", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_selection_1.TreeSelectionService),
    tslib_1.__metadata("design:type", Object)
], TreeModelImpl.prototype, "selectionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_expansion_1.TreeExpansionService),
    tslib_1.__metadata("design:type", Object)
], TreeModelImpl.prototype, "expansionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_navigation_1.TreeNavigationService),
    tslib_1.__metadata("design:type", tree_navigation_1.TreeNavigationService)
], TreeModelImpl.prototype, "navigationService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_focus_service_1.TreeFocusService),
    tslib_1.__metadata("design:type", Object)
], TreeModelImpl.prototype, "focusService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_search_1.TreeSearch),
    tslib_1.__metadata("design:type", tree_search_1.TreeSearch)
], TreeModelImpl.prototype, "treeSearch", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TreeModelImpl.prototype, "init", null);
exports.TreeModelImpl = TreeModelImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeModelImpl);
//# sourceMappingURL=tree-model.js.map