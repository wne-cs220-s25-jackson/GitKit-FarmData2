import { Command, CommandContribution, CommandRegistry } from '../common';
import { WindowService } from './window/window-service';
import { KeybindingContribution, KeybindingRegistry } from './keybinding';
import { MenuContribution, MenuModelRegistry } from '../common/menu';
export declare namespace WindowCommands {
    const NEW_WINDOW: Command;
}
export declare class WindowContribution implements CommandContribution, KeybindingContribution, MenuContribution {
    protected windowService: WindowService;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(registry: KeybindingRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
    private isElectron;
}
//# sourceMappingURL=window-contribution.d.ts.map