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
exports.ElectronTokenValidator = void 0;
const tslib_1 = require("tslib");
const cookie = require("cookie");
const crypto = require("crypto");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const electron_token_1 = require("../../electron-common/electron-token");
/**
 * On Electron, we want to make sure that only Electron's browser-windows access the backend services.
 */
let ElectronTokenValidator = class ElectronTokenValidator {
    init() {
        this.electronSecurityToken = this.getToken();
    }
    allowWsUpgrade(request) {
        return this.allowRequest(request);
    }
    /**
     * Expects the token to be passed via cookies by default.
     */
    allowRequest(request) {
        if (!this.electronSecurityToken) {
            return true;
        }
        const cookieHeader = request.headers.cookie;
        if ((0, common_1.isString)(cookieHeader)) {
            const token = cookie.parse(cookieHeader)[electron_token_1.ElectronSecurityToken];
            if ((0, common_1.isString)(token)) {
                return this.isTokenValid(JSON.parse(token));
            }
        }
        return false;
    }
    /**
     * Validates a token.
     *
     * This method both checks the shape of the parsed token data and its actual value.
     *
     * @param token Parsed object sent by the client as the token.
     */
    isTokenValid(token) {
        if ((0, common_1.isObject)(token) && (0, common_1.isString)(token.value)) {
            try {
                const received = Buffer.from(token.value, 'utf8');
                const expected = Buffer.from(this.electronSecurityToken.value, 'utf8');
                return received.byteLength === expected.byteLength && crypto.timingSafeEqual(received, expected);
            }
            catch (error) {
                console.error(error);
            }
        }
        return false;
    }
    /**
     * Returns the token to compare to when authorizing requests.
     */
    getToken() {
        const token = process.env[electron_token_1.ElectronSecurityToken];
        if (token) {
            return JSON.parse(token);
        }
        else {
            // No token has been passed to the backend server
            // That indicates we're running without a local frontend
            return undefined;
        }
    }
};
exports.ElectronTokenValidator = ElectronTokenValidator;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ElectronTokenValidator.prototype, "init", null);
exports.ElectronTokenValidator = ElectronTokenValidator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronTokenValidator);
//# sourceMappingURL=electron-token-validator.js.map