import { Git, Repository } from '../common';
import { GitRepositoryProvider } from './git-repository-provider';
import { MessageService } from '@theia/core/lib/common/message-service';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { GitErrorHandler } from './git-error-handler';
import { ProgressService } from '@theia/core/lib/common/progress-service';
import { LabelProvider, QuickInputService } from '@theia/core/lib/browser';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare enum GitAction {
    PULL = 0,
    PUSH = 1
}
/**
 * Service delegating into the `Quick Input Service`, so that the Git commands can be further refined.
 * For instance, the `remote` can be specified for `pull`, `push`, and `fetch`. And the branch can be
 * specified for `git merge`.
 */
export declare class GitQuickOpenService {
    protected readonly gitErrorHandler: GitErrorHandler;
    protected readonly progressService: ProgressService;
    protected readonly labelProvider: LabelProvider;
    protected readonly git: Git;
    protected readonly repositoryProvider: GitRepositoryProvider;
    protected readonly quickInputService: QuickInputService;
    protected readonly messageService: MessageService;
    protected readonly workspaceService: WorkspaceService;
    protected readonly fileService: FileService;
    clone(url?: string, folder?: string, branch?: string): Promise<string | undefined>;
    private query;
    private buildDefaultProjectPath;
    private doBuildDefaultProjectPath;
    fetch(): Promise<void>;
    performDefaultGitAction(action: GitAction): Promise<void>;
    push(): Promise<void>;
    pull(): Promise<void>;
    merge(): Promise<void>;
    checkout(): Promise<void>;
    chooseTagsAndBranches(execFunc: (branchName: string, currentBranchName: string) => void, repository?: Repository | undefined): Promise<void>;
    commitMessageForAmend(): Promise<string>;
    stash(): Promise<void>;
    protected doStashAction(action: 'pop' | 'apply' | 'drop', text: string, getMessage?: () => Promise<string>): Promise<void>;
    applyStash(): Promise<void>;
    popStash(): Promise<void>;
    dropStash(): Promise<void>;
    applyLatestStash(): Promise<void>;
    popLatestStash(): Promise<void>;
    initRepository(): Promise<void>;
    private doInitRepository;
    private toRepositoryPathQuickOpenItem;
    private getRepository;
    private getRemotes;
    private getTags;
    private getBranches;
    private getCurrentBranch;
    protected withProgress<In, Out>(fn: (...arg: In[]) => Promise<Out>): Promise<Out>;
    protected readonly wrapWithProgress: <In, Out>(fn: (...args: In[]) => Promise<Out>) => (...args: In[]) => Promise<Out>;
    protected doWrapWithProgress<In, Out>(fn: (...args: In[]) => Promise<Out>): (...args: In[]) => Promise<Out>;
}
//# sourceMappingURL=git-quick-open-service.d.ts.map