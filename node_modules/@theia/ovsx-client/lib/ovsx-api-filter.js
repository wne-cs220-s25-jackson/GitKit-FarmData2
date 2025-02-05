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
exports.OVSXApiFilterImpl = exports.OVSXApiFilter = exports.OVSXApiFilterProvider = void 0;
const semver = require("semver");
const ovsx_types_1 = require("./ovsx-types");
exports.OVSXApiFilterProvider = Symbol('OVSXApiFilterProvider');
exports.OVSXApiFilter = Symbol('OVSXApiFilter');
class OVSXApiFilterImpl {
    constructor(client, supportedApiVersion) {
        this.client = client;
        this.supportedApiVersion = supportedApiVersion;
    }
    async findLatestCompatibleExtension(query) {
        const targetPlatform = query.targetPlatform;
        if (!targetPlatform) {
            return this.queryLatestCompatibleExtension(query);
        }
        const latestWithTargetPlatform = await this.queryLatestCompatibleExtension(query);
        let latestUniversal;
        if (targetPlatform !== 'universal' && targetPlatform !== 'web') {
            // Additionally query the universal version, as there might be a newer one available
            latestUniversal = await this.queryLatestCompatibleExtension({ ...query, targetPlatform: 'universal' });
        }
        if (latestWithTargetPlatform && latestUniversal) {
            // Prefer the version with the target platform if it's greater or equal to the universal version
            return this.versionGreaterThanOrEqualTo(latestWithTargetPlatform.version, latestUniversal.version) ? latestWithTargetPlatform : latestUniversal;
        }
        return latestWithTargetPlatform !== null && latestWithTargetPlatform !== void 0 ? latestWithTargetPlatform : latestUniversal;
    }
    async queryLatestCompatibleExtension(query) {
        let offset = 0;
        let size = 5;
        let loop = true;
        while (loop) {
            const queryOptions = {
                ...query,
                offset,
                size // there is a great chance that the newest version will work
            };
            const results = await this.client.query(queryOptions);
            const compatibleExtension = this.getLatestCompatibleExtension(results.extensions);
            if (compatibleExtension) {
                return compatibleExtension;
            }
            // Adjust offset by the amount of returned extensions
            offset += results.extensions.length;
            // Continue querying if there are more extensions available
            loop = results.totalSize > offset;
            // Adjust the size to fetch more extensions next time
            size = Math.min(size * 2, 100);
        }
        return undefined;
    }
    getLatestCompatibleExtension(extensions) {
        if (extensions.length === 0) {
            return;
        }
        else if (this.isBuiltinNamespace(extensions[0].namespace.toLowerCase())) {
            return extensions.find(extension => this.versionGreaterThanOrEqualTo(this.supportedApiVersion, extension.version));
        }
        else {
            return extensions.find(extension => { var _a, _b; return this.supportedVscodeApiSatisfies((_b = (_a = extension.engines) === null || _a === void 0 ? void 0 : _a.vscode) !== null && _b !== void 0 ? _b : '*'); });
        }
    }
    getLatestCompatibleVersion(searchEntry) {
        function getLatestCompatibleVersion(predicate) {
            if (searchEntry.allVersions) {
                return searchEntry.allVersions.find(predicate);
            }
            // If the allVersions field is missing then try to use the
            // searchEntry as VSXAllVersions and check if it's compatible:
            if (predicate(searchEntry)) {
                return searchEntry;
            }
        }
        if (this.isBuiltinNamespace(searchEntry.namespace)) {
            return getLatestCompatibleVersion(allVersions => this.versionGreaterThanOrEqualTo(this.supportedApiVersion, allVersions.version));
        }
        else {
            return getLatestCompatibleVersion(allVersions => { var _a, _b; return this.supportedVscodeApiSatisfies((_b = (_a = allVersions.engines) === null || _a === void 0 ? void 0 : _a.vscode) !== null && _b !== void 0 ? _b : '*'); });
        }
    }
    isBuiltinNamespace(namespace) {
        return ovsx_types_1.VSXBuiltinNamespaces.is(namespace);
    }
    /**
     * @returns `a >= b`
     */
    versionGreaterThanOrEqualTo(a, b) {
        const versionA = semver.clean(a);
        const versionB = semver.clean(b);
        if (!versionA || !versionB) {
            return false;
        }
        return semver.gte(versionA, versionB);
    }
    supportedVscodeApiSatisfies(vscodeApiRange) {
        return semver.satisfies(this.supportedApiVersion, vscodeApiRange);
    }
}
exports.OVSXApiFilterImpl = OVSXApiFilterImpl;
//# sourceMappingURL=ovsx-api-filter.js.map