import { FrontendApplicationContribution, StatusBar, FrontendApplication, KeybindingContribution, KeybindingRegistry, StylingParticipant, ColorTheme, CssStyleCollector } from '@theia/core/lib/browser';
import { CommandContribution, CommandRegistry } from '@theia/core';
import { NotificationManager } from './notifications-manager';
import { NotificationsRenderer } from './notifications-renderer';
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
export declare class NotificationsContribution implements FrontendApplicationContribution, CommandContribution, KeybindingContribution, ColorContribution, StylingParticipant {
    protected readonly id = "theia-notification-center";
    protected readonly manager: NotificationManager;
    protected readonly notificationsRenderer: NotificationsRenderer;
    protected readonly statusBar: StatusBar;
    onStart(_app: FrontendApplication): void;
    protected createStatusBarItem(): void;
    protected updateStatusBarItem(count?: number): void;
    protected getStatusBarItemText(count: number): string;
    protected getStatusBarItemTooltip(count: number): string;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerColors(colors: ColorRegistry): void;
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
//# sourceMappingURL=notifications-contribution.d.ts.map