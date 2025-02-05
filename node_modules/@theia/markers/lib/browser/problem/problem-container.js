"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.createProblemWidget = exports.createProblemTreeContainer = exports.PROBLEM_OPTIONS = exports.PROBLEM_TREE_PROPS = void 0;
const marker_tree_1 = require("../marker-tree");
const problem_widget_1 = require("./problem-widget");
const problem_tree_model_1 = require("./problem-tree-model");
const browser_1 = require("@theia/core/lib/browser");
const problem_marker_1 = require("../../common/problem-marker");
exports.PROBLEM_TREE_PROPS = {
    ...browser_1.defaultTreeProps,
    contextMenuPath: [problem_marker_1.PROBLEM_KIND],
    globalSelection: true
};
exports.PROBLEM_OPTIONS = {
    kind: 'problem'
};
function createProblemTreeContainer(parent) {
    const child = (0, browser_1.createTreeContainer)(parent, {
        tree: problem_tree_model_1.ProblemTree,
        widget: problem_widget_1.ProblemWidget,
        model: problem_tree_model_1.ProblemTreeModel,
        props: exports.PROBLEM_TREE_PROPS,
    });
    child.bind(marker_tree_1.MarkerOptions).toConstantValue(exports.PROBLEM_OPTIONS);
    return child;
}
exports.createProblemTreeContainer = createProblemTreeContainer;
function createProblemWidget(parent) {
    return createProblemTreeContainer(parent).get(problem_widget_1.ProblemWidget);
}
exports.createProblemWidget = createProblemWidget;
//# sourceMappingURL=problem-container.js.map