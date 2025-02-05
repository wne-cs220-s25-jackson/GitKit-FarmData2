import * as monaco from '@theia/monaco-editor-core';
/**
 * @deprecated use MonacoSnippetSuggestProvider instead
 */
export declare class TextmateSnippetCompletionProvider implements monaco.languages.CompletionItemProvider {
    protected config: TextmateSnippets;
    protected mdLanguage: string;
    private items;
    constructor(config: TextmateSnippets, mdLanguage?: string);
    protected replaceVariables(textmateSnippet: string): string;
    provideCompletionItems(document: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken): monaco.languages.CompletionList;
}
/**
 * @deprecated use JsonSerializedSnippets & MonacoSnippetSuggestProvider instead
 */
export interface TextmateSnippets {
    [name: string]: TextmateSnippet;
}
/**
 * @deprecated use JsonSerializedSnippet & MonacoSnippetSuggestProvider instead
 */
export interface TextmateSnippet {
    readonly prefix: string;
    readonly body: string[];
    readonly description: string;
}
//# sourceMappingURL=textmate-snippet-completion-provider.d.ts.map