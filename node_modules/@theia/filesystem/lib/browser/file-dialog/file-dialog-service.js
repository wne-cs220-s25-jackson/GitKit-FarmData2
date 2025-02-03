"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.DefaultFileDialogService = exports.FileDialogService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const file_tree_1 = require("../file-tree");
const file_dialog_1 = require("./file-dialog");
const file_service_1 = require("../file-service");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const user_working_directory_provider_1 = require("@theia/core/lib/browser/user-working-directory-provider");
exports.FileDialogService = Symbol('FileDialogService');
let DefaultFileDialogService = class DefaultFileDialogService {
    async showOpenDialog(props, folder) {
        const title = props.title || common_1.nls.localizeByDefault('Open');
        const rootNode = await this.getRootNode(folder);
        if (rootNode) {
            const dialog = this.openFileDialogFactory(Object.assign(props, { title }));
            await dialog.model.navigateTo(rootNode);
            const value = await dialog.open();
            if (value) {
                if (!Array.isArray(value)) {
                    return value.uri;
                }
                return value.map(node => node.uri);
            }
        }
        return undefined;
    }
    async showSaveDialog(props, folder) {
        const title = props.title || common_1.nls.localizeByDefault('Save');
        const rootNode = await this.getRootNode(folder);
        if (rootNode) {
            const dialog = this.saveFileDialogFactory(Object.assign(props, { title }));
            await dialog.model.navigateTo(rootNode);
            return dialog.open();
        }
        return undefined;
    }
    async getRootNode(folderToOpen) {
        const folderExists = folderToOpen
            && folderToOpen.resource.scheme !== common_1.UNTITLED_SCHEME
            && await this.fileService.exists(folderToOpen.resource);
        const folder = folderToOpen && folderExists ? folderToOpen : {
            resource: await this.rootProvider.getUserWorkingDir(),
            isDirectory: true
        };
        const folderUri = folder.resource;
        const rootUri = folder.isDirectory ? folderUri : folderUri.parent;
        try {
            const rootStat = await this.fileService.resolve(rootUri);
            return file_tree_1.DirNode.createRoot(rootStat);
        }
        catch { }
        return undefined;
    }
};
exports.DefaultFileDialogService = DefaultFileDialogService;
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], DefaultFileDialogService.prototype, "environments", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], DefaultFileDialogService.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_dialog_1.OpenFileDialogFactory),
    tslib_1.__metadata("design:type", Function)
], DefaultFileDialogService.prototype, "openFileDialogFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], DefaultFileDialogService.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_dialog_1.SaveFileDialogFactory),
    tslib_1.__metadata("design:type", Function)
], DefaultFileDialogService.prototype, "saveFileDialogFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(user_working_directory_provider_1.UserWorkingDirectoryProvider),
    tslib_1.__metadata("design:type", user_working_directory_provider_1.UserWorkingDirectoryProvider)
], DefaultFileDialogService.prototype, "rootProvider", void 0);
exports.DefaultFileDialogService = DefaultFileDialogService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DefaultFileDialogService);
//# sourceMappingURL=file-dialog-service.js.map