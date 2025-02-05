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
exports.WsRequestValidator = exports.WsRequestValidatorContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../common");
/**
 * Bind components to this symbol to filter WebSocket connections.
 */
exports.WsRequestValidatorContribution = Symbol('RequestValidatorContribution');
/**
 * Central handler of `WsRequestValidatorContribution`.
 */
let WsRequestValidator = class WsRequestValidator {
    /**
     * Ask all bound `WsRequestValidatorContributions` if the WebSocket connection should be allowed or not.
     */
    async allowWsUpgrade(request) {
        return new Promise(async (resolve) => {
            await Promise.all(Array.from(this.requestValidators.getContributions(), async (validator) => {
                if (!await validator.allowWsUpgrade(request)) {
                    resolve(false); // bail on first refusal
                }
            }));
            resolve(true);
        });
    }
};
exports.WsRequestValidator = WsRequestValidator;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.WsRequestValidatorContribution),
    tslib_1.__metadata("design:type", Object)
], WsRequestValidator.prototype, "requestValidators", void 0);
exports.WsRequestValidator = WsRequestValidator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WsRequestValidator);
//# sourceMappingURL=ws-request-validators.js.map