"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.MiniBrowserWsRequestValidator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const url = require("url");
const mini_browser_endpoint_1 = require("../common/mini-browser-endpoint");
/**
 * Prevents explicit WebSocket connections from the mini-browser virtual host.
 */
let MiniBrowserWsRequestValidator = class MiniBrowserWsRequestValidator {
    constructor() {
        this.serveSameOrigin = false;
    }
    init() {
        const pattern = process.env[mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_ENV] || mini_browser_endpoint_1.MiniBrowserEndpoint.HOST_PATTERN_DEFAULT;
        if (pattern === '{{hostname}}') {
            this.serveSameOrigin = true;
        }
        const vhostRe = pattern
            .replace(/\./g, '\\.')
            .replace('{{uuid}}', '.+')
            .replace('{{hostname}}', '.+');
        this.miniBrowserHostRe = new RegExp(vhostRe, 'i');
    }
    async allowWsUpgrade(request) {
        if (request.headers.origin && !this.serveSameOrigin) {
            const origin = url.parse(request.headers.origin);
            if (origin.host && this.miniBrowserHostRe.test(origin.host)) {
                // If the origin comes from the WebViews, refuse:
                return false;
            }
        }
        return true;
    }
};
exports.MiniBrowserWsRequestValidator = MiniBrowserWsRequestValidator;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MiniBrowserWsRequestValidator.prototype, "init", null);
exports.MiniBrowserWsRequestValidator = MiniBrowserWsRequestValidator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MiniBrowserWsRequestValidator);
//# sourceMappingURL=mini-browser-ws-validator.js.map