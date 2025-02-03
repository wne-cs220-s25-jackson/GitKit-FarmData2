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
exports.WorkspaceDuplicateHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const workspace_utils_1 = require("./workspace-utils");
const workspace_service_1 = require("./workspace-service");
const filesystem_utils_1 = require("@theia/filesystem/lib/common/filesystem-utils");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
let WorkspaceDuplicateHandler = class WorkspaceDuplicateHandler {
    /**
     * Determine if the command is visible.
     *
     * @param uris URIs of selected resources.
     * @returns `true` if the command is visible.
     */
    isVisible(uris) {
        return !!uris.length && !this.workspaceUtils.containsRootDirectory(uris);
    }
    /**
     * Determine if the command is enabled.
     *
     * @param uris URIs of selected resources.
     * @returns `true` if the command is enabled.
     */
    isEnabled(uris) {
        return !!uris.length && !this.workspaceUtils.containsRootDirectory(uris);
    }
    /**
     * Execute the command.
     *
     * @param uris URIs of selected resources.
     */
    async execute(uris) {
        await Promise.all(uris.map(async (uri) => {
            try {
                const parent = await this.fileService.resolve(uri.parent);
                const targetFileStat = await this.fileService.resolve(uri);
                const target = filesystem_utils_1.FileSystemUtils.generateUniqueResourceURI(parent, uri, targetFileStat.isDirectory, 'copy');
                await this.fileService.copy(uri, target);
            }
            catch (e) {
                console.error(e);
            }
        }));
    }
};
exports.WorkspaceDuplicateHandler = WorkspaceDuplicateHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], WorkspaceDuplicateHandler.prototype, "fileService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_utils_1.WorkspaceUtils),
    tslib_1.__metadata("design:type", workspace_utils_1.WorkspaceUtils)
], WorkspaceDuplicateHandler.prototype, "workspaceUtils", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_service_1.WorkspaceService),
    tslib_1.__metadata("design:type", workspace_service_1.WorkspaceService)
], WorkspaceDuplicateHandler.prototype, "workspaceService", void 0);
exports.WorkspaceDuplicateHandler = WorkspaceDuplicateHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WorkspaceDuplicateHandler);
//# sourceMappingURL=workspace-duplicate-handler.js.map