import { CommandContribution, Command, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { AbstractViewContribution, Widget } from '@theia/core/lib/browser';
import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
import { KeymapsService } from './keymaps-service';
import { KeybindingRegistry } from '@theia/core/lib/browser/keybinding';
import { KeybindingItem, KeybindingWidget } from './keybindings-widget';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
export declare namespace KeymapsCommands {
    const OPEN_KEYMAPS: Command;
    const OPEN_KEYMAPS_JSON: Command;
    const OPEN_KEYMAPS_JSON_TOOLBAR: Command;
    const CLEAR_KEYBINDINGS_SEARCH: Command;
    const COPY_KEYBINDING: Command;
    const COPY_COMMAND_ID: Command;
    const COPY_COMMAND_TITLE: Command;
    const EDIT_KEYBINDING: Command;
    const EDIT_WHEN_EXPRESSION: Command;
    const ADD_KEYBINDING: Command;
    const REMOVE_KEYBINDING: Command;
    const RESET_KEYBINDING: Command;
    const SHOW_SAME: Command;
}
export declare class KeymapsFrontendContribution extends AbstractViewContribution<KeybindingWidget> implements CommandContribution, MenuContribution, TabBarToolbarContribution {
    protected readonly keymaps: KeymapsService;
    protected readonly clipboard: ClipboardService;
    constructor();
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerToolbarItems(toolbar: TabBarToolbarRegistry): Promise<void>;
    /**
     * Determine if the current widget is the keybindings widget.
     */
    protected withWidget<T>(widget: Widget | undefined, fn: (widget: KeybindingWidget) => T): T | false;
    protected withItem<T>(fn: (item: KeybindingItem, ...rest: unknown[]) => T, ...args: unknown[]): T | false;
    protected withWidgetItem<T>(fn: (item: KeybindingItem, widget: KeybindingWidget, ...rest: unknown[]) => T, ...args: unknown[]): T | false;
}
//# sourceMappingURL=keymaps-frontend-contribution.d.ts.map