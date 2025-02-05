"use strict";
// *****************************************************************************
// Copyright (C) 2021 Red Hat, Inc. and others.
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
exports.CredentialsServiceImpl = exports.CredentialsService = void 0;
const tslib_1 = require("tslib");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// code copied and modified from https://github.com/microsoft/vscode/blob/1.55.2/src/vs/workbench/services/credentials/common/credentials.ts#L12
const inversify_1 = require("inversify");
const event_1 = require("../common/event");
const key_store_1 = require("../common/key-store");
exports.CredentialsService = Symbol('CredentialsService');
let CredentialsServiceImpl = class CredentialsServiceImpl {
    constructor(keytarService) {
        this.keytarService = keytarService;
        this.onDidChangePasswordEmitter = new event_1.Emitter();
        this.onDidChangePassword = this.onDidChangePasswordEmitter.event;
        this.credentialsProvider = new KeytarCredentialsProvider(this.keytarService);
    }
    getPassword(service, account) {
        return this.credentialsProvider.getPassword(service, account);
    }
    async setPassword(service, account, password) {
        await this.credentialsProvider.setPassword(service, account, password);
        this.onDidChangePasswordEmitter.fire({ service, account });
    }
    deletePassword(service, account) {
        const didDelete = this.credentialsProvider.deletePassword(service, account);
        this.onDidChangePasswordEmitter.fire({ service, account });
        return didDelete;
    }
    findPassword(service) {
        return this.credentialsProvider.findPassword(service);
    }
    findCredentials(service) {
        return this.credentialsProvider.findCredentials(service);
    }
};
exports.CredentialsServiceImpl = CredentialsServiceImpl;
exports.CredentialsServiceImpl = CredentialsServiceImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(key_store_1.KeyStoreService)),
    tslib_1.__metadata("design:paramtypes", [Object])
], CredentialsServiceImpl);
class KeytarCredentialsProvider {
    constructor(keytarService) {
        this.keytarService = keytarService;
    }
    deletePassword(service, account) {
        return this.keytarService.deletePassword(service, account);
    }
    findCredentials(service) {
        return this.keytarService.findCredentials(service);
    }
    findPassword(service) {
        return this.keytarService.findPassword(service);
    }
    getPassword(service, account) {
        return this.keytarService.getPassword(service, account);
    }
    setPassword(service, account, password) {
        return this.keytarService.setPassword(service, account, password);
    }
}
//# sourceMappingURL=credentials-service.js.map