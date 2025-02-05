import { Git, GitFileBlame } from '../../common';
import { GitRepositoryTracker } from '../git-repository-tracker';
export declare class BlameManager {
    protected readonly git: Git;
    protected readonly repositoryTracker: GitRepositoryTracker;
    isBlameable(uri: string): boolean;
    getBlame(uri: string, content?: string): Promise<GitFileBlame | undefined>;
}
//# sourceMappingURL=blame-manager.d.ts.map