"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const bulk_edit_tree_1 = require("./bulk-edit-tree");
const browser_1 = require("@theia/core/lib/browser");
const bulk_edit_contribution_1 = require("./bulk-edit-contribution");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const bulk_edit_tree_label_provider_1 = require("./bulk-edit-tree-label-provider");
require("../../src/browser/style/bulk-edit.css");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(bulk_edit_tree_1.BulkEditTreeWidget).toDynamicValue(ctx => (0, bulk_edit_tree_1.createBulkEditTreeWidget)(ctx.container));
    bind(widget_manager_1.WidgetFactory).toDynamicValue(context => ({
        id: bulk_edit_tree_1.BULK_EDIT_TREE_WIDGET_ID,
        createWidget: () => context.container.get(bulk_edit_tree_1.BulkEditTreeWidget)
    }));
    (0, browser_1.bindViewContribution)(bind, bulk_edit_contribution_1.BulkEditContribution);
    bind(browser_1.FrontendApplicationContribution).toService(bulk_edit_contribution_1.BulkEditContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(bulk_edit_contribution_1.BulkEditContribution);
    bind(bulk_edit_tree_label_provider_1.BulkEditTreeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(bulk_edit_tree_label_provider_1.BulkEditTreeLabelProvider);
});
//# sourceMappingURL=bulk-edit-frontend-module.js.map