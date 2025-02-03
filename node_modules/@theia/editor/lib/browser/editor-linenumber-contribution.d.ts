import { EditorManager } from './editor-manager';
import { EditorMouseEvent, TextEditor } from './editor';
import { FrontendApplicationContribution, ContextMenuRenderer } from '@theia/core/lib/browser';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { MenuPath } from '@theia/core';
import { EditorWidget } from './editor-widget';
export declare const EDITOR_LINENUMBER_CONTEXT_MENU: MenuPath;
export declare class EditorLineNumberContribution implements FrontendApplicationContribution {
    protected readonly contextKeyService: ContextKeyService;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly editorManager: EditorManager;
    onStart(): void;
    protected addLineNumberContextMenu(editorWidget: EditorWidget): void;
    protected handleContextMenu(editor: TextEditor, event: EditorMouseEvent): void;
}
//# sourceMappingURL=editor-linenumber-contribution.d.ts.map