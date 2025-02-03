"use strict";
// *****************************************************************************
// Copyright (C) 2018-2021 Google and others.
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
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const editor_preview_preferences_1 = require("./editor-preview-preferences");
const editor_preview_manager_1 = require("./editor-preview-manager");
const browser_2 = require("@theia/editor/lib/browser");
const editor_preview_widget_factory_1 = require("./editor-preview-widget-factory");
const editor_preview_contribution_1 = require("./editor-preview-contribution");
const common_1 = require("@theia/core/lib/common");
const navigator_open_editors_decorator_service_1 = require("@theia/navigator/lib/browser/open-editors-widget/navigator-open-editors-decorator-service");
const editor_preview_tree_decorator_1 = require("./editor-preview-tree-decorator");
exports.default = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    bind(editor_preview_widget_factory_1.EditorPreviewWidgetFactory).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toService(editor_preview_widget_factory_1.EditorPreviewWidgetFactory);
    bind(editor_preview_manager_1.EditorPreviewManager).toSelf().inSingletonScope();
    rebind(browser_2.EditorManager).toService(editor_preview_manager_1.EditorPreviewManager);
    bind(editor_preview_contribution_1.EditorPreviewContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(editor_preview_contribution_1.EditorPreviewContribution);
    bind(browser_1.KeybindingContribution).toService(editor_preview_contribution_1.EditorPreviewContribution);
    bind(common_1.MenuContribution).toService(editor_preview_contribution_1.EditorPreviewContribution);
    bind(editor_preview_tree_decorator_1.EditorPreviewTreeDecorator).toSelf().inSingletonScope();
    bind(navigator_open_editors_decorator_service_1.OpenEditorsTreeDecorator).toService(editor_preview_tree_decorator_1.EditorPreviewTreeDecorator);
    bind(browser_1.FrontendApplicationContribution).toService(editor_preview_tree_decorator_1.EditorPreviewTreeDecorator);
    (0, editor_preview_preferences_1.bindEditorPreviewPreferences)(bind);
});
//# sourceMappingURL=editor-preview-frontend-module.js.map