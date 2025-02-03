import { URI } from '@theia/core/shared/vscode-uri';
import { Event } from '@theia/core/lib/common/event';
import { Range, CommentInfo, CommentingRanges, CommentThread, CommentThreadChangedEvent, CommentThreadChangedEventMain } from '../../../common/plugin-api-rpc-model';
import { CommentController } from './comments-main';
export interface ResourceCommentThreadEvent {
    resource: URI;
    commentInfos: CommentInfoMain[];
}
export interface CommentInfoMain extends CommentInfo {
    owner: string;
    label?: string;
}
export interface WorkspaceCommentThreadsEventMain {
    ownerId: string;
    commentThreads: CommentThread[];
}
export declare const CommentsService: unique symbol;
export interface CommentsService {
    readonly onDidSetResourceCommentInfos: Event<ResourceCommentThreadEvent>;
    readonly onDidSetAllCommentThreads: Event<WorkspaceCommentThreadsEventMain>;
    readonly onDidUpdateCommentThreads: Event<CommentThreadChangedEventMain>;
    readonly onDidChangeActiveCommentThread: Event<CommentThread | null>;
    readonly onDidChangeActiveCommentingRange: Event<{
        range: Range;
        commentingRangesInfo: CommentingRanges;
    }>;
    readonly onDidSetDataProvider: Event<void>;
    readonly onDidDeleteDataProvider: Event<string>;
    setDocumentComments(resource: URI, commentInfos: CommentInfoMain[]): void;
    setWorkspaceComments(owner: string, commentsByResource: CommentThread[]): void;
    removeWorkspaceComments(owner: string): void;
    registerCommentController(owner: string, commentControl: CommentController): void;
    unregisterCommentController(owner: string): void;
    getCommentController(owner: string): CommentController | undefined;
    createCommentThreadTemplate(owner: string, resource: URI, range: Range): void;
    updateCommentThreadTemplate(owner: string, threadHandle: number, range: Range): Promise<void>;
    updateComments(ownerId: string, event: CommentThreadChangedEvent): void;
    disposeCommentThread(ownerId: string, threadId: string): void;
    getComments(resource: URI): Promise<(CommentInfoMain | null)[]>;
    getCommentingRanges(resource: URI): Promise<Range[]>;
    setActiveCommentThread(commentThread: CommentThread | null): void;
}
export declare class PluginCommentService implements CommentsService {
    private readonly onDidSetDataProviderEmitter;
    readonly onDidSetDataProvider: Event<void>;
    private readonly onDidDeleteDataProviderEmitter;
    readonly onDidDeleteDataProvider: Event<string>;
    private readonly onDidSetResourceCommentInfosEmitter;
    readonly onDidSetResourceCommentInfos: Event<ResourceCommentThreadEvent>;
    private readonly onDidSetAllCommentThreadsEmitter;
    readonly onDidSetAllCommentThreads: Event<WorkspaceCommentThreadsEventMain>;
    private readonly onDidUpdateCommentThreadsEmitter;
    readonly onDidUpdateCommentThreads: Event<CommentThreadChangedEventMain>;
    private readonly onDidChangeActiveCommentThreadEmitter;
    readonly onDidChangeActiveCommentThread: Event<CommentThread | null>;
    private readonly onDidChangeActiveCommentingRangeEmitter;
    readonly onDidChangeActiveCommentingRange: Event<{
        range: Range;
        commentingRangesInfo: CommentingRanges;
    }>;
    private commentControls;
    setActiveCommentThread(commentThread: CommentThread | null): void;
    setDocumentComments(resource: URI, commentInfos: CommentInfoMain[]): void;
    setWorkspaceComments(owner: string, commentsByResource: CommentThread[]): void;
    removeWorkspaceComments(owner: string): void;
    registerCommentController(owner: string, commentControl: CommentController): void;
    unregisterCommentController(owner: string): void;
    getCommentController(owner: string): CommentController | undefined;
    createCommentThreadTemplate(owner: string, resource: URI, range: Range): void;
    updateCommentThreadTemplate(owner: string, threadHandle: number, range: Range): Promise<void>;
    disposeCommentThread(owner: string, threadId: string): void;
    updateComments(ownerId: string, event: CommentThreadChangedEvent): void;
    getComments(resource: URI): Promise<(CommentInfoMain | null)[]>;
    getCommentingRanges(resource: URI): Promise<Range[]>;
}
//# sourceMappingURL=comments-service.d.ts.map