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
exports.TreeWidgetSelection = void 0;
const tree_widget_1 = require("./tree-widget");
var TreeWidgetSelection;
(function (TreeWidgetSelection) {
    function isSource(selection, source) {
        return getSource(selection) === source;
    }
    TreeWidgetSelection.isSource = isSource;
    function getSource(selection) {
        return is(selection) ? selection.source : undefined;
    }
    TreeWidgetSelection.getSource = getSource;
    function is(selection) {
        return Array.isArray(selection) && ('source' in selection) && selection.source instanceof tree_widget_1.TreeWidget;
    }
    TreeWidgetSelection.is = is;
    function create(source) {
        const focusedNode = source.model.getFocusedNode();
        const selectedNodes = source.model.selectedNodes;
        const focusedIndex = selectedNodes.indexOf(focusedNode);
        // Ensure that the focused node is at index 0 - used as default single selection.
        if (focusedNode && focusedIndex > 0) {
            const selection = [focusedNode, ...selectedNodes.slice(0, focusedIndex), ...selectedNodes.slice(focusedIndex + 1)];
            return Object.assign(selection, { source });
        }
        return Object.assign(selectedNodes, { source });
    }
    TreeWidgetSelection.create = create;
})(TreeWidgetSelection || (exports.TreeWidgetSelection = TreeWidgetSelection = {}));
//# sourceMappingURL=tree-widget-selection.js.map