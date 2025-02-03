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
exports.QuickOpenWorkspace = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const env_variables_1 = require("@theia/core/lib/common/env-variables");
const workspace_service_1 = require("./workspace-service");
const uri_1 = require("@theia/core/lib/common/uri");
const common_1 = require("@theia/core/lib/common");
const untitled_workspace_service_1 = require("../common/untitled-workspace-service");
let QuickOpenWorkspace = class QuickOpenWorkspace {
    constructor() {
        this.removeRecentWorkspaceButton = {
            iconClass: 'codicon-remove-close',
            tooltip: common_1.nls.localizeByDefault('Remove from Recently Opened')
        };
    }
    async open(workspaces) {
        var _a, _b, _c, _d;
        const homeDirUri = await this.envServer.getHomeDirUri();
        const home = new uri_1.default(homeDirUri).path.fsPath();
        const items = [{
                type: 'separator',
                label: common_1.nls.localizeByDefault('folders & workspaces')
            }];
        for (const workspace of workspaces) {
            const uri = new uri_1.default(workspace);
            const label = (_c = await ((_b = (_a = this.workspaceOpenHandlers.getContributions()
                .find(handler => handler.getWorkspaceLabel && handler.canHandle(uri))) === null || _a === void 0 ? void 0 : _a.getWorkspaceLabel) === null || _b === void 0 ? void 0 : _b.call(_a, uri))) !== null && _c !== void 0 ? _c : uri.path.base;
            if (!label || this.untitledWorkspaceService.isUntitledWorkspace(uri)) {
                continue; // skip temporary workspace files & empty workspace names
            }
            items.push({
                label: label,
                description: common_1.Path.tildify(uri.path.fsPath(), home),
                buttons: [this.removeRecentWorkspaceButton],
                resource: uri,
                execute: () => {
                    const current = this.workspaceService.workspace;
                    if ((current && current.resource.toString() !== workspace) || !current) {
                        this.workspaceService.open(uri);
                    }
                }
            });
        }
        (_d = this.quickInputService) === null || _d === void 0 ? void 0 : _d.showQuickPick(items, {
            placeholder: common_1.nls.localize('theia/workspace/openRecentPlaceholder', 'Type the name of the workspace you want to open'),
            onDidTriggerItemButton: async (context) => {
                const resource = context.item.resource;
                if (resource) {
                    await this.workspaceService.removeRecentWorkspace(resource.toString());
                    context.removeItem();
                }
            }
        });
    }
    select() {
        this.opened = this.workspaceService.opened;
        this.workspaceService.recentWorkspaces().then(workspaceRoots => {
            if (workspaceRoots) {
                this.open(workspaceRoots);
            }
        });
    }
};
exports.QuickOpenWorkspace = QuickOpenWorkspace;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.QuickInputService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", Object)
], QuickOpenWorkspace.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(workspace_service_1.WorkspaceService),
    tslib_1.__metadata("design:type", workspace_service_1.WorkspaceService)
], QuickOpenWorkspace.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.LabelProvider),
    tslib_1.__metadata("design:type", browser_1.LabelProvider)
], QuickOpenWorkspace.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(env_variables_1.EnvVariablesServer),
    tslib_1.__metadata("design:type", Object)
], QuickOpenWorkspace.prototype, "envServer", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(untitled_workspace_service_1.UntitledWorkspaceService),
    tslib_1.__metadata("design:type", untitled_workspace_service_1.UntitledWorkspaceService)
], QuickOpenWorkspace.prototype, "untitledWorkspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(workspace_service_1.WorkspaceOpenHandlerContribution),
    tslib_1.__metadata("design:type", Object)
], QuickOpenWorkspace.prototype, "workspaceOpenHandlers", void 0);
exports.QuickOpenWorkspace = QuickOpenWorkspace = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], QuickOpenWorkspace);
//# sourceMappingURL=quick-open-workspace.js.map