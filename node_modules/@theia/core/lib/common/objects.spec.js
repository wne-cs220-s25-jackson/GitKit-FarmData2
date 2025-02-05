"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
const chai_1 = require("chai");
const objects_1 = require("./objects");
describe('Objects', () => {
    describe('#deepClone', () => {
        describe('primitives', () => {
            it('should deep clone numbers', () => {
                (0, chai_1.expect)(1).to.equal((0, objects_1.deepClone)(1));
            });
            it('should deep clone strings', () => {
                (0, chai_1.expect)('foo').to.equal((0, objects_1.deepClone)('foo'));
                (0, chai_1.expect)('').to.equal((0, objects_1.deepClone)(''));
            });
            it('should deep clone booleans', () => {
                (0, chai_1.expect)(true).to.equal((0, objects_1.deepClone)(true));
                (0, chai_1.expect)(false).to.equal((0, objects_1.deepClone)(false));
            });
        });
        describe('undefined', () => {
            it('should deep clone undefined', () => {
                (0, chai_1.expect)(undefined).to.equal((0, objects_1.deepClone)(undefined));
            });
        });
        describe('arrays', () => {
            it('should deep clone arrays', () => {
                const a = [1, 2, 3];
                const b = (0, objects_1.deepClone)(a);
                (0, chai_1.expect)(a).to.deep.equal(b);
                (0, chai_1.expect)(Array.isArray(a)).to.equal(true);
                (0, chai_1.expect)(Array.isArray(b)).to.equal(true);
            });
            it('should deep clone nested arrays', () => {
                const a = [[1], [2]];
                const b = (0, objects_1.deepClone)(a);
                (0, chai_1.expect)(a).to.deep.equal(b);
                (0, chai_1.expect)(Array.isArray(a)).to.equal(true);
                (0, chai_1.expect)(Array.isArray(b)).to.equal(true);
            });
        });
        describe('objects', () => {
            it('should deep clone objects', () => {
                const a = { 'foo': true, 'bar': 1 };
                const b = (0, objects_1.deepClone)(a);
                (0, chai_1.expect)(a).to.deep.equal(b);
                (0, chai_1.expect)(typeof a).to.equal('object');
                (0, chai_1.expect)(typeof b).to.equal('object');
            });
            it('should deep clone nested objects', () => {
                const a = { 'foo': true, 'nested': { 'foo': 1 } };
                const b = (0, objects_1.deepClone)(a);
                (0, chai_1.expect)(a).to.deep.equal(b);
                (0, chai_1.expect)(typeof a).to.equal('object');
                (0, chai_1.expect)(typeof b).to.equal('object');
            });
        });
    });
    describe('#deepFreeze', () => {
        it('should deep freeze an object', () => {
            const e = { a: 10 };
            const d = (0, objects_1.deepFreeze)(e);
            (0, chai_1.expect)(Object.isFrozen(d)).to.equal(true);
        });
    });
    describe('#notEmpty', () => {
        it('should return "true" when not empty', () => {
            (0, chai_1.expect)((0, objects_1.notEmpty)({})).to.equal(true);
            (0, chai_1.expect)((0, objects_1.notEmpty)([])).to.equal(true);
            (0, chai_1.expect)((0, objects_1.notEmpty)({ a: 1 })).to.equal(true);
        });
        it('should return "false" when empty', () => {
            (0, chai_1.expect)((0, objects_1.notEmpty)(undefined)).to.equal(false);
        });
    });
    describe('#isEmpty', () => {
        it('should return "true" when it is empty', () => {
            // eslint-disable-next-line no-null/no-null
            const obj = Object.create(null);
            (0, chai_1.expect)((0, objects_1.isEmpty)(obj)).to.equal(false);
        });
        it('should return "false" when not empty', () => {
            const z = { d: 5 };
            (0, chai_1.expect)((0, objects_1.isEmpty)(z)).to.equal(false);
        });
    });
});
//# sourceMappingURL=objects.spec.js.map