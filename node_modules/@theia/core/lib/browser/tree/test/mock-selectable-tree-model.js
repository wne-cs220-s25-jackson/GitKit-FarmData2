"use strict";
// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
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
exports.MockSelectableTreeModel = void 0;
var MockSelectableTreeModel;
(function (MockSelectableTreeModel) {
    let SelectableNode;
    (function (SelectableNode) {
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
            const children = (root.children || []).map(child => SelectableNode.toTreeNode(child, node));
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
        SelectableNode.toTreeNode = toTreeNode;
    })(SelectableNode = MockSelectableTreeModel.SelectableNode || (MockSelectableTreeModel.SelectableNode = {}));
    MockSelectableTreeModel.HIERARCHICAL_MOCK_ROOT = () => SelectableNode.toTreeNode({
        'id': '1',
        'selected': false,
        'children': [
            {
                'id': '1.1',
                'selected': false,
                'children': [
                    {
                        'id': '1.1.1',
                        'selected': false,
                    },
                    {
                        'id': '1.1.2',
                        'selected': false,
                    }
                ]
            },
            {
                'id': '1.2',
                'selected': false,
                'children': [
                    {
                        'id': '1.2.1',
                        'selected': false,
                        'children': [
                            {
                                'id': '1.2.1.1',
                                'selected': false,
                            },
                            {
                                'id': '1.2.1.2',
                                'selected': false,
                            }
                        ]
                    },
                    {
                        'id': '1.2.2',
                        'selected': false,
                    },
                    {
                        'id': '1.2.3',
                        'selected': false,
                    }
                ]
            },
            {
                'id': '1.3',
                'selected': false,
            }
        ]
    });
})(MockSelectableTreeModel || (exports.MockSelectableTreeModel = MockSelectableTreeModel = {}));
//# sourceMappingURL=mock-selectable-tree-model.js.map