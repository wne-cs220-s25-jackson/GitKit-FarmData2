"use strict";
// *****************************************************************************
// Copyright (C) 2017-2018 TypeFox and others.
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
var OutlineViewWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutlineViewWidget = exports.OutlineViewWidgetFactory = exports.OutlineSymbolInformationNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const outline_view_tree_model_1 = require("./outline-view-tree-model");
const core_1 = require("@theia/core");
const React = require("@theia/core/shared/react");
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
const uri_1 = require("@theia/core/lib/common/uri");
const nls_1 = require("@theia/core/lib/common/nls");
/**
 * Collection of outline symbol information node functions.
 */
var OutlineSymbolInformationNode;
(function (OutlineSymbolInformationNode) {
    /**
     * Determine if the given tree node is an `OutlineSymbolInformationNode`.
     * - The tree node is an `OutlineSymbolInformationNode` if:
     *  - The node exists.
     *  - The node is selectable.
     *  - The node contains a defined `iconClass` property.
     * @param node the tree node.
     *
     * @returns `true` if the given node is an `OutlineSymbolInformationNode`.
     */
    function is(node) {
        return !!node && browser_1.SelectableTreeNode.is(node) && 'iconClass' in node;
    }
    OutlineSymbolInformationNode.is = is;
    function hasRange(node) {
        return (0, core_1.isObject)(node) && vscode_languageserver_protocol_1.Range.is(node.range);
    }
    OutlineSymbolInformationNode.hasRange = hasRange;
})(OutlineSymbolInformationNode || (exports.OutlineSymbolInformationNode = OutlineSymbolInformationNode = {}));
exports.OutlineViewWidgetFactory = Symbol('OutlineViewWidgetFactory');
let OutlineViewWidget = OutlineViewWidget_1 = class OutlineViewWidget extends browser_1.TreeWidget {
    constructor(treeProps, model, contextMenuRenderer) {
        super(treeProps, model, contextMenuRenderer);
        this.model = model;
        this.onDidChangeOpenStateEmitter = new core_1.Emitter();
        this.onDidUpdateEmitter = new core_1.Emitter();
        this.onDidUpdate = this.onDidUpdateEmitter.event;
        this.id = 'outline-view';
        this.title.label = OutlineViewWidget_1.LABEL;
        this.title.caption = OutlineViewWidget_1.LABEL;
        this.title.closable = true;
        this.title.iconClass = (0, browser_1.codicon)('symbol-class');
        this.addClass('theia-outline-view');
    }
    init() {
        super.init();
        this.toDispose.push(this.model.onExpansionChanged(() => this.onDidUpdateEmitter.fire()));
    }
    /**
     * Set the outline tree with the list of `OutlineSymbolInformationNode`.
     * @param roots the list of `OutlineSymbolInformationNode`.
     */
    setOutlineTree(roots) {
        // Gather the list of available nodes.
        const nodes = this.reconcileTreeState(roots);
        // Update the model root node, appending the outline symbol information nodes as children.
        this.model.root = this.getRoot(nodes);
    }
    getRoot(children) {
        return {
            id: 'outline-view-root',
            name: OutlineViewWidget_1.LABEL,
            visible: false,
            children,
            parent: undefined
        };
    }
    /**
     * Reconcile the outline tree state, gathering all available nodes.
     * @param nodes the list of `TreeNode`.
     *
     * @returns the list of tree nodes.
     */
    reconcileTreeState(nodes) {
        nodes.forEach(node => {
            if (OutlineSymbolInformationNode.is(node)) {
                const treeNode = this.model.getNode(node.id);
                if (treeNode && OutlineSymbolInformationNode.is(treeNode)) {
                    treeNode.expanded = node.expanded;
                    treeNode.selected = node.selected;
                }
                this.reconcileTreeState(Array.from(node.children));
            }
        });
        return nodes;
    }
    onAfterHide(msg) {
        super.onAfterHide(msg);
        this.onDidChangeOpenStateEmitter.fire(false);
    }
    onAfterShow(msg) {
        super.onAfterShow(msg);
        this.onDidChangeOpenStateEmitter.fire(true);
    }
    renderIcon(node, props) {
        if (OutlineSymbolInformationNode.is(node)) {
            return React.createElement("div", { className: 'symbol-icon-center codicon codicon-symbol-' + node.iconClass });
        }
        return undefined;
    }
    createNodeAttributes(node, props) {
        const elementAttrs = super.createNodeAttributes(node, props);
        return {
            ...elementAttrs,
            title: this.getNodeTooltip(node)
        };
    }
    /**
     * Get the tooltip for the given tree node.
     * - The tooltip is discovered when hovering over a tree node.
     * - If available, the tooltip is the concatenation of the node name, and it's type.
     * @param node the tree node.
     *
     * @returns the tooltip for the tree node if available, else `undefined`.
     */
    getNodeTooltip(node) {
        if (OutlineSymbolInformationNode.is(node)) {
            return node.name + ` (${node.iconClass})`;
        }
        return undefined;
    }
    isExpandable(node) {
        return OutlineSymbolInformationNode.is(node) && node.children.length > 0;
    }
    renderTree(model) {
        if (browser_1.CompositeTreeNode.is(this.model.root) && !this.model.root.children.length) {
            return React.createElement("div", { className: 'theia-widget-noInfo no-outline' }, nls_1.nls.localizeByDefault('The active editor cannot provide outline information.'));
        }
        return super.renderTree(model);
    }
    deflateForStorage(node) {
        const deflated = super.deflateForStorage(node);
        if (core_1.UriSelection.is(node)) {
            deflated.uri = node.uri.toString();
        }
        return deflated;
    }
    inflateFromStorage(node, parent) {
        const inflated = super.inflateFromStorage(node, parent);
        if (node && 'uri' in node && typeof node.uri === 'string') {
            inflated.uri = new uri_1.default(node.uri);
        }
        return inflated;
    }
};
exports.OutlineViewWidget = OutlineViewWidget;
OutlineViewWidget.LABEL = nls_1.nls.localizeByDefault('Outline');
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OutlineViewWidget.prototype, "init", null);
exports.OutlineViewWidget = OutlineViewWidget = OutlineViewWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(outline_view_tree_model_1.OutlineViewTreeModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, outline_view_tree_model_1.OutlineViewTreeModel,
        browser_1.ContextMenuRenderer])
], OutlineViewWidget);
//# sourceMappingURL=outline-view-widget.js.map