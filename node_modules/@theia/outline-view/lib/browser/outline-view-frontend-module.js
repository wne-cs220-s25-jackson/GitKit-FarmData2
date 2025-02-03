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
const inversify_1 = require("@theia/core/shared/inversify");
const outline_view_service_1 = require("./outline-view-service");
const outline_view_contribution_1 = require("./outline-view-contribution");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const browser_1 = require("@theia/core/lib/browser");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const outline_view_widget_1 = require("./outline-view-widget");
require("../../src/browser/styles/index.css");
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const outline_decorator_service_1 = require("./outline-decorator-service");
const outline_view_tree_model_1 = require("./outline-view-tree-model");
const outline_breadcrumbs_contribution_1 = require("./outline-breadcrumbs-contribution");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(outline_view_widget_1.OutlineViewWidgetFactory).toFactory(ctx => () => createOutlineViewWidget(ctx.container));
    bind(outline_breadcrumbs_contribution_1.BreadcrumbPopupOutlineViewFactory).toFactory(({ container }) => () => {
        const child = createOutlineViewWidgetContainer(container);
        child.rebind(outline_view_widget_1.OutlineViewWidget).to(outline_breadcrumbs_contribution_1.BreadcrumbPopupOutlineView);
        child.rebind(browser_1.TreeProps).toConstantValue({ ...browser_1.defaultTreeProps, expandOnlyOnExpansionToggleClick: true, search: false, virtualized: false });
        return child.get(outline_view_widget_1.OutlineViewWidget);
    });
    bind(outline_view_service_1.OutlineViewService).toSelf().inSingletonScope();
    bind(widget_manager_1.WidgetFactory).toService(outline_view_service_1.OutlineViewService);
    (0, browser_1.bindViewContribution)(bind, outline_view_contribution_1.OutlineViewContribution);
    bind(browser_1.FrontendApplicationContribution).toService(outline_view_contribution_1.OutlineViewContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(outline_view_contribution_1.OutlineViewContribution);
    bind(outline_breadcrumbs_contribution_1.OutlineBreadcrumbsContribution).toSelf().inSingletonScope();
    bind(browser_1.BreadcrumbsContribution).toService(outline_breadcrumbs_contribution_1.OutlineBreadcrumbsContribution);
});
function createOutlineViewWidgetContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        props: { expandOnlyOnExpansionToggleClick: true, search: true },
        widget: outline_view_widget_1.OutlineViewWidget,
        model: outline_view_tree_model_1.OutlineViewTreeModel,
        decoratorService: outline_decorator_service_1.OutlineDecoratorService,
    });
    (0, contribution_provider_1.bindContributionProvider)(child, outline_decorator_service_1.OutlineTreeDecorator);
    return child;
}
/**
 * Create an `OutlineViewWidget`.
 * - The creation of the `OutlineViewWidget` includes:
 *  - The creation of the tree widget itself with it's own customized props.
 *  - The binding of necessary components into the container.
 * @param parent the Inversify container.
 *
 * @returns the `OutlineViewWidget`.
 */
function createOutlineViewWidget(parent) {
    const child = createOutlineViewWidgetContainer(parent);
    return child.get(outline_view_widget_1.OutlineViewWidget);
}
//# sourceMappingURL=outline-view-frontend-module.js.map