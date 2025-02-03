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
exports.CompressedTreeWidget = void 0;
const tslib_1 = require("tslib");
require("../../../../src/browser/tree/tree-compression/tree-compression.css");
const inversify_1 = require("inversify");
const React = require("react");
const context_menu_renderer_1 = require("../../context-menu-renderer");
const tree_compression_service_1 = require("./tree-compression-service");
const tree_1 = require("../tree");
const tree_widget_1 = require("../tree-widget");
const tree_selection_1 = require("../tree-selection");
const tree_expansion_1 = require("../tree-expansion");
const tree_view_welcome_widget_1 = require("../tree-view-welcome-widget");
const compressed_tree_model_1 = require("./compressed-tree-model");
let CompressedTreeWidget = class CompressedTreeWidget extends tree_view_welcome_widget_1.TreeViewWelcomeWidget {
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.model = model;
        this.rows = new Map();
    }
    toggleCompression(newCompression = !this.compressionToggle.compress) {
        if (newCompression !== this.compressionToggle.compress) {
            this.compressionToggle.compress = newCompression;
            this.updateRows();
        }
    }
    shouldRenderIndent(node) {
        return !this.compressionToggle.compress
            || !this.compressionService.isCompressionParticipant(node)
            || this.compressionService.getCompressionHead(node) === node;
    }
    shouldDisplayNode(node) {
        if (this.compressionToggle.compress && this.compressionService.isCompressionParticipant(node) && !this.compressionService.isCompressionHead(node)) {
            return false;
        }
        return super.shouldDisplayNode(node);
    }
    getDepthForNode(node, depths) {
        var _a;
        if (!this.compressionToggle.compress) {
            return super.getDepthForNode(node, depths);
        }
        const parent = (_a = this.compressionService.getCompressionHead(node.parent)) !== null && _a !== void 0 ? _a : node.parent;
        const parentDepth = depths.get(parent);
        return parentDepth === undefined ? 0 : tree_1.TreeNode.isVisible(node.parent) ? parentDepth + 1 : parentDepth;
    }
    toNodeRow(node, index, depth) {
        if (!this.compressionToggle.compress) {
            return super.toNodeRow(node, index, depth);
        }
        const row = { node, index, depth };
        if (this.compressionService.isCompressionHead(node)) {
            row.compressionChain = this.compressionService.getCompressionChain(node);
        }
        return row;
    }
    doRenderNodeRow({ node, depth, compressionChain }) {
        const nodeProps = { depth, compressionChain };
        return React.createElement(React.Fragment, null,
            this.renderIndent(node, nodeProps),
            this.renderNode(node, nodeProps));
    }
    rowIsSelected(node, props) {
        if (this.compressionToggle.compress && props.compressionChain) {
            return props.compressionChain.some(participant => tree_selection_1.SelectableTreeNode.isSelected(participant));
        }
        return tree_selection_1.SelectableTreeNode.isSelected(node);
    }
    getCaptionAttributes(node, props) {
        var _a, _b;
        const operativeNode = (_b = (_a = props.compressionChain) === null || _a === void 0 ? void 0 : _a.tail()) !== null && _b !== void 0 ? _b : node;
        return super.getCaptionAttributes(operativeNode, props);
    }
    getCaptionChildren(node, props) {
        if (!this.compressionToggle.compress || !props.compressionChain) {
            return super.getCaptionChildren(node, props);
        }
        return props.compressionChain.map((subNode, index, self) => {
            const classes = ['theia-tree-compressed-label-part'];
            if (tree_selection_1.SelectableTreeNode.isSelected(subNode)) {
                classes.push('theia-tree-compressed-selected');
            }
            const handlers = this.getCaptionChildEventHandlers(subNode, props);
            const caption = React.createElement("span", { className: classes.join(' '), key: subNode.id, ...handlers }, super.getCaptionChildren(subNode, props));
            if (index === self.length - 1) {
                return caption;
            }
            return [
                caption,
                React.createElement("span", { className: 'theia-tree-compressed-label-separator', key: subNode + '-separator' }, this.getSeparatorContent(node, props))
            ];
        });
    }
    getCaptionChildEventHandlers(node, props) {
        return {
            onClick: event => (event.stopPropagation(), this.handleClickEvent(node, event)),
            onDoubleClick: event => (event.stopPropagation(), this.handleDblClickEvent(node, event)),
            onContextMenu: event => (event.stopPropagation(), this.handleContextMenuEvent(node, event)),
        };
    }
    handleUp(event) {
        if (!this.compressionToggle.compress) {
            return super.handleUp(event);
        }
        const type = this.props.multiSelect && this.hasShiftMask(event) ? tree_selection_1.TreeSelection.SelectionType.RANGE : undefined;
        this.model.selectPrevRow(type);
        this.node.focus();
    }
    handleDown(event) {
        if (!this.compressionToggle.compress) {
            return super.handleDown(event);
        }
        const type = this.props.multiSelect && this.hasShiftMask(event) ? tree_selection_1.TreeSelection.SelectionType.RANGE : undefined;
        this.model.selectNextRow(type);
        this.node.focus();
    }
    async handleLeft(event) {
        if (!this.compressionToggle.compress) {
            return super.handleLeft(event);
        }
        if (Boolean(this.props.multiSelect) && (this.hasCtrlCmdMask(event) || this.hasShiftMask(event))) {
            return;
        }
        const active = this.focusService.focusedNode;
        if (tree_expansion_1.ExpandableTreeNode.isExpanded(active)
            && (this.compressionService.isCompressionHead(active)
                || !this.compressionService.isCompressionParticipant(active))) {
            await this.model.collapseNode(active);
        }
        else {
            this.model.selectParent();
        }
    }
    async handleRight(event) {
        if (!this.compressionToggle.compress) {
            return super.handleRight(event);
        }
        if (Boolean(this.props.multiSelect) && (this.hasCtrlCmdMask(event) || this.hasShiftMask(event))) {
            return;
        }
        const active = this.focusService.focusedNode;
        if (tree_expansion_1.ExpandableTreeNode.isCollapsed(active)
            && (!this.compressionService.isCompressionParticipant(active)
                || this.compressionService.isCompressionTail(active))) {
            await this.model.expandNode(active);
        }
        else if (tree_expansion_1.ExpandableTreeNode.is(active)) {
            this.model.selectNextNode();
        }
    }
    getSeparatorContent(node, props) {
        return '/';
    }
};
exports.CompressedTreeWidget = CompressedTreeWidget;
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_compression_service_1.CompressionToggle),
    tslib_1.__metadata("design:type", Object)
], CompressedTreeWidget.prototype, "compressionToggle", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_compression_service_1.TreeCompressionService),
    tslib_1.__metadata("design:type", tree_compression_service_1.TreeCompressionService)
], CompressedTreeWidget.prototype, "compressionService", void 0);
exports.CompressedTreeWidget = CompressedTreeWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(tree_widget_1.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(compressed_tree_model_1.CompressedTreeModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(context_menu_renderer_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, compressed_tree_model_1.CompressedTreeModel,
        context_menu_renderer_1.ContextMenuRenderer])
], CompressedTreeWidget);
//# sourceMappingURL=compressed-tree-widget.js.map