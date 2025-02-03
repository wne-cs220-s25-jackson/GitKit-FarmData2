import { Repository } from '../../common/git-model';
import { GitRepositoryManager } from '../git-repository-manager';
/**
 * Repository manager that does not synchronizes the status. For testing purposes.
 */
export declare class NoSyncRepositoryManager extends GitRepositoryManager {
    protected sync(repository: Repository): Promise<void>;
}
//# sourceMappingURL=no-sync-repository-manager.d.ts.map