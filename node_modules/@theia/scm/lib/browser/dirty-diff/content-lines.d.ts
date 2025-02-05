import { TextEditorDocument } from '@theia/editor/lib/browser';
export interface ContentLines extends ArrayLike<string> {
    readonly length: number;
    getLineContent: (line: number) => string;
}
export interface ContentLinesArrayLike extends ContentLines, ArrayLike<string> {
    [Symbol.iterator]: () => IterableIterator<string>;
    readonly [n: number]: string;
}
export declare namespace ContentLines {
    function fromString(content: string): ContentLines;
    function fromTextEditorDocument(document: TextEditorDocument): ContentLines;
    function arrayLike(lines: ContentLines): ContentLinesArrayLike;
}
//# sourceMappingURL=content-lines.d.ts.map