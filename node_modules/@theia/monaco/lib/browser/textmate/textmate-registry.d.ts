import { IGrammarConfiguration } from 'vscode-textmate';
import { TokenizerOption } from './textmate-tokenizer';
import { Disposable } from '@theia/core/lib/common/disposable';
export interface TextmateGrammarConfiguration extends IGrammarConfiguration {
    /**
     * Optional options to further refine the tokenization of the grammar.
     */
    readonly tokenizerOption?: TokenizerOption;
}
export interface GrammarDefinitionProvider {
    getGrammarDefinition(): Promise<GrammarDefinition>;
    getInjections?(scopeName: string): string[];
}
export interface GrammarDefinition {
    format: 'json' | 'plist';
    content: object | string;
    location?: string;
}
export declare class TextmateRegistry {
    protected readonly scopeToProvider: Map<string, GrammarDefinitionProvider[]>;
    protected readonly languageToConfig: Map<string, TextmateGrammarConfiguration[]>;
    protected readonly languageIdToScope: Map<string, string[]>;
    get languages(): IterableIterator<string>;
    registerTextmateGrammarScope(scope: string, provider: GrammarDefinitionProvider): Disposable;
    getProvider(scope: string): GrammarDefinitionProvider | undefined;
    mapLanguageIdToTextmateGrammar(languageId: string, scope: string): Disposable;
    getScope(languageId: string): string | undefined;
    getLanguageId(scope: string): string | undefined;
    registerGrammarConfiguration(languageId: string, config: TextmateGrammarConfiguration): Disposable;
    getGrammarConfiguration(languageId: string): TextmateGrammarConfiguration;
}
//# sourceMappingURL=textmate-registry.d.ts.map