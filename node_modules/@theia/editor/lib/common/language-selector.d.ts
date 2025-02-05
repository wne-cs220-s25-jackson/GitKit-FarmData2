export interface RelativePattern {
    base: string;
    pattern: string;
    pathToRelative(from: string, to: string): string;
}
export interface LanguageFilter {
    language?: string;
    scheme?: string;
    pattern?: string | RelativePattern;
    hasAccessToAllModels?: boolean;
}
export type LanguageSelector = string | LanguageFilter | (string | LanguageFilter)[];
export declare function score(selector: LanguageSelector | undefined, uriScheme: string, path: string, candidateLanguage: string, candidateIsSynchronized: boolean): number;
//# sourceMappingURL=language-selector.d.ts.map