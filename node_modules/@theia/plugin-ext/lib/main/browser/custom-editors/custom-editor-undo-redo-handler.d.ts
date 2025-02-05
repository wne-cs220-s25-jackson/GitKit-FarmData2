import { ApplicationShell, UndoRedoHandler } from '@theia/core/lib/browser';
import { CustomEditorWidget } from './custom-editor-widget';
export declare class CustomEditorUndoRedoHandler implements UndoRedoHandler<CustomEditorWidget> {
    protected readonly applicationShell: ApplicationShell;
    priority: number;
    select(): CustomEditorWidget | undefined;
    undo(item: CustomEditorWidget): void;
    redo(item: CustomEditorWidget): void;
}
//# sourceMappingURL=custom-editor-undo-redo-handler.d.ts.map