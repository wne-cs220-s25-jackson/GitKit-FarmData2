import { Disposable, DisposableCollection, URI } from '@theia/core';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { EditorManager, EditorMouseEvent, TextEditor } from '@theia/editor/lib/browser';
import { Change } from './diff-computer';
import { DirtyDiffUpdate } from './dirty-diff-decorator';
import { DirtyDiffWidget, DirtyDiffWidgetFactory } from './dirty-diff-widget';
export declare class DirtyDiffNavigator {
    protected readonly controllers: Map<TextEditor, DirtyDiffController>;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly editorManager: EditorManager;
    protected readonly widgetFactory: DirtyDiffWidgetFactory;
    protected init(): void;
    handleDirtyDiffUpdate(update: DirtyDiffUpdate): void;
    canNavigate(): boolean;
    gotoNextChange(): void;
    gotoPreviousChange(): void;
    canShowChange(): boolean;
    showNextChange(): void;
    showPreviousChange(): void;
    isShowingChange(): boolean;
    closeChangePeekView(): void;
    protected get activeController(): DirtyDiffController | undefined;
    protected createController(editor: TextEditor): DirtyDiffController;
}
export declare class DirtyDiffController implements Disposable {
    protected readonly editor: TextEditor;
    protected readonly toDispose: DisposableCollection;
    widgetFactory?: DirtyDiffWidgetFactory;
    protected widget?: DirtyDiffWidget;
    protected dirtyDiff?: DirtyDiffUpdate;
    constructor(editor: TextEditor);
    dispose(): void;
    handleDirtyDiffUpdate(dirtyDiff: DirtyDiffUpdate): void;
    canNavigate(): boolean;
    gotoNextChange(): void;
    gotoPreviousChange(): void;
    canShowChange(): boolean;
    showNextChange(): void;
    showPreviousChange(): void;
    isShowingChange(): boolean;
    closeWidget(): void;
    protected get changes(): readonly Change[] | undefined;
    protected get previousRevisionUri(): URI | undefined;
    protected createWidget(): DirtyDiffWidget | undefined;
    protected findNextClosestChange(line: number, inclusive: boolean): number;
    protected findPreviousClosestChange(line: number, inclusive: boolean): number;
    protected handleEditorMouseDown({ event, target }: EditorMouseEvent): void;
}
//# sourceMappingURL=dirty-diff-navigator.d.ts.map