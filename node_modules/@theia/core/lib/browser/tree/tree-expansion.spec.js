"use strict";
// *****************************************************************************
// Copyright (C) 2019 Thomas Drosdzoll.
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
const mock_tree_model_1 = require("./test/mock-tree-model");
const tree_model_1 = require("./tree-model");
const tree_1 = require("./tree");
const tree_test_container_1 = require("./test/tree-test-container");
const promise_util_1 = require("../../common/promise-util");
describe('TreeExpansionService', () => {
    let model;
    beforeEach(() => {
        model = createTreeModel();
        model.root = mock_tree_model_1.MockTreeModel.HIERARCHICAL_MOCK_ROOT();
    });
    describe('expandNode', () => {
        it("won't expand an already expanded node", done => {
            const node = retrieveNode('1');
            model.expandNode(node).then(result => {
                (0, chai_1.expect)(result).to.be.undefined;
                done();
            });
        });
        it('will expand a collapsed node', done => {
            const node = retrieveNode('1');
            model.collapseNode(node).then(() => {
                model.expandNode(node).then(result => {
                    (0, chai_1.expect)(result).to.be.eq(result);
                    done();
                });
            });
        });
        it("won't expand an undefined node", done => {
            model.expandNode(undefined).then(result => {
                (0, chai_1.expect)(result).to.be.undefined;
                done();
            });
        });
    });
    describe('collapseNode', () => {
        it('will collapse an expanded node', done => {
            const node = retrieveNode('1');
            model.collapseNode(node).then(result => {
                (0, chai_1.expect)(result).to.be.eq(result);
                done();
            });
        });
        it("won't collapse an already collapsed node", done => {
            const node = retrieveNode('1');
            model.collapseNode(node).then(() => {
                model.collapseNode(node).then(result => {
                    (0, chai_1.expect)(result).to.be.false;
                    done();
                });
            });
        });
        it('cannot collapse a leaf node', done => {
            const node = retrieveNode('1.1.2');
            model.collapseNode(node).then(result => {
                (0, chai_1.expect)(result).to.be.false;
                done();
            });
        });
    });
    describe('collapseAll', () => {
        it('will collapse all nodes recursively', done => {
            model.collapseAll(retrieveNode('1')).then(result => {
                (0, chai_1.expect)(result).to.be.eq(result);
                done();
            });
        });
        it("won't collapse nodes recursively if the root node is collapsed already", done => {
            model.collapseNode(retrieveNode('1')).then(() => {
                model.collapseAll(retrieveNode('1')).then(result => {
                    (0, chai_1.expect)(result).to.be.eq(result);
                    done();
                });
            });
        });
    });
    describe('toggleNodeExpansion', () => {
        it('changes the expansion state from expanded to collapsed', done => {
            const node = retrieveNode('1');
            model.onExpansionChanged((e) => {
                (0, chai_1.expect)(e).to.be.equal(node);
                (0, chai_1.expect)(e.expanded).to.be.false;
            });
            model.toggleNodeExpansion(node).then(() => {
                done();
            });
        });
        it('changes the expansion state from collapsed to expanded', done => {
            const node = retrieveNode('1');
            model.collapseNode(node).then(() => {
            });
            model.onExpansionChanged((e) => {
                (0, chai_1.expect)(e).to.be.equal(node);
                (0, chai_1.expect)(e.expanded).to.be.true;
            });
            model.toggleNodeExpansion(node).then(() => {
                done();
            });
        });
    });
    it('node should be refreshed on expansion', async () => {
        const container = (0, tree_test_container_1.createTreeTestContainer)();
        container.rebind(tree_1.Tree).to(class extends tree_1.TreeImpl {
            async resolveChildren(parent) {
                await (0, promise_util_1.timeout)(200);
                return [{
                        id: 'child',
                        parent
                    }];
            }
        });
        const root = {
            id: 'parent',
            parent: undefined,
            children: [],
            expanded: false
        };
        const treeModel = container.get(tree_model_1.TreeModel);
        treeModel.root = root;
        chai_1.assert.isFalse(root.expanded, 'before');
        chai_1.assert.equal(root.children.length, 0, 'before');
        const expanding = treeModel.expandNode(root);
        chai_1.assert.isFalse(root.expanded, 'between');
        chai_1.assert.equal(root.children.length, 0, 'between');
        await expanding;
        chai_1.assert.isTrue(root.expanded, 'after');
        chai_1.assert.equal(root.children.length, 1, 'after');
    });
    function createTreeModel() {
        const container = (0, tree_test_container_1.createTreeTestContainer)();
        return container.get(tree_model_1.TreeModel);
    }
    function retrieveNode(id) {
        const readonlyNode = model.getNode(id);
        return readonlyNode;
    }
});
//# sourceMappingURL=tree-expansion.spec.js.map