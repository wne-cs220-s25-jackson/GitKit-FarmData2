"use strict";
// *****************************************************************************
// Copyright (C) 2023 Arduino SA and others.
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
const assert_1 = require("assert");
const strict_1 = require("assert/strict");
const fs_1 = require("fs");
const uuid_1 = require("@theia/core/lib/common/uuid");
const errors_1 = require("../../common/errors");
describe('errors', () => {
    describe('errno-exception', () => {
        it('should be ENOENT error', async () => {
            await (0, assert_1.rejects)(fs_1.promises.readFile((0, uuid_1.generateUuid)()), reason => (0, errors_1.isENOENT)(reason));
        });
        it('should not be ENOENT error (no code)', () => {
            (0, strict_1.strictEqual)((0, errors_1.isENOENT)(new Error('I am not ENOENT')), false);
        });
        it('should not be ENOENT error (other code)', async () => {
            await (0, assert_1.rejects)(fs_1.promises.readdir(__filename), reason => !(0, errors_1.isENOENT)(reason));
        });
    });
});
//# sourceMappingURL=errors.spec.js.map