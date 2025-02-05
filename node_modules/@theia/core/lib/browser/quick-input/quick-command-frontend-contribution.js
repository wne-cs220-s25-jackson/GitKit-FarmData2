"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickCommandFrontendContribution = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const common_frontend_contribution_1 = require("../common-frontend-contribution");
const quick_command_service_1 = require("./quick-command-service");
const quick_input_service_1 = require("./quick-input-service");
const dialogs_1 = require("../dialogs");
let QuickCommandFrontendContribution = class QuickCommandFrontendContribution {
    registerCommands(commands) {
        commands.registerCommand(quick_command_service_1.quickCommand, {
            execute: () => {
                var _a;
                (_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.open('>');
            }
        });
        commands.registerCommand(quick_command_service_1.CLEAR_COMMAND_HISTORY, {
            execute: async () => {
                const shouldClear = await new dialogs_1.ConfirmDialog({
                    title: common_1.nls.localizeByDefault('Clear Command History'),
                    msg: common_1.nls.localizeByDefault('Do you want to clear the history of recently used commands?'),
                    ok: common_1.nls.localizeByDefault('Clear'),
                    cancel: dialogs_1.Dialog.CANCEL,
                }).open();
                if (shouldClear) {
                    commands.clearCommandHistory();
                }
            }
        });
        commands.registerCommand(quick_command_service_1.CLOSE_QUICK_OPEN, {
            execute: () => { var _a; return (_a = this.quickInputService) === null || _a === void 0 ? void 0 : _a.hide(); }
        });
    }
    registerMenus(menus) {
        menus.registerMenuAction(common_frontend_contribution_1.CommonMenus.VIEW_PRIMARY, {
            commandId: quick_command_service_1.quickCommand.id,
            label: common_1.nls.localizeByDefault('Command Palette...')
        });
        menus.registerMenuAction(common_frontend_contribution_1.CommonMenus.MANAGE_GENERAL, {
            commandId: quick_command_service_1.quickCommand.id,
            label: common_1.nls.localizeByDefault('Command Palette...'),
            order: '0'
        });
    }
    registerKeybindings(keybindings) {
        keybindings.registerKeybinding({
            command: quick_command_service_1.quickCommand.id,
            keybinding: 'f1'
        });
        keybindings.registerKeybinding({
            command: quick_command_service_1.quickCommand.id,
            keybinding: 'ctrlcmd+shift+p'
        });
        keybindings.registerKeybinding({
            command: quick_command_service_1.CLOSE_QUICK_OPEN.id,
            keybinding: 'esc',
            when: 'inQuickOpen'
        });
        keybindings.registerKeybinding({
            command: quick_command_service_1.CLOSE_QUICK_OPEN.id,
            keybinding: 'shift+esc',
            when: 'inQuickOpen'
        });
    }
};
exports.QuickCommandFrontendContribution = QuickCommandFrontendContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_input_service_1.QuickInputService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", Object)
], QuickCommandFrontendContribution.prototype, "quickInputService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(quick_command_service_1.QuickCommandService),
    (0, inversify_1.optional)(),
    tslib_1.__metadata("design:type", quick_command_service_1.QuickCommandService)
], QuickCommandFrontendContribution.prototype, "quickCommandService", void 0);
exports.QuickCommandFrontendContribution = QuickCommandFrontendContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], QuickCommandFrontendContribution);
//# sourceMappingURL=quick-command-frontend-contribution.js.map