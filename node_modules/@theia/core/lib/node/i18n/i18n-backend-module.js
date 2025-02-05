"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
const localization_1 = require("../../common/i18n/localization");
const localization_provider_1 = require("./localization-provider");
const common_1 = require("../../common");
const localization_contribution_1 = require("./localization-contribution");
const localization_server_1 = require("./localization-server");
const theia_localization_contribution_1 = require("./theia-localization-contribution");
const localization_server_2 = require("../../common/i18n/localization-server");
const backend_application_1 = require("../backend-application");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(localization_provider_1.LocalizationProvider).toSelf().inSingletonScope();
    bind(common_1.ConnectionHandler).toDynamicValue(ctx => new common_1.RpcConnectionHandler(localization_1.localizationPath, () => ctx.container.get(localization_provider_1.LocalizationProvider))).inSingletonScope();
    bind(localization_contribution_1.LocalizationRegistry).toSelf().inSingletonScope();
    (0, common_1.bindContributionProvider)(bind, localization_contribution_1.LocalizationContribution);
    bind(localization_server_1.LocalizationServerImpl).toSelf().inSingletonScope();
    bind(localization_server_2.LocalizationServer).toService(localization_server_1.LocalizationServerImpl);
    bind(backend_application_1.BackendApplicationContribution).toService(localization_server_1.LocalizationServerImpl);
    bind(common_1.ConnectionHandler).toDynamicValue(ctx => new common_1.RpcConnectionHandler(localization_server_2.LocalizationServerPath, () => ctx.container.get(localization_server_2.LocalizationServer))).inSingletonScope();
    bind(theia_localization_contribution_1.TheiaLocalizationContribution).toSelf().inSingletonScope();
    bind(localization_contribution_1.LocalizationContribution).toService(theia_localization_contribution_1.TheiaLocalizationContribution);
});
//# sourceMappingURL=i18n-backend-module.js.map