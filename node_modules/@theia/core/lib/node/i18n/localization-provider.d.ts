import { LanguageInfo, Localization } from '../../common/i18n/localization';
import { Disposable } from '../../common/disposable';
/**
 * Localization data structure that contributes its localizations asynchronously.
 * Allows to load localizations on demand when requested by the user.
 */
export interface LazyLocalization extends LanguageInfo {
    getTranslations(): Promise<Record<string, string>>;
}
export declare namespace LazyLocalization {
    function is(obj: unknown): obj is LazyLocalization;
    function fromLocalization(localization: Localization): LazyLocalization;
    function toLocalization(localization: LazyLocalization): Promise<Localization>;
}
export declare class LocalizationProvider {
    protected localizations: LazyLocalization[];
    protected currentLanguage: string;
    addLocalizations(...localizations: LazyLocalization[]): Disposable;
    setCurrentLanguage(languageId: string): void;
    getCurrentLanguage(): string;
    getAvailableLanguages(all?: boolean): LanguageInfo[];
    loadLocalization(languageId: string): Promise<Localization>;
}
//# sourceMappingURL=localization-provider.d.ts.map