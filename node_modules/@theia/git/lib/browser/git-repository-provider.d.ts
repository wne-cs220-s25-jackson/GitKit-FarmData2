import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { StorageService } from '@theia/core/lib/browser/storage-service';
import { Git, Repository } from '../common';
import { GitCommitMessageValidator } from './git-commit-message-validator';
import { GitScmProvider } from './git-scm-provider';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { ScmRepository } from '@theia/scm/lib/browser/scm-repository';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export interface GitRefreshOptions {
    readonly maxCount: number;
}
export declare class GitRepositoryProvider {
    protected readonly onDidChangeRepositoryEmitter: Emitter<Repository | undefined>;
    protected readonly selectedRepoStorageKey = "theia-git-selected-repository";
    protected readonly allRepoStorageKey = "theia-git-all-repositories";
    protected readonly scmProviderFactory: GitScmProvider.Factory;
    protected readonly commitMessageValidator: GitCommitMessageValidator;
    protected readonly git: Git;
    protected readonly workspaceService: WorkspaceService;
    protected readonly scmService: ScmService;
    protected readonly storageService: StorageService;
    protected readonly fileService: FileService;
    protected init(): void;
    protected doInit(): Promise<void>;
    protected lazyRefresh: () => Promise<void> | undefined;
    /**
     * Returns with the previously selected repository, or if no repository has been selected yet,
     * it picks the first available repository from the backend and sets it as the selected one and returns with that.
     * If no repositories are available, returns `undefined`.
     */
    get selectedRepository(): Repository | undefined;
    /**
     * Sets the selected repository, but do nothing if the given repository is not a Git repository
     * registered with the SCM service.  We must be sure not to clear the selection if the selected
     * repository is managed by an SCM other than Git.
     */
    set selectedRepository(repository: Repository | undefined);
    get selectedScmRepository(): GitScmRepository | undefined;
    get selectedScmProvider(): GitScmProvider | undefined;
    get onDidChangeRepository(): Event<Repository | undefined>;
    protected fireDidChangeRepository(repository: Repository | undefined): void;
    /**
     * Returns with all know repositories.
     */
    get allRepositories(): Repository[];
    refresh(options?: GitRefreshOptions): Promise<void>;
    protected updateRepositories(repositories: Repository[]): void;
    protected registerScmProvider(repository: Repository): void;
    protected toScmRepository(repository: Repository | undefined): ScmRepository | undefined;
    protected toGitRepository(scmRepository: ScmRepository | undefined): Repository | undefined;
    protected toGitScmProvider(scmRepository: ScmRepository | undefined): GitScmProvider | undefined;
    protected toGitScmRepository(scmRepository: ScmRepository | undefined): GitScmRepository | undefined;
}
export interface GitScmRepository extends ScmRepository {
    readonly provider: GitScmProvider;
}
export declare namespace GitScmRepository {
    function is(scmRepository: ScmRepository | undefined): scmRepository is GitScmRepository;
}
//# sourceMappingURL=git-repository-provider.d.ts.map