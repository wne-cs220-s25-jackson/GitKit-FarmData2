import * as monaco from '@theia/monaco-editor-core';
/**
 * TODO: introduce a new request to LSP to look up an expression range: https://github.com/Microsoft/language-server-protocol/issues/462
 */
export declare class DebugExpressionProvider {
    get(model: monaco.editor.IModel, selection: monaco.IRange): string;
    protected getExactExpressionStartAndEnd(lineContent: string, looseStart: number, looseEnd: number): {
        start: number;
        end: number;
    };
}
//# sourceMappingURL=debug-expression-provider.d.ts.map