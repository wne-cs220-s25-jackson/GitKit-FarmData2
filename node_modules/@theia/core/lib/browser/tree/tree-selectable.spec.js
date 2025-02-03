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
const tree_model_1 = require("./tree-model");
const objects_1 = require("../../common/objects");
const chai_1 = require("chai");
const tree_test_container_1 = require("./test/tree-test-container");
const mock_selectable_tree_model_1 = require("./test/mock-selectable-tree-model");
const tree_expansion_1 = require("./tree-expansion");
describe('Selectable Tree', () => {
    let model;
    function assertNodeRetrieval(method, sequence) {
        for (const expectedNodeId of sequence) {
            const actualNode = method();
            const expectedNode = retrieveNode(expectedNodeId);
            (0, chai_1.expect)(actualNode === null || actualNode === void 0 ? void 0 : actualNode.id).to.be.equal(expectedNode.id);
            model.addSelection(expectedNode);
        }
    }
    function assertNodeSelection(method, sequence) {
        for (const expectedNodeId of sequence) {
            method();
            const node = retrieveNode(expectedNodeId);
            (0, chai_1.expect)(node.selected).to.be.true;
        }
    }
    describe('Get and Set Next Nodes Methods', () => {
        const uncollapsedSelectionOrder = ['1.1', '1.1.1', '1.1.2', '1.2', '1.2.1', '1.2.1.1', '1.2.1.2', '1.2.2', '1.2.3', '1.3'];
        const collapsedSelectionOrder = ['1.1', '1.2', '1.2.1', '1.2.2', '1.2.3', '1.3'];
        beforeEach(() => {
            model = createTreeModel();
            model.root = mock_selectable_tree_model_1.MockSelectableTreeModel.HIERARCHICAL_MOCK_ROOT();
            model.addSelection(retrieveNode('1'));
        });
        it('`getNextNode()` should select each node in sequence (uncollapsed)', done => {
            assertNodeRetrieval(model.getNextNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`getNextNode()` should select each node in sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeRetrieval(model.getNextNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`getNextSelectableNode()` should select each node in sequence (uncollapsed)', done => {
            assertNodeRetrieval(model.getNextSelectableNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`getNextSelectableNode()` should select each node in sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeRetrieval(model.getNextSelectableNode.bind(model), collapsedSelectionOrder);
            done();
        });
        it('`selectNext()` should select each node in sequence (uncollapsed)', done => {
            assertNodeSelection(model.selectNext.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`selectNext()` should select each node in sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeSelection(model.selectNext.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`selectNextNode()` should select each node in sequence (uncollapsed)', done => {
            assertNodeSelection(model.selectNextNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`selectNextNode()` should select each node in sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeSelection(model.selectNextNode.bind(model), collapsedSelectionOrder);
            done();
        });
    });
    describe('Get and Set Previous Nodes Methods', () => {
        const uncollapsedSelectionOrder = ['1.2.3', '1.2.2', '1.2.1.2', '1.2.1.1', '1.2.1', '1.2', '1.1.2', '1.1.1', '1.1'];
        const collapsedSelectionOrder = ['1.2.3', '1.2.2', '1.2.1', '1.2', '1.1'];
        beforeEach(() => {
            model = createTreeModel();
            model.root = mock_selectable_tree_model_1.MockSelectableTreeModel.HIERARCHICAL_MOCK_ROOT();
            model.addSelection(retrieveNode('1.3'));
        });
        it('`getPrevNode()` should select each node in reverse sequence (uncollapsed)', done => {
            assertNodeRetrieval(model.getPrevNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`getPrevNode()` should select each node in reverse sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeRetrieval(model.getPrevNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`getPrevSelectableNode()` should select each node in reverse sequence (uncollapsed)', done => {
            assertNodeRetrieval(model.getPrevSelectableNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`getPrevSelectableNode()` should select each node in reverse sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeRetrieval(model.getPrevSelectableNode.bind(model), collapsedSelectionOrder);
            done();
        });
        it('`selectPrev()` should select each node in reverse sequence (uncollapsed)', done => {
            assertNodeSelection(model.selectPrev.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`selectPrev()` should select each node in reverse sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeSelection(model.selectPrev.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`selectPrevNode()` should select each node in reverse sequence (uncollapsed)', done => {
            assertNodeSelection(model.selectPrevNode.bind(model), uncollapsedSelectionOrder);
            done();
        });
        it('`selectPrevNode()` should select each node in reverse sequence (collapsed)', done => {
            collapseNode('1.1', '1.2.1');
            assertNodeSelection(model.selectPrevNode.bind(model), collapsedSelectionOrder);
            done();
        });
    });
    const findNode = (id) => model.getNode(id);
    function createTreeModel() {
        const container = (0, tree_test_container_1.createTreeTestContainer)();
        return container.get(tree_model_1.TreeModel);
    }
    function retrieveNode(id) {
        const readonlyNode = model.getNode(id);
        return readonlyNode;
    }
    function collapseNode(...ids) {
        ids.map(findNode).filter(objects_1.notEmpty).filter(tree_expansion_1.ExpandableTreeNode.is).forEach(node => {
            model.collapseNode(node);
            (0, chai_1.expect)(node).to.have.property('expanded', false);
        });
    }
});
//# sourceMappingURL=tree-selectable.spec.js.map