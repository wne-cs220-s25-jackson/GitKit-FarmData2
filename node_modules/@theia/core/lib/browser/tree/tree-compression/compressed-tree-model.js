"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.CompressedTreeModel = exports.TopDownCompressedTreeIterator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const tree_compression_service_1 = require("./tree-compression-service");
const tree_1 = require("../tree");
const tree_model_1 = require("../tree-model");
const tree_selection_1 = require("../tree-selection");
const tree_expansion_1 = require("../tree-expansion");
const tree_iterator_1 = require("../tree-iterator");
class TopDownCompressedTreeIterator extends tree_iterator_1.TopDownTreeIterator {
    isCollapsed(candidate) {
        return tree_expansion_1.ExpandableTreeNode.isCollapsed(candidate) && !tree_compression_service_1.TreeCompressionService.prototype.isCompressionParent(candidate);
    }
}
exports.TopDownCompressedTreeIterator = TopDownCompressedTreeIterator;
var BackOrForward;
(function (BackOrForward) {
    BackOrForward[BackOrForward["Forward"] = 0] = "Forward";
    BackOrForward[BackOrForward["Backward"] = 1] = "Backward";
})(BackOrForward || (BackOrForward = {}));
let CompressedTreeModel = class CompressedTreeModel extends tree_model_1.TreeModelImpl {
    selectAdjacentRow(direction, type = tree_selection_1.TreeSelection.SelectionType.DEFAULT, startingPoint = this.getFocusedNode()) {
        var _a, _b;
        if (!startingPoint && this.root) {
            this.selectAdjacentRow(BackOrForward.Forward, type, this.root);
        }
        if (this.compressionService.isCompressionParticipant(startingPoint)) {
            const chain = this.compressionService.getCompressionChain(startingPoint);
            startingPoint = (_a = (direction === BackOrForward.Backward ? chain === null || chain === void 0 ? void 0 : chain.head() : chain === null || chain === void 0 ? void 0 : chain.tail())) !== null && _a !== void 0 ? _a : startingPoint;
        }
        const iterator = direction === BackOrForward.Backward ? this.createBackwardIterator(startingPoint) : this.createIterator(startingPoint);
        const test = (candidate) => tree_selection_1.SelectableTreeNode.isVisible(candidate)
            && (this.compressionService.isCompressionHead(candidate) || !this.compressionService.isCompressionParticipant(candidate));
        const rowRoot = iterator && this.doGetNextNode(iterator, test);
        const nodes = ((_b = this.compressionService.getCompressionChain(rowRoot)) !== null && _b !== void 0 ? _b : [rowRoot]).reverse();
        const node = nodes.find(tree_selection_1.SelectableTreeNode.is);
        if (node) {
            this.addSelection({ node, type });
        }
    }
    selectPrevRow(type) {
        this.selectAdjacentRow(BackOrForward.Backward, type);
    }
    selectNextRow(type) {
        this.selectAdjacentRow(BackOrForward.Forward, type);
    }
    createForwardIteratorForNode(node) {
        return new TopDownCompressedTreeIterator(node, { pruneCollapsed: true });
    }
    selectIfAncestorOfSelected(node) {
        var _a, _b;
        if (!this.compressionToggle.compress) {
            return super.selectIfAncestorOfSelected(node);
        }
        const tail = (_b = (_a = this.compressionService.getCompressionChain(node)) === null || _a === void 0 ? void 0 : _a.tail()) !== null && _b !== void 0 ? _b : node;
        if (tree_selection_1.SelectableTreeNode.is(tail) && !tail.expanded && this.selectedNodes.some(selectedNode => tree_1.CompositeTreeNode.isAncestor(tail, selectedNode))) {
            this.selectNode(tail);
        }
    }
};
exports.CompressedTreeModel = CompressedTreeModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_compression_service_1.CompressionToggle),
    tslib_1.__metadata("design:type", Object)
], CompressedTreeModel.prototype, "compressionToggle", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_compression_service_1.TreeCompressionService),
    tslib_1.__metadata("design:type", tree_compression_service_1.TreeCompressionService)
], CompressedTreeModel.prototype, "compressionService", void 0);
exports.CompressedTreeModel = CompressedTreeModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], CompressedTreeModel);
//# sourceMappingURL=compressed-tree-model.js.map