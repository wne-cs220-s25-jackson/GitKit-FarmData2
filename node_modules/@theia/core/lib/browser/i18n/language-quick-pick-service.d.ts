import { AsyncLocalizationProvider, LanguageInfo } from '../../common/i18n/localization';
import { QuickInputService, QuickPickItem } from '../quick-input';
import { WindowService } from '../window/window-service';
export interface LanguageQuickPickItem extends QuickPickItem, LanguageInfo {
    execute?(): Promise<void>;
}
export declare class LanguageQuickPickService {
    protected readonly quickInputService: QuickInputService;
    protected readonly localizationProvider: AsyncLocalizationProvider;
    protected readonly windowService: WindowService;
    pickDisplayLanguage(): Promise<LanguageInfo | undefined>;
    protected getInstalledLanguages(): Promise<LanguageQuickPickItem[]>;
    protected getAvailableLanguages(): Promise<LanguageQuickPickItem[]>;
    protected createLanguageQuickPickItem(language: LanguageInfo): LanguageQuickPickItem;
}
//# sourceMappingURL=language-quick-pick-service.d.ts.map