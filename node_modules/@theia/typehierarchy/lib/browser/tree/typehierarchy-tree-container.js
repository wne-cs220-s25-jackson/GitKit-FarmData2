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
exports.createHierarchyTreeWidget = void 0;
const tree_1 = require("@theia/core/lib/browser/tree");
const typehierarchy_tree_1 = require("./typehierarchy-tree");
const typehierarchy_tree_model_1 = require("./typehierarchy-tree-model");
const typehierarchy_tree_widget_1 = require("./typehierarchy-tree-widget");
function createHierarchyTreeContainer(parent) {
    const child = (0, tree_1.createTreeContainer)(parent, {
        tree: typehierarchy_tree_1.TypeHierarchyTree,
        model: typehierarchy_tree_model_1.TypeHierarchyTreeModel,
        widget: typehierarchy_tree_widget_1.TypeHierarchyTreeWidget
    });
    return child;
}
function createHierarchyTreeWidget(parent) {
    return createHierarchyTreeContainer(parent).get(typehierarchy_tree_widget_1.TypeHierarchyTreeWidget);
}
exports.createHierarchyTreeWidget = createHierarchyTreeWidget;
//# sourceMappingURL=typehierarchy-tree-container.js.map