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
var KeyStoreServiceImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCredentialsProvider = exports.KeyStoreServiceImpl = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../common");
let KeyStoreServiceImpl = KeyStoreServiceImpl_1 = class KeyStoreServiceImpl {
    async setPassword(service, account, password) {
        const keytar = await this.getKeytar();
        if (common_1.isWindows && password.length > KeyStoreServiceImpl_1.MAX_PASSWORD_LENGTH) {
            let index = 0;
            let chunk = 0;
            let hasNextChunk = true;
            while (hasNextChunk) {
                const passwordChunk = password.substring(index, index + KeyStoreServiceImpl_1.PASSWORD_CHUNK_SIZE);
                index += KeyStoreServiceImpl_1.PASSWORD_CHUNK_SIZE;
                hasNextChunk = password.length - index > 0;
                const content = {
                    content: passwordChunk,
                    hasNextChunk: hasNextChunk
                };
                await keytar.setPassword(service, chunk ? `${account}-${chunk}` : account, JSON.stringify(content));
                chunk++;
            }
        }
        else {
            await keytar.setPassword(service, account, password);
        }
    }
    async deletePassword(service, account) {
        const keytar = await this.getKeytar();
        return keytar.deletePassword(service, account);
    }
    async getPassword(service, account) {
        const keytar = await this.getKeytar();
        const password = await keytar.getPassword(service, account);
        if (password) {
            try {
                let { content, hasNextChunk } = JSON.parse(password);
                if (!content || !hasNextChunk) {
                    return password;
                }
                let index = 1;
                while (hasNextChunk) {
                    const nextChunk = await keytar.getPassword(service, `${account}-${index++}`);
                    const result = JSON.parse(nextChunk);
                    content += result.content;
                    hasNextChunk = result.hasNextChunk;
                }
                return content;
            }
            catch {
                return password;
            }
        }
    }
    async findPassword(service) {
        const keytar = await this.getKeytar();
        const password = await keytar.findPassword(service);
        return password !== null && password !== void 0 ? password : undefined;
    }
    async findCredentials(service) {
        const keytar = await this.getKeytar();
        return keytar.findCredentials(service);
    }
    async getKeytar() {
        if (this.keytarImplementation) {
            return this.keytarImplementation;
        }
        try {
            this.keytarImplementation = await Promise.resolve().then(() => require('keytar'));
            // Try using keytar to see if it throws or not.
            await this.keytarImplementation.findCredentials('test-keytar-loads');
        }
        catch (err) {
            this.keytarImplementation = new InMemoryCredentialsProvider();
            console.warn('OS level credential store could not be accessed. Using in-memory credentials provider', err);
        }
        return this.keytarImplementation;
    }
};
exports.KeyStoreServiceImpl = KeyStoreServiceImpl;
KeyStoreServiceImpl.MAX_PASSWORD_LENGTH = 2500;
KeyStoreServiceImpl.PASSWORD_CHUNK_SIZE = KeyStoreServiceImpl_1.MAX_PASSWORD_LENGTH - 100;
exports.KeyStoreServiceImpl = KeyStoreServiceImpl = KeyStoreServiceImpl_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], KeyStoreServiceImpl);
class InMemoryCredentialsProvider {
    constructor() {
        this.secretVault = {};
    }
    async getPassword(service, account) {
        var _a, _b;
        // eslint-disable-next-line no-null/no-null
        return (_b = (_a = this.secretVault[service]) === null || _a === void 0 ? void 0 : _a[account]) !== null && _b !== void 0 ? _b : null;
    }
    async setPassword(service, account, password) {
        var _a;
        this.secretVault[service] = (_a = this.secretVault[service]) !== null && _a !== void 0 ? _a : {};
        this.secretVault[service][account] = password;
    }
    async deletePassword(service, account) {
        var _a;
        if (!((_a = this.secretVault[service]) === null || _a === void 0 ? void 0 : _a[account])) {
            return false;
        }
        delete this.secretVault[service][account];
        if (Object.keys(this.secretVault[service]).length === 0) {
            delete this.secretVault[service];
        }
        return true;
    }
    async findPassword(service) {
        var _a;
        // eslint-disable-next-line no-null/no-null
        return (_a = JSON.stringify(this.secretVault[service])) !== null && _a !== void 0 ? _a : null;
    }
    async findCredentials(service) {
        const credentials = [];
        for (const account of Object.keys(this.secretVault[service] || {})) {
            credentials.push({ account, password: this.secretVault[service][account] });
        }
        return credentials;
    }
    async clear() {
        this.secretVault = {};
    }
}
exports.InMemoryCredentialsProvider = InMemoryCredentialsProvider;
//# sourceMappingURL=key-store-server.js.map