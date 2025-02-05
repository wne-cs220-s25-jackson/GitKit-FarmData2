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
var TypeHierarchyTree_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeHierarchyTree = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("@theia/core/shared/inversify");
const uuid_1 = require("@theia/core/lib/common/uuid");
const uri_1 = require("@theia/core/lib/common/uri");
const editor_1 = require("@theia/editor/lib/browser/editor");
const tree_1 = require("@theia/core/lib/browser/tree");
let TypeHierarchyTree = TypeHierarchyTree_1 = class TypeHierarchyTree extends tree_1.TreeImpl {
    async resolveChildren(parent) {
        if (TypeHierarchyTree_1.Node.is(parent)) {
            await this.ensureResolved(parent);
            if (parent.children.length === 0) {
                delete parent.children;
                delete parent.expanded;
                return [];
            }
            return parent.children.slice();
        }
        return [];
    }
    /**
     * Returns with the direction of the type hierarchy attached to the root node. `undefined` if the root is not set.
     */
    get direction() {
        if (TypeHierarchyTree_1.RootNode.is(this.root)) {
            return this.root.direction;
        }
        return undefined;
    }
    /**
     * Makes sure, the node and its children are resolved. Resolves it on demand.
     */
    async ensureResolved(node) {
        if (!node.resolved) {
            const { provider, direction } = this;
            if (provider && direction !== undefined) {
                const { item } = node;
                const param = {
                    item,
                    direction,
                    resolve: 1
                };
                const resolvedItem = await provider.resolve(param);
                if (resolvedItem) {
                    node.resolved = true;
                    const items = 0 /* TypeHierarchyDirection.Children */ === direction ? resolvedItem.children : resolvedItem.parents;
                    if (items) {
                        node.children = items.map(child => TypeHierarchyTree_1.Node.create(child, direction, false));
                    }
                    else {
                        node.children = [];
                    }
                }
            }
        }
    }
};
exports.TypeHierarchyTree = TypeHierarchyTree;
exports.TypeHierarchyTree = TypeHierarchyTree = TypeHierarchyTree_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TypeHierarchyTree);
(function (TypeHierarchyTree) {
    let RootNode;
    (function (RootNode) {
        function is(node) {
            if (Node.is(node) && 'direction' in node) {
                const { direction } = node;
                return direction === 0 /* TypeHierarchyDirection.Children */ || direction === 1 /* TypeHierarchyDirection.Parents */;
            }
            return false;
        }
        RootNode.is = is;
        function create(item, direction) {
            return {
                ...Node.create(item, direction, true),
                direction
            };
        }
        RootNode.create = create;
    })(RootNode = TypeHierarchyTree.RootNode || (TypeHierarchyTree.RootNode = {}));
    let Node;
    (function (Node) {
        function is(node) {
            if (!!node && 'resolved' in node && 'item' in node) {
                const { resolved, item } = node;
                return typeof resolved === 'boolean' && !!item;
            }
            return false;
        }
        Node.is = is;
        function create(item, direction, resolved = true) {
            const items = 0 /* TypeHierarchyDirection.Children */ === direction ? item.children : item.parents;
            if (items && items.length > 0) {
                // If the server sent more levels than requested, use them.
                resolved = true;
            }
            const node = {
                id: (0, uuid_1.generateUuid)(),
                name: item.name,
                description: item.detail,
                parent: undefined,
                location: editor_1.Location.create(item.uri, item.selectionRange),
                resolved,
                children: items ? items.map(child => create(child, direction, false)) : [],
                expanded: false,
                visible: true,
                selected: false,
                kind: item.kind,
                decorationData: decorationData(item, direction),
                item
            };
            // Trick: if the node is `resolved` and have zero `children`, make the node non-expandable.
            if (resolved && node.children.length === 0) {
                delete node.expanded;
            }
            return node;
        }
        Node.create = create;
        function decorationData(item, direction) {
            const captionSuffixes = [{
                    data: new uri_1.default(item.uri).displayName,
                    fontData: {
                        color: 'var(--theia-descriptionForeground)',
                    }
                }];
            if (item.detail) {
                captionSuffixes.unshift({
                    data: item.detail,
                    fontData: {
                        color: 'var(--theia-list-highlightForeground)',
                        style: 'italic'
                    }
                });
            }
            const data = `${0 /* TypeHierarchyDirection.Children */ === direction ? '▼' : '▲'}`;
            const color = `var(${0 /* TypeHierarchyDirection.Children */ === direction ? '--theia-errorForeground' : '--theia-successBackground'})`;
            return {
                captionSuffixes,
                captionPrefixes: [{
                        data,
                        fontData: {
                            color,
                            style: 'bold'
                        }
                    }]
            };
        }
    })(Node = TypeHierarchyTree.Node || (TypeHierarchyTree.Node = {}));
})(TypeHierarchyTree || (exports.TypeHierarchyTree = TypeHierarchyTree = {}));
//# sourceMappingURL=typehierarchy-tree.js.map