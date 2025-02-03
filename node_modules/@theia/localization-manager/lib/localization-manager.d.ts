import { Localization } from './common';
import { deepl, DeeplParameters } from './deepl-api';
export interface LocalizationOptions {
    freeApi: Boolean;
    authKey: string;
    sourceFile: string;
    sourceLanguage?: string;
    targetLanguages: string[];
}
export type LocalizationFunction = (parameters: DeeplParameters) => Promise<string[]>;
export declare class LocalizationManager {
    private localizationFn;
    constructor(localizationFn?: typeof deepl);
    localize(options: LocalizationOptions): Promise<boolean>;
    protected translationFileName(original: string, language: string): string;
    translateLanguage(source: Localization, target: Localization, targetLanguage: string, options: LocalizationOptions): Promise<boolean>;
    protected addIgnoreTags(text: string): string;
    protected removeIgnoreTags(text: string): string;
    protected buildLocalizationMap(source: Localization, target: Localization): LocalizationMap;
}
export interface LocalizationMap {
    text: string[];
    localize: (index: number, value: string) => void;
}
//# sourceMappingURL=localization-manager.d.ts.map