"use strict";
// *****************************************************************************
// Copyright (C) 2017-2018 Ericsson and others.
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
exports.createSearchTreeWidget = void 0;
require("../../src/browser/styles/index.css");
const inversify_1 = require("@theia/core/shared/inversify");
const search_in_workspace_service_1 = require("./search-in-workspace-service");
const search_in_workspace_interface_1 = require("../common/search-in-workspace-interface");
const browser_1 = require("@theia/core/lib/browser");
const search_in_workspace_widget_1 = require("./search-in-workspace-widget");
const search_in_workspace_result_tree_widget_1 = require("./search-in-workspace-result-tree-widget");
const search_in_workspace_frontend_contribution_1 = require("./search-in-workspace-frontend-contribution");
const search_in_workspace_context_key_service_1 = require("./search-in-workspace-context-key-service");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const search_in_workspace_preferences_1 = require("./search-in-workspace-preferences");
const search_in_workspace_label_provider_1 = require("./search-in-workspace-label-provider");
const search_in_workspace_factory_1 = require("./search-in-workspace-factory");
const search_layout_migrations_1 = require("./search-layout-migrations");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(search_in_workspace_context_key_service_1.SearchInWorkspaceContextKeyService).toSelf().inSingletonScope();
    bind(search_in_workspace_widget_1.SearchInWorkspaceWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: search_in_workspace_widget_1.SearchInWorkspaceWidget.ID,
        createWidget: () => ctx.container.get(search_in_workspace_widget_1.SearchInWorkspaceWidget)
    }));
    bind(search_in_workspace_result_tree_widget_1.SearchInWorkspaceResultTreeWidget).toDynamicValue(ctx => createSearchTreeWidget(ctx.container));
    bind(search_in_workspace_factory_1.SearchInWorkspaceFactory).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toService(search_in_workspace_factory_1.SearchInWorkspaceFactory);
    bind(browser_1.ApplicationShellLayoutMigration).to(search_layout_migrations_1.SearchLayoutVersion3Migration).inSingletonScope();
    (0, browser_1.bindViewContribution)(bind, search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution);
    bind(browser_1.FrontendApplicationContribution).toService(search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution);
    bind(browser_1.StylingParticipant).toService(search_in_workspace_frontend_contribution_1.SearchInWorkspaceFrontendContribution);
    // The object that gets notified of search results.
    bind(search_in_workspace_service_1.SearchInWorkspaceClientImpl).toSelf().inSingletonScope();
    bind(search_in_workspace_service_1.SearchInWorkspaceService).toSelf().inSingletonScope();
    // The object to call methods on the backend.
    bind(search_in_workspace_interface_1.SearchInWorkspaceServer).toDynamicValue(ctx => {
        const client = ctx.container.get(search_in_workspace_service_1.SearchInWorkspaceClientImpl);
        return browser_1.WebSocketConnectionProvider.createProxy(ctx.container, search_in_workspace_interface_1.SIW_WS_PATH, client);
    }).inSingletonScope();
    (0, search_in_workspace_preferences_1.bindSearchInWorkspacePreferences)(bind);
    bind(search_in_workspace_label_provider_1.SearchInWorkspaceLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(search_in_workspace_label_provider_1.SearchInWorkspaceLabelProvider);
});
function createSearchTreeWidget(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        widget: search_in_workspace_result_tree_widget_1.SearchInWorkspaceResultTreeWidget,
        props: {
            contextMenuPath: search_in_workspace_result_tree_widget_1.SearchInWorkspaceResultTreeWidget.Menus.BASE,
            multiSelect: true,
            globalSelection: true
        }
    });
    return child.get(search_in_workspace_result_tree_widget_1.SearchInWorkspaceResultTreeWidget);
}
exports.createSearchTreeWidget = createSearchTreeWidget;
//# sourceMappingURL=search-in-workspace-frontend-module.js.map