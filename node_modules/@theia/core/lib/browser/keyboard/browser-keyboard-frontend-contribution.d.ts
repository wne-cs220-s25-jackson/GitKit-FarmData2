import { CommandContribution, CommandRegistry, Command } from '../../common/command';
import { BrowserKeyboardLayoutProvider, KeyboardLayoutData } from './browser-keyboard-layout-provider';
import { QuickPickValue, QuickInputService } from '../quick-input';
export declare namespace KeyboardCommands {
    const CHOOSE_KEYBOARD_LAYOUT: Command;
}
export declare class BrowserKeyboardFrontendContribution implements CommandContribution {
    protected readonly layoutProvider: BrowserKeyboardLayoutProvider;
    protected readonly quickInputService: QuickInputService;
    registerCommands(commandRegistry: CommandRegistry): void;
    protected chooseLayout(): Promise<KeyboardLayoutData | undefined>;
    protected toQuickPickValue(layout: KeyboardLayoutData, isCurrent: boolean): QuickPickValue<KeyboardLayoutData>;
}
//# sourceMappingURL=browser-keyboard-frontend-contribution.d.ts.map