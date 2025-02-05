import URI from '@theia/core/lib/common/uri';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import * as monaco from '@theia/monaco-editor-core';
export declare class MonacoSnippetSuggestProvider implements monaco.languages.CompletionItemProvider {
    private static readonly _maxPrefix;
    protected readonly fileService: FileService;
    protected readonly snippets: Map<string, Snippet[]>;
    protected readonly pendingSnippets: Map<string, Promise<void>[]>;
    provideCompletionItems(model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext): Promise<monaco.languages.CompletionList | undefined>;
    resolveCompletionItem?(item: monaco.languages.CompletionItem, token: monaco.CancellationToken): monaco.languages.CompletionItem;
    protected loadSnippets(scope: string): Promise<void>;
    fromURI(uri: string | URI, options: SnippetLoadOptions): Disposable;
    /**
     * should NOT throw to prevent load errors on suggest
     */
    protected loadURI(uri: string | URI, options: SnippetLoadOptions, toDispose: DisposableCollection): Promise<void>;
    fromJSON(snippets: JsonSerializedSnippets | undefined, { language, source }: SnippetLoadOptions): Disposable;
    protected parseSnippets(snippets: JsonSerializedSnippets | undefined, accept: (name: string, snippet: JsonSerializedSnippet) => void): void;
    push(...snippets: Snippet[]): Disposable;
    protected isPatternInWord(patternLow: string, patternPos: number, patternLen: number, wordLow: string, wordPos: number, wordLen: number): boolean;
}
export interface SnippetLoadOptions {
    language?: string | string[];
    source: string;
}
export interface JsonSerializedSnippets {
    [name: string]: JsonSerializedSnippet | {
        [name: string]: JsonSerializedSnippet;
    };
}
export interface JsonSerializedSnippet {
    isFileTemplate?: boolean;
    body: string | string[];
    scope?: string;
    prefix?: string | string[];
    description: string;
}
export declare namespace JsonSerializedSnippet {
    function is(obj: unknown): obj is JsonSerializedSnippet;
}
export interface Snippet {
    readonly isFileTemplate: boolean;
    readonly scopes: string[];
    readonly name: string;
    readonly prefix: string;
    readonly description: string;
    readonly body: string;
    readonly source: string;
}
export declare class MonacoSnippetSuggestion implements monaco.languages.CompletionItem {
    protected readonly snippet: Snippet;
    readonly range: monaco.Range;
    readonly label: string;
    readonly detail: string;
    readonly sortText: string;
    readonly noAutoAccept = true;
    readonly kind = monaco.languages.CompletionItemKind.Snippet;
    readonly insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
    insertText: string;
    documentation?: monaco.IMarkdownString;
    constructor(snippet: Snippet, range: monaco.Range);
    protected resolved: boolean;
    resolve(): MonacoSnippetSuggestion;
    static compareByLabel(a: MonacoSnippetSuggestion, b: MonacoSnippetSuggestion): number;
}
//# sourceMappingURL=monaco-snippet-suggest-provider.d.ts.map