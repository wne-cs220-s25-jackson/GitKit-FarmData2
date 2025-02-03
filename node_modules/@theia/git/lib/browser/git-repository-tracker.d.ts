/// <reference types="lodash" />
import { Git, Repository, WorkingDirectoryStatus } from '../common';
import { Event, Emitter, DisposableCollection, CancellationToken } from '@theia/core';
import { GitRepositoryProvider } from './git-repository-provider';
import { GitWatcher, GitStatusChangeEvent } from '../common/git-watcher';
import URI from '@theia/core/lib/common/uri';
/**
 * The repository tracker watches the selected repository for status changes. It provides a convenient way to listen on status updates.
 */
export declare class GitRepositoryTracker {
    protected readonly git: Git;
    protected readonly repositoryProvider: GitRepositoryProvider;
    protected readonly gitWatcher: GitWatcher;
    protected toDispose: DisposableCollection;
    protected workingDirectoryStatus: WorkingDirectoryStatus | undefined;
    protected readonly onGitEventEmitter: Emitter<GitStatusChangeEvent | undefined>;
    constructor(git: Git, repositoryProvider: GitRepositoryProvider, gitWatcher: GitWatcher);
    protected init(): void;
    protected doInit(): Promise<void>;
    protected updateStatus: import("lodash").DebouncedFunc<() => Promise<void>>;
    protected setStatus(event: GitStatusChangeEvent | undefined, token: CancellationToken): void;
    /**
     * Returns the selected repository, or `undefined` if no repositories are available.
     */
    get selectedRepository(): Repository | undefined;
    /**
     * Returns all known repositories.
     */
    get allRepositories(): Repository[];
    /**
     * Returns the last known status of the selected repository, or `undefined` if no repositories are available.
     */
    get selectedRepositoryStatus(): WorkingDirectoryStatus | undefined;
    /**
     * Emits when the selected repository has changed.
     */
    get onDidChangeRepository(): Event<Repository | undefined>;
    /**
     * Emits when status has changed in the selected repository.
     */
    get onGitEvent(): Event<GitStatusChangeEvent | undefined>;
    getPath(uri: URI): string | undefined;
    getUri(path: string): URI | undefined;
    get repositoryUri(): URI | undefined;
}
//# sourceMappingURL=git-repository-tracker.d.ts.map