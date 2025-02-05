/**
 * Starting with vscode 1.73.0, language pack bundles have changed their shape to accommodate the new `l10n` API.
 * They are now a record of { [englishValue]: translation }
 */
export interface LanguagePackBundle {
    contents: Record<string, string>;
    uri: string;
}
export declare const languagePackServicePath = "/services/languagePackService";
export declare const LanguagePackService: unique symbol;
export interface LanguagePackService {
    storeBundle(pluginId: string, locale: string, bundle: LanguagePackBundle): void;
    deleteBundle(pluginId: string, locale?: string): void;
    getBundle(pluginId: string, locale: string): Promise<LanguagePackBundle | undefined>;
}
//# sourceMappingURL=language-pack-service.d.ts.map