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
exports.WebviewBackendSecurityWarnings = void 0;
const tslib_1 = require("tslib");
const backend_application_config_provider_1 = require("@theia/core/lib/node/backend-application-config-provider");
const inversify_1 = require("@theia/core/shared/inversify");
const webview_protocol_1 = require("../common/webview-protocol");
let WebviewBackendSecurityWarnings = class WebviewBackendSecurityWarnings {
    initialize() {
        this.checkHostPattern();
    }
    async checkHostPattern() {
        if (backend_application_config_provider_1.BackendApplicationConfigProvider.get()['warnOnPotentiallyInsecureHostPattern'] === false) {
            return;
        }
        const envHostPattern = process.env[webview_protocol_1.WebviewExternalEndpoint.pattern];
        if (envHostPattern && envHostPattern !== webview_protocol_1.WebviewExternalEndpoint.defaultPattern) {
            console.warn(`\
WEBVIEW SECURITY WARNING

    Changing the @theia/plugin-ext webview host pattern can lead to security vulnerabilities.
        Current pattern: "${envHostPattern}"
    Please read @theia/plugin-ext/README.md for more information.
`);
        }
    }
};
exports.WebviewBackendSecurityWarnings = WebviewBackendSecurityWarnings;
exports.WebviewBackendSecurityWarnings = WebviewBackendSecurityWarnings = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WebviewBackendSecurityWarnings);
//# sourceMappingURL=webview-backend-security-warnings.js.map