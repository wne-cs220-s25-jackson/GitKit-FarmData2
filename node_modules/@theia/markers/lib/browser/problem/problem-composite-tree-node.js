"use strict";
// *****************************************************************************
// Copyright (C) 2021 EclipseSource and others.
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
exports.ProblemCompositeTreeNode = void 0;
const tree_1 = require("@theia/core/lib/browser/tree/tree");
const problem_utils_1 = require("./problem-utils");
var ProblemCompositeTreeNode;
(function (ProblemCompositeTreeNode) {
    function setSeverity(parent, markers) {
        let maxSeverity;
        markers.forEach(marker => {
            if (problem_utils_1.ProblemUtils.severityCompare(marker.data.severity, maxSeverity) < 0) {
                maxSeverity = marker.data.severity;
            }
        });
        parent.severity = maxSeverity;
    }
    ProblemCompositeTreeNode.setSeverity = setSeverity;
    ;
    function addChildren(parent, insertChildren) {
        for (const { node, markers } of insertChildren) {
            ProblemCompositeTreeNode.setSeverity(node, markers);
        }
        const sortedInsertChildren = insertChildren.sort((a, b) => (problem_utils_1.ProblemUtils.severityCompare(a.node.severity, b.node.severity) || compareURI(a.node.uri, b.node.uri)));
        let startIndex = 0;
        const children = parent.children;
        for (const { node } of sortedInsertChildren) {
            const index = children.findIndex(value => value.id === node.id);
            if (index !== -1) {
                tree_1.CompositeTreeNode.removeChild(parent, node);
            }
            if (children.length === 0) {
                children.push(node);
                startIndex = 1;
                tree_1.CompositeTreeNode.setParent(node, 0, parent);
            }
            else {
                let inserted = false;
                for (let i = startIndex; i < children.length; i++) {
                    // sort by severity, equal severity => sort by URI
                    if (problem_utils_1.ProblemUtils.severityCompare(node.severity, children[i].severity) < 0
                        || (problem_utils_1.ProblemUtils.severityCompare(node.severity, children[i].severity) === 0 && compareURI(node.uri, children[i].uri) < 0)) {
                        children.splice(i, 0, node);
                        inserted = true;
                        startIndex = i + 1;
                        tree_1.CompositeTreeNode.setParent(node, i, parent);
                        break;
                    }
                    ;
                }
                if (inserted === false) {
                    children.push(node);
                    startIndex = children.length;
                    tree_1.CompositeTreeNode.setParent(node, children.length - 1, parent);
                }
            }
        }
    }
    ProblemCompositeTreeNode.addChildren = addChildren;
    const compareURI = (uri1, uri2) => uri1.toString().localeCompare(uri2.toString(), undefined, { sensitivity: 'base' });
    ;
})(ProblemCompositeTreeNode || (exports.ProblemCompositeTreeNode = ProblemCompositeTreeNode = {}));
//# sourceMappingURL=problem-composite-tree-node.js.map