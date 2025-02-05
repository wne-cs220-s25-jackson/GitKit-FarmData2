import { Disposable } from '@theia/core/lib/common';
import * as monaco from '@theia/monaco-editor-core';
export declare class CommentGlyphWidget implements Disposable {
    private lineNumber;
    private editor;
    private commentsDecorations;
    readonly commentsOptions: monaco.editor.IModelDecorationOptions;
    constructor(editor: monaco.editor.ICodeEditor);
    getPosition(): number;
    setLineNumber(lineNumber: number): void;
    dispose(): void;
}
//# sourceMappingURL=comment-glyph-widget.d.ts.map