"use strict";
// *****************************************************************************
// Copyright (C) 2023 TypeFox and others.
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
const inversify_1 = require("inversify");
const preloader_1 = require("./preloader");
const contribution_provider_1 = require("../../common/contribution-provider");
const i18n_preload_contribution_1 = require("./i18n-preload-contribution");
const os_preload_contribution_1 = require("./os-preload-contribution");
const theme_preload_contribution_1 = require("./theme-preload-contribution");
const localization_server_1 = require("../../common/i18n/localization-server");
const ws_connection_provider_1 = require("../messaging/ws-connection-provider");
const os_1 = require("../../common/os");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(preloader_1.Preloader).toSelf().inSingletonScope();
    (0, contribution_provider_1.bindContributionProvider)(bind, preloader_1.PreloadContribution);
    bind(localization_server_1.LocalizationServer).toDynamicValue(ctx => ws_connection_provider_1.WebSocketConnectionProvider.createProxy(ctx.container, localization_server_1.LocalizationServerPath)).inSingletonScope();
    bind(os_1.OSBackendProvider).toDynamicValue(ctx => ws_connection_provider_1.WebSocketConnectionProvider.createProxy(ctx.container, os_1.OSBackendProviderPath)).inSingletonScope();
    bind(i18n_preload_contribution_1.I18nPreloadContribution).toSelf().inSingletonScope();
    bind(preloader_1.PreloadContribution).toService(i18n_preload_contribution_1.I18nPreloadContribution);
    bind(os_preload_contribution_1.OSPreloadContribution).toSelf().inSingletonScope();
    bind(preloader_1.PreloadContribution).toService(os_preload_contribution_1.OSPreloadContribution);
    bind(theme_preload_contribution_1.ThemePreloadContribution).toSelf().inSingletonScope();
    bind(preloader_1.PreloadContribution).toService(theme_preload_contribution_1.ThemePreloadContribution);
});
//# sourceMappingURL=preload-module.js.map