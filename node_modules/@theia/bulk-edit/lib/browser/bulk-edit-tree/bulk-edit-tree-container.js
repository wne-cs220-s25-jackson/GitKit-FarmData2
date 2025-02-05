"use strict";
// *****************************************************************************
// Copyright (C) 2021 SAP SE or an SAP affiliate company and others.
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
exports.createBulkEditTreeWidget = exports.createBulkEditContainer = void 0;
const bulk_edit_tree_widget_1 = require("./bulk-edit-tree-widget");
const bulk_edit_tree_1 = require("./bulk-edit-tree");
const bulk_edit_tree_model_1 = require("./bulk-edit-tree-model");
const browser_1 = require("@theia/core/lib/browser");
function createBulkEditContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        tree: bulk_edit_tree_1.BulkEditTree,
        widget: bulk_edit_tree_widget_1.BulkEditTreeWidget,
        model: bulk_edit_tree_model_1.BulkEditTreeModel,
    });
    return child;
}
exports.createBulkEditContainer = createBulkEditContainer;
function createBulkEditTreeWidget(parent) {
    return createBulkEditContainer(parent).get(bulk_edit_tree_widget_1.BulkEditTreeWidget);
}
exports.createBulkEditTreeWidget = createBulkEditTreeWidget;
//# sourceMappingURL=bulk-edit-tree-container.js.map