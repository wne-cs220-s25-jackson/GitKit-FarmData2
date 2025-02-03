"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
const chai = require("chai");
const quick_input_service_1 = require("./quick-input-service");
const expect = chai.expect;
describe('quick-input-service', () => {
    describe('#findMatches', () => {
        it('should return the proper highlights when matches are found', () => {
            expect((0, quick_input_service_1.findMatches)('abc', 'a')).deep.equal([{ start: 0, end: 1 }]);
            expect((0, quick_input_service_1.findMatches)('abc', 'ab')).deep.equal([{ start: 0, end: 1 }, { start: 1, end: 2 }]);
            expect((0, quick_input_service_1.findMatches)('abc', 'ac')).deep.equal([{ start: 0, end: 1 }, { start: 2, end: 3 }]);
            expect((0, quick_input_service_1.findMatches)('abc', 'abc')).deep.equal([{ start: 0, end: 1 }, { start: 1, end: 2 }, { start: 2, end: 3 }]);
        });
        it('should fail when out of order', () => {
            expect((0, quick_input_service_1.findMatches)('abc', 'ba')).equal(undefined);
        });
        it('should return `undefined` when no matches are found', () => {
            expect((0, quick_input_service_1.findMatches)('abc', 'f')).equal(undefined);
        });
        it('should return `undefined` when no filter is present', () => {
            expect((0, quick_input_service_1.findMatches)('abc', '')).equal(undefined);
        });
    });
    describe('#filterItems', () => {
        let items = [];
        beforeEach(() => {
            items = [
                { label: 'a' },
                { label: 'abc', description: 'v' },
                { label: 'def', description: 'd', detail: 'y' },
                { label: 'z', description: 'z', detail: 'z' }
            ];
        });
        it('should return the full list when no filter is present', () => {
            const result = (0, quick_input_service_1.filterItems)(items, '');
            expect(result).deep.equal(items);
        });
        it('should filter items based on the label', () => {
            var _a, _b;
            const expectation = {
                label: 'abc',
                highlights: {
                    label: [
                        { start: 0, end: 1 },
                        { start: 1, end: 2 },
                        { start: 2, end: 3 }
                    ]
                }
            };
            const result = (0, quick_input_service_1.filterItems)(items, 'abc').filter(quick_input_service_1.QuickPickItem.is);
            expect(result).length(1);
            expect(result[0].label).equal(expectation.label);
            expect((_a = result[0].highlights) === null || _a === void 0 ? void 0 : _a.label).deep.equal((_b = expectation.highlights) === null || _b === void 0 ? void 0 : _b.label);
        });
        it('should filter items based on `description` if `label` does not match', () => {
            var _a, _b, _c;
            const expectation = {
                label: 'abc',
                description: 'v',
                highlights: {
                    description: [
                        { start: 0, end: 1 }
                    ]
                }
            };
            const result = (0, quick_input_service_1.filterItems)(items, 'v').filter(quick_input_service_1.QuickPickItem.is);
            expect(result).length(1);
            expect(result[0].label).equal(expectation.label);
            expect(result[0].description).equal(expectation.description);
            expect((_a = result[0].highlights) === null || _a === void 0 ? void 0 : _a.label).equal(undefined);
            expect((_b = result[0].highlights) === null || _b === void 0 ? void 0 : _b.description).deep.equal((_c = expectation.highlights) === null || _c === void 0 ? void 0 : _c.description);
        });
        it('should filter items based on `detail` if `label` and `description` does not match', () => {
            var _a, _b, _c, _d;
            const expectation = {
                label: 'def',
                description: 'd',
                detail: 'y',
                highlights: {
                    detail: [
                        { start: 0, end: 1 }
                    ]
                }
            };
            const result = (0, quick_input_service_1.filterItems)(items, 'y').filter(quick_input_service_1.QuickPickItem.is);
            expect(result).length(1);
            expect(result[0].label).equal(expectation.label);
            expect(result[0].description).equal(expectation.description);
            expect(result[0].detail).equal(expectation.detail);
            expect((_a = result[0].highlights) === null || _a === void 0 ? void 0 : _a.label).equal(undefined);
            expect((_b = result[0].highlights) === null || _b === void 0 ? void 0 : _b.description).equal(undefined);
            expect((_c = result[0].highlights) === null || _c === void 0 ? void 0 : _c.detail).deep.equal((_d = expectation.highlights) === null || _d === void 0 ? void 0 : _d.detail);
        });
        it('should return multiple highlights if it matches multiple properties', () => {
            var _a, _b, _c, _d, _e, _f;
            const expectation = {
                label: 'z',
                description: 'z',
                detail: 'z',
                highlights: {
                    label: [
                        { start: 0, end: 1 }
                    ],
                    description: [
                        { start: 0, end: 1 }
                    ],
                    detail: [
                        { start: 0, end: 1 }
                    ]
                }
            };
            const result = (0, quick_input_service_1.filterItems)(items, 'z').filter(quick_input_service_1.QuickPickItem.is);
            expect(result).length(1);
            expect(result[0].label).equal(expectation.label);
            expect(result[0].description).equal(expectation.description);
            expect(result[0].detail).equal(expectation.detail);
            expect((_a = result[0].highlights) === null || _a === void 0 ? void 0 : _a.label).deep.equal((_b = expectation.highlights) === null || _b === void 0 ? void 0 : _b.label);
            expect((_c = result[0].highlights) === null || _c === void 0 ? void 0 : _c.description).deep.equal((_d = expectation.highlights) === null || _d === void 0 ? void 0 : _d.description);
            expect((_e = result[0].highlights) === null || _e === void 0 ? void 0 : _e.detail).deep.equal((_f = expectation.highlights) === null || _f === void 0 ? void 0 : _f.detail);
        });
        it('should reset highlights upon subsequent searches', () => {
            var _a, _b, _c;
            const expectation = {
                label: 'abc',
                highlights: {
                    label: [
                        { start: 0, end: 1 },
                        { start: 1, end: 2 },
                        { start: 2, end: 3 }
                    ]
                }
            };
            let result = (0, quick_input_service_1.filterItems)(items, 'abc').filter(quick_input_service_1.QuickPickItem.is);
            expect(result).length(1);
            expect(result[0].label).equal(expectation.label);
            expect((_a = result[0].highlights) === null || _a === void 0 ? void 0 : _a.label).deep.equal((_b = expectation.highlights) === null || _b === void 0 ? void 0 : _b.label);
            result = (0, quick_input_service_1.filterItems)(items, '').filter(quick_input_service_1.QuickPickItem.is);
            expect((_c = result[0].highlights) === null || _c === void 0 ? void 0 : _c.label).equal(undefined);
        });
        it('should return an empty list when no matches are found', () => {
            expect((0, quick_input_service_1.filterItems)(items, 'yyy')).deep.equal([]);
        });
    });
});
//# sourceMappingURL=quick-input-service.spec.js.map