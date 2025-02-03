"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserOnlyWorkspaceServer = exports.RECENT_WORKSPACES_LOCAL_STORAGE_KEY = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2023 EclipseSource and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const file_service_1 = require("@theia/filesystem/lib/browser/file-service");
exports.RECENT_WORKSPACES_LOCAL_STORAGE_KEY = 'workspaces';
let BrowserOnlyWorkspaceServer = class BrowserOnlyWorkspaceServer {
    async getRecentWorkspaces() {
        const storedWorkspaces = localStorage.getItem(exports.RECENT_WORKSPACES_LOCAL_STORAGE_KEY);
        if (!storedWorkspaces) {
            return [];
        }
        try {
            const parsedWorkspaces = JSON.parse(storedWorkspaces);
            if ((0, core_1.isStringArray)(parsedWorkspaces)) {
                return parsedWorkspaces;
            }
        }
        catch (e) {
            this.logger.error(e);
            return [];
        }
        return [];
    }
    async getMostRecentlyUsedWorkspace() {
        const workspaces = await this.getRecentWorkspaces();
        return workspaces[0];
    }
    async setMostRecentlyUsedWorkspace(uri) {
        const workspaces = await this.getRecentWorkspaces();
        if (workspaces.includes(uri)) {
            workspaces.splice(workspaces.indexOf(uri), 1);
        }
        localStorage.setItem(exports.RECENT_WORKSPACES_LOCAL_STORAGE_KEY, JSON.stringify([uri, ...workspaces]));
    }
    async removeRecentWorkspace(uri) {
        const workspaces = await this.getRecentWorkspaces();
        if (workspaces.includes(uri)) {
            workspaces.splice(workspaces.indexOf(uri), 1);
        }
        localStorage.setItem(exports.RECENT_WORKSPACES_LOCAL_STORAGE_KEY, JSON.stringify(workspaces));
    }
};
exports.BrowserOnlyWorkspaceServer = BrowserOnlyWorkspaceServer;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], BrowserOnlyWorkspaceServer.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(file_service_1.FileService),
    tslib_1.__metadata("design:type", file_service_1.FileService)
], BrowserOnlyWorkspaceServer.prototype, "fileService", void 0);
exports.BrowserOnlyWorkspaceServer = BrowserOnlyWorkspaceServer = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], BrowserOnlyWorkspaceServer);
//# sourceMappingURL=browser-only-workspace-server.js.map