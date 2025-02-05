import { DisposableCollection } from '@theia/core/lib/common';
import { ScmTreeModel } from '@theia/scm/lib/browser/scm-tree-model';
import { Git } from '../../common';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { GitScmProvider } from '../git-scm-provider';
import { ScmResourceGroup } from '@theia/scm/lib/browser/scm-provider';
import { ScmFileChange } from '@theia/scm-extra/lib/browser/scm-file-change-node';
import { GitResourceOpener } from './git-resource-opener';
export declare class GitDiffTreeModel extends ScmTreeModel {
    protected readonly git: Git;
    protected readonly scmService: ScmService;
    protected readonly resourceOpener: GitResourceOpener;
    protected diffOptions: Git.Options.Diff;
    protected _groups: ScmResourceGroup[];
    protected readonly toDisposeOnContentChange: DisposableCollection;
    constructor();
    setContent(options: GitDiffTreeModel.Options): Promise<void>;
    protected refreshRepository(provider: GitScmProvider): Promise<void>;
    get rootUri(): string | undefined;
    canTabToWidget(): boolean;
    get groups(): ScmResourceGroup[];
    open(change: ScmFileChange): Promise<void>;
    storeState(): GitDiffTreeModel.Options;
    restoreState(oldState: GitDiffTreeModel.Options): void;
}
export declare namespace GitDiffTreeModel {
    interface Options {
        rootUri: string;
        diffOptions: Git.Options.Diff;
    }
}
//# sourceMappingURL=git-diff-tree-model.d.ts.map