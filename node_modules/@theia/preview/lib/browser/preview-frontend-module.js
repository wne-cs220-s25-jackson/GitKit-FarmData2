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
const uri_1 = require("@theia/core/lib/common/uri");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const preview_contribution_1 = require("./preview-contribution");
const preview_widget_1 = require("./preview-widget");
const preview_handler_1 = require("./preview-handler");
const preview_uri_1 = require("./preview-uri");
const markdown_1 = require("./markdown");
const preview_preferences_1 = require("./preview-preferences");
const preview_link_normalizer_1 = require("./preview-link-normalizer");
require("../../src/browser/style/index.css");
require("../../src/browser/markdown/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    (0, preview_preferences_1.bindPreviewPreferences)(bind);
    bind(preview_handler_1.PreviewHandlerProvider).toSelf().inSingletonScope();
    (0, common_1.bindContributionProvider)(bind, preview_handler_1.PreviewHandler);
    bind(markdown_1.MarkdownPreviewHandler).toSelf().inSingletonScope();
    bind(preview_handler_1.PreviewHandler).toService(markdown_1.MarkdownPreviewHandler);
    bind(preview_link_normalizer_1.PreviewLinkNormalizer).toSelf().inSingletonScope();
    bind(preview_widget_1.PreviewWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: preview_uri_1.PreviewUri.id,
        async createWidget(options) {
            const { container } = ctx;
            const resource = await container.get(common_1.ResourceProvider)(new uri_1.default(options.uri));
            const child = container.createChild();
            child.bind(preview_widget_1.PreviewWidgetOptions).toConstantValue({ resource });
            return child.get(preview_widget_1.PreviewWidget);
        }
    })).inSingletonScope();
    bind(preview_contribution_1.PreviewContribution).toSelf().inSingletonScope();
    [common_1.CommandContribution, common_1.MenuContribution, browser_1.OpenHandler, browser_1.FrontendApplicationContribution, tab_bar_toolbar_1.TabBarToolbarContribution].forEach(serviceIdentifier => bind(serviceIdentifier).toService(preview_contribution_1.PreviewContribution));
});
//# sourceMappingURL=preview-frontend-module.js.map