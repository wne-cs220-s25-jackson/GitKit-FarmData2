import { TextmateRegistry } from './textmate-registry';
/**
 * Callback for extensions to contribute language grammar definitions
 */
export declare const LanguageGrammarDefinitionContribution: unique symbol;
export interface LanguageGrammarDefinitionContribution {
    registerTextmateLanguage(registry: TextmateRegistry): void;
}
export declare function getEncodedLanguageId(languageId: string): number;
//# sourceMappingURL=textmate-contribution.d.ts.map