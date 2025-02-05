import { ColorRegistry } from './color-registry';
import { Emitter } from '../common/event';
import { ThemeService } from './theming';
import { FrontendApplicationContribution } from './frontend-application-contribution';
import { ContributionProvider } from '../common/contribution-provider';
import { DisposableCollection } from '../common/disposable';
import { SecondaryWindowHandler } from './secondary-window-handler';
export declare const ColorContribution: unique symbol;
export interface ColorContribution {
    registerColors(colors: ColorRegistry): void;
}
export declare class ColorApplicationContribution implements FrontendApplicationContribution {
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: import("../common/event").Event<void>;
    private readonly windows;
    protected readonly colors: ColorRegistry;
    protected readonly colorContributions: ContributionProvider<ColorContribution>;
    protected readonly themeService: ThemeService;
    protected readonly secondaryWindowHandler: SecondaryWindowHandler;
    onStart(): void;
    registerWindow(win: Window): void;
    protected readonly toUpdate: DisposableCollection;
    protected update(): void;
    protected updateWindow(win: Window): void;
    protected updateThemeBackground(): void;
}
//# sourceMappingURL=color-application-contribution.d.ts.map