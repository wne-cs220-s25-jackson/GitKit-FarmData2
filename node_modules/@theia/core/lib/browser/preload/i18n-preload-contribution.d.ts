import { PreloadContribution } from './preloader';
import { LocalizationServer } from '../../common/i18n/localization-server';
export declare class I18nPreloadContribution implements PreloadContribution {
    protected readonly localizationServer: LocalizationServer;
    initialize(): Promise<void>;
}
//# sourceMappingURL=i18n-preload-contribution.d.ts.map