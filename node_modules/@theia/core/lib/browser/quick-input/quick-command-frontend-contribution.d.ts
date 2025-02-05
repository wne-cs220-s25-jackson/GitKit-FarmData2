import { CommandRegistry, CommandContribution, MenuContribution, MenuModelRegistry } from '../../common';
import { KeybindingRegistry, KeybindingContribution } from '../keybinding';
import { QuickCommandService } from './quick-command-service';
import { QuickInputService } from './quick-input-service';
export declare class QuickCommandFrontendContribution implements CommandContribution, KeybindingContribution, MenuContribution {
    protected readonly quickInputService: QuickInputService;
    protected readonly quickCommandService: QuickCommandService;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
//# sourceMappingURL=quick-command-frontend-contribution.d.ts.map