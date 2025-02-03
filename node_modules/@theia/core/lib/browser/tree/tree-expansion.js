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
exports.TreeExpansionServiceImpl = exports.ExpandableTreeNode = exports.TreeExpansionService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const tree_1 = require("./tree");
exports.TreeExpansionService = Symbol('TreeExpansionService');
var ExpandableTreeNode;
(function (ExpandableTreeNode) {
    function is(node) {
        return !!node && tree_1.CompositeTreeNode.is(node) && 'expanded' in node;
    }
    ExpandableTreeNode.is = is;
    function isExpanded(node) {
        return ExpandableTreeNode.is(node) && node.expanded;
    }
    ExpandableTreeNode.isExpanded = isExpanded;
    function isCollapsed(node) {
        return ExpandableTreeNode.is(node) && !node.expanded;
    }
    ExpandableTreeNode.isCollapsed = isCollapsed;
})(ExpandableTreeNode || (exports.ExpandableTreeNode = ExpandableTreeNode = {}));
let TreeExpansionServiceImpl = class TreeExpansionServiceImpl {
    constructor() {
        this.onExpansionChangedEmitter = new common_1.Emitter();
    }
    init() {
        this.tree.onNodeRefreshed(node => {
            for (const child of node.children) {
                if (ExpandableTreeNode.isExpanded(child)) {
                    node.waitUntil(this.tree.refresh(child));
                }
            }
        });
    }
    dispose() {
        this.onExpansionChangedEmitter.dispose();
    }
    get onExpansionChanged() {
        return this.onExpansionChangedEmitter.event;
    }
    fireExpansionChanged(node) {
        this.onExpansionChangedEmitter.fire(node);
    }
    async expandNode(raw) {
        const node = this.tree.validateNode(raw);
        if (ExpandableTreeNode.isCollapsed(node)) {
            return this.doExpandNode(node);
        }
        return undefined;
    }
    async doExpandNode(node) {
        const refreshed = await this.tree.refresh(node);
        if (ExpandableTreeNode.is(refreshed)) {
            refreshed.expanded = true;
            this.fireExpansionChanged(refreshed);
            return refreshed;
        }
        return undefined;
    }
    async collapseNode(raw) {
        const node = this.tree.validateNode(raw);
        return this.doCollapseNode(node);
    }
    async collapseAll(raw) {
        const node = this.tree.validateNode(raw);
        return this.doCollapseAll(node);
    }
    doCollapseAll(node) {
        let result = false;
        if (tree_1.CompositeTreeNode.is(node)) {
            for (const child of node.children) {
                result = this.doCollapseAll(child) || result;
            }
        }
        return this.doCollapseNode(node) || result;
    }
    doCollapseNode(node) {
        if (!ExpandableTreeNode.isExpanded(node)) {
            return false;
        }
        node.expanded = false;
        this.fireExpansionChanged(node);
        return true;
    }
    async toggleNodeExpansion(node) {
        if (node.expanded) {
            await this.collapseNode(node);
        }
        else {
            await this.expandNode(node);
        }
    }
};
exports.TreeExpansionServiceImpl = TreeExpansionServiceImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_1.Tree),
    tslib_1.__metadata("design:type", Object)
], TreeExpansionServiceImpl.prototype, "tree", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TreeExpansionServiceImpl.prototype, "init", null);
exports.TreeExpansionServiceImpl = TreeExpansionServiceImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeExpansionServiceImpl);
//# sourceMappingURL=tree-expansion.js.map