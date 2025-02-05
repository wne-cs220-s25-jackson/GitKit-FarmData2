"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.FileDownloadCommands = exports.FileDownloadCommandContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser/browser");
const environment_1 = require("@theia/core/shared/@theia/application-package/lib/environment");
const selection_service_1 = require("@theia/core/lib/common/selection-service");
const command_1 = require("@theia/core/lib/common/command");
const uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
const file_download_service_1 = require("./file-download-service");
const browser_2 = require("@theia/core/lib/browser");
let FileDownloadCommandContribution = class FileDownloadCommandContribution {
    registerCommands(registry) {
        registry.registerCommand(FileDownloadCommands.DOWNLOAD, uri_command_handler_1.UriAwareCommandHandler.MultiSelect(this.selectionService, {
            execute: uris => this.executeDownload(uris),
            isEnabled: uris => this.isDownloadEnabled(uris),
            isVisible: uris => this.isDownloadVisible(uris),
        }));
        registry.registerCommand(FileDownloadCommands.COPY_DOWNLOAD_LINK, uri_command_handler_1.UriAwareCommandHandler.MultiSelect(this.selectionService, {
            execute: uris => this.executeDownload(uris, { copyLink: true }),
            isEnabled: uris => browser_1.isChrome && this.isDownloadEnabled(uris),
            isVisible: uris => browser_1.isChrome && this.isDownloadVisible(uris),
        }));
    }
    async executeDownload(uris, options) {
        this.downloadService.download(uris, options);
    }
    isDownloadEnabled(uris) {
        return !environment_1.environment.electron.is() && uris.length > 0 && uris.every(u => u.scheme === 'file');
    }
    isDownloadVisible(uris) {
        return this.isDownloadEnabled(uris);
    }
};
exports.FileDownloadCommandContribution = FileDownloadCommandContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_download_service_1.FileDownloadService),
    tslib_1.__metadata("design:type", file_download_service_1.FileDownloadService)
], FileDownloadCommandContribution.prototype, "downloadService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(selection_service_1.SelectionService),
    tslib_1.__metadata("design:type", selection_service_1.SelectionService)
], FileDownloadCommandContribution.prototype, "selectionService", void 0);
exports.FileDownloadCommandContribution = FileDownloadCommandContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileDownloadCommandContribution);
var FileDownloadCommands;
(function (FileDownloadCommands) {
    FileDownloadCommands.DOWNLOAD = command_1.Command.toDefaultLocalizedCommand({
        id: 'file.download',
        category: browser_2.CommonCommands.FILE_CATEGORY,
        label: 'Download'
    });
    FileDownloadCommands.COPY_DOWNLOAD_LINK = command_1.Command.toLocalizedCommand({
        id: 'file.copyDownloadLink',
        category: browser_2.CommonCommands.FILE_CATEGORY,
        label: 'Copy Download Link'
    }, 'theia/filesystem/copyDownloadLink', browser_2.CommonCommands.FILE_CATEGORY_KEY);
})(FileDownloadCommands || (exports.FileDownloadCommands = FileDownloadCommands = {}));
//# sourceMappingURL=file-download-command-contribution.js.map