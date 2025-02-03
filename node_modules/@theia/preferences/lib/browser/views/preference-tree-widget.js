"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
var PreferencesTreeWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesTreeWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const React = require("@theia/core/shared/react");
const preference_tree_model_1 = require("../preference-tree-model");
const preference_types_1 = require("../util/preference-types");
let PreferencesTreeWidget = PreferencesTreeWidget_1 = class PreferencesTreeWidget extends browser_1.TreeWidget {
    constructor() {
        super(...arguments);
        this.shouldFireSelectionEvents = true;
    }
    init() {
        super.init();
        this.id = PreferencesTreeWidget_1.ID;
        this.toDispose.pushAll([
            this.model.onFilterChanged(() => {
                this.updateRows();
            }),
        ]);
    }
    doUpdateRows() {
        this.rows = new Map();
        let index = 0;
        for (const [id, nodeRow] of this.model.currentRows.entries()) {
            if (nodeRow.visibleChildren > 0 && this.isVisibleNode(nodeRow.node)) {
                this.rows.set(id, { ...nodeRow, index: index++ });
            }
        }
        this.updateScrollToRow();
    }
    isVisibleNode(node) {
        if (preference_types_1.Preference.TreeNode.isTopLevel(node)) {
            return true;
        }
        else {
            return browser_1.ExpandableTreeNode.isExpanded(node.parent) && preference_types_1.Preference.TreeNode.is(node.parent) && this.isVisibleNode(node.parent);
        }
    }
    doRenderNodeRow({ depth, visibleChildren, node, isExpansible }) {
        return this.renderNode(node, { depth, visibleChildren, isExpansible });
    }
    renderNode(node, props) {
        if (!browser_1.TreeNode.isVisible(node)) {
            return undefined;
        }
        const attributes = this.createNodeAttributes(node, props);
        const content = React.createElement("div", { className: browser_1.TREE_NODE_CONTENT_CLASS },
            this.renderExpansionToggle(node, props),
            this.renderCaption(node, props));
        return React.createElement('div', attributes, content);
    }
    renderExpansionToggle(node, props) {
        if (browser_1.ExpandableTreeNode.is(node) && !props.isExpansible) {
            return React.createElement("div", { className: 'preferences-tree-spacer' });
        }
        return super.renderExpansionToggle(node, props);
    }
    toNodeName(node) {
        var _a;
        const visibleChildren = (_a = this.model.currentRows.get(node.id)) === null || _a === void 0 ? void 0 : _a.visibleChildren;
        const baseName = this.labelProvider.getName(node);
        const printedNameWithVisibleChildren = this.model.isFiltered && visibleChildren !== undefined
            ? `${baseName} (${visibleChildren})`
            : baseName;
        return printedNameWithVisibleChildren;
    }
};
exports.PreferencesTreeWidget = PreferencesTreeWidget;
PreferencesTreeWidget.ID = 'preferences.tree';
tslib_1.__decorate([
    (0, inversify_1.inject)(preference_tree_model_1.PreferenceTreeModel),
    tslib_1.__metadata("design:type", preference_tree_model_1.PreferenceTreeModel)
], PreferencesTreeWidget.prototype, "model", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.TreeProps),
    tslib_1.__metadata("design:type", Object)
], PreferencesTreeWidget.prototype, "treeProps", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PreferencesTreeWidget.prototype, "init", null);
exports.PreferencesTreeWidget = PreferencesTreeWidget = PreferencesTreeWidget_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PreferencesTreeWidget);
//# sourceMappingURL=preference-tree-widget.js.map