import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { ScmService } from './scm-service';
import { ScmTreeModel } from './scm-tree-model';
import { ScmResourceGroup, ScmProvider } from './scm-provider';
export declare class ScmGroupsTreeModel extends ScmTreeModel {
    protected readonly scmService: ScmService;
    protected readonly toDisposeOnRepositoryChange: DisposableCollection;
    protected init(): void;
    protected refreshOnRepositoryChange(): void;
    protected changeRepository(provider: ScmProvider | undefined): void;
    get rootUri(): string | undefined;
    get groups(): ScmResourceGroup[];
    canTabToWidget(): boolean;
}
//# sourceMappingURL=scm-groups-tree-model.d.ts.map