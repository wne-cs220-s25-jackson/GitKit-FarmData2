import { ApplicationShell, UndoRedoHandler } from '@theia/core/lib/browser';
import { NotebookEditorWidget } from '../notebook-editor-widget';
export declare class NotebookUndoRedoHandler implements UndoRedoHandler<NotebookEditorWidget> {
    protected readonly applicationShell: ApplicationShell;
    priority: number;
    select(): NotebookEditorWidget | undefined;
    undo(item: NotebookEditorWidget): void;
    redo(item: NotebookEditorWidget): void;
}
//# sourceMappingURL=notebook-undo-redo-handler.d.ts.map