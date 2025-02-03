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
exports.expectThrowsAsync = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const chai_1 = require("chai");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function expectThrowsAsync(promise, ...args) {
    let synchronous = () => { };
    try {
        await promise;
    }
    catch (e) {
        synchronous = () => { throw e; };
    }
    finally {
        (0, chai_1.expect)(synchronous).throw(...args);
    }
}
exports.expectThrowsAsync = expectThrowsAsync;
//# sourceMappingURL=expect.js.map