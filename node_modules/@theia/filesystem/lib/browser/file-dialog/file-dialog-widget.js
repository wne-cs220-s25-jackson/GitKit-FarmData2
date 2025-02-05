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
exports.FileDialogWidget = exports.NOT_SELECTABLE_CLASS = exports.FILE_DIALOG_CLASS = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const file_tree_1 = require("../file-tree");
const file_dialog_model_1 = require("./file-dialog-model");
exports.FILE_DIALOG_CLASS = 'theia-FileDialog';
exports.NOT_SELECTABLE_CLASS = 'theia-mod-not-selectable';
let FileDialogWidget = class FileDialogWidget extends file_tree_1.FileTreeWidget {
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.model = model;
        this._disableFileSelection = false;
        this.addClass(exports.FILE_DIALOG_CLASS);
    }
    set disableFileSelection(isSelectable) {
        this._disableFileSelection = isSelectable;
        this.model.disableFileSelection = isSelectable;
    }
    createNodeAttributes(node, props) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const attr = super.createNodeAttributes(node, props);
        if (this.shouldDisableSelection(node)) {
            const keys = Object.keys(attr);
            keys.forEach(k => {
                if (['className', 'style', 'title'].indexOf(k) < 0) {
                    delete attr[k];
                }
            });
        }
        return attr;
    }
    handleEnter(event) {
        // Handle ENTER in the dialog to Accept.
        // Tree view will just expand/collapse the node. This works also with arrow keys or SPACE.
        return false;
    }
    handleEscape(event) {
        // Handle ESC in the dialog to Cancel and close the Dialog.
        return false;
    }
    createNodeClassNames(node, props) {
        const classNames = super.createNodeClassNames(node, props);
        if (this.shouldDisableSelection(node)) {
            [browser_1.SELECTED_CLASS, browser_1.FOCUS_CLASS].forEach(name => {
                const ind = classNames.indexOf(name);
                if (ind >= 0) {
                    classNames.splice(ind, 1);
                }
            });
            classNames.push(exports.NOT_SELECTABLE_CLASS);
        }
        return classNames;
    }
    shouldDisableSelection(node) {
        return file_tree_1.FileStatNode.is(node) && !node.fileStat.isDirectory && this._disableFileSelection;
    }
};
exports.FileDialogWidget = FileDialogWidget;
exports.FileDialogWidget = FileDialogWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(file_dialog_model_1.FileDialogModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, file_dialog_model_1.FileDialogModel,
        browser_1.ContextMenuRenderer])
], FileDialogWidget);
//# sourceMappingURL=file-dialog-widget.js.map