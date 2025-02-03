import { UndoRedoHandler } from '@theia/core/lib/browser';
import { ICodeEditor } from '@theia/monaco-editor-core/esm/vs/editor/browser/editorBrowser';
import { ICodeEditorService } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/codeEditorService';
export declare abstract class AbstractMonacoUndoRedoHandler implements UndoRedoHandler<ICodeEditor> {
    priority: number;
    abstract select(): ICodeEditor | undefined;
    undo(item: ICodeEditor): void;
    redo(item: ICodeEditor): void;
}
export declare class FocusedMonacoUndoRedoHandler extends AbstractMonacoUndoRedoHandler {
    priority: number;
    protected codeEditorService: ICodeEditorService;
    select(): ICodeEditor | undefined;
}
export declare class ActiveMonacoUndoRedoHandler extends AbstractMonacoUndoRedoHandler {
    priority: number;
    protected codeEditorService: ICodeEditorService;
    select(): ICodeEditor | undefined;
}
//# sourceMappingURL=monaco-undo-redo-handler.d.ts.map