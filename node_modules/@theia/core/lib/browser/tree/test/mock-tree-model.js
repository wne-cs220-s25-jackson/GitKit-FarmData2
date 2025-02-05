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
exports.MockTreeModel = void 0;
var MockTreeModel;
(function (MockTreeModel) {
    let Node;
    (function (Node) {
        function toTreeNode(root, parent) {
            const { id } = root;
            const name = id;
            const selected = false;
            const focus = false;
            const expanded = true;
            const node = {
                id,
                name,
                selected,
                focus,
                parent: parent,
                children: []
            };
            const children = (root.children || []).map(child => Node.toTreeNode(child, node));
            if (children.length === 0) {
                return node;
            }
            else {
                node.children = children;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                node.expanded = expanded;
                return node;
            }
        }
        Node.toTreeNode = toTreeNode;
    })(Node = MockTreeModel.Node || (MockTreeModel.Node = {}));
    MockTreeModel.HIERARCHICAL_MOCK_ROOT = () => Node.toTreeNode({
        'id': '1',
        'children': [
            {
                'id': '1.1',
                'children': [
                    {
                        'id': '1.1.1'
                    },
                    {
                        'id': '1.1.2'
                    }
                ]
            },
            {
                'id': '1.2',
                'children': [
                    {
                        'id': '1.2.1',
                        'children': [
                            {
                                'id': '1.2.1.1'
                            },
                            {
                                'id': '1.2.1.2'
                            }
                        ]
                    },
                    {
                        'id': '1.2.2'
                    },
                    {
                        'id': '1.2.3'
                    }
                ]
            },
            {
                'id': '1.3'
            }
        ]
    });
    MockTreeModel.FLAT_MOCK_ROOT = () => Node.toTreeNode({
        'id': 'ROOT',
        'children': [
            {
                'id': '1'
            },
            {
                'id': '2'
            },
            {
                'id': '3'
            },
            {
                'id': '4'
            },
            {
                'id': '5'
            },
            {
                'id': '6'
            },
            {
                'id': '7'
            },
            {
                'id': '8'
            },
            {
                'id': '9'
            },
            {
                'id': '10'
            },
            {
                'id': '11'
            }
        ]
    });
})(MockTreeModel || (exports.MockTreeModel = MockTreeModel = {}));
//# sourceMappingURL=mock-tree-model.js.map