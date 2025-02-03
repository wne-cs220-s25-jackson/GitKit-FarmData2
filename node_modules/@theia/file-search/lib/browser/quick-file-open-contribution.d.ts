import { QuickFileOpenService } from './quick-file-open';
import { CommandRegistry, CommandContribution, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { KeybindingRegistry, KeybindingContribution, QuickAccessContribution } from '@theia/core/lib/browser';
export declare class QuickFileOpenFrontendContribution implements QuickAccessContribution, CommandContribution, KeybindingContribution, MenuContribution {
    protected readonly quickFileOpenService: QuickFileOpenService;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerQuickAccessProvider(): void;
}
//# sourceMappingURL=quick-file-open-contribution.d.ts.map