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
exports.createFileTreeContainer = void 0;
const browser_1 = require("@theia/core/lib/browser");
const file_tree_1 = require("./file-tree");
const file_tree_model_1 = require("./file-tree-model");
const file_tree_widget_1 = require("./file-tree-widget");
const fileTreeDefaults = {
    tree: file_tree_1.FileTree,
    model: file_tree_model_1.FileTreeModel,
    widget: file_tree_widget_1.FileTreeWidget,
    expansionService: browser_1.CompressedExpansionService,
};
function createFileTreeContainer(parent, overrides) {
    const child = (0, browser_1.createTreeContainer)(parent, { ...fileTreeDefaults, ...overrides });
    child.bind(browser_1.CompressionToggle).toConstantValue({ compress: false });
    child.bind(browser_1.TreeCompressionService).toSelf().inSingletonScope();
    return child;
}
exports.createFileTreeContainer = createFileTreeContainer;
//# sourceMappingURL=file-tree-container.js.map