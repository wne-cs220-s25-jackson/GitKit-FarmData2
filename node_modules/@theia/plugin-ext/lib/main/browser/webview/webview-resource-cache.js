"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.WebviewResourceCache = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const promise_util_1 = require("@theia/core/lib/common/promise-util");
/**
 * Browser based cache of webview resources across all instances.
 */
let WebviewResourceCache = class WebviewResourceCache {
    constructor() {
        this.cache = new promise_util_1.Deferred();
        this.resolveCache();
    }
    async resolveCache() {
        try {
            this.cache.resolve(await caches.open('webview:v1'));
        }
        catch (e) {
            console.error('Failed to enable webview caching: ', e);
            this.cache.resolve(undefined);
        }
    }
    async match(url) {
        const cache = await this.cache.promise;
        if (!cache) {
            return undefined;
        }
        const response = await cache.match(url);
        if (!response) {
            return undefined;
        }
        return {
            eTag: response.headers.get('ETag') || undefined,
            body: async () => {
                const buffer = await response.arrayBuffer();
                return new Uint8Array(buffer);
            }
        };
    }
    async delete(url) {
        const cache = await this.cache.promise;
        if (!cache) {
            return false;
        }
        return cache.delete(url);
    }
    async put(url, response) {
        if (!response.eTag) {
            return;
        }
        const cache = await this.cache.promise;
        if (!cache) {
            return;
        }
        const body = await response.body();
        await cache.put(url, new Response(body, {
            status: 200,
            headers: { 'ETag': response.eTag }
        }));
    }
};
exports.WebviewResourceCache = WebviewResourceCache;
exports.WebviewResourceCache = WebviewResourceCache = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], WebviewResourceCache);
//# sourceMappingURL=webview-resource-cache.js.map