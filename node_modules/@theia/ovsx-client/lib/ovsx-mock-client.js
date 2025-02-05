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
exports.OVSXMockClient = void 0;
/**
 * Querying will only find exact matches.
 * Searching will try to find the query string in various fields.
 */
class OVSXMockClient {
    constructor(extensions = []) {
        this.extensions = extensions;
    }
    setExtensions(extensions) {
        this.extensions = extensions;
        return this;
    }
    /**
     * @param baseUrl required to construct the URLs required by {@link VSXExtensionRaw}.
     * @param ids list of ids to generate {@link VSXExtensionRaw} from.
     */
    setExtensionsFromIds(baseUrl, ids) {
        const now = Date.now();
        const url = new OVSXMockClient.UrlBuilder(baseUrl);
        this.extensions = ids.map((extension, i) => {
            const [id, version = '0.0.1'] = extension.split('@', 2);
            const [namespace, name] = id.split('.', 2);
            return {
                allVersions: {
                    [version]: url.extensionUrl(namespace, name, `/${version}`)
                },
                displayName: name,
                downloadCount: 0,
                files: {
                    download: url.extensionFileUrl(namespace, name, version, `/${id}-${version}.vsix`)
                },
                name,
                namespace,
                namespaceAccess: 'public',
                namespaceUrl: url.namespaceUrl(namespace),
                publishedBy: {
                    loginName: 'mock'
                },
                reviewCount: 0,
                reviewsUrl: url.extensionReviewsUrl(namespace, name),
                timestamp: new Date(now - ids.length + i + 1).toISOString(),
                version,
                description: `Mock VS Code Extension for ${id}`,
                namespaceDisplayName: name,
                preRelease: false
            };
        });
        return this;
    }
    async query(queryOptions) {
        const extensions = this.extensions
            .filter(extension => typeof queryOptions === 'object' && (this.compare(queryOptions.extensionId, this.id(extension)) &&
            this.compare(queryOptions.extensionName, extension.name) &&
            this.compare(queryOptions.extensionVersion, extension.version) &&
            this.compare(queryOptions.namespaceName, extension.namespace)));
        return {
            offset: 0,
            totalSize: extensions.length,
            extensions
        };
    }
    async search(searchOptions) {
        var _a, _b;
        const query = searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.query;
        const offset = (_a = searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.offset) !== null && _a !== void 0 ? _a : 0;
        const size = (_b = searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.size) !== null && _b !== void 0 ? _b : 18;
        const end = offset + size;
        return {
            offset,
            extensions: this.extensions
                .filter(extension => typeof query !== 'string' || (this.includes(query, this.id(extension)) ||
                this.includes(query, extension.description) ||
                this.includes(query, extension.displayName)))
                .sort((a, b) => this.sort(a, b, searchOptions))
                .filter((extension, i) => i >= offset && i < end)
                .map(extension => ({
                downloadCount: extension.downloadCount,
                files: extension.files,
                name: extension.name,
                namespace: extension.namespace,
                timestamp: extension.timestamp,
                url: `${extension.namespaceUrl}/${extension.name}`,
                version: extension.version,
            }))
        };
    }
    id(extension) {
        return `${extension.namespace}.${extension.name}`;
    }
    /**
     * Case sensitive.
     */
    compare(expected, value) {
        return expected === undefined || value === undefined || expected === value;
    }
    /**
     * Case insensitive.
     */
    includes(needle, value) {
        return value === undefined || value.toLowerCase().includes(needle.toLowerCase());
    }
    sort(a, b, searchOptions) {
        var _a, _b, _c, _d;
        let order = 0;
        const sortBy = (_a = searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.sortBy) !== null && _a !== void 0 ? _a : 'relevance';
        const sortOrder = (_b = searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.sortOrder) !== null && _b !== void 0 ? _b : 'desc';
        if (sortBy === 'averageRating') {
            order = ((_c = a.averageRating) !== null && _c !== void 0 ? _c : -1) - ((_d = b.averageRating) !== null && _d !== void 0 ? _d : -1);
        }
        else if (sortBy === 'downloadCount') {
            order = a.downloadCount - b.downloadCount;
        }
        else if (sortBy === 'relevance') {
            order = 0;
        }
        else if (sortBy === 'timestamp') {
            order = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
        if (sortOrder === 'asc') {
            order *= -1;
        }
        return order;
    }
}
exports.OVSXMockClient = OVSXMockClient;
(function (OVSXMockClient) {
    /**
     * URLs should respect the official OpenVSX API:
     * https://open-vsx.org/swagger-ui/index.html
     */
    class UrlBuilder {
        constructor(baseUrl) {
            this.baseUrl = baseUrl;
        }
        url(path) {
            return this.baseUrl + path;
        }
        apiUrl(path) {
            return this.url(`/api${path}`);
        }
        namespaceUrl(namespace, path = '') {
            return this.apiUrl(`/${namespace}${path}`);
        }
        extensionUrl(namespace, name, path = '') {
            return this.apiUrl(`/${namespace}/${name}${path}`);
        }
        extensionReviewsUrl(namespace, name) {
            return this.apiUrl(`/${namespace}/${name}/reviews`);
        }
        extensionFileUrl(namespace, name, version, path = '') {
            return this.apiUrl(`/${namespace}/${name}/${version}/file${path}`);
        }
    }
    OVSXMockClient.UrlBuilder = UrlBuilder;
})(OVSXMockClient || (exports.OVSXMockClient = OVSXMockClient = {}));
//# sourceMappingURL=ovsx-mock-client.js.map