import { ContributionProvider } from '../common/contribution-provider';
import { Theme, ThemeType } from '../common/theme';
import { ColorRegistry } from './color-registry';
import { FrontendApplicationContribution } from './frontend-application-contribution';
import { ThemeService } from './theming';
import { SecondaryWindowHandler } from './secondary-window-handler';
export declare const StylingParticipant: unique symbol;
export interface StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export interface ColorTheme {
    type: ThemeType;
    label: string;
    getColor(color: string): string | undefined;
}
export interface CssStyleCollector {
    addRule(rule: string): void;
}
export declare class StylingService implements FrontendApplicationContribution {
    protected cssElements: Map<Window, HTMLStyleElement>;
    protected readonly themeService: ThemeService;
    protected readonly colorRegistry: ColorRegistry;
    protected readonly themingParticipants: ContributionProvider<StylingParticipant>;
    protected readonly secondaryWindowHandler: SecondaryWindowHandler;
    onStart(): void;
    registerWindow(win: Window): void;
    protected applyStylingToWindows(theme: Theme): void;
    protected applyStyling(theme: Theme, cssElement: HTMLStyleElement): void;
}
//# sourceMappingURL=styling-service.d.ts.map