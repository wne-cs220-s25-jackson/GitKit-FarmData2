import { FrontendApplicationContribution } from './frontend-application-contribution';
import { ContributionProvider } from '../common/contribution-provider';
import { IconThemeService, IconTheme } from './icon-theme-service';
import { MaybePromise } from '../common/types';
import { Disposable } from '../common/disposable';
export declare const IconThemeContribution: unique symbol;
export interface IconThemeContribution {
    registerIconThemes(iconThemes: IconThemeService): MaybePromise<void>;
}
export declare class IconThemeApplicationContribution implements FrontendApplicationContribution {
    protected readonly iconThemes: IconThemeService;
    protected readonly iconThemeContributions: ContributionProvider<IconThemeContribution>;
    onStart(): Promise<void>;
}
export declare class DefaultFileIconThemeContribution implements IconTheme, IconThemeContribution {
    readonly id = "theia-file-icons";
    readonly label = "File Icons (Theia)";
    readonly hasFileIcons = true;
    readonly hasFolderIcons = true;
    readonly showLanguageModeIcons = true;
    registerIconThemes(iconThemes: IconThemeService): MaybePromise<void>;
    activate(): Disposable;
}
//# sourceMappingURL=icon-theme-contribution.d.ts.map