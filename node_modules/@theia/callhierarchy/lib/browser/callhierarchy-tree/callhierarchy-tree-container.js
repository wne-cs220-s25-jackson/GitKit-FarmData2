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
exports.createHierarchyTreeWidget = void 0;
const browser_1 = require("@theia/core/lib/browser");
const callhierarchy_tree_1 = require("./callhierarchy-tree");
const callhierarchy_tree_model_1 = require("./callhierarchy-tree-model");
const callhierarchy_tree_widget_1 = require("./callhierarchy-tree-widget");
function createHierarchyTreeContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        tree: callhierarchy_tree_1.CallHierarchyTree,
        model: callhierarchy_tree_model_1.CallHierarchyTreeModel,
        widget: callhierarchy_tree_widget_1.CallHierarchyTreeWidget,
    });
    return child;
}
function createHierarchyTreeWidget(parent) {
    return createHierarchyTreeContainer(parent).get(callhierarchy_tree_widget_1.CallHierarchyTreeWidget);
}
exports.createHierarchyTreeWidget = createHierarchyTreeWidget;
//# sourceMappingURL=callhierarchy-tree-container.js.map