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
exports.createSaveFileDialogContainer = exports.createOpenFileDialogContainer = exports.createFileDialogContainer = void 0;
const browser_1 = require("@theia/core/lib/browser");
const file_tree_1 = require("../file-tree");
const file_dialog_1 = require("./file-dialog");
const file_dialog_model_1 = require("./file-dialog-model");
const file_dialog_widget_1 = require("./file-dialog-widget");
const file_dialog_tree_1 = require("./file-dialog-tree");
function createFileDialogContainer(parent) {
    const child = (0, file_tree_1.createFileTreeContainer)(parent);
    child.unbind(file_tree_1.FileTreeModel);
    child.bind(file_dialog_model_1.FileDialogModel).toSelf();
    child.rebind(browser_1.TreeModel).toService(file_dialog_model_1.FileDialogModel);
    child.unbind(file_tree_1.FileTreeWidget);
    child.bind(file_dialog_widget_1.FileDialogWidget).toSelf();
    child.bind(file_dialog_tree_1.FileDialogTree).toSelf();
    child.rebind(browser_1.Tree).toService(file_dialog_tree_1.FileDialogTree);
    return child;
}
exports.createFileDialogContainer = createFileDialogContainer;
function createOpenFileDialogContainer(parent, props) {
    const container = createFileDialogContainer(parent);
    container.rebind(browser_1.TreeProps).toConstantValue({
        ...browser_1.defaultTreeProps,
        multiSelect: props.canSelectMany,
        search: true
    });
    container.bind(file_dialog_1.OpenFileDialogProps).toConstantValue(props);
    container.bind(file_dialog_1.OpenFileDialog).toSelf();
    return container;
}
exports.createOpenFileDialogContainer = createOpenFileDialogContainer;
function createSaveFileDialogContainer(parent, props) {
    const container = createFileDialogContainer(parent);
    container.rebind(browser_1.TreeProps).toConstantValue({
        ...browser_1.defaultTreeProps,
        multiSelect: false,
        search: true
    });
    container.bind(file_dialog_1.SaveFileDialogProps).toConstantValue(props);
    container.bind(file_dialog_1.SaveFileDialog).toSelf();
    return container;
}
exports.createSaveFileDialogContainer = createSaveFileDialogContainer;
//# sourceMappingURL=file-dialog-container.js.map