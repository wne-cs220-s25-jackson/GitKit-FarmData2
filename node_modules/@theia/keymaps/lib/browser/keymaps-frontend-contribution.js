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
exports.KeymapsFrontendContribution = exports.KeymapsCommands = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const clipboard_service_1 = require("@theia/core/lib/browser/clipboard-service");
const common_frontend_contribution_1 = require("@theia/core/lib/browser/common-frontend-contribution");
const keymaps_service_1 = require("./keymaps-service");
const keybinding_1 = require("@theia/core/lib/common/keybinding");
const keybindings_widget_1 = require("./keybindings-widget");
const nls_1 = require("@theia/core/lib/common/nls");
var KeymapsCommands;
(function (KeymapsCommands) {
    KeymapsCommands.OPEN_KEYMAPS = common_1.Command.toDefaultLocalizedCommand({
        id: 'keymaps:open',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Open Keyboard Shortcuts',
    });
    KeymapsCommands.OPEN_KEYMAPS_JSON = common_1.Command.toDefaultLocalizedCommand({
        id: 'keymaps:openJson',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Open Keyboard Shortcuts (JSON)',
    });
    KeymapsCommands.OPEN_KEYMAPS_JSON_TOOLBAR = {
        id: 'keymaps:openJson.toolbar',
        iconClass: (0, browser_1.codicon)('json')
    };
    KeymapsCommands.CLEAR_KEYBINDINGS_SEARCH = {
        id: 'keymaps.clearSearch',
        iconClass: (0, browser_1.codicon)('clear-all')
    };
    KeymapsCommands.COPY_KEYBINDING = common_1.Command.toLocalizedCommand({
        id: 'keymaps:keybinding.copy',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Copy Keybinding'
    }, 'theia/keymaps/keybinding/copy', common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY_KEY);
    KeymapsCommands.COPY_COMMAND_ID = common_1.Command.toLocalizedCommand({
        id: 'keymaps:keybinding.copyCommandId',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Copy Keybinding Command ID'
    }, 'theia/keymaps/keybinding/copyCommandId', common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY_KEY);
    KeymapsCommands.COPY_COMMAND_TITLE = common_1.Command.toLocalizedCommand({
        id: 'keymaps:keybinding.copyCommandTitle',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Copy Keybinding Command Title'
    }, 'theia/keymaps/keybinding/copyCommandTitle', common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY_KEY);
    KeymapsCommands.EDIT_KEYBINDING = common_1.Command.toLocalizedCommand({
        id: 'keymaps:keybinding.edit',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Edit Keybinding...'
    }, 'theia/keymaps/keybinding/edit', common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY_KEY);
    KeymapsCommands.EDIT_WHEN_EXPRESSION = common_1.Command.toLocalizedCommand({
        id: 'keymaps:keybinding.editWhenExpression',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Edit Keybinding When Expression...'
    }, 'theia/keymaps/keybinding/editWhenExpression', common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY_KEY);
    KeymapsCommands.ADD_KEYBINDING = common_1.Command.toDefaultLocalizedCommand({
        id: 'keymaps:keybinding.add',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Add Keybinding...'
    });
    KeymapsCommands.REMOVE_KEYBINDING = common_1.Command.toDefaultLocalizedCommand({
        id: 'keymaps:keybinding.remove',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Remove Keybinding'
    });
    KeymapsCommands.RESET_KEYBINDING = common_1.Command.toDefaultLocalizedCommand({
        id: 'keymaps:keybinding.reset',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Reset Keybinding'
    });
    KeymapsCommands.SHOW_SAME = common_1.Command.toDefaultLocalizedCommand({
        id: 'keymaps:keybinding.showSame',
        category: common_frontend_contribution_1.CommonCommands.PREFERENCES_CATEGORY,
        label: 'Show Same Keybindings'
    });
})(KeymapsCommands || (exports.KeymapsCommands = KeymapsCommands = {}));
let KeymapsFrontendContribution = class KeymapsFrontendContribution extends browser_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: keybindings_widget_1.KeybindingWidget.ID,
            widgetName: keybindings_widget_1.KeybindingWidget.LABEL,
            defaultWidgetOptions: {
                area: 'main'
            },
        });
    }
    registerCommands(commands) {
        commands.registerCommand(KeymapsCommands.OPEN_KEYMAPS, {
            isEnabled: () => true,
            execute: () => this.openView({ activate: true })
        });
        commands.registerCommand(KeymapsCommands.OPEN_KEYMAPS_JSON, {
            isEnabled: () => true,
            execute: () => this.keymaps.open()
        });
        commands.registerCommand(KeymapsCommands.OPEN_KEYMAPS_JSON_TOOLBAR, {
            isEnabled: w => this.withWidget(w, () => true),
            isVisible: w => this.withWidget(w, () => true),
            execute: w => this.withWidget(w, widget => this.keymaps.open(widget)),
        });
        commands.registerCommand(KeymapsCommands.CLEAR_KEYBINDINGS_SEARCH, {
            isEnabled: w => this.withWidget(w, widget => widget.hasSearch()),
            isVisible: w => this.withWidget(w, () => true),
            execute: w => this.withWidget(w, widget => widget.clearSearch()),
        });
        commands.registerCommand(KeymapsCommands.COPY_KEYBINDING, {
            isEnabled: (...args) => this.withItem(() => true, ...args),
            isVisible: (...args) => this.withItem(() => true, ...args),
            execute: (...args) => this.withItem(item => this.clipboard.writeText(JSON.stringify(keybinding_1.Keybinding.apiObjectify(keybindings_widget_1.KeybindingItem.keybinding(item)), undefined, '  ')), ...args)
        });
        commands.registerCommand(KeymapsCommands.COPY_COMMAND_ID, {
            isEnabled: (...args) => this.withItem(() => true, ...args),
            isVisible: (...args) => this.withItem(() => true, ...args),
            execute: (...args) => this.withItem(item => this.clipboard.writeText(item.command.id), ...args)
        });
        commands.registerCommand(KeymapsCommands.COPY_COMMAND_TITLE, {
            isEnabled: (...args) => this.withItem(item => !!item.command.label, ...args),
            isVisible: (...args) => this.withItem(() => true, ...args),
            execute: (...args) => this.withItem(item => this.clipboard.writeText(item.command.label), ...args)
        });
        commands.registerCommand(KeymapsCommands.EDIT_KEYBINDING, {
            isEnabled: (...args) => this.withWidgetItem(() => true, ...args),
            isVisible: (...args) => this.withWidgetItem(() => true, ...args),
            execute: (...args) => this.withWidgetItem((item, widget) => widget.editKeybinding(item), ...args)
        });
        commands.registerCommand(KeymapsCommands.EDIT_WHEN_EXPRESSION, {
            isEnabled: (...args) => this.withWidgetItem(item => !!item.keybinding, ...args),
            isVisible: (...args) => this.withWidgetItem(() => true, ...args),
            execute: (...args) => this.withWidgetItem((item, widget) => widget.editWhenExpression(item), ...args)
        });
        commands.registerCommand(KeymapsCommands.ADD_KEYBINDING, {
            isEnabled: (...args) => this.withWidgetItem(item => !!item.keybinding, ...args),
            isVisible: (...args) => this.withWidgetItem(item => !!item.keybinding, ...args),
            execute: (...args) => this.withWidgetItem((item, widget) => widget.addKeybinding(item), ...args)
        });
        commands.registerCommand(KeymapsCommands.REMOVE_KEYBINDING, {
            isEnabled: (...args) => this.withItem(item => !!item.keybinding, ...args),
            isVisible: (...args) => this.withItem(() => true, ...args),
            execute: (...args) => this.withItem(item => this.keymaps.unsetKeybinding(item.keybinding), ...args)
        });
        commands.registerCommand(KeymapsCommands.RESET_KEYBINDING, {
            isEnabled: (...args) => this.withWidgetItem((item, widget) => widget.canResetKeybinding(item), ...args),
            isVisible: (...args) => this.withWidgetItem(() => true, ...args),
            execute: (...args) => this.withWidgetItem((item, widget) => widget.resetKeybinding(item), ...args)
        });
        commands.registerCommand(KeymapsCommands.SHOW_SAME, {
            isEnabled: (...args) => this.withWidgetItem(item => !!item.keybinding, ...args),
            isVisible: (...args) => this.withWidgetItem(() => true, ...args),
            execute: (...args) => this.withWidgetItem((item, widget) => widget.showSameKeybindings(item), ...args)
        });
    }
    registerMenus(menus) {
        menus.registerMenuAction(common_frontend_contribution_1.CommonMenus.FILE_SETTINGS_SUBMENU_OPEN, {
            commandId: KeymapsCommands.OPEN_KEYMAPS.id,
            label: nls_1.nls.localizeByDefault('Keyboard Shortcuts'),
            order: 'a20'
        });
        menus.registerMenuAction(common_frontend_contribution_1.CommonMenus.MANAGE_SETTINGS, {
            commandId: KeymapsCommands.OPEN_KEYMAPS.id,
            label: nls_1.nls.localizeByDefault('Keyboard Shortcuts'),
            order: 'a30'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.COPY_MENU, {
            commandId: KeymapsCommands.COPY_KEYBINDING.id,
            label: nls_1.nls.localizeByDefault('Copy'),
            order: 'a'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.COPY_MENU, {
            commandId: KeymapsCommands.COPY_COMMAND_ID.id,
            label: nls_1.nls.localizeByDefault('Copy Command ID'),
            order: 'b'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.COPY_MENU, {
            commandId: KeymapsCommands.COPY_COMMAND_TITLE.id,
            label: nls_1.nls.localizeByDefault('Copy Command Title'),
            order: 'c'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.EDIT_MENU, {
            commandId: KeymapsCommands.EDIT_KEYBINDING.id,
            label: nls_1.nls.localize('theia/keymaps/editKeybinding', 'Edit Keybinding...'),
            order: 'a'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.EDIT_MENU, {
            commandId: KeymapsCommands.EDIT_WHEN_EXPRESSION.id,
            label: nls_1.nls.localize('theia/keymaps/editWhenExpression', 'Edit When Expression...'),
            order: 'b'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.ADD_MENU, {
            commandId: KeymapsCommands.ADD_KEYBINDING.id,
            label: nls_1.nls.localizeByDefault('Add Keybinding...'),
            order: 'a'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.REMOVE_MENU, {
            commandId: KeymapsCommands.REMOVE_KEYBINDING.id,
            label: nls_1.nls.localizeByDefault('Remove Keybinding'),
            order: 'a'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.REMOVE_MENU, {
            commandId: KeymapsCommands.RESET_KEYBINDING.id,
            label: nls_1.nls.localizeByDefault('Reset Keybinding'),
            order: 'b'
        });
        menus.registerMenuAction(keybindings_widget_1.KeybindingWidget.SHOW_MENU, {
            commandId: KeymapsCommands.SHOW_SAME.id,
            label: nls_1.nls.localizeByDefault('Show Same Keybindings'),
            order: 'a'
        });
    }
    registerKeybindings(keybindings) {
        keybindings.registerKeybinding({
            command: KeymapsCommands.OPEN_KEYMAPS.id,
            keybinding: 'ctrl+alt+,'
        });
    }
    async registerToolbarItems(toolbar) {
        const widget = await this.widget;
        const onDidChange = widget.onDidUpdate;
        toolbar.registerItem({
            id: KeymapsCommands.OPEN_KEYMAPS_JSON_TOOLBAR.id,
            command: KeymapsCommands.OPEN_KEYMAPS_JSON_TOOLBAR.id,
            tooltip: nls_1.nls.localizeByDefault('Open Keyboard Shortcuts (JSON)'),
            priority: 0,
        });
        toolbar.registerItem({
            id: KeymapsCommands.CLEAR_KEYBINDINGS_SEARCH.id,
            command: KeymapsCommands.CLEAR_KEYBINDINGS_SEARCH.id,
            tooltip: nls_1.nls.localizeByDefault('Clear Keybindings Search Input'),
            priority: 1,
            onDidChange,
        });
    }
    /**
     * Determine if the current widget is the keybindings widget.
     */
    withWidget(widget = this.tryGetWidget(), fn) {
        if (widget instanceof keybindings_widget_1.KeybindingWidget && widget.id === keybindings_widget_1.KeybindingWidget.ID) {
            return fn(widget);
        }
        return false;
    }
    withItem(fn, ...args) {
        const [item] = args;
        if (keybindings_widget_1.KeybindingItem.is(item)) {
            return fn(item, args.slice(1));
        }
        return false;
    }
    withWidgetItem(fn, ...args) {
        const [item, widget] = args;
        if (widget instanceof keybindings_widget_1.KeybindingWidget && widget.id === keybindings_widget_1.KeybindingWidget.ID && keybindings_widget_1.KeybindingItem.is(item)) {
            return fn(item, widget, args.slice(2));
        }
        return false;
    }
};
exports.KeymapsFrontendContribution = KeymapsFrontendContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(keymaps_service_1.KeymapsService),
    tslib_1.__metadata("design:type", keymaps_service_1.KeymapsService)
], KeymapsFrontendContribution.prototype, "keymaps", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(clipboard_service_1.ClipboardService),
    tslib_1.__metadata("design:type", Object)
], KeymapsFrontendContribution.prototype, "clipboard", void 0);
exports.KeymapsFrontendContribution = KeymapsFrontendContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], KeymapsFrontendContribution);
//# sourceMappingURL=keymaps-frontend-contribution.js.map