import { ContributionProvider } from '../../common';
import { LanguageInfo, Localization } from '../../common/i18n/localization';
import { LazyLocalization, LocalizationProvider } from './localization-provider';
export declare const LocalizationContribution: unique symbol;
export interface LocalizationContribution {
    registerLocalizations(registry: LocalizationRegistry): Promise<void>;
}
export declare class LocalizationRegistry {
    protected readonly localizationProvider: LocalizationProvider;
    protected readonly contributions: ContributionProvider<LocalizationContribution>;
    initialize(): Promise<void>;
    registerLocalization(localization: Localization | LazyLocalization): void;
    registerLocalizationFromRequire(locale: string | LanguageInfo, required: unknown): void;
    registerLocalizationFromFile(localizationPath: string, locale?: string | LanguageInfo): void;
    protected createLocalization(locale: string | LanguageInfo, translations: () => Promise<Record<string, string>>): LazyLocalization;
    protected flattenTranslations(localization: unknown): Record<string, string>;
    protected identifyLocale(localizationPath: string): string | undefined;
}
//# sourceMappingURL=localization-contribution.d.ts.map