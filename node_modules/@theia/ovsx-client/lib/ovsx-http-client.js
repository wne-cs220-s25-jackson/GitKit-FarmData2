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
exports.OVSXHttpClient = exports.OVSX_RATE_LIMIT = void 0;
const request_1 = require("@theia/request");
const limiter_1 = require("limiter");
exports.OVSX_RATE_LIMIT = 15;
class OVSXHttpClient {
    /**
     * @param requestService
     * @returns factory that will cache clients based on the requested input URL.
     */
    static createClientFactory(requestService, rateLimiter) {
        // eslint-disable-next-line no-null/no-null
        const cachedClients = Object.create(null);
        return url => { var _a; return (_a = cachedClients[url]) !== null && _a !== void 0 ? _a : (cachedClients[url] = new this(url, requestService, rateLimiter)); };
    }
    constructor(vsxRegistryUrl, requestService, rateLimiter = new limiter_1.RateLimiter({ tokensPerInterval: exports.OVSX_RATE_LIMIT, interval: 'second' })) {
        this.vsxRegistryUrl = vsxRegistryUrl;
        this.requestService = requestService;
        this.rateLimiter = rateLimiter;
    }
    search(searchOptions) {
        return this.requestJson(this.buildUrl('api/-/search', searchOptions));
    }
    query(queryOptions) {
        return this.requestJson(this.buildUrl('api/v2/-/query', queryOptions));
    }
    async requestJson(url) {
        const attempts = 5;
        for (let i = 0; i < attempts; i++) {
            // Use 1, 2, 4, 8, 16 tokens for each attempt
            const tokenCount = Math.pow(2, i);
            await this.rateLimiter.removeTokens(tokenCount);
            const context = await this.requestService.request({
                url,
                headers: { 'Accept': 'application/json' }
            });
            if (context.res.statusCode === 429) {
                console.warn('OVSX rate limit exceeded. Consider reducing the rate limit.');
                // If there are still more attempts left, retry the request with a higher token count
                if (i < attempts - 1) {
                    continue;
                }
            }
            return request_1.RequestContext.asJson(context);
        }
        throw new Error('Failed to fetch data from OVSX.');
    }
    buildUrl(url, query) {
        return new URL(`${url}${this.buildQueryString(query)}`, this.vsxRegistryUrl).toString();
    }
    buildQueryString(searchQuery) {
        if (!searchQuery) {
            return '';
        }
        let queryString = '';
        for (const [key, value] of Object.entries(searchQuery)) {
            if (typeof value === 'string') {
                queryString += `&${key}=${encodeURIComponent(value)}`;
            }
            else if (typeof value === 'boolean' || typeof value === 'number') {
                queryString += `&${key}=${value}`;
            }
        }
        return queryString && '?' + queryString.slice(1);
    }
}
exports.OVSXHttpClient = OVSXHttpClient;
//# sourceMappingURL=ovsx-http-client.js.map