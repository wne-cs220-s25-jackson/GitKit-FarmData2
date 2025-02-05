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
exports.ExternalUriService = void 0;
const tslib_1 = require("tslib");
const environment_1 = require("@theia/application-package/lib/environment");
const inversify_1 = require("inversify");
const endpoint_1 = require("./endpoint");
let ExternalUriService = class ExternalUriService {
    /**
     * Maps local to remote URLs.
     * Should be no-op if the given URL is not a localhost URL.
     *
     * By default maps to an origin serving Theia.
     *
     * Use `parseLocalhost` to retrieve localhost address and port information.
     */
    resolve(uri) {
        const address = this.parseLocalhost(uri);
        if (address) {
            return this.toRemoteUrl(uri, address);
        }
        return uri;
    }
    parseLocalhost(uri) {
        if (uri.scheme !== 'http' && uri.scheme !== 'https') {
            return;
        }
        const localhostMatch = /^(localhost|127\.0\.0\.1|0\.0\.0\.0):(\d+)$/.exec(uri.authority);
        if (!localhostMatch) {
            return;
        }
        return {
            address: localhostMatch[1],
            port: +localhostMatch[2],
        };
    }
    toRemoteUrl(uri, address) {
        return new endpoint_1.Endpoint({ host: this.toRemoteHost(address) })
            .getRestUrl()
            .withPath(uri.path)
            .withFragment(uri.fragment)
            .withQuery(uri.query);
    }
    toRemoteHost(address) {
        return `${this.getRemoteHost()}:${address.port}`;
    }
    /**
     * @returns The remote host (where the backend is running).
     */
    getRemoteHost() {
        return environment_1.environment.electron.is() ? 'localhost' : window.location.hostname;
    }
};
exports.ExternalUriService = ExternalUriService;
exports.ExternalUriService = ExternalUriService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ExternalUriService);
//# sourceMappingURL=external-uri-service.js.map