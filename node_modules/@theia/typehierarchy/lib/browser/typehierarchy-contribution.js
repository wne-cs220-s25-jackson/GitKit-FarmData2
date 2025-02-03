"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.TypeHierarchyCommands = exports.TypeHierarchyContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const shell_1 = require("@theia/core/lib/browser/shell");
const command_1 = require("@theia/core/lib/common/command");
const editor_menu_1 = require("@theia/editor/lib/browser/editor-menu");
const editor_manager_1 = require("@theia/editor/lib/browser/editor-manager");
const view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
const typehierarchy_tree_1 = require("./tree/typehierarchy-tree");
const typehierarchy_tree_widget_1 = require("./tree/typehierarchy-tree-widget");
const typehierarchy_service_1 = require("./typehierarchy-service");
const uri_1 = require("@theia/core/lib/common/uri");
const context_key_service_1 = require("@theia/core/lib/browser/context-key-service");
let TypeHierarchyContribution = class TypeHierarchyContribution extends view_contribution_1.AbstractViewContribution {
    constructor() {
        super({
            widgetId: typehierarchy_tree_widget_1.TypeHierarchyTreeWidget.WIDGET_ID,
            widgetName: typehierarchy_tree_widget_1.TypeHierarchyTreeWidget.WIDGET_LABEL,
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: TypeHierarchyCommands.TOGGLE_VIEW.id,
            toggleKeybinding: 'ctrlcmd+shift+h'
        });
    }
    init() {
        this.editorHasTypeHierarchyProvider = this.contextKeyService.createKey('editorHasTypeHierarchyProvider', false);
        this.editorManager.onCurrentEditorChanged(() => this.editorHasTypeHierarchyProvider.set(this.isTypeHierarchyAvailable()));
        this.typeHierarchyServiceProvider.onDidChange(() => this.editorHasTypeHierarchyProvider.set(this.isTypeHierarchyAvailable()));
    }
    isTypeHierarchyAvailable() {
        const { selection, languageId } = this.editorAccess;
        return !!selection && !!languageId && !!this.typeHierarchyServiceProvider.get(languageId, new uri_1.default(selection.uri));
    }
    async openView(args) {
        const widget = await super.openView(args);
        const { selection, languageId } = this.editorAccess;
        const direction = this.getDirection(args);
        await widget.initialize({ location: selection, languageId, direction });
        return widget;
    }
    registerCommands(commands) {
        super.registerCommands(commands);
        commands.registerCommand(TypeHierarchyCommands.OPEN_SUBTYPE, {
            execute: () => this.openViewOrFlipHierarchyDirection(0 /* TypeHierarchyDirection.Children */),
            isEnabled: this.isEnabled.bind(this)
        });
        commands.registerCommand(TypeHierarchyCommands.OPEN_SUPERTYPE, {
            execute: () => this.openViewOrFlipHierarchyDirection(1 /* TypeHierarchyDirection.Parents */),
            isEnabled: this.isEnabled.bind(this)
        });
    }
    registerMenus(menus) {
        super.registerMenus(menus);
        const menuPath = [...editor_menu_1.EDITOR_CONTEXT_MENU, 'type-hierarchy'];
        menus.registerMenuAction(menuPath, {
            commandId: TypeHierarchyCommands.OPEN_SUBTYPE.id
        });
        menus.registerMenuAction(menuPath, {
            commandId: TypeHierarchyCommands.OPEN_SUPERTYPE.id
        });
    }
    registerKeybindings(keybindings) {
        super.registerKeybindings(keybindings);
        keybindings.registerKeybinding({
            command: TypeHierarchyCommands.OPEN_SUBTYPE.id,
            keybinding: 'ctrlcmd+alt+h'
        });
    }
    /**
     * Flips the hierarchy direction in the `Type Hierarchy` view, if it is active and has a valid root.
     * Otherwise, calculates the type hierarchy based on the selection of the current editor.
     */
    async openViewOrFlipHierarchyDirection(direction) {
        if (this.isEnabled()) {
            const { activeWidget } = this.shell;
            if (activeWidget instanceof typehierarchy_tree_widget_1.TypeHierarchyTreeWidget && typehierarchy_tree_1.TypeHierarchyTree.RootNode.is(activeWidget.model.root)) {
                await activeWidget.model.flipDirection();
            }
            else {
                await this.openView({
                    toggle: false,
                    activate: true,
                    direction
                });
            }
        }
    }
    /**
     * Enabled if the `current` editor has the `languageId` or the `Type Hierarchy` widget is the active one.
     */
    isEnabled(languageId = this.editorAccess.languageId) {
        return !!languageId || this.shell.activeWidget instanceof typehierarchy_tree_widget_1.TypeHierarchyTreeWidget;
    }
    /**
     * Extracts the type hierarchy direction from the argument. If the direction cannot be extracted, returns with the `Children` as the default type.
     */
    getDirection(args) {
        return !!args && !!args.direction ? args.direction : 0 /* TypeHierarchyDirection.Children */;
    }
};
exports.TypeHierarchyContribution = TypeHierarchyContribution;
tslib_1.__decorate([
    (0, inversify_1.inject)(shell_1.ApplicationShell),
    tslib_1.__metadata("design:type", shell_1.ApplicationShell)
], TypeHierarchyContribution.prototype, "shell", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(editor_manager_1.EditorAccess),
    (0, inversify_1.named)(editor_manager_1.EditorAccess.CURRENT),
    tslib_1.__metadata("design:type", editor_manager_1.EditorAccess)
], TypeHierarchyContribution.prototype, "editorAccess", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(editor_manager_1.EditorManager),
    tslib_1.__metadata("design:type", editor_manager_1.EditorManager)
], TypeHierarchyContribution.prototype, "editorManager", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    tslib_1.__metadata("design:type", Object)
], TypeHierarchyContribution.prototype, "contextKeyService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(typehierarchy_service_1.TypeHierarchyServiceProvider),
    tslib_1.__metadata("design:type", typehierarchy_service_1.TypeHierarchyServiceProvider)
], TypeHierarchyContribution.prototype, "typeHierarchyServiceProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TypeHierarchyContribution.prototype, "init", null);
exports.TypeHierarchyContribution = TypeHierarchyContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TypeHierarchyContribution);
var TypeHierarchyCommands;
(function (TypeHierarchyCommands) {
    TypeHierarchyCommands.TOGGLE_VIEW = {
        id: 'typehierarchy:toggle'
    };
    TypeHierarchyCommands.OPEN_SUBTYPE = command_1.Command.toLocalizedCommand({
        id: 'typehierarchy:open-subtype',
        label: 'Subtype Hierarchy'
    }, 'theia/typehierarchy/subtypeHierarchy');
    TypeHierarchyCommands.OPEN_SUPERTYPE = command_1.Command.toLocalizedCommand({
        id: 'typehierarchy:open-supertype',
        label: 'Supertype Hierarchy'
    }, 'theia/typehierarchy/supertypeHierarchy');
})(TypeHierarchyCommands || (exports.TypeHierarchyCommands = TypeHierarchyCommands = {}));
//# sourceMappingURL=typehierarchy-contribution.js.map