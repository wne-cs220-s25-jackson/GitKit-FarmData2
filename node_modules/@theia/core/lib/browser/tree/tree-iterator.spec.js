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
const objects_1 = require("../../common/objects");
const mock_tree_model_1 = require("./test/mock-tree-model");
const tree_model_1 = require("./tree-model");
const tree_iterator_1 = require("./tree-iterator");
const tree_test_container_1 = require("./test/tree-test-container");
const tree_expansion_1 = require("./tree-expansion");
describe('tree-iterator', () => {
    const model = createTreeModel();
    const findNode = (id) => model.getNode(id);
    beforeEach(() => {
        model.root = mock_tree_model_1.MockTreeModel.HIERARCHICAL_MOCK_ROOT();
    });
    it('should include root', () => {
        const expected = ['1'];
        const actual = [...new tree_iterator_1.BottomUpTreeIterator(findNode('1'))].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('should return `undefined` after consuming the iterator', () => {
        const itr = new tree_iterator_1.BottomUpTreeIterator(findNode('1'));
        let next = itr.next();
        while (!next.done) {
            (0, chai_1.expect)(next.value).to.be.not.undefined;
            next = itr.next();
        }
        (0, chai_1.expect)(next.done).to.be.true;
        (0, chai_1.expect)(next.value).to.be.undefined;
    });
    it('depth-first (no collapsed nodes)', () => {
        const expected = ['1', '1.1', '1.1.1', '1.1.2', '1.2', '1.2.1', '1.2.1.1', '1.2.1.2', '1.2.2', '1.2.3', '1.3'];
        const actual = [...new tree_iterator_1.DepthFirstTreeIterator(model.root)].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('depth-first (with collapsed nodes)', () => {
        collapseNode('1.1', '1.2.1');
        const expected = ['1', '1.1', '1.2', '1.2.1', '1.2.2', '1.2.3', '1.3'];
        const actual = [...new tree_iterator_1.DepthFirstTreeIterator(model.root, { pruneCollapsed: true })].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('breadth-first (no collapsed nodes)', () => {
        const expected = ['1', '1.1', '1.2', '1.3', '1.1.1', '1.1.2', '1.2.1', '1.2.2', '1.2.3', '1.2.1.1', '1.2.1.2'];
        const actual = [...new tree_iterator_1.BreadthFirstTreeIterator(model.root)].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('breadth-first (with collapsed nodes)', () => {
        collapseNode('1.1', '1.2.1');
        const expected = ['1', '1.1', '1.2', '1.3', '1.2.1', '1.2.2', '1.2.3'];
        const actual = [...new tree_iterator_1.BreadthFirstTreeIterator(model.root, { pruneCollapsed: true })].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('bottom-up (no collapsed nodes)', () => {
        const expected = ['1.2.2', '1.2.1.2', '1.2.1.1', '1.2.1', '1.2', '1.1.2', '1.1.1', '1.1', '1'];
        const actual = [...new tree_iterator_1.BottomUpTreeIterator(findNode('1.2.2'))].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('bottom-up (with collapsed nodes)', () => {
        collapseNode('1.1', '1.2.1');
        const expected = ['1.2.2', '1.2.1', '1.2', '1.1', '1'];
        const actual = [...new tree_iterator_1.BottomUpTreeIterator(findNode('1.2.2'), { pruneCollapsed: true })].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('top-down (no collapsed nodes)', () => {
        const expected = ['1.1.2', '1.2', '1.2.1', '1.2.1.1', '1.2.1.2', '1.2.2', '1.2.3', '1.3'];
        const actual = [...new tree_iterator_1.TopDownTreeIterator(findNode('1.1.2'))].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    it('top-down (with collapsed nodes)', () => {
        collapseNode('1.2.1');
        const expected = ['1.1.2', '1.2', '1.2.1', '1.2.2', '1.2.3', '1.3'];
        const actual = [...new tree_iterator_1.TopDownTreeIterator(findNode('1.1.2'), { pruneCollapsed: true })].map(node => node.id);
        (0, chai_1.expect)(expected).to.be.deep.equal(actual);
    });
    function collapseNode(...ids) {
        ids.map(findNode).filter(objects_1.notEmpty).filter(tree_expansion_1.ExpandableTreeNode.is).forEach(node => {
            model.collapseNode(node);
            (0, chai_1.expect)(node).to.have.property('expanded', false);
        });
    }
    function createTreeModel() {
        return (0, tree_test_container_1.createTreeTestContainer)().get(tree_model_1.TreeModel);
    }
});
describe('iterators', () => {
    it('as-iterator', () => {
        const array = [1, 2, 3, 4];
        const itr = tree_iterator_1.Iterators.asIterator(array);
        let next = itr.next();
        while (!next.done) {
            const { value } = next;
            (0, chai_1.expect)(value).to.be.not.undefined;
            const index = array.indexOf(value);
            (0, chai_1.expect)(index).to.be.not.equal(-1);
            array.splice(index, 1);
            next = itr.next();
        }
        (0, chai_1.expect)(array).to.be.empty;
    });
    it('cycle - without start', function () {
        this.timeout(1000);
        const array = [1, 2, 3, 4];
        const itr = tree_iterator_1.Iterators.cycle(array);
        const visitedItems = new Set();
        let next = itr.next();
        while (!next.done) {
            const { value } = next;
            (0, chai_1.expect)(value).to.be.not.undefined;
            if (visitedItems.has(value)) {
                (0, chai_1.expect)(Array.from(visitedItems).sort()).to.be.deep.equal(array.sort());
                break;
            }
            visitedItems.add(value);
            next = itr.next();
        }
    });
    it('cycle - with start', function () {
        this.timeout(1000);
        const array = [1, 2, 3, 4];
        const itr = tree_iterator_1.Iterators.cycle(array, 2);
        const visitedItems = new Set();
        let next = itr.next();
        (0, chai_1.expect)(next.value).to.be.equal(2);
        while (!next.done) {
            const { value } = next;
            (0, chai_1.expect)(value).to.be.not.undefined;
            if (visitedItems.has(value)) {
                (0, chai_1.expect)(Array.from(visitedItems).sort()).to.be.deep.equal(array.sort());
                break;
            }
            visitedItems.add(value);
            next = itr.next();
        }
    });
});
//# sourceMappingURL=tree-iterator.spec.js.map