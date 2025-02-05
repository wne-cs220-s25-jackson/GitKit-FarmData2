import { MessageService, Emitter, Event } from '@theia/core';
import { QuickInputService } from '@theia/core/lib/browser';
import { GitRepositoryTracker } from './git-repository-tracker';
import { Git, Repository, WorkingDirectoryStatus } from '../common';
import { GitErrorHandler } from './git-error-handler';
export declare class GitSyncService {
    protected readonly git: Git;
    protected readonly repositoryTracker: GitRepositoryTracker;
    protected readonly messageService: MessageService;
    protected readonly gitErrorHandler: GitErrorHandler;
    protected readonly quickInputService: QuickInputService;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    protected fireDidChange(): void;
    protected syncing: boolean;
    isSyncing(): boolean;
    setSyncing(syncing: boolean): void;
    canSync(): boolean;
    sync(): Promise<void>;
    protected getSyncMethod(status: WorkingDirectoryStatus): Promise<GitSyncService.SyncMethod | undefined>;
    canPublish(): boolean;
    publish(): Promise<void>;
    protected getRemote(repository: Repository, branch: string): Promise<string | undefined>;
    protected shouldPush(status: WorkingDirectoryStatus): boolean;
    protected shouldPull(status: WorkingDirectoryStatus): boolean;
    protected confirm(title: string, msg: string): Promise<boolean>;
}
export declare namespace GitSyncService {
    type SyncMethod = 'pull-push' | 'rebase-push' | 'force-push';
}
//# sourceMappingURL=git-sync-service.d.ts.map