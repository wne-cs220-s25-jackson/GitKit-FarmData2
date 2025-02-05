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
exports.ElectronWsOriginValidator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const backend_remote_service_1 = require("../../node/remote/backend-remote-service");
let ElectronWsOriginValidator = class ElectronWsOriginValidator {
    allowWsUpgrade(request) {
        // If we are running as a remote server, requests will come from an http endpoint
        if (this.backendRemoteService.isRemoteServer()) {
            return true;
        }
        // On Electron the main page is served from the `file` protocol.
        // We don't expect the requests to come from anywhere else.
        return request.headers.origin === 'file://';
    }
};
exports.ElectronWsOriginValidator = ElectronWsOriginValidator;
tslib_1.__decorate([
    (0, inversify_1.inject)(backend_remote_service_1.BackendRemoteService),
    tslib_1.__metadata("design:type", backend_remote_service_1.BackendRemoteService)
], ElectronWsOriginValidator.prototype, "backendRemoteService", void 0);
exports.ElectronWsOriginValidator = ElectronWsOriginValidator = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronWsOriginValidator);
//# sourceMappingURL=electron-ws-origin-validator.js.map