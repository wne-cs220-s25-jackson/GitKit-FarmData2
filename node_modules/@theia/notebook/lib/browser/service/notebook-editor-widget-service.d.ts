import { Emitter } from '@theia/core';
import { ApplicationShell } from '@theia/core/lib/browser';
import { NotebookEditorWidget } from '../notebook-editor-widget';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare class NotebookEditorWidgetService {
    protected applicationShell: ApplicationShell;
    protected contextKeyService: ContextKeyService;
    protected readonly notebookEditors: Map<string, NotebookEditorWidget>;
    protected readonly onNotebookEditorAddEmitter: Emitter<NotebookEditorWidget>;
    protected readonly onNotebookEditorRemoveEmitter: Emitter<NotebookEditorWidget>;
    readonly onDidAddNotebookEditor: import("@theia/core").Event<NotebookEditorWidget>;
    readonly onDidRemoveNotebookEditor: import("@theia/core").Event<NotebookEditorWidget>;
    protected readonly onDidChangeFocusedEditorEmitter: Emitter<NotebookEditorWidget | undefined>;
    readonly onDidChangeFocusedEditor: import("@theia/core").Event<NotebookEditorWidget | undefined>;
    protected readonly onDidChangeCurrentEditorEmitter: Emitter<NotebookEditorWidget | undefined>;
    readonly onDidChangeCurrentEditor: import("@theia/core").Event<NotebookEditorWidget | undefined>;
    focusedEditor?: NotebookEditorWidget;
    currentEditor?: NotebookEditorWidget;
    protected init(): void;
    addNotebookEditor(editor: NotebookEditorWidget): void;
    removeNotebookEditor(editor: NotebookEditorWidget): void;
    getNotebookEditor(editorId: string): NotebookEditorWidget | undefined;
    getNotebookEditors(): readonly NotebookEditorWidget[];
    notebookEditorFocusChanged(editor: NotebookEditorWidget, focus: boolean): void;
    currentNotebookEditorChanged(newEditor: unknown): void;
}
//# sourceMappingURL=notebook-editor-widget-service.d.ts.map