"use strict";
// *****************************************************************************
// Copyright (C) 2019 Red Hat, Inc. and others.
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
exports.createScmWidgetContainer = exports.createScmTreeContainer = void 0;
require("../../src/browser/style/index.css");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const scm_service_1 = require("./scm-service");
const scm_contribution_1 = require("./scm-contribution");
const scm_widget_1 = require("./scm-widget");
const scm_tree_widget_1 = require("./scm-tree-widget");
const scm_commit_widget_1 = require("./scm-commit-widget");
const scm_amend_widget_1 = require("./scm-amend-widget");
const scm_no_repository_widget_1 = require("./scm-no-repository-widget");
const scm_tree_model_1 = require("./scm-tree-model");
const scm_groups_tree_model_1 = require("./scm-groups-tree-model");
const scm_quick_open_service_1 = require("./scm-quick-open-service");
const dirty_diff_module_1 = require("./dirty-diff/dirty-diff-module");
const scm_decorations_service_1 = require("./decorations/scm-decorations-service");
const scm_avatar_service_1 = require("./scm-avatar-service");
const scm_context_key_service_1 = require("./scm-context-key-service");
const scm_layout_migrations_1 = require("./scm-layout-migrations");
const scm_tree_label_provider_1 = require("./scm-tree-label-provider");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const color_application_contribution_1 = require("@theia/core/lib/browser/color-application-contribution");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const scm_preferences_1 = require("./scm-preferences");
const scm_tab_bar_decorator_1 = require("./decorations/scm-tab-bar-decorator");
const tab_bar_decorator_1 = require("@theia/core/lib/browser/shell/tab-bar-decorator");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(scm_context_key_service_1.ScmContextKeyService).toSelf().inSingletonScope();
    bind(scm_service_1.ScmService).toSelf().inSingletonScope();
    bind(scm_widget_1.ScmWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: scm_contribution_1.SCM_WIDGET_FACTORY_ID,
        createWidget: () => {
            const child = createScmWidgetContainer(container);
            return child.get(scm_widget_1.ScmWidget);
        }
    })).inSingletonScope();
    bind(scm_commit_widget_1.ScmCommitWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: scm_commit_widget_1.ScmCommitWidget.ID,
        createWidget: () => container.get(scm_commit_widget_1.ScmCommitWidget)
    })).inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: scm_tree_widget_1.ScmTreeWidget.ID,
        createWidget: () => container.get(scm_tree_widget_1.ScmTreeWidget)
    })).inSingletonScope();
    bind(scm_amend_widget_1.ScmAmendWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: scm_amend_widget_1.ScmAmendWidget.ID,
        createWidget: () => container.get(scm_amend_widget_1.ScmAmendWidget)
    })).inSingletonScope();
    bind(scm_no_repository_widget_1.ScmNoRepositoryWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: scm_no_repository_widget_1.ScmNoRepositoryWidget.ID,
        createWidget: () => container.get(scm_no_repository_widget_1.ScmNoRepositoryWidget)
    })).inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: scm_contribution_1.SCM_VIEW_CONTAINER_ID,
        createWidget: async () => {
            const viewContainer = container.get(browser_1.ViewContainer.Factory)({
                id: scm_contribution_1.SCM_VIEW_CONTAINER_ID,
                progressLocationId: 'scm'
            });
            viewContainer.setTitleOptions(scm_contribution_1.SCM_VIEW_CONTAINER_TITLE_OPTIONS);
            const widget = await container.get(browser_1.WidgetManager).getOrCreateWidget(scm_contribution_1.SCM_WIDGET_FACTORY_ID);
            viewContainer.addWidget(widget, {
                canHide: false,
                initiallyCollapsed: false
            });
            return viewContainer;
        }
    })).inSingletonScope();
    bind(browser_1.ApplicationShellLayoutMigration).to(scm_layout_migrations_1.ScmLayoutVersion3Migration).inSingletonScope();
    bind(browser_1.ApplicationShellLayoutMigration).to(scm_layout_migrations_1.ScmLayoutVersion5Migration).inSingletonScope();
    bind(scm_quick_open_service_1.ScmQuickOpenService).toSelf().inSingletonScope();
    (0, browser_1.bindViewContribution)(bind, scm_contribution_1.ScmContribution);
    bind(browser_1.FrontendApplicationContribution).toService(scm_contribution_1.ScmContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(scm_contribution_1.ScmContribution);
    bind(color_application_contribution_1.ColorContribution).toService(scm_contribution_1.ScmContribution);
    bind(browser_1.StylingParticipant).toService(scm_contribution_1.ScmContribution);
    bind(scm_decorations_service_1.ScmDecorationsService).toSelf().inSingletonScope();
    bind(scm_avatar_service_1.ScmAvatarService).toSelf().inSingletonScope();
    (0, dirty_diff_module_1.bindDirtyDiff)(bind);
    bind(scm_tree_label_provider_1.ScmTreeLabelProvider).toSelf().inSingletonScope();
    bind(label_provider_1.LabelProviderContribution).toService(scm_tree_label_provider_1.ScmTreeLabelProvider);
    (0, scm_preferences_1.bindScmPreferences)(bind);
    bind(scm_tab_bar_decorator_1.ScmTabBarDecorator).toSelf().inSingletonScope();
    bind(tab_bar_decorator_1.TabBarDecorator).toService(scm_tab_bar_decorator_1.ScmTabBarDecorator);
});
function createScmTreeContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        props: {
            virtualized: true,
            search: true,
            multiSelect: true,
        },
        widget: scm_tree_widget_1.ScmTreeWidget,
    });
    child.unbind(browser_1.TreeModel);
    child.unbind(browser_1.TreeModelImpl);
    child.bind(scm_tree_model_1.ScmTreeModelProps).toConstantValue({
        defaultExpansion: 'expanded',
    });
    return child;
}
exports.createScmTreeContainer = createScmTreeContainer;
function createScmWidgetContainer(parent) {
    const child = createScmTreeContainer(parent);
    child.bind(scm_groups_tree_model_1.ScmGroupsTreeModel).toSelf();
    child.bind(browser_1.TreeModel).toService(scm_groups_tree_model_1.ScmGroupsTreeModel);
    return child;
}
exports.createScmWidgetContainer = createScmWidgetContainer;
//# sourceMappingURL=scm-frontend-module.js.map