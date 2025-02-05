import { DisposableCollection, Disposable } from '@theia/core';
import { Repository } from '../common';
import { GitWatcherServer, GitWatcherClient } from '../common/git-watcher';
import { GitRepositoryManager } from './git-repository-manager';
export declare class DugiteGitWatcherServer implements GitWatcherServer {
    protected readonly manager: GitRepositoryManager;
    protected client: GitWatcherClient | undefined;
    protected watcherSequence: number;
    protected readonly watchers: Map<number, Disposable>;
    protected readonly subscriptions: Map<string, DisposableCollection>;
    constructor(manager: GitRepositoryManager);
    dispose(): void;
    watchGitChanges(repository: Repository): Promise<number>;
    unwatchGitChanges(watcher: number): Promise<void>;
    setClient(client?: GitWatcherClient): void;
}
//# sourceMappingURL=dugite-git-watcher.d.ts.map