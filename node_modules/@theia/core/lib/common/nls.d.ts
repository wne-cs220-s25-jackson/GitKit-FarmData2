import { FormatType, Localization } from './i18n/localization';
export declare namespace nls {
    let localization: Localization | undefined;
    const defaultLocale = "en";
    const localeId = "localeId";
    const locale: string | undefined;
    /**
     * Automatically localizes a text if that text also exists in the vscode repository.
     */
    function localizeByDefault(defaultValue: string, ...args: FormatType[]): string;
    function getDefaultKey(defaultValue: string): string;
    function localize(key: string, defaultValue: string, ...args: FormatType[]): string;
    function isSelectedLocale(id: string): boolean;
    function setLocale(id: string): void;
}
//# sourceMappingURL=nls.d.ts.map