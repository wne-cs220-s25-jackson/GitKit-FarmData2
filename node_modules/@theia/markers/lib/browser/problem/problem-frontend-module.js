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
require("../../../src/browser/style/index.css");
const inversify_1 = require("@theia/core/shared/inversify");
const problem_widget_1 = require("./problem-widget");
const problem_contribution_1 = require("./problem-contribution");
const problem_container_1 = require("./problem-container");
const browser_1 = require("@theia/core/lib/browser");
const problem_manager_1 = require("./problem-manager");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const problem_tabbar_decorator_1 = require("./problem-tabbar-decorator");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const problem_layout_migrations_1 = require("./problem-layout-migrations");
const tab_bar_decorator_1 = require("@theia/core/lib/browser/shell/tab-bar-decorator");
const problem_preferences_1 = require("./problem-preferences");
const marker_tree_label_provider_1 = require("../marker-tree-label-provider");
const problem_widget_tab_bar_decorator_1 = require("./problem-widget-tab-bar-decorator");
const problem_decorations_provider_1 = require("./problem-decorations-provider");
exports.default = new inversify_1.ContainerModule(bind => {
    (0, problem_preferences_1.bindProblemPreferences)(bind);
    bind(problem_manager_1.ProblemManager).toSelf().inSingletonScope();
    bind(problem_widget_1.ProblemWidget).toDynamicValue(ctx => (0, problem_container_1.createProblemWidget)(ctx.container));
    bind(widget_manager_1.WidgetFactory).toDynamicValue(context => ({
        id: problem_widget_1.PROBLEMS_WIDGET_ID,
        createWidget: () => context.container.get(problem_widget_1.ProblemWidget)
    }));
    bind(browser_1.ApplicationShellLayoutMigration).to(problem_layout_migrations_1.ProblemLayoutVersion3Migration).inSingletonScope();
    (0, browser_1.bindViewContribution)(bind, problem_contribution_1.ProblemContribution);
    bind(browser_1.FrontendApplicationContribution).toService(problem_contribution_1.ProblemContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(problem_contribution_1.ProblemContribution);
    bind(problem_decorations_provider_1.ProblemDecorationsProvider).toSelf().inSingletonScope();
    bind(problem_tabbar_decorator_1.ProblemTabBarDecorator).toSelf().inSingletonScope();
    bind(tab_bar_decorator_1.TabBarDecorator).toService(problem_tabbar_decorator_1.ProblemTabBarDecorator);
    bind(problem_decorations_provider_1.ProblemDecorationContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(problem_decorations_provider_1.ProblemDecorationContribution);
    bind(marker_tree_label_provider_1.MarkerTreeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.LabelProviderContribution).toService(marker_tree_label_provider_1.MarkerTreeLabelProvider);
    bind(problem_widget_tab_bar_decorator_1.ProblemWidgetTabBarDecorator).toSelf().inSingletonScope();
    bind(tab_bar_decorator_1.TabBarDecorator).toService(problem_widget_tab_bar_decorator_1.ProblemWidgetTabBarDecorator);
});
//# sourceMappingURL=problem-frontend-module.js.map