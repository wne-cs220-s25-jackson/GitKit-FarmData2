import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, SelectionService, URI } from '@theia/core';
import { KeybindingContribution, KeybindingRegistry, OpenWithService } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import '@theia/core/lib/electron-common/electron-api';
import { FileStatNode } from '@theia/filesystem/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FileNavigatorWidget } from '../browser';
export declare const OPEN_CONTAINING_FOLDER: Command;
export declare const OPEN_WITH_SYSTEM_APP: Command;
export declare class ElectronNavigatorMenuContribution implements MenuContribution, CommandContribution, KeybindingContribution {
    protected readonly selectionService: SelectionService;
    protected readonly widgetManager: WidgetManager;
    protected readonly workspaceService: WorkspaceService;
    protected readonly openWithService: OpenWithService;
    registerCommands(commands: CommandRegistry): void;
    protected openWithSystemApplication(uri: URI): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    protected getSelectedFileStatNodes(): FileStatNode[];
    tryGetNavigatorWidget(): FileNavigatorWidget | undefined;
}
//# sourceMappingURL=electron-navigator-menu-contribution.d.ts.map