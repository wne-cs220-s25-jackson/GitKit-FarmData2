"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const variable_1 = require("./variable");
const variable_quick_open_service_1 = require("./variable-quick-open-service");
const variable_resolver_frontend_contribution_1 = require("./variable-resolver-frontend-contribution");
const variable_resolver_service_1 = require("./variable-resolver-service");
const common_variable_contribution_1 = require("./common-variable-contribution");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(variable_1.VariableRegistry).toSelf().inSingletonScope();
    bind(variable_resolver_service_1.VariableResolverService).toSelf().inSingletonScope();
    (0, core_1.bindContributionProvider)(bind, variable_1.VariableContribution);
    bind(variable_resolver_frontend_contribution_1.VariableResolverFrontendContribution).toSelf().inSingletonScope();
    for (const identifier of [browser_1.FrontendApplicationContribution, core_1.CommandContribution]) {
        bind(identifier).toService(variable_resolver_frontend_contribution_1.VariableResolverFrontendContribution);
    }
    bind(variable_quick_open_service_1.VariableQuickOpenService).toSelf().inSingletonScope();
    bind(common_variable_contribution_1.CommonVariableContribution).toSelf().inSingletonScope();
    bind(variable_1.VariableContribution).toService(common_variable_contribution_1.CommonVariableContribution);
});
//# sourceMappingURL=variable-resolver-frontend-module.js.map