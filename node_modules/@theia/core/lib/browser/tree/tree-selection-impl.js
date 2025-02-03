"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.TreeSelectionServiceImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const tree_1 = require("./tree");
const common_1 = require("../../common");
const tree_selection_state_1 = require("./tree-selection-state");
const tree_selection_1 = require("./tree-selection");
const tree_focus_service_1 = require("./tree-focus-service");
let TreeSelectionServiceImpl = class TreeSelectionServiceImpl {
    constructor() {
        this.onSelectionChangedEmitter = new common_1.Emitter();
    }
    init() {
        this.state = new tree_selection_state_1.TreeSelectionState(this.tree);
    }
    dispose() {
        this.onSelectionChangedEmitter.dispose();
    }
    get selectedNodes() {
        return this.state.selection();
    }
    get onSelectionChanged() {
        return this.onSelectionChangedEmitter.event;
    }
    fireSelectionChanged() {
        this.onSelectionChangedEmitter.fire(this.state.selection());
    }
    addSelection(selectionOrTreeNode) {
        const selection = ((arg) => {
            const type = tree_selection_1.TreeSelection.SelectionType.DEFAULT;
            if (tree_selection_1.TreeSelection.is(arg)) {
                return {
                    type,
                    ...arg
                };
            }
            return {
                type,
                node: arg
            };
        })(selectionOrTreeNode);
        const node = this.validateNode(selection.node);
        if (node === undefined) {
            return;
        }
        Object.assign(selection, { node });
        const newState = this.state.nextState(selection);
        this.transiteTo(newState);
    }
    clearSelection() {
        this.transiteTo(new tree_selection_state_1.TreeSelectionState(this.tree), false);
    }
    transiteTo(newState, setFocus = true) {
        const oldNodes = this.state.selection();
        const newNodes = newState.selection();
        const toUnselect = this.difference(oldNodes, newNodes);
        const toSelect = this.difference(newNodes, oldNodes);
        this.unselect(toUnselect);
        this.select(toSelect);
        this.removeFocus(oldNodes, newNodes);
        if (setFocus) {
            this.addFocus(newState.node);
        }
        this.state = newState;
        this.fireSelectionChanged();
    }
    unselect(nodes) {
        nodes.forEach(node => node.selected = false);
    }
    select(nodes) {
        nodes.forEach(node => node.selected = true);
    }
    removeFocus(...nodes) {
        nodes.forEach(node => node.forEach(n => n.focus = false));
    }
    addFocus(node) {
        if (node) {
            node.focus = true;
        }
        this.focusService.setFocus(node);
    }
    /**
     * Returns an array of the difference of two arrays. The returned array contains all elements that are contained by
     * `left` and not contained by `right`. `right` may also contain elements not present in `left`: these are simply ignored.
     */
    difference(left, right) {
        return left.filter(item => right.indexOf(item) === -1);
    }
    /**
     * Returns a reference to the argument if the node exists in the tree. Otherwise, `undefined`.
     */
    validateNode(node) {
        const result = this.tree.validateNode(node);
        return tree_selection_1.SelectableTreeNode.is(result) ? result : undefined;
    }
    storeState() {
        return {
            selectionStack: this.state.selectionStack.map(s => ({
                focus: s.focus && s.focus.id || undefined,
                node: s.node && s.node.id || undefined,
                type: s.type
            }))
        };
    }
    restoreState(state) {
        const selectionStack = [];
        for (const selection of state.selectionStack) {
            const node = selection.node && this.tree.getNode(selection.node) || undefined;
            if (!tree_selection_1.SelectableTreeNode.is(node)) {
                break;
            }
            const focus = selection.focus && this.tree.getNode(selection.focus) || undefined;
            selectionStack.push({
                node,
                focus: tree_selection_1.SelectableTreeNode.is(focus) && focus || undefined,
                type: selection.type
            });
        }
        if (selectionStack.length) {
            this.transiteTo(new tree_selection_state_1.TreeSelectionState(this.tree, selectionStack));
        }
    }
};
exports.TreeSelectionServiceImpl = TreeSelectionServiceImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_1.Tree),
    tslib_1.__metadata("design:type", Object)
], TreeSelectionServiceImpl.prototype, "tree", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_focus_service_1.TreeFocusService),
    tslib_1.__metadata("design:type", Object)
], TreeSelectionServiceImpl.prototype, "focusService", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TreeSelectionServiceImpl.prototype, "init", null);
exports.TreeSelectionServiceImpl = TreeSelectionServiceImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeSelectionServiceImpl);
//# sourceMappingURL=tree-selection-impl.js.map