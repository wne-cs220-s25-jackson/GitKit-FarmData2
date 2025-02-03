import { EditorDecoration, EditorDecorator, TextEditor } from '@theia/editor/lib/browser';
import { DirtyDiff, Change } from './diff-computer';
import { URI } from '@theia/core';
export declare enum DirtyDiffDecorationType {
    AddedLine = "dirty-diff-added-line",
    RemovedLine = "dirty-diff-removed-line",
    ModifiedLine = "dirty-diff-modified-line"
}
export interface DirtyDiffUpdate extends DirtyDiff {
    readonly editor: TextEditor;
    readonly previousRevisionUri?: URI;
}
export declare class DirtyDiffDecorator extends EditorDecorator {
    applyDecorations(update: DirtyDiffUpdate): void;
    protected toDeltaDecoration(change: Change): EditorDecoration;
}
//# sourceMappingURL=dirty-diff-decorator.d.ts.map