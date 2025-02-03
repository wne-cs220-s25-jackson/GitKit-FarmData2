import { EditorManager, TextEditor, EditorDecoration, EditorDecorationStyle } from '@theia/editor/lib/browser';
import { GitFileBlame } from '../../common';
import { Disposable, DisposableCollection } from '@theia/core';
import { DateTime } from 'luxon';
import * as monaco from '@theia/monaco-editor-core';
export declare class BlameDecorator implements monaco.languages.HoverProvider {
    protected blameDecorationsStyleSheet: CSSStyleSheet;
    constructor(blameDecorationsStyleSheet?: CSSStyleSheet);
    protected readonly editorManager: EditorManager;
    protected registerHoverProvider(uri: string): Disposable;
    protected emptyHover: monaco.languages.Hover;
    provideHover(model: monaco.editor.ITextModel, position: monaco.Position, token: monaco.CancellationToken): Promise<monaco.languages.Hover>;
    protected appliedDecorations: Map<string, AppliedBlameDecorations>;
    decorate(blame: GitFileBlame, editor: TextEditor, highlightLine: number): Disposable;
    protected getShaForLine(blame: GitFileBlame, line: number): string | undefined;
    protected toDecorations(blame: GitFileBlame, highlightLine: number): BlameDecorations;
    protected now: DateTime;
    protected getHeatColor(commitTime: DateTime): string;
}
export declare namespace BlameDecorator {
    const GIT_BLAME_HIGHLIGHT = "git-blame-highlight";
    const GIT_BLAME_CONTINUATION_LINE = "git-blame-continuation-line";
    const defaultGutterStyles: CSSStyleDeclaration;
    const defaultGutterBeforeStyles: CSSStyleDeclaration;
    const defaultGutterAfterStyles: CSSStyleDeclaration;
}
export interface BlameDecorations {
    editorDecorations: EditorDecoration[];
    styles: EditorDecorationStyle[];
}
export declare class AppliedBlameDecorations implements Disposable {
    readonly toDispose: DisposableCollection;
    readonly previousStyles: DisposableCollection;
    readonly previousDecorations: string[];
    blame: GitFileBlame | undefined;
    highlightedSha: string | undefined;
    dispose(): void;
}
//# sourceMappingURL=blame-decorator.d.ts.map