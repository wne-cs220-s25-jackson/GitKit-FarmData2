import * as monaco from '@theia/monaco-editor-core';
import { CommentingRangeDecorator } from './comments-decorator';
import { EditorManager, EditorMouseEvent } from '@theia/editor/lib/browser';
import { CommentsService } from './comments-service';
import { CommandRegistry, MenuModelRegistry } from '@theia/core/lib/common';
import { CommentsContextKeyService } from './comments-context-key-service';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare class CommentsContribution {
    protected readonly rangeDecorator: CommentingRangeDecorator;
    protected readonly commentService: CommentsService;
    protected readonly editorManager: EditorManager;
    private addInProgress;
    private commentWidgets;
    private commentInfos;
    private emptyThreadsToAddQueue;
    protected readonly menus: MenuModelRegistry;
    protected readonly commentsContextKeyService: CommentsContextKeyService;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly commands: CommandRegistry;
    constructor(rangeDecorator: CommentingRangeDecorator, commentService: CommentsService, editorManager: EditorManager);
    private onEditorMouseDown;
    private beginCompute;
    private setComments;
    get editor(): monaco.editor.IStandaloneCodeEditor | undefined;
    private displayCommentThread;
    addOrToggleCommentAtLine(lineNumber: number, e: EditorMouseEvent | undefined): Promise<void>;
    private processNextThreadToAdd;
    private getCurrentEditor;
    addCommentAtLine(lineNumber: number, e: EditorMouseEvent | undefined): Promise<void>;
    addCommentAtLine2(lineNumber: number, ownerId: string): void;
}
//# sourceMappingURL=comments-contribution.d.ts.map