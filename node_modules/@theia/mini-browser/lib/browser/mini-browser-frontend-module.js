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
require("../../src/browser/style/index.css");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const opener_service_1 = require("@theia/core/lib/browser/opener-service");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const ws_connection_provider_1 = require("@theia/core/lib/browser/messaging/ws-connection-provider");
const frontend_application_contribution_1 = require("@theia/core/lib/browser/frontend-application-contribution");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const command_1 = require("@theia/core/lib/common/command");
const menu_1 = require("@theia/core/lib/common/menu");
const mini_browser_open_handler_1 = require("./mini-browser-open-handler");
const mini_browser_service_1 = require("../common/mini-browser-service");
const mini_browser_1 = require("./mini-browser");
const mini_browser_content_1 = require("./mini-browser-content");
const location_mapper_service_1 = require("./location-mapper-service");
const mini_browser_frontend_security_warnings_1 = require("./mini-browser-frontend-security-warnings");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(mini_browser_content_1.MiniBrowserContent).toSelf();
    bind(mini_browser_content_1.MiniBrowserContentFactory).toFactory(context => (props) => {
        const { container } = context;
        const child = container.createChild();
        child.bind(mini_browser_content_1.MiniBrowserProps).toConstantValue(props);
        return child.get(mini_browser_content_1.MiniBrowserContent);
    });
    bind(mini_browser_1.MiniBrowser).toSelf();
    bind(widget_manager_1.WidgetFactory).toDynamicValue(context => ({
        id: mini_browser_1.MiniBrowser.ID,
        async createWidget(options) {
            const { container } = context;
            const child = container.createChild();
            const uri = new uri_1.default(options.uri);
            child.bind(mini_browser_1.MiniBrowserOptions).toConstantValue({ uri });
            return child.get(mini_browser_1.MiniBrowser);
        }
    })).inSingletonScope();
    bind(mini_browser_open_handler_1.MiniBrowserOpenHandler).toSelf().inSingletonScope();
    bind(opener_service_1.OpenHandler).toService(mini_browser_open_handler_1.MiniBrowserOpenHandler);
    bind(frontend_application_contribution_1.FrontendApplicationContribution).toService(mini_browser_open_handler_1.MiniBrowserOpenHandler);
    bind(command_1.CommandContribution).toService(mini_browser_open_handler_1.MiniBrowserOpenHandler);
    bind(menu_1.MenuContribution).toService(mini_browser_open_handler_1.MiniBrowserOpenHandler);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(mini_browser_open_handler_1.MiniBrowserOpenHandler);
    (0, contribution_provider_1.bindContributionProvider)(bind, location_mapper_service_1.LocationMapper);
    bind(location_mapper_service_1.LocationMapper).to(location_mapper_service_1.FileLocationMapper).inSingletonScope();
    bind(location_mapper_service_1.LocationMapper).to(location_mapper_service_1.HttpLocationMapper).inSingletonScope();
    bind(location_mapper_service_1.LocationMapper).to(location_mapper_service_1.HttpsLocationMapper).inSingletonScope();
    bind(location_mapper_service_1.LocationWithoutSchemeMapper).toSelf().inSingletonScope();
    bind(location_mapper_service_1.LocationMapper).toService(location_mapper_service_1.LocationWithoutSchemeMapper);
    bind(location_mapper_service_1.LocationMapperService).toSelf().inSingletonScope();
    bind(mini_browser_service_1.MiniBrowserService).toDynamicValue(ctx => ws_connection_provider_1.WebSocketConnectionProvider.createProxy(ctx.container, mini_browser_service_1.MiniBrowserServicePath)).inSingletonScope();
    bind(mini_browser_frontend_security_warnings_1.MiniBrowserFrontendSecurityWarnings).toSelf().inSingletonScope();
    bind(frontend_application_contribution_1.FrontendApplicationContribution).toService(mini_browser_frontend_security_warnings_1.MiniBrowserFrontendSecurityWarnings);
});
//# sourceMappingURL=mini-browser-frontend-module.js.map