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
exports.OutlineViewContribution = exports.OutlineViewCommands = exports.OUTLINE_WIDGET_FACTORY_ID = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
const widgets_1 = require("@theia/core/lib/browser/widgets");
const outline_view_widget_1 = require("./outline-view-widget");
const tree_1 = require("@theia/core/lib/browser/tree");
const os_1 = require("@theia/core/lib/common/os");
const nls_1 = require("@theia/core/lib/common/nls");
exports.OUTLINE_WIDGET_FACTORY_ID = 'outline-view';
/**
 * Collection of `outline-view` commands.
 */
var OutlineViewCommands;
(function (OutlineViewCommands) {
    /**
     * Command which collapses all nodes from the `outline-view` tree.
     */
    OutlineViewCommands.COLLAPSE_ALL = {
        id: 'outlineView.collapse.all',
        iconClass: (0, widgets_1.codicon)('collapse-all')
    };
    /**
     * Command which expands all nodes from the `outline-view` tree.
     */
    OutlineViewCommands.EXPAND_ALL = {
        id: 'outlineView.expand.all',
        iconClass: (0, widgets_1.codicon)('expand-all')
    };
})(OutlineViewCommands || (exports.OutlineViewCommands = OutlineViewCommands = {}));
let OutlineViewContribution = class OutlineViewContribution extends view_contribution_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: exports.OUTLINE_WIDGET_FACTORY_ID,
            widgetName: outline_view_widget_1.OutlineViewWidget.LABEL,
            defaultWidgetOptions: {
                area: 'right',
                rank: 500
            },
            toggleCommandId: 'outlineView:toggle',
            toggleKeybinding: os_1.OS.type() !== os_1.OS.Type.Linux
                ? 'ctrlcmd+shift+i'
                : undefined
        });
    }
    async initializeLayout(app) {
        await this.openView();
    }
    registerCommands(commands) {
        super.registerCommands(commands);
        commands.registerCommand(OutlineViewCommands.COLLAPSE_ALL, {
            isEnabled: w => this.withWidget(w, () => true),
            isVisible: w => this.withWidget(w, widget => !widget.model.areNodesCollapsed()),
            execute: () => this.collapseAllItems()
        });
        commands.registerCommand(OutlineViewCommands.EXPAND_ALL, {
            isEnabled: w => this.withWidget(w, () => true),
            isVisible: w => this.withWidget(w, widget => widget.model.areNodesCollapsed()),
            execute: () => this.expandAllItems()
        });
    }
    async registerToolbarItems(toolbar) {
        const widget = await this.widget;
        const onDidChange = widget.onDidUpdate;
        toolbar.registerItem({
            id: OutlineViewCommands.COLLAPSE_ALL.id,
            command: OutlineViewCommands.COLLAPSE_ALL.id,
            tooltip: nls_1.nls.localizeByDefault('Collapse All'),
            priority: 0,
            onDidChange
        });
        toolbar.registerItem({
            id: OutlineViewCommands.EXPAND_ALL.id,
            command: OutlineViewCommands.EXPAND_ALL.id,
            tooltip: nls_1.nls.localizeByDefault('Expand All'),
            priority: 0,
            onDidChange
        });
    }
    /**
     * Collapse all nodes in the outline view tree.
     */
    async collapseAllItems() {
        const { model } = await this.widget;
        const root = model.root;
        if (tree_1.CompositeTreeNode.is(root)) {
            model.collapseAll(root);
        }
    }
    async expandAllItems() {
        const { model } = await this.widget;
        model.expandAll(model.root);
    }
    /**
     * Determine if the current widget is the `outline-view`.
     */
    withWidget(widget = this.tryGetWidget(), cb) {
        if (widget instanceof outline_view_widget_1.OutlineViewWidget && widget.id === exports.OUTLINE_WIDGET_FACTORY_ID) {
            return cb(widget);
        }
        return false;
    }
};
exports.OutlineViewContribution = OutlineViewContribution;
exports.OutlineViewContribution = OutlineViewContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], OutlineViewContribution);
//# sourceMappingURL=outline-view-contribution.js.map