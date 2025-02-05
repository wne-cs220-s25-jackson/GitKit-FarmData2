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
exports.FileDialogModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const file_tree_1 = require("../file-tree");
const file_dialog_tree_1 = require("./file-dialog-tree");
let FileDialogModel = class FileDialogModel extends file_tree_1.FileTreeModel {
    constructor() {
        super(...arguments);
        this.onDidOpenFileEmitter = new common_1.Emitter();
        this._disableFileSelection = false;
    }
    init() {
        super.init();
        this.toDispose.push(this.onDidOpenFileEmitter);
    }
    /**
     * Returns the first valid location that was set by calling the `navigateTo` method. Once the initial location has a defined value, it will not change.
     * Can be `undefined`.
     */
    get initialLocation() {
        return this._initialLocation;
    }
    set disableFileSelection(isSelectable) {
        this._disableFileSelection = isSelectable;
    }
    async navigateTo(nodeOrId) {
        const result = await super.navigateTo(nodeOrId);
        if (!this._initialLocation && file_tree_1.FileStatNode.is(result)) {
            this._initialLocation = result.uri;
        }
        return result;
    }
    get onDidOpenFile() {
        return this.onDidOpenFileEmitter.event;
    }
    doOpenNode(node) {
        if (file_tree_1.FileNode.is(node)) {
            this.onDidOpenFileEmitter.fire(undefined);
        }
        else if (file_tree_1.DirNode.is(node)) {
            this.navigateTo(node);
        }
        else {
            super.doOpenNode(node);
        }
    }
    getNextSelectableNode(node = this.getFocusedNode()) {
        let nextNode = node;
        do {
            nextNode = super.getNextSelectableNode(nextNode);
        } while (file_tree_1.FileStatNode.is(nextNode) && !this.isFileStatNodeSelectable(nextNode));
        return nextNode;
    }
    getPrevSelectableNode(node = this.getFocusedNode()) {
        let prevNode = node;
        do {
            prevNode = super.getPrevSelectableNode(prevNode);
        } while (file_tree_1.FileStatNode.is(prevNode) && !this.isFileStatNodeSelectable(prevNode));
        return prevNode;
    }
    isFileStatNodeSelectable(node) {
        return !(!node.fileStat.isDirectory && this._disableFileSelection);
    }
    canNavigateUpward() {
        const treeRoot = this.tree.root;
        return file_tree_1.FileStatNode.is(treeRoot) && !treeRoot.uri.path.isRoot;
    }
};
exports.FileDialogModel = FileDialogModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_dialog_tree_1.FileDialogTree),
    tslib_1.__metadata("design:type", file_dialog_tree_1.FileDialogTree)
], FileDialogModel.prototype, "tree", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FileDialogModel.prototype, "init", null);
exports.FileDialogModel = FileDialogModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileDialogModel);
//# sourceMappingURL=file-dialog-model.js.map