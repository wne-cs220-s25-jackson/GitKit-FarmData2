/// <reference types="react" />
import '../../src/browser/style/scm-amend-component.css';
import * as React from '@theia/core/shared/react';
import { ScmAvatarService } from './scm-avatar-service';
import { StorageService } from '@theia/core/lib/browser';
import { DisposableCollection } from '@theia/core';
import { ScmRepository } from './scm-repository';
import { ScmAmendSupport, ScmCommit } from './scm-provider';
export interface ScmAmendComponentProps {
    style: React.CSSProperties | undefined;
    repository: ScmRepository;
    scmAmendSupport: ScmAmendSupport;
    setCommitMessage: (message: string) => void;
    avatarService: ScmAvatarService;
    storageService: StorageService;
}
interface ScmAmendComponentState {
    /**
     * This is used for transitioning.  When setting up a transition, we first set to render
     * the elements in their starting positions.  This includes creating the elements to be
     * transitioned in, even though those controls will not be visible when state is 'start'.
     * On the next frame after 'start', we render elements with their final positions and with
     * the transition properties.
     */
    transition: {
        state: 'none';
    } | {
        state: 'start' | 'transitioning';
        direction: 'up' | 'down';
        previousLastCommit: {
            commit: ScmCommit;
            avatar: string;
        };
    };
    amendingCommits: {
        commit: ScmCommit;
        avatar: string;
    }[];
    lastCommit: {
        commit: ScmCommit;
        avatar: string;
    } | undefined;
}
export declare class ScmAmendComponent extends React.Component<ScmAmendComponentProps, ScmAmendComponentState> {
    /**
     * a hint on how to animate an update, set by certain user action handlers
     * and used when updating the view based on a repository change
     */
    protected transitionHint: 'none' | 'amend' | 'unamend';
    protected lastCommitHeight: number;
    lastCommitScrollRef: (instance: HTMLDivElement) => void;
    constructor(props: ScmAmendComponentProps);
    protected readonly toDisposeOnUnmount: DisposableCollection;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    fetchStatusAndSetState(): Promise<void>;
    private clearAmendingCommits;
    private buildAmendingList;
    private getStorageKey;
    /**
     * Commits are equal if the ids are equal or if both are undefined.
     * (If a commit is undefined, it represents the initial empty state of a repository,
     * before the initial commit).
     */
    private commitsAreEqual;
    /**
     * This function will update the 'model' (lastCommit, amendingCommits) only
     * when the repository sees the last commit change.
     * 'render' can be called at any time, so be sure we don't update any 'model'
     * fields until we actually start the transition.
     */
    protected amend: () => Promise<void>;
    protected unamend: () => Promise<void>;
    private resetAndSetMessage;
    render(): JSX.Element;
    protected getLastCommit(): Promise<{
        commit: ScmCommit;
        avatar: string;
    } | undefined>;
    protected renderAmendingCommits(): React.ReactNode;
    protected renderAmendCommitListButtons(): React.ReactNode;
    protected renderLastCommit(): React.ReactNode;
    protected renderLastCommitNoButton(lastCommit: {
        commit: ScmCommit;
        avatar: string;
    }): React.ReactNode;
    /**
     * See https://stackoverflow.com/questions/26556436/react-after-render-code
     *
     * @param callback
     */
    protected onNextFrame(callback: FrameRequestCallback): void;
    protected renderCommitAvatarAndDetail(commitData: {
        commit: ScmCommit;
        avatar: string;
    }): React.ReactNode;
    protected renderCommitCount(commits: number): React.ReactNode;
    protected renderCommitBeingAmended(commitData: {
        commit: ScmCommit;
        avatar: string;
    }, isOldestAmendCommit: boolean): JSX.Element;
    protected styleAmendedCommits(): React.CSSProperties;
    protected styleLastCommitMovingUp(transitionState: 'start' | 'transitioning'): React.CSSProperties;
    protected styleLastCommitMovingDown(transitionState: 'start' | 'transitioning'): React.CSSProperties;
    protected styleLastCommit(transitionState: 'start' | 'transitioning', startingMarginTop: number, startingMarginBottom: number): React.CSSProperties;
    readonly unamendAll: () => Promise<void>;
    protected doUnamendAll(): Promise<void>;
    readonly clearAmending: () => Promise<void>;
    protected doClearAmending(): Promise<void>;
}
export declare namespace ScmAmendComponent {
    namespace Styles {
        const COMMIT_CONTAINER = "theia-scm-commit-container";
        const COMMIT_AND_BUTTON = "theia-scm-commit-and-button";
        const COMMIT_AVATAR_AND_TEXT = "theia-scm-commit-avatar-and-text";
        const COMMIT_DETAILS = "theia-scm-commit-details";
        const COMMIT_MESSAGE_AVATAR = "theia-scm-commit-message-avatar";
        const COMMIT_MESSAGE_SUMMARY = "theia-scm-commit-message-summary";
        const LAST_COMMIT_MESSAGE_TIME = "theia-scm-commit-message-time";
        const FLEX_CENTER = "theia-scm-flex-container-center";
    }
}
export {};
//# sourceMappingURL=scm-amend-component.d.ts.map