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
var SourceTreeWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceTreeWidget = void 0;
const tslib_1 = require("tslib");
const React = require("react");
const inversify_1 = require("inversify");
const disposable_1 = require("../../common/disposable");
const tree_1 = require("../tree");
const source_tree_1 = require("./source-tree");
let SourceTreeWidget = SourceTreeWidget_1 = class SourceTreeWidget extends tree_1.TreeWidget {
    constructor() {
        super(...arguments);
        this.toDisposeOnSource = new disposable_1.DisposableCollection();
    }
    static createContainer(parent, props) {
        const child = (0, tree_1.createTreeContainer)(parent, {
            props,
            tree: source_tree_1.SourceTree,
            widget: SourceTreeWidget_1,
        });
        return child;
    }
    init() {
        super.init();
        this.addClass('theia-source-tree');
        this.toDispose.push(this.model.onOpenNode(node => {
            if (source_tree_1.TreeElementNode.is(node) && node.element.open) {
                node.element.open();
            }
        }));
    }
    get source() {
        const root = this.model.root;
        return source_tree_1.TreeSourceNode.is(root) ? root.source : undefined;
    }
    set source(source) {
        if (this.source === source) {
            return;
        }
        this.toDisposeOnSource.dispose();
        this.toDispose.push(this.toDisposeOnSource);
        this.model.root = source_tree_1.TreeSourceNode.to(source);
        if (source) {
            this.toDisposeOnSource.push(source.onDidChange(() => this.model.refresh()));
        }
    }
    get selectedElement() {
        const node = this.model.selectedNodes[0];
        return source_tree_1.TreeElementNode.is(node) && node.element || undefined;
    }
    renderTree(model) {
        if (source_tree_1.TreeSourceNode.is(model.root) && model.root.children.length === 0) {
            const { placeholder } = model.root.source;
            if (placeholder) {
                return React.createElement("div", { className: 'theia-tree-source-node-placeholder noselect' }, placeholder);
            }
        }
        return super.renderTree(model);
    }
    renderCaption(node) {
        if (source_tree_1.TreeElementNode.is(node)) {
            const classNames = this.createTreeElementNodeClassNames(node);
            return React.createElement("div", { className: classNames.join(' ') }, node.element.render(this));
        }
        return undefined;
    }
    createTreeElementNodeClassNames(node) {
        return [tree_1.TREE_NODE_SEGMENT_GROW_CLASS];
    }
    storeState() {
        // no-op
        return {};
    }
    superStoreState() {
        return super.storeState();
    }
    restoreState(state) {
        // no-op
    }
    superRestoreState(state) {
        super.restoreState(state);
        return;
    }
};
exports.SourceTreeWidget = SourceTreeWidget;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SourceTreeWidget.prototype, "init", null);
exports.SourceTreeWidget = SourceTreeWidget = SourceTreeWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SourceTreeWidget);
//# sourceMappingURL=source-tree-widget.js.map