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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("@theia/core/shared/inversify");
const output_widget_1 = require("./output-widget");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const output_channel_1 = require("./output-channel");
const output_preferences_1 = require("./output-preferences");
const output_toolbar_contribution_1 = require("./output-toolbar-contribution");
const output_contribution_1 = require("./output-contribution");
const monaco_editor_provider_1 = require("@theia/monaco/lib/browser/monaco-editor-provider");
const output_context_menu_1 = require("./output-context-menu");
const output_editor_factory_1 = require("./output-editor-factory");
const monaco_text_model_service_1 = require("@theia/monaco/lib/browser/monaco-text-model-service");
const output_editor_model_factory_1 = require("./output-editor-model-factory");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(output_channel_1.OutputChannelManager).toSelf().inSingletonScope();
    bind(common_1.ResourceResolver).toService(output_channel_1.OutputChannelManager);
    bind(output_editor_factory_1.OutputEditorFactory).toSelf().inSingletonScope();
    bind(monaco_editor_provider_1.MonacoEditorFactory).toService(output_editor_factory_1.OutputEditorFactory);
    bind(output_editor_model_factory_1.OutputEditorModelFactory).toSelf().inSingletonScope();
    bind(monaco_text_model_service_1.MonacoEditorModelFactory).toService(output_editor_model_factory_1.OutputEditorModelFactory);
    bind(output_context_menu_1.OutputContextMenuService).toSelf().inSingletonScope();
    (0, output_preferences_1.bindOutputPreferences)(bind);
    bind(output_widget_1.OutputWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(context => ({
        id: output_widget_1.OutputWidget.ID,
        createWidget: () => context.container.get(output_widget_1.OutputWidget)
    }));
    (0, browser_1.bindViewContribution)(bind, output_contribution_1.OutputContribution);
    bind(browser_1.OpenHandler).to(output_contribution_1.OutputContribution).inSingletonScope();
    bind(output_toolbar_contribution_1.OutputToolbarContribution).toSelf().inSingletonScope();
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(output_toolbar_contribution_1.OutputToolbarContribution);
});
//# sourceMappingURL=output-frontend-module.js.map