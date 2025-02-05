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
const contribution_provider_1 = require("@theia/core/lib/common/contribution-provider");
const backend_application_1 = require("@theia/core/lib/node/backend-application");
const common_1 = require("@theia/core/lib/common");
const mini_browser_service_1 = require("../common/mini-browser-service");
const mini_browser_endpoint_1 = require("./mini-browser-endpoint");
const ws_request_validators_1 = require("@theia/core/lib/node/ws-request-validators");
const mini_browser_ws_validator_1 = require("./mini-browser-ws-validator");
const mini_browser_backend_security_warnings_1 = require("./mini-browser-backend-security-warnings");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(mini_browser_endpoint_1.MiniBrowserEndpoint).toSelf().inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).toService(mini_browser_endpoint_1.MiniBrowserEndpoint);
    bind(mini_browser_ws_validator_1.MiniBrowserWsRequestValidator).toSelf().inSingletonScope();
    bind(ws_request_validators_1.WsRequestValidatorContribution).toService(mini_browser_ws_validator_1.MiniBrowserWsRequestValidator);
    bind(mini_browser_service_1.MiniBrowserService).toService(mini_browser_endpoint_1.MiniBrowserEndpoint);
    bind(common_1.ConnectionHandler).toDynamicValue(context => new common_1.RpcConnectionHandler(mini_browser_service_1.MiniBrowserServicePath, () => context.container.get(mini_browser_service_1.MiniBrowserService))).inSingletonScope();
    (0, contribution_provider_1.bindContributionProvider)(bind, mini_browser_endpoint_1.MiniBrowserEndpointHandler);
    bind(mini_browser_endpoint_1.MiniBrowserEndpointHandler).to(mini_browser_endpoint_1.HtmlHandler).inSingletonScope();
    bind(mini_browser_endpoint_1.MiniBrowserEndpointHandler).to(mini_browser_endpoint_1.ImageHandler).inSingletonScope();
    bind(mini_browser_endpoint_1.MiniBrowserEndpointHandler).to(mini_browser_endpoint_1.PdfHandler).inSingletonScope();
    bind(mini_browser_endpoint_1.MiniBrowserEndpointHandler).to(mini_browser_endpoint_1.SvgHandler).inSingletonScope();
    bind(mini_browser_backend_security_warnings_1.MiniBrowserBackendSecurityWarnings).toSelf().inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).toService(mini_browser_backend_security_warnings_1.MiniBrowserBackendSecurityWarnings);
});
//# sourceMappingURL=mini-browser-backend-module.js.map