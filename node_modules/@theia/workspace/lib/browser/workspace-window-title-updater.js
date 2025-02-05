"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
exports.WorkspaceWindowTitleUpdater = void 0;
const tslib_1 = require("tslib");
const window_title_updater_1 = require("@theia/core/lib/browser/window/window-title-updater");
const inversify_1 = require("@theia/core/shared/inversify");
const workspace_service_1 = require("./workspace-service");
const navigatable_1 = require("@theia/core/lib/browser/navigatable");
let WorkspaceWindowTitleUpdater = class WorkspaceWindowTitleUpdater extends window_title_updater_1.WindowTitleUpdater {
    updateTitleWidget(widget) {
        super.updateTitleWidget(widget);
        let folderName;
        let folderPath;
        if (navigatable_1.Navigatable.is(widget)) {
            const folder = this.workspaceService.getWorkspaceRootUri(widget.getResourceUri());
            if (folder) {
                folderName = this.labelProvider.getName(folder);
                folderPath = folder.path.toString();
            }
        }
        this.windowTitleService.update({
            folderName,
            folderPath
        });
    }
};
exports.WorkspaceWindowTitleUpdater = WorkspaceWindowTitleUpdater;
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_service_1.WorkspaceService),
    tslib_1.__metadata("design:type", workspace_service_1.WorkspaceService)
], WorkspaceWindowTitleUpdater.prototype, "workspaceService", void 0);
exports.WorkspaceWindowTitleUpdater = WorkspaceWindowTitleUpdater = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WorkspaceWindowTitleUpdater);
//# sourceMappingURL=workspace-window-title-updater.js.map