import { ReferenceCollection, Reference } from '@theia/core';
import { Repository } from '../common';
import { GitRepositoryWatcher, GitRepositoryWatcherFactory } from './git-repository-watcher';
export declare class GitRepositoryManager {
    protected readonly watcherFactory: GitRepositoryWatcherFactory;
    protected readonly watchers: ReferenceCollection<Repository, GitRepositoryWatcher>;
    run<T>(repository: Repository, op: () => Promise<T>): Promise<T>;
    getWatcher(repository: Repository): Promise<Reference<GitRepositoryWatcher>>;
    protected sync(repository: Repository): Promise<void>;
}
//# sourceMappingURL=git-repository-manager.d.ts.map