import { Range } from 'vscode-languageserver-protocol';
export interface TextDocumentContentChangeDelta {
    readonly range: Range;
    readonly rangeLength?: number;
    readonly text: string;
}
export declare namespace TextDocumentContentChangeDelta {
    function is(arg: unknown): arg is TextDocumentContentChangeDelta;
}
//# sourceMappingURL=lsp-types.d.ts.map