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
exports.ScmHistoryContribution = exports.SCM_HISTORY_TOGGLE_KEYBINDING = exports.ScmHistoryCommands = exports.SCM_HISTORY_LABEL = exports.SCM_HISTORY_ID = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const navigator_contribution_1 = require("@theia/navigator/lib/browser/navigator-contribution");
const uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
const scm_service_1 = require("@theia/scm/lib/browser/scm-service");
const scm_extra_contribution_1 = require("../scm-extra-contribution");
const scm_history_constants_1 = require("./scm-history-constants");
Object.defineProperty(exports, "SCM_HISTORY_ID", { enumerable: true, get: function () { return scm_history_constants_1.SCM_HISTORY_ID; } });
Object.defineProperty(exports, "SCM_HISTORY_LABEL", { enumerable: true, get: function () { return scm_history_constants_1.SCM_HISTORY_LABEL; } });
Object.defineProperty(exports, "ScmHistoryCommands", { enumerable: true, get: function () { return scm_history_constants_1.ScmHistoryCommands; } });
Object.defineProperty(exports, "SCM_HISTORY_TOGGLE_KEYBINDING", { enumerable: true, get: function () { return scm_history_constants_1.SCM_HISTORY_TOGGLE_KEYBINDING; } });
let ScmHistoryContribution = class ScmHistoryContribution extends browser_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: scm_history_constants_1.SCM_HISTORY_ID,
            widgetName: scm_history_constants_1.SCM_HISTORY_LABEL,
            defaultWidgetOptions: {
                area: 'left',
                rank: 500
            },
            toggleCommandId: scm_history_constants_1.ScmHistoryCommands.OPEN_BRANCH_HISTORY.id,
            toggleKeybinding: scm_history_constants_1.SCM_HISTORY_TOGGLE_KEYBINDING
        });
    }
    async openView(args) {
        const widget = await super.openView(args);
        this.refreshWidget(args.uri);
        return widget;
    }
    registerMenus(menus) {
        menus.registerMenuAction(navigator_contribution_1.NavigatorContextMenu.SEARCH, {
            commandId: scm_history_constants_1.ScmHistoryCommands.OPEN_FILE_HISTORY.id,
            label: scm_history_constants_1.SCM_HISTORY_LABEL
        });
        menus.registerMenuAction(scm_extra_contribution_1.EDITOR_CONTEXT_MENU_SCM, {
            commandId: scm_history_constants_1.ScmHistoryCommands.OPEN_FILE_HISTORY.id,
            label: scm_history_constants_1.SCM_HISTORY_LABEL
        });
        super.registerMenus(menus);
    }
    registerCommands(commands) {
        commands.registerCommand(scm_history_constants_1.ScmHistoryCommands.OPEN_FILE_HISTORY, this.newUriAwareCommandHandler({
            isEnabled: (uri) => !!this.scmService.findRepository(uri),
            isVisible: (uri) => !!this.scmService.findRepository(uri),
            execute: async (uri) => this.openView({ activate: true, uri: uri.toString() }),
        }));
        super.registerCommands(commands);
    }
    async refreshWidget(uri) {
        const widget = this.tryGetWidget();
        if (!widget) {
            // the widget doesn't exist, so don't wake it up
            return;
        }
        await widget.setContent({ uri });
    }
    newUriAwareCommandHandler(handler) {
        return uri_command_handler_1.UriAwareCommandHandler.MonoSelect(this.selectionService, handler);
    }
};
exports.ScmHistoryContribution = ScmHistoryContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.SelectionService),
    tslib_1.__metadata("design:type", core_1.SelectionService)
], ScmHistoryContribution.prototype, "selectionService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(scm_service_1.ScmService),
    tslib_1.__metadata("design:type", scm_service_1.ScmService)
], ScmHistoryContribution.prototype, "scmService", void 0);
exports.ScmHistoryContribution = ScmHistoryContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ScmHistoryContribution);
//# sourceMappingURL=scm-history-contribution.js.map