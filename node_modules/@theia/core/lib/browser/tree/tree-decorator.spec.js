"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
const tree_decorator_1 = require("./tree-decorator");
class MockTreeDecoratorService extends tree_decorator_1.AbstractTreeDecoratorService {
    constructor() {
        super([]);
    }
}
describe('tree-decorator', () => {
    describe('tree-decorator-service', () => {
        const decoratorService = new MockTreeDecoratorService();
        it('should inflate an empty object into an empty map', () => {
            (0, chai_1.expect)(decoratorService.inflateDecorators({})).to.be.empty;
        });
        it('should inflate an object into the corresponding map', () => {
            const expected = new Map();
            expected.set('id_1', [
                {
                    tooltip: 'tooltip'
                },
                {
                    fontData: {
                        color: 'blue'
                    }
                }
            ]);
            expected.set('id_2', [
                {
                    backgroundColor: 'yellow'
                },
                {
                    priority: 100
                }
            ]);
            (0, chai_1.expect)(decoratorService.inflateDecorators({
                'id_1': [
                    {
                        'tooltip': 'tooltip'
                    },
                    {
                        'fontData': {
                            'color': 'blue'
                        }
                    }
                ],
                'id_2': [
                    {
                        'backgroundColor': 'yellow'
                    },
                    {
                        'priority': 100
                    }
                ]
            })).to.be.deep.equal(expected);
        });
        it('should deflate an empty map into an empty object', () => {
            (0, chai_1.expect)(decoratorService.inflateDecorators({})).to.be.empty;
        });
        it('should inflate an object into the corresponding map', () => {
            const decorations = new Map();
            decorations.set('id_1', [
                {
                    tooltip: 'tooltip'
                },
                {
                    fontData: {
                        color: 'blue'
                    }
                }
            ]);
            decorations.set('id_2', [
                {
                    backgroundColor: 'yellow'
                },
                {
                    priority: 100
                }
            ]);
            (0, chai_1.expect)(decoratorService.deflateDecorators(decorations)).to.be.deep.equal({
                'id_1': [
                    {
                        'tooltip': 'tooltip'
                    },
                    {
                        'fontData': {
                            'color': 'blue'
                        }
                    }
                ],
                'id_2': [
                    {
                        'backgroundColor': 'yellow'
                    },
                    {
                        'priority': 100
                    }
                ]
            });
        });
    });
    describe('caption-highlight', () => {
        describe('range-contains', () => {
            [
                [1, 2, 3, false],
                [0, 0, 1, true],
                [1, 0, 1, true],
                [1, 1, 1, true],
                [2, 1, 1, true],
                [3, 1, 1, false],
                [1, 1, -100, false],
            ].forEach(test => {
                const [input, offset, length, expected] = test;
                it(`${input} should ${expected ? '' : 'not '}be contained in the [${offset}:${length}] range`, () => {
                    (0, chai_1.expect)(tree_decorator_1.TreeDecoration.CaptionHighlight.Range.contains(input, { offset, length })).to.be.equal(expected);
                });
            });
        });
        it('split', () => {
            const actual = tree_decorator_1.TreeDecoration.CaptionHighlight.split('alma', {
                ranges: [{ offset: 0, length: 1 }]
            });
            (0, chai_1.expect)(actual).has.lengthOf(2);
            (0, chai_1.expect)(actual[0].highlight).to.be.true;
            (0, chai_1.expect)(actual[0].data).to.be.equal('a');
            (0, chai_1.expect)(actual[1].highlight).to.be.undefined;
            (0, chai_1.expect)(actual[1].data).to.be.equal('lma');
        });
    });
});
//# sourceMappingURL=tree-decorator.spec.js.map