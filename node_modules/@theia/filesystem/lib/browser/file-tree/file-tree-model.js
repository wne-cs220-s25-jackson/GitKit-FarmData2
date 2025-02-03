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
exports.FileTreeModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const browser_1 = require("@theia/core/lib/browser");
const file_tree_1 = require("./file-tree");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const file_service_1 = require("../file-service");
const files_1 = require("../../common/files");
const message_service_1 = require("@theia/core/lib/common/message-service");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const common_1 = require("../../common");
const core_1 = require("@theia/core");
let FileTreeModel = class FileTreeModel extends browser_1.CompressedTreeModel {
    init() {
        super.init();
        this.toDispose.push(this.fileService.onDidFilesChange(changes => this.onFilesChanged(changes)));
    }
    get location() {
        const root = this.root;
        if (file_tree_1.FileStatNode.is(root)) {
            return root.uri;
        }
        return undefined;
    }
    set location(uri) {
        if (uri) {
            this.fileService.resolve(uri).then(fileStat => {
                if (fileStat) {
                    const node = file_tree_1.DirNode.createRoot(fileStat);
                    this.navigateTo(node);
                }
            }).catch(() => {
                // no-op, allow failures for file dialog text input
            });
        }
        else {
            this.navigateTo(undefined);
        }
    }
    async drives() {
        try {
            const drives = await this.environments.getDrives();
            return drives.map(uri => new uri_1.default(uri));
        }
        catch (e) {
            this.logger.error('Error when loading drives.', e);
            return [];
        }
    }
    get selectedFileStatNodes() {
        return this.selectedNodes.filter(file_tree_1.FileStatNode.is);
    }
    *getNodesByUri(uri) {
        const node = this.getNode(uri.toString());
        if (node) {
            yield node;
        }
    }
    onFilesChanged(changes) {
        if (!this.refreshAffectedNodes(this.getAffectedUris(changes)) && this.isRootAffected(changes)) {
            this.refresh();
        }
    }
    isRootAffected(changes) {
        const root = this.root;
        if (file_tree_1.FileStatNode.is(root)) {
            return changes.contains(root.uri, 1 /* FileChangeType.ADDED */) || changes.contains(root.uri, 0 /* FileChangeType.UPDATED */);
        }
        return false;
    }
    getAffectedUris(changes) {
        return changes.changes.filter(change => !this.isFileContentChanged(change)).map(change => change.resource);
    }
    isFileContentChanged(change) {
        return change.type === 0 /* FileChangeType.UPDATED */ && file_tree_1.FileNode.is(this.getNodesByUri(change.resource).next().value);
    }
    refreshAffectedNodes(uris) {
        const nodes = this.getAffectedNodes(uris);
        for (const node of nodes.values()) {
            this.refresh(node);
        }
        return nodes.size !== 0;
    }
    getAffectedNodes(uris) {
        const nodes = new Map();
        for (const uri of uris) {
            for (const node of this.getNodesByUri(uri.parent)) {
                if (file_tree_1.DirNode.is(node) && (node.expanded || (this.compressionToggle.compress && this.compressionService.isCompressionParticipant(node)))) {
                    nodes.set(node.id, node);
                }
            }
        }
        return nodes;
    }
    async copy(source, target) {
        /** If the target is a file or if the target is a directory, but is the same as the source, use the parent of the target as a destination. */
        const parentNode = (target.fileStat.isFile || target.uri.isEqual(source)) ? target.parent : target;
        if (!file_tree_1.FileStatNode.is(parentNode)) {
            throw new Error('Parent of file has to be a FileStatNode');
        }
        let targetUri = parentNode.uri.resolve(source.path.base);
        try {
            const parent = await this.fileService.resolve(parentNode.uri);
            const sourceFileStat = await this.fileService.resolve(source);
            targetUri = common_1.FileSystemUtils.generateUniqueResourceURI(parent, targetUri, sourceFileStat.isDirectory, 'copy');
            await this.fileService.copy(source, targetUri);
        }
        catch (e) {
            this.messageService.error(e.message);
        }
        return targetUri;
    }
    /**
     * Move the given source file or directory to the given target directory.
     */
    async move(source, target) {
        if (file_tree_1.DirNode.is(target) && file_tree_1.FileStatNode.is(source)) {
            const name = source.fileStat.name;
            const targetUri = target.uri.resolve(name);
            if (source.uri.isEqual(targetUri)) {
                return;
            }
            try {
                await this.fileService.move(source.uri, targetUri);
                return targetUri;
            }
            catch (e) {
                if (e instanceof files_1.FileOperationError && e.fileOperationResult === 4 /* FileOperationResult.FILE_MOVE_CONFLICT */) {
                    const fileName = this.labelProvider.getName(source);
                    if (await this.shouldReplace(fileName)) {
                        try {
                            await this.fileService.move(source.uri, targetUri, { overwrite: true });
                            return targetUri;
                        }
                        catch (e2) {
                            this.messageService.error(e2.message);
                        }
                    }
                }
                else {
                    this.messageService.error(e.message);
                }
            }
        }
        return undefined;
    }
    async shouldReplace(fileName) {
        const dialog = new browser_1.ConfirmDialog({
            title: core_1.nls.localize('theia/filesystem/replaceTitle', 'Replace File'),
            msg: core_1.nls.localizeByDefault('{0} already exists. Are you sure you want to overwrite it?', fileName),
            ok: browser_1.Dialog.YES,
            cancel: browser_1.Dialog.NO
        });
        return !!await dialog.open();
    }
};
exports.FileTreeModel = FileTreeModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], FileTreeModel.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], FileTreeModel.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], FileTreeModel.prototype, "messageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], FileTreeModel.prototype, "environments", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FileTreeModel.prototype, "init", null);
exports.FileTreeModel = FileTreeModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileTreeModel);
//# sourceMappingURL=file-tree-model.js.map