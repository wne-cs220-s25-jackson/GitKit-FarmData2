"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
const tree_delta_1 = require("./tree-delta");
const chai = require("chai");
const expect = chai.expect;
describe('TreeDeltaBuilder tests', () => {
    it('should split paths', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        builder.reportAdded(['a', 'b', 'c'], {
            id: 'c',
            prop: 17
        });
        builder.reportRemoved(['a', 'b', 'd', 'e']);
        const expected = {
            path: ['a', 'b'],
            type: tree_delta_1.DeltaKind.NONE,
            childDeltas: [
                {
                    path: ['d', 'e'],
                    type: tree_delta_1.DeltaKind.REMOVED,
                },
                {
                    type: tree_delta_1.DeltaKind.ADDED,
                    path: ['c'],
                    value: { id: 'c', prop: 17 },
                },
            ]
        };
        expect(builder.currentDelta).deep.equal([
            expected
        ]);
    });
    it('should merge add/remove child', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        builder.reportAdded(['a', 'b', 'c'], {
            id: 'c',
            prop: 17
        });
        builder.reportRemoved(['a', 'b', 'c', 'd']);
        expect(builder.currentDelta).deep.equal([{
                path: ['a', 'b', 'c'],
                type: tree_delta_1.DeltaKind.ADDED,
                value: { id: 'c', prop: 17 },
            }]);
    });
    it('should merge change', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        builder.reportChanged(['a', 'b', 'c'], { id: 'c', prop: 17 });
        builder.reportChanged(['a', 'b', 'c'], { prop: 18 });
        builder.reportChanged(['a', 'b', 'c'], { prop: 19 });
        expect(builder.currentDelta).deep.equal([
            {
                type: tree_delta_1.DeltaKind.CHANGED,
                path: ['a', 'b', 'c'],
                value: { id: 'c', prop: 19 },
            }
        ]);
    });
    it('should merge add/change', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        const obj = {
            id: 'c',
            prop: 17
        };
        builder.reportAdded(['a', 'b', 'c'], obj);
        obj.prop = 18;
        builder.reportChanged(['a', 'b', 'c'], { prop: 18 });
        expect(builder.currentDelta).deep.equal([
            {
                type: tree_delta_1.DeltaKind.ADDED,
                path: ['a', 'b', 'c'],
                value: { id: 'c', prop: 18 },
            }
        ]);
    });
    it('should handle adds/delete', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        builder.reportAdded(['a', 'b'], { id: 'c', prop: 14 });
        builder.reportRemoved(['a', 'b']);
        expect(builder.currentDelta).deep.equal([]);
        builder.reportAdded(['a', 'b'], { id: 'c', prop: 20 });
        expect(builder.currentDelta).deep.equal([{
                path: ['a', 'b'],
                type: tree_delta_1.DeltaKind.ADDED,
                value: { id: 'c', prop: 20 }
            }]);
    });
    it('should handle delete/add', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        builder.reportRemoved(['a', 'b']);
        builder.reportAdded(['a', 'b'], { id: 'c', prop: 14 });
        expect(builder.currentDelta).deep.equal([{
                path: ['a', 'b'],
                type: tree_delta_1.DeltaKind.CHANGED,
                value: { id: 'c', prop: 14 }
            }]);
        builder.reportRemoved(['a', 'b']);
        expect(builder.currentDelta).deep.equal([{
                path: ['a', 'b'],
                type: tree_delta_1.DeltaKind.REMOVED,
            }]);
    });
    it('should handle changed below changed', () => {
        const builder = new tree_delta_1.TreeDeltaBuilderImpl();
        builder.reportChanged(['a', 'b', 'c', 'e'], { id: 'e', prop: 14 });
        builder.reportChanged(['a', 'b', 'c', 'd'], { id: 'd', prop: 23 });
        builder.reportChanged(['a', 'b', 'c'], { id: 'c', prop: 27 });
        expect(builder.currentDelta).deep.equal([{
                path: ['a', 'b', 'c'],
                type: tree_delta_1.DeltaKind.CHANGED,
                value: { id: 'c', prop: 27 },
                childDeltas: [
                    {
                        path: ['d'],
                        type: tree_delta_1.DeltaKind.CHANGED,
                        value: { id: 'd', prop: 23 }
                    }, {
                        path: ['e'],
                        type: tree_delta_1.DeltaKind.CHANGED,
                        value: { id: 'e', prop: 14 }
                    }
                ]
            }]);
    });
});
//# sourceMappingURL=tree-delta.spec.js.map