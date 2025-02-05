"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
const common_1 = require("../common");
const request_1 = require("@theia/core/shared/@theia/request");
const ovsx_client_1 = require("@theia/ovsx-client");
const vsx_environment_1 = require("./vsx-environment");
const limiter_1 = require("limiter");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(common_1.OVSXUrlResolver)
        .toFunction((url) => url);
    bind(common_1.OVSXClientProvider)
        .toDynamicValue(ctx => {
        var _a;
        const vsxEnvironment = ctx.container.get(vsx_environment_1.VSXEnvironment);
        const requestService = ctx.container.get(request_1.RequestService);
        const urlResolver = ctx.container.get(common_1.OVSXUrlResolver);
        const clientPromise = Promise
            .all([
            vsxEnvironment.getRegistryApiUri(),
            (_a = vsxEnvironment.getOvsxRouterConfig) === null || _a === void 0 ? void 0 : _a.call(vsxEnvironment),
            vsxEnvironment.getRateLimit()
        ])
            .then(async ([apiUrl, ovsxRouterConfig, rateLimit]) => {
            const rateLimiter = new limiter_1.RateLimiter({
                interval: 'second',
                tokensPerInterval: rateLimit
            });
            if (ovsxRouterConfig) {
                const clientFactory = ovsx_client_1.OVSXHttpClient.createClientFactory(requestService, rateLimiter);
                return ovsx_client_1.OVSXRouterClient.FromConfig(ovsxRouterConfig, async (url) => clientFactory(await urlResolver(url)), [ovsx_client_1.RequestContainsFilterFactory, ovsx_client_1.ExtensionIdMatchesFilterFactory]);
            }
            return new ovsx_client_1.OVSXHttpClient(await urlResolver(apiUrl), requestService, rateLimiter);
        });
        // reuse the promise for subsequent calls to this provider
        return () => clientPromise;
    })
        .inSingletonScope();
    bind(ovsx_client_1.OVSXApiFilter)
        .toDynamicValue(ctx => {
        const vsxEnvironment = ctx.container.get(vsx_environment_1.VSXEnvironment);
        const apiFilter = new ovsx_client_1.OVSXApiFilterImpl(undefined, '-- temporary invalid version value --');
        vsxEnvironment.getVscodeApiVersion()
            .then(apiVersion => apiFilter.supportedApiVersion = apiVersion);
        const clientProvider = ctx.container.get(common_1.OVSXClientProvider);
        Promise.resolve(clientProvider()).then(client => {
            apiFilter.client = client;
        });
        return apiFilter;
    })
        .inSingletonScope();
    bind(ovsx_client_1.OVSXApiFilterProvider)
        .toProvider(ctx => async () => {
        const vsxEnvironment = ctx.container.get(vsx_environment_1.VSXEnvironment);
        const clientProvider = ctx.container.get(common_1.OVSXClientProvider);
        const client = await clientProvider();
        const apiVersion = await vsxEnvironment.getVscodeApiVersion();
        const apiFilter = new ovsx_client_1.OVSXApiFilterImpl(client, apiVersion);
        return apiFilter;
    });
});
//# sourceMappingURL=vsx-registry-common-module.js.map