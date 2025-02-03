"use strict";
// *****************************************************************************
// Copyright (C) 2021 EclipseSource and others.
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
exports.ElectronNavigatorMenuContribution = exports.OPEN_WITH_SYSTEM_APP = exports.OPEN_CONTAINING_FOLDER = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const common_1 = require("@theia/core/lib/common");
const file_uri_1 = require("@theia/core/lib/common/file-uri");
const os_1 = require("@theia/core/lib/common/os");
const uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
require("@theia/core/lib/electron-common/electron-api");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_2 = require("@theia/filesystem/lib/browser");
const browser_3 = require("@theia/workspace/lib/browser");
const browser_4 = require("../browser");
const navigator_contribution_1 = require("../browser/navigator-contribution");
exports.OPEN_CONTAINING_FOLDER = core_1.Command.toDefaultLocalizedCommand({
    id: 'revealFileInOS',
    category: browser_1.CommonCommands.FILE_CATEGORY,
    label: os_1.isWindows ? 'Reveal in File Explorer' :
        os_1.isOSX ? 'Reveal in Finder' :
            /* linux */ 'Open Containing Folder'
});
exports.OPEN_WITH_SYSTEM_APP = core_1.Command.toDefaultLocalizedCommand({
    id: 'openWithSystemApp',
    category: browser_1.CommonCommands.FILE_CATEGORY,
    label: 'Open With System Editor'
});
let ElectronNavigatorMenuContribution = class ElectronNavigatorMenuContribution {
    registerCommands(commands) {
        commands.registerCommand(exports.OPEN_CONTAINING_FOLDER, uri_command_handler_1.UriAwareCommandHandler.MonoSelect(this.selectionService, {
            execute: async (uri) => {
                window.electronTheiaCore.showItemInFolder(file_uri_1.FileUri.fsPath(uri));
            },
            isEnabled: uri => !!this.workspaceService.getWorkspaceRootUri(uri),
            isVisible: uri => !!this.workspaceService.getWorkspaceRootUri(uri),
        }));
        commands.registerCommand(exports.OPEN_WITH_SYSTEM_APP, uri_command_handler_1.UriAwareCommandHandler.MonoSelect(this.selectionService, {
            execute: async (uri) => {
                this.openWithSystemApplication(uri);
            }
        }));
        this.openWithService.registerHandler({
            id: 'system-editor',
            label: common_1.nls.localize('theia/navigator/systemEditor', 'System Editor'),
            providerName: common_1.nls.localizeByDefault('Built-in'),
            // Low priority to avoid conflicts with other open handlers.
            canHandle: uri => (uri.scheme === 'file') ? 10 : 0,
            open: uri => {
                this.openWithSystemApplication(uri);
                return {};
            }
        });
    }
    openWithSystemApplication(uri) {
        window.electronTheiaCore.openWithSystemApp(file_uri_1.FileUri.fsPath(uri));
    }
    registerMenus(menus) {
        menus.registerMenuAction(navigator_contribution_1.NavigatorContextMenu.NAVIGATION, {
            commandId: exports.OPEN_CONTAINING_FOLDER.id,
            label: exports.OPEN_CONTAINING_FOLDER.label
        });
        menus.registerMenuAction(navigator_contribution_1.SHELL_TABBAR_CONTEXT_REVEAL, {
            commandId: exports.OPEN_CONTAINING_FOLDER.id,
            label: exports.OPEN_CONTAINING_FOLDER.label,
            order: '4'
        });
    }
    registerKeybindings(keybindings) {
        keybindings.registerKeybinding({
            command: exports.OPEN_CONTAINING_FOLDER.id,
            keybinding: 'ctrlcmd+alt+p',
            when: 'filesExplorerFocus'
        });
    }
    getSelectedFileStatNodes() {
        const navigator = this.tryGetNavigatorWidget();
        return navigator ? navigator.model.selectedNodes.filter(browser_2.FileStatNode.is) : [];
    }
    tryGetNavigatorWidget() {
        return this.widgetManager.tryGetWidget(browser_4.FILE_NAVIGATOR_ID);
    }
};
exports.ElectronNavigatorMenuContribution = ElectronNavigatorMenuContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.SelectionService),
    tslib_1.__metadata("design:type", core_1.SelectionService)
], ElectronNavigatorMenuContribution.prototype, "selectionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(widget_manager_1.WidgetManager),
    tslib_1.__metadata("design:type", widget_manager_1.WidgetManager)
], ElectronNavigatorMenuContribution.prototype, "widgetManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_3.WorkspaceService),
    tslib_1.__metadata("design:type", browser_3.WorkspaceService)
], ElectronNavigatorMenuContribution.prototype, "workspaceService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenWithService),
    tslib_1.__metadata("design:type", browser_1.OpenWithService)
], ElectronNavigatorMenuContribution.prototype, "openWithService", void 0);
exports.ElectronNavigatorMenuContribution = ElectronNavigatorMenuContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronNavigatorMenuContribution);
//# sourceMappingURL=electron-navigator-menu-contribution.js.map