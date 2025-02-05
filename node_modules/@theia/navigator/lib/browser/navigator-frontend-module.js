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
require("../../src/browser/style/index.css");
require("../../src/browser/open-editors-widget/open-editors.css");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const navigator_widget_1 = require("./navigator-widget");
const navigator_contribution_1 = require("./navigator-contribution");
const navigator_container_1 = require("./navigator-container");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const navigator_preferences_1 = require("./navigator-preferences");
const navigator_filter_1 = require("./navigator-filter");
const navigator_context_key_service_1 = require("./navigator-context-key-service");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const navigator_diff_1 = require("./navigator-diff");
const navigator_layout_migrations_1 = require("./navigator-layout-migrations");
const navigator_tab_bar_decorator_1 = require("./navigator-tab-bar-decorator");
const tab_bar_decorator_1 = require("@theia/core/lib/browser/shell/tab-bar-decorator");
const navigator_widget_factory_1 = require("./navigator-widget-factory");
const common_1 = require("@theia/core/lib/common");
const navigator_open_editors_decorator_service_1 = require("./open-editors-widget/navigator-open-editors-decorator-service");
const navigator_open_editors_widget_1 = require("./open-editors-widget/navigator-open-editors-widget");
const navigator_decorator_service_1 = require("./navigator-decorator-service");
const navigator_deleted_editor_decorator_1 = require("./open-editors-widget/navigator-deleted-editor-decorator");
const navigator_symlink_decorator_1 = require("./navigator-symlink-decorator");
const browser_2 = require("@theia/filesystem/lib/browser");
exports.default = new inversify_1.ContainerModule(bind => {
    (0, navigator_preferences_1.bindFileNavigatorPreferences)(bind);
    bind(navigator_filter_1.FileNavigatorFilter).toSelf().inSingletonScope();
    bind(navigator_context_key_service_1.NavigatorContextKeyService).toSelf().inSingletonScope();
    (0, browser_1.bindViewContribution)(bind, navigator_contribution_1.FileNavigatorContribution);
    bind(browser_1.FrontendApplicationContribution).toService(navigator_contribution_1.FileNavigatorContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(navigator_contribution_1.FileNavigatorContribution);
    bind(navigator_widget_1.FileNavigatorWidget).toDynamicValue(ctx => (0, navigator_container_1.createFileNavigatorWidget)(ctx.container));
    bind(widget_manager_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: navigator_widget_1.FILE_NAVIGATOR_ID,
        createWidget: () => container.get(navigator_widget_1.FileNavigatorWidget)
    })).inSingletonScope();
    (0, common_1.bindContributionProvider)(bind, navigator_decorator_service_1.NavigatorTreeDecorator);
    (0, common_1.bindContributionProvider)(bind, navigator_open_editors_decorator_service_1.OpenEditorsTreeDecorator);
    bind(navigator_decorator_service_1.NavigatorTreeDecorator).toService(browser_2.FileTreeDecoratorAdapter);
    bind(navigator_open_editors_decorator_service_1.OpenEditorsTreeDecorator).toService(browser_2.FileTreeDecoratorAdapter);
    bind(navigator_deleted_editor_decorator_1.NavigatorDeletedEditorDecorator).toSelf().inSingletonScope();
    bind(navigator_open_editors_decorator_service_1.OpenEditorsTreeDecorator).toService(navigator_deleted_editor_decorator_1.NavigatorDeletedEditorDecorator);
    bind(widget_manager_1.WidgetFactory).toDynamicValue(({ container }) => ({
        id: navigator_open_editors_widget_1.OpenEditorsWidget.ID,
        createWidget: () => navigator_open_editors_widget_1.OpenEditorsWidget.createWidget(container)
    })).inSingletonScope();
    bind(navigator_widget_factory_1.NavigatorWidgetFactory).toSelf().inSingletonScope();
    bind(widget_manager_1.WidgetFactory).toService(navigator_widget_factory_1.NavigatorWidgetFactory);
    bind(browser_1.ApplicationShellLayoutMigration).to(navigator_layout_migrations_1.NavigatorLayoutVersion3Migration).inSingletonScope();
    bind(browser_1.ApplicationShellLayoutMigration).to(navigator_layout_migrations_1.NavigatorLayoutVersion5Migration).inSingletonScope();
    bind(navigator_diff_1.NavigatorDiff).toSelf().inSingletonScope();
    bind(navigator_tab_bar_decorator_1.NavigatorTabBarDecorator).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(navigator_tab_bar_decorator_1.NavigatorTabBarDecorator);
    bind(tab_bar_decorator_1.TabBarDecorator).toService(navigator_tab_bar_decorator_1.NavigatorTabBarDecorator);
    bind(navigator_symlink_decorator_1.NavigatorSymlinkDecorator).toSelf().inSingletonScope();
    bind(navigator_decorator_service_1.NavigatorTreeDecorator).toService(navigator_symlink_decorator_1.NavigatorSymlinkDecorator);
    bind(navigator_open_editors_decorator_service_1.OpenEditorsTreeDecorator).toService(navigator_symlink_decorator_1.NavigatorSymlinkDecorator);
});
//# sourceMappingURL=navigator-frontend-module.js.map