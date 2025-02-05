"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.MockStorageService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
/**
 * A StorageService suitable to use during tests.
 */
let MockStorageService = class MockStorageService {
    constructor() {
        this.data = new Map();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSetData(callback) {
        this.onSetDataCallback = callback;
    }
    setData(key, data) {
        this.data.set(key, data);
        if (this.onSetDataCallback) {
            this.onSetDataCallback(key, data);
        }
        return Promise.resolve();
    }
    getData(key, defaultValue) {
        if (this.data.has(key)) {
            return Promise.resolve(this.data.get(key));
        }
        return Promise.resolve(defaultValue);
    }
};
exports.MockStorageService = MockStorageService;
exports.MockStorageService = MockStorageService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MockStorageService);
//# sourceMappingURL=mock-storage-service.js.map