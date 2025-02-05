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
exports.WorkspaceUtils = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const workspace_service_1 = require("./workspace-service");
/**
 * Collection of workspace utility functions
 * @class
 */
let WorkspaceUtils = class WorkspaceUtils {
    /**
     * Determine if root directory exists
     * for a given array of URIs
     * @param uris
     */
    containsRootDirectory(uris) {
        // obtain all roots URIs for a given workspace
        const rootUris = this.workspaceService.tryGetRoots().map(root => root.resource);
        // return true if at least a single URI is a root directory
        return rootUris.some(rootUri => uris.some(uri => uri.isEqualOrParent(rootUri)));
    }
};
exports.WorkspaceUtils = WorkspaceUtils;
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_service_1.WorkspaceService),
    tslib_1.__metadata("design:type", workspace_service_1.WorkspaceService)
], WorkspaceUtils.prototype, "workspaceService", void 0);
exports.WorkspaceUtils = WorkspaceUtils = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WorkspaceUtils);
//# sourceMappingURL=workspace-utils.js.map