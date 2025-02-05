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
const assert = require("assert");
const tree_1 = require("./tree");
const tree_model_1 = require("./tree-model");
const mock_tree_model_1 = require("./test/mock-tree-model");
const chai_1 = require("chai");
const tree_test_container_1 = require("./test/tree-test-container");
describe('Tree', () => {
    it('addChildren', () => {
        assertTreeNode(`{
  "id": "parent",
  "name": "parent",
  "children": [
    {
      "id": "foo",
      "name": "foo",
      "parent": "parent",
      "nextSibling": "bar"
    },
    {
      "id": "bar",
      "name": "bar",
      "parent": "parent",
      "previousSibling": "foo",
      "nextSibling": "baz"
    },
    {
      "id": "baz",
      "name": "baz",
      "parent": "parent",
      "previousSibling": "bar"
    }
  ]
}`, getNode());
    });
    it('removeChild - first', () => {
        const node = getNode();
        tree_1.CompositeTreeNode.removeChild(node, node.children[0]);
        assertTreeNode(`{
  "id": "parent",
  "name": "parent",
  "children": [
    {
      "id": "bar",
      "name": "bar",
      "parent": "parent",
      "nextSibling": "baz"
    },
    {
      "id": "baz",
      "name": "baz",
      "parent": "parent",
      "previousSibling": "bar"
    }
  ]
}`, node);
    });
    it('removeChild - second', () => {
        const node = getNode();
        tree_1.CompositeTreeNode.removeChild(node, node.children[1]);
        assertTreeNode(`{
  "id": "parent",
  "name": "parent",
  "children": [
    {
      "id": "foo",
      "name": "foo",
      "parent": "parent",
      "nextSibling": "baz"
    },
    {
      "id": "baz",
      "name": "baz",
      "parent": "parent",
      "previousSibling": "foo"
    }
  ]
}`, node);
    });
    it('removeChild - third', () => {
        const node = getNode();
        tree_1.CompositeTreeNode.removeChild(node, node.children[2]);
        assertTreeNode(`{
  "id": "parent",
  "name": "parent",
  "children": [
    {
      "id": "foo",
      "name": "foo",
      "parent": "parent",
      "nextSibling": "bar"
    },
    {
      "id": "bar",
      "name": "bar",
      "parent": "parent",
      "previousSibling": "foo"
    }
  ]
}`, node);
    });
    let model;
    beforeEach(() => {
        model = createTreeModel();
        model.root = mock_tree_model_1.MockTreeModel.HIERARCHICAL_MOCK_ROOT();
    });
    describe('getNode', () => {
        it('returns undefined for undefined nodes', done => {
            (0, chai_1.expect)(model.getNode(undefined)).to.be.undefined;
            done();
        });
        it('returns undefined for a non-existing id', done => {
            (0, chai_1.expect)(model.getNode('10')).to.be.undefined;
            done();
        });
        it('returns a valid node for existing an id', done => {
            (0, chai_1.expect)(model.getNode('1.1')).not.to.be.undefined;
            done();
        });
    });
    describe('validateNode', () => {
        it('returns undefined for undefined nodes', done => {
            (0, chai_1.expect)(model.validateNode(undefined)).to.be.undefined;
            done();
        });
        it('returns undefined for non-existing nodes', done => {
            (0, chai_1.expect)(model.validateNode(mock_tree_model_1.MockTreeModel.Node.toTreeNode({ 'id': '10' }))).to.be.undefined;
            done();
        });
        it('returns a valid node for an existing node', done => {
            (0, chai_1.expect)(model.validateNode(retrieveNode('1.1'))).not.to.be.undefined;
            done();
        });
    });
    describe('refresh', () => {
        it('refreshes all composite nodes starting with the root', done => {
            let result = true;
            const expectedRefreshedNodes = new Set([
                retrieveNode('1'),
                retrieveNode('1.1'),
                retrieveNode('1.2'),
                retrieveNode('1.2.1')
            ]);
            model.onNodeRefreshed((e) => {
                result = result && expectedRefreshedNodes.has(e);
                expectedRefreshedNodes.delete(e);
            });
            model.refresh().then(() => {
                (0, chai_1.expect)(result).to.be.true;
                (0, chai_1.expect)(expectedRefreshedNodes.size).to.be.equal(0);
                done();
            });
        });
    });
    describe('refresh(parent: Readonly<CompositeTreeNode>)', () => {
        it('refreshes all composite nodes starting with the provided node', done => {
            let result = true;
            const expectedRefreshedNodes = new Set([
                retrieveNode('1.2'),
                retrieveNode('1.2.1')
            ]);
            model.onNodeRefreshed((e) => {
                result = result && expectedRefreshedNodes.has(e);
                expectedRefreshedNodes.delete(e);
            });
            model.refresh(retrieveNode('1.2')).then(() => {
                (0, chai_1.expect)(result).to.be.true;
                (0, chai_1.expect)(expectedRefreshedNodes.size).to.be.equal(0);
                done();
            });
        });
    });
    function getNode() {
        return tree_1.CompositeTreeNode.addChildren({
            id: 'parent',
            name: 'parent',
            children: [],
            parent: undefined
        }, [{
                id: 'foo',
                name: 'foo',
                parent: undefined
            }, {
                id: 'bar',
                name: 'bar',
                parent: undefined
            }, {
                id: 'baz',
                name: 'baz',
                parent: undefined
            }]);
    }
    function assertTreeNode(expectation, node) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.deepStrictEqual(expectation, JSON.stringify(node, (key, value) => {
            if (key === 'parent' || key === 'previousSibling' || key === 'nextSibling') {
                return value && value.id;
            }
            return value;
        }, 2));
    }
    function createTreeModel() {
        const container = (0, tree_test_container_1.createTreeTestContainer)();
        return container.get(tree_model_1.TreeModel);
    }
    function retrieveNode(id) {
        const readonlyNode = model.getNode(id);
        return readonlyNode;
    }
});
//# sourceMappingURL=tree.spec.js.map