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
exports.TypeHierarchyTreeModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const tree_model_1 = require("@theia/core/lib/browser/tree/tree-model");
const typehierarchy_provider_1 = require("../typehierarchy-provider");
const typehierarchy_tree_1 = require("./typehierarchy-tree");
let TypeHierarchyTreeModel = class TypeHierarchyTreeModel extends tree_model_1.TreeModelImpl {
    doOpenNode(node) {
        // do nothing (in particular do not expand the node)
    }
    /**
     * Initializes the tree by calculating and setting a new tree root node.
     */
    async initialize(options) {
        this.tree.root = undefined;
        this.tree.provider = undefined;
        const { location, languageId, direction } = options;
        if (languageId && location) {
            const provider = await this.registry.get(languageId);
            if (provider) {
                const params = {
                    textDocument: {
                        uri: location.uri
                    },
                    position: location.range.start,
                    direction,
                    resolve: 1
                };
                const symbol = await provider.get(params);
                if (symbol) {
                    const root = typehierarchy_tree_1.TypeHierarchyTree.RootNode.create(symbol, direction);
                    root.expanded = true;
                    this.tree.root = root;
                    this.tree.provider = provider;
                }
            }
        }
    }
    /**
     * If the tree root is set, it resets it with the inverse type hierarchy direction.
     */
    async flipDirection() {
        const { root } = this.tree;
        const service = this.tree.provider;
        if (typehierarchy_tree_1.TypeHierarchyTree.RootNode.is(root) && !!service) {
            const { direction, item } = root;
            const { uri, selectionRange } = item;
            const location = {
                uri,
                range: selectionRange
            };
            this.initialize({
                direction: direction === 0 /* TypeHierarchyDirection.Children */ ? 1 /* TypeHierarchyDirection.Parents */ : 0 /* TypeHierarchyDirection.Children */,
                location,
                languageId: service.languageId
            });
        }
    }
};
exports.TypeHierarchyTreeModel = TypeHierarchyTreeModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(typehierarchy_provider_1.TypeHierarchyRegistry),
    tslib_1.__metadata("design:type", typehierarchy_provider_1.TypeHierarchyRegistry)
], TypeHierarchyTreeModel.prototype, "registry", void 0);
exports.TypeHierarchyTreeModel = TypeHierarchyTreeModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TypeHierarchyTreeModel);
//# sourceMappingURL=typehierarchy-tree-model.js.map