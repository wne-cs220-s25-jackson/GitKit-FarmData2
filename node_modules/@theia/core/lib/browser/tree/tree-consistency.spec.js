"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
const tslib_1 = require("tslib");
const assert = require("assert");
const inversify_1 = require("inversify");
const tree_test_container_1 = require("./test/tree-test-container");
const tree_1 = require("./tree");
const tree_model_1 = require("./tree-model");
const tree_label_provider_1 = require("./tree-label-provider");
let ConsistencyTestTree = class ConsistencyTestTree extends tree_1.TreeImpl {
    constructor() {
        super(...arguments);
        this.resolveCounter = 0;
    }
    async resolveChildren(parent) {
        if (parent.id === 'expandable') {
            const step = async () => {
                // a predicate to emulate bad timing, i.e.
                // children of a node gets resolved when a root is changed
                if (this.root && this.root !== parent.parent) {
                    this.resolveCounter++;
                    return [];
                }
                else {
                    await new Promise(resolve => setTimeout(resolve, 10));
                    return step();
                }
            };
            return step();
        }
        return super.resolveChildren(parent);
    }
};
ConsistencyTestTree = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ConsistencyTestTree);
/**
 * Return roots having the same id, but not object identity.
 */
function createConsistencyTestRoot(rootName) {
    const children = [];
    const root = {
        id: 'root',
        name: rootName,
        parent: undefined,
        children
    };
    const parent = {
        id: 'expandable',
        name: 'expandable',
        parent: root,
        expanded: true,
        children: []
    };
    children.push(parent);
    return root;
}
describe('Tree Consistency', () => {
    it('setting different tree roots should finish', async () => {
        const container = (0, tree_test_container_1.createTreeTestContainer)();
        container.bind(tree_label_provider_1.TreeLabelProvider).toSelf().inSingletonScope();
        const labelProvider = container.get(tree_label_provider_1.TreeLabelProvider);
        container.bind(ConsistencyTestTree).toSelf();
        container.rebind(tree_1.TreeImpl).toService(ConsistencyTestTree);
        const tree = container.get(ConsistencyTestTree);
        const model = container.get(tree_model_1.TreeModel);
        model.root = createConsistencyTestRoot('Foo');
        await new Promise(resolve => setTimeout(resolve, 50));
        model.root = createConsistencyTestRoot('Bar');
        await new Promise(resolve => setTimeout(resolve, 50));
        let resolveCounter = tree.resolveCounter;
        assert.deepStrictEqual(tree.resolveCounter, 1);
        for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            if (resolveCounter === tree.resolveCounter) {
                assert.deepStrictEqual(tree.resolveCounter, 1);
                assert.deepStrictEqual(labelProvider.getName(model.root), 'Bar');
                return;
            }
            resolveCounter = tree.resolveCounter;
        }
        assert.ok(false, 'Resolving does not stop, attempts: ' + tree.resolveCounter);
    });
});
//# sourceMappingURL=tree-consistency.spec.js.map