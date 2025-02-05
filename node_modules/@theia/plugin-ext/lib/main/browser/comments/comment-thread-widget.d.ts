/// <reference types="react" />
import { MonacoEditorZoneWidget } from '@theia/monaco/lib/browser/monaco-editor-zone-widget';
import { Comment, CommentThread } from '../../../common/plugin-api-rpc-model';
import { CommentGlyphWidget } from './comment-glyph-widget';
import { BaseWidget } from '@theia/core/lib/browser';
import * as React from '@theia/core/shared/react';
import { CommentsService } from './comments-service';
import { ActionMenuNode, CommandRegistry, CompoundMenuNode, MenuModelRegistry, MenuPath } from '@theia/core/lib/common';
import { CommentsContextKeyService } from './comments-context-key-service';
import { RefObject } from '@theia/core/shared/react';
import * as monaco from '@theia/monaco-editor-core';
import { Root } from '@theia/core/shared/react-dom/client';
export declare const COMMENT_THREAD_CONTEXT: MenuPath;
export declare const COMMENT_CONTEXT: MenuPath;
export declare const COMMENT_TITLE: MenuPath;
export declare class CommentThreadWidget extends BaseWidget {
    private _owner;
    private _commentThread;
    private commentService;
    protected readonly menus: MenuModelRegistry;
    protected readonly contextKeyService: CommentsContextKeyService;
    protected readonly commands: CommandRegistry;
    protected readonly zoneWidget: MonacoEditorZoneWidget;
    protected readonly containerNodeRoot: Root;
    protected readonly commentGlyphWidget: CommentGlyphWidget;
    protected readonly contextMenu: CompoundMenuNode;
    protected readonly commentFormRef: RefObject<CommentForm>;
    protected isExpanded?: boolean;
    constructor(editor: monaco.editor.IStandaloneCodeEditor, _owner: string, _commentThread: CommentThread, commentService: CommentsService, menus: MenuModelRegistry, contextKeyService: CommentsContextKeyService, commands: CommandRegistry);
    getGlyphPosition(): number;
    collapse(): void;
    private deleteCommentThread;
    dispose(): void;
    toggleExpand(lineNumber: number): void;
    hide(): void;
    display(options: MonacoEditorZoneWidget.Options): void;
    private onEditorMouseDown;
    get owner(): string;
    get commentThread(): CommentThread;
    private getThreadLabel;
    update(): void;
    protected render(): void;
}
declare namespace CommentForm {
    interface Props {
        menus: MenuModelRegistry;
        commentThread: CommentThread;
        commands: CommandRegistry;
        contextKeyService: CommentsContextKeyService;
        widget: CommentThreadWidget;
    }
    interface State {
        expanded: boolean;
    }
}
export declare class CommentForm<P extends CommentForm.Props = CommentForm.Props> extends React.Component<P, CommentForm.State> {
    private readonly menu;
    private inputRef;
    private inputValue;
    private readonly getInput;
    private readonly clearInput;
    update(): void;
    protected expand: () => void;
    protected collapse: () => void;
    componentDidMount(): void;
    private readonly onInput;
    constructor(props: P);
    render(): React.ReactNode;
}
declare namespace ReviewComment {
    interface Props {
        menus: MenuModelRegistry;
        comment: Comment;
        commentThread: CommentThread;
        contextKeyService: CommentsContextKeyService;
        commands: CommandRegistry;
        commentForm: RefObject<CommentForm>;
    }
    interface State {
        hover: boolean;
    }
}
export declare class ReviewComment<P extends ReviewComment.Props = ReviewComment.Props> extends React.Component<P, ReviewComment.State> {
    constructor(props: P);
    protected detectHover: (element: HTMLElement | null) => void;
    protected showHover: () => void;
    protected hideHover: () => void;
    render(): React.ReactNode;
    protected localeDate(timestamp: string | undefined): string;
}
declare namespace CommentBody {
    interface Props {
        value: string;
        isVisible: boolean;
    }
}
export declare class CommentBody extends React.Component<CommentBody.Props> {
    render(): React.ReactNode;
}
declare namespace CommentEditContainer {
    interface Props {
        contextKeyService: CommentsContextKeyService;
        menus: MenuModelRegistry;
        comment: Comment;
        commentThread: CommentThread;
        commentForm: RefObject<CommentForm>;
        commands: CommandRegistry;
    }
}
export declare class CommentEditContainer extends React.Component<CommentEditContainer.Props> {
    private readonly inputRef;
    private dirtyCommentMode;
    private dirtyCommentFormState;
    componentDidUpdate(prevProps: Readonly<CommentEditContainer.Props>, prevState: Readonly<{}>): void;
    render(): React.ReactNode;
}
declare namespace CommentsInlineAction {
    interface Props {
        node: ActionMenuNode;
        commentThread: CommentThread;
        commentUniqueId: number;
        commands: CommandRegistry;
        contextKeyService: CommentsContextKeyService;
    }
}
export declare class CommentsInlineAction extends React.Component<CommentsInlineAction.Props> {
    render(): React.ReactNode;
}
declare namespace CommentActions {
    interface Props {
        contextKeyService: CommentsContextKeyService;
        commands: CommandRegistry;
        menu: CompoundMenuNode;
        commentThread: CommentThread;
        getInput: () => string;
        clearInput: () => void;
    }
}
export declare class CommentActions extends React.Component<CommentActions.Props> {
    render(): React.ReactNode;
}
declare namespace CommentAction {
    interface Props {
        contextKeyService: CommentsContextKeyService;
        commands: CommandRegistry;
        node: ActionMenuNode;
        onClick: () => void;
    }
}
export declare class CommentAction extends React.Component<CommentAction.Props> {
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=comment-thread-widget.d.ts.map