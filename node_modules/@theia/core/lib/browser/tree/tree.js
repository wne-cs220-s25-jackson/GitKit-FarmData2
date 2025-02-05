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
exports.TreeImpl = exports.CompositeTreeNode = exports.TreeNode = exports.Tree = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("../../common/event");
const disposable_1 = require("../../common/disposable");
const cancellation_1 = require("../../common/cancellation");
const promise_util_1 = require("../../common/promise-util");
const common_1 = require("../../common");
exports.Tree = Symbol('Tree');
var TreeNode;
(function (TreeNode) {
    function is(node) {
        return (0, common_1.isObject)(node) && 'id' in node && 'parent' in node;
    }
    TreeNode.is = is;
    function equals(left, right) {
        return left === right || (!!left && !!right && left.id === right.id);
    }
    TreeNode.equals = equals;
    function isVisible(node) {
        return !!node && (node.visible === undefined || node.visible);
    }
    TreeNode.isVisible = isVisible;
})(TreeNode || (exports.TreeNode = TreeNode = {}));
var CompositeTreeNode;
(function (CompositeTreeNode) {
    function is(node) {
        return (0, common_1.isObject)(node) && 'children' in node;
    }
    CompositeTreeNode.is = is;
    function getFirstChild(parent) {
        return parent.children[0];
    }
    CompositeTreeNode.getFirstChild = getFirstChild;
    function getLastChild(parent) {
        return parent.children[parent.children.length - 1];
    }
    CompositeTreeNode.getLastChild = getLastChild;
    function isAncestor(parent, child) {
        if (!child) {
            return false;
        }
        if (TreeNode.equals(parent, child.parent)) {
            return true;
        }
        return isAncestor(parent, child.parent);
    }
    CompositeTreeNode.isAncestor = isAncestor;
    function indexOf(parent, node) {
        if (!node) {
            return -1;
        }
        return parent.children.findIndex(child => TreeNode.equals(node, child));
    }
    CompositeTreeNode.indexOf = indexOf;
    function addChildren(parent, children) {
        for (const child of children) {
            addChild(parent, child);
        }
        return parent;
    }
    CompositeTreeNode.addChildren = addChildren;
    function addChild(parent, child) {
        const children = parent.children;
        const index = children.findIndex(value => value.id === child.id);
        if (index !== -1) {
            children.splice(index, 1, child);
            setParent(child, index, parent);
        }
        else {
            children.push(child);
            setParent(child, parent.children.length - 1, parent);
        }
        return parent;
    }
    CompositeTreeNode.addChild = addChild;
    function removeChild(parent, child) {
        const children = parent.children;
        const index = children.findIndex(value => value.id === child.id);
        if (index === -1) {
            return;
        }
        children.splice(index, 1);
        const { previousSibling, nextSibling } = child;
        if (previousSibling) {
            Object.assign(previousSibling, { nextSibling });
        }
        if (nextSibling) {
            Object.assign(nextSibling, { previousSibling });
        }
    }
    CompositeTreeNode.removeChild = removeChild;
    function setParent(child, index, parent) {
        const previousSibling = parent.children[index - 1];
        const nextSibling = parent.children[index + 1];
        Object.assign(child, { parent, previousSibling, nextSibling });
        if (previousSibling) {
            Object.assign(previousSibling, { nextSibling: child });
        }
        if (nextSibling) {
            Object.assign(nextSibling, { previousSibling: child });
        }
    }
    CompositeTreeNode.setParent = setParent;
})(CompositeTreeNode || (exports.CompositeTreeNode = CompositeTreeNode = {}));
/**
 * A default implementation of the tree.
 */
let TreeImpl = class TreeImpl {
    constructor() {
        this.onChangedEmitter = new event_1.Emitter();
        this.onNodeRefreshedEmitter = new event_1.Emitter();
        this.toDispose = new disposable_1.DisposableCollection();
        this.onDidChangeBusyEmitter = new event_1.Emitter();
        this.onDidChangeBusy = this.onDidChangeBusyEmitter.event;
        this.onDidUpdateEmitter = new event_1.Emitter();
        this.onDidUpdate = this.onDidUpdateEmitter.event;
        this.nodes = {};
        this.toDisposeOnSetRoot = new disposable_1.DisposableCollection();
        this.toDispose.push(this.onChangedEmitter);
        this.toDispose.push(this.onNodeRefreshedEmitter);
        this.toDispose.push(this.onDidChangeBusyEmitter);
    }
    dispose() {
        this.nodes = {};
        this.toDispose.dispose();
    }
    get root() {
        return this._root;
    }
    set root(root) {
        this.toDisposeOnSetRoot.dispose();
        const cancelRefresh = new cancellation_1.CancellationTokenSource();
        this.toDisposeOnSetRoot.push(cancelRefresh);
        this.nodes = {};
        this._root = root;
        this.addNode(root);
        this.refresh(undefined, cancelRefresh.token);
    }
    get onChanged() {
        return this.onChangedEmitter.event;
    }
    fireChanged() {
        this.onChangedEmitter.fire(undefined);
    }
    get onNodeRefreshed() {
        return this.onNodeRefreshedEmitter.event;
    }
    async fireNodeRefreshed(parent) {
        await event_1.WaitUntilEvent.fire(this.onNodeRefreshedEmitter, parent);
        this.fireChanged();
    }
    getNode(id) {
        return id !== undefined ? this.nodes[id] : undefined;
    }
    validateNode(node) {
        const id = !!node ? node.id : undefined;
        return this.getNode(id);
    }
    async refresh(raw, cancellationToken) {
        const parent = !raw ? this._root : this.validateNode(raw);
        let result;
        if (CompositeTreeNode.is(parent)) {
            const busySource = new cancellation_1.CancellationTokenSource();
            this.doMarkAsBusy(parent, 800, busySource.token);
            try {
                result = parent;
                const children = await this.resolveChildren(parent);
                if (cancellationToken === null || cancellationToken === void 0 ? void 0 : cancellationToken.isCancellationRequested) {
                    return;
                }
                result = await this.setChildren(parent, children);
                if (cancellationToken === null || cancellationToken === void 0 ? void 0 : cancellationToken.isCancellationRequested) {
                    return;
                }
            }
            finally {
                busySource.cancel();
            }
        }
        this.fireChanged();
        return result;
    }
    resolveChildren(parent) {
        return Promise.resolve(Array.from(parent.children));
    }
    async setChildren(parent, children) {
        const root = this.getRootNode(parent);
        if (this.nodes[root.id] && this.nodes[root.id] !== root) {
            console.error(`Child node '${parent.id}' does not belong to this '${root.id}' tree.`);
            return undefined;
        }
        this.removeNode(parent);
        parent.children = children;
        this.addNode(parent);
        await this.fireNodeRefreshed(parent);
        return parent;
    }
    removeNode(node) {
        if (CompositeTreeNode.is(node)) {
            node.children.forEach(child => this.removeNode(child));
        }
        if (node) {
            delete this.nodes[node.id];
        }
    }
    getRootNode(node) {
        if (node.parent === undefined) {
            return node;
        }
        else {
            return this.getRootNode(node.parent);
        }
    }
    addNode(node) {
        if (node) {
            this.nodes[node.id] = node;
        }
        if (CompositeTreeNode.is(node)) {
            const { children } = node;
            children.forEach((child, index) => {
                CompositeTreeNode.setParent(child, index, node);
                this.addNode(child);
            });
        }
    }
    async markAsBusy(raw, ms, token) {
        const node = this.validateNode(raw);
        if (node) {
            await this.doMarkAsBusy(node, ms, token);
        }
    }
    markAsChecked(node, checked) {
        node.checkboxInfo.checked = checked;
        this.onDidUpdateEmitter.fire([node]);
    }
    async doMarkAsBusy(node, ms, token) {
        try {
            token.onCancellationRequested(() => this.doResetBusy(node));
            await (0, promise_util_1.timeout)(ms, token);
            if (token.isCancellationRequested) {
                return;
            }
            this.doSetBusy(node);
        }
        catch {
            /* no-op */
        }
    }
    doSetBusy(node) {
        const oldBusy = node.busy || 0;
        node.busy = oldBusy + 1;
        if (oldBusy === 0) {
            this.onDidChangeBusyEmitter.fire(node);
        }
    }
    doResetBusy(node) {
        const oldBusy = node.busy || 0;
        if (oldBusy > 0) {
            node.busy = oldBusy - 1;
            if (node.busy === 0) {
                this.onDidChangeBusyEmitter.fire(node);
            }
        }
    }
};
exports.TreeImpl = TreeImpl;
exports.TreeImpl = TreeImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TreeImpl);
//# sourceMappingURL=tree.js.map