import { TabBar, Widget } from '@theia/core/lib/browser';
import { EditorWidget, TextEditor } from '@theia/editor/lib/browser';
import { Emitter, SelectionService } from '@theia/core/lib/common';
export declare class EditorPreviewWidget extends EditorWidget {
    protected _isPreview: boolean;
    protected readonly onDidChangePreviewStateEmitter: Emitter<void>;
    readonly onDidChangePreviewState: import("@theia/core/lib/common").Event<void>;
    get isPreview(): boolean;
    constructor(editor: TextEditor, selectionService: SelectionService);
    initializePreview(): void;
    convertToNonPreview(): void;
    protected handleTabBarChange(oldTabBar?: TabBar<Widget> | undefined, newTabBar?: TabBar<Widget> | undefined): void;
    storeState(): {
        isPreview: boolean;
        editorState: object;
    } | undefined;
    restoreState(oldState: {
        isPreview: boolean;
        editorState: object;
    }): void;
}
//# sourceMappingURL=editor-preview-widget.d.ts.map