import * as css from '../../../base/browser/cssValue.js';
import { Event } from '../../../base/common/event.js';
import { IDisposable } from '../../../base/common/lifecycle.js';
import { IconContribution } from '../common/iconRegistry.js';
import { IProductIconTheme, IThemeService } from '../common/themeService.js';
export interface IIconsStyleSheet extends IDisposable {
    getCSS(): css.CssFragment;
    readonly onDidChange: Event<void>;
}
export declare function getIconsStyleSheet(themeService: IThemeService | undefined): IIconsStyleSheet;
export declare class UnthemedProductIconTheme implements IProductIconTheme {
    getIcon(contribution: IconContribution): import("../common/iconRegistry.js").IconDefinition | undefined;
}
