"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.WorkspaceUserWorkingDirectoryProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const user_working_directory_provider_1 = require("@theia/core/lib/browser/user-working-directory-provider");
const workspace_service_1 = require("./workspace-service");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
let WorkspaceUserWorkingDirectoryProvider = class WorkspaceUserWorkingDirectoryProvider extends user_working_directory_provider_1.UserWorkingDirectoryProvider {
    async getUserWorkingDir() {
        var _a, _b, _c;
        return (_c = (_b = (_a = await this.getFromSelection()) !== null && _a !== void 0 ? _a : await this.getFromLastOpenResource()) !== null && _b !== void 0 ? _b : await this.getFromWorkspace()) !== null && _c !== void 0 ? _c : this.getFromUserHome();
    }
    getFromWorkspace() {
        var _a;
        return (_a = this.workspaceService.tryGetRoots()[0]) === null || _a === void 0 ? void 0 : _a.resource;
    }
    async ensureIsDirectory(uri) {
        if (uri) {
            const asFile = uri.withScheme('file');
            const stat = await this.fileService.resolve(asFile)
                .catch(() => this.fileService.resolve(asFile.parent))
                .catch(() => undefined);
            return (stat === null || stat === void 0 ? void 0 : stat.isDirectory) ? stat.resource : stat === null || stat === void 0 ? void 0 : stat.resource.parent;
        }
    }
};
exports.WorkspaceUserWorkingDirectoryProvider = WorkspaceUserWorkingDirectoryProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_service_1.WorkspaceService),
    tslib_1.__metadata("design:type", workspace_service_1.WorkspaceService)
], WorkspaceUserWorkingDirectoryProvider.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], WorkspaceUserWorkingDirectoryProvider.prototype, "fileService", void 0);
exports.WorkspaceUserWorkingDirectoryProvider = WorkspaceUserWorkingDirectoryProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WorkspaceUserWorkingDirectoryProvider);
//# sourceMappingURL=workspace-user-working-directory-provider.js.map