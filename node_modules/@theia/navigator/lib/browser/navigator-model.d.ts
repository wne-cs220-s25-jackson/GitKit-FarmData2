import URI from '@theia/core/lib/common/uri';
import { FileTreeModel } from '@theia/filesystem/lib/browser';
import { OpenerService, TreeNode } from '@theia/core/lib/browser';
import { FileNavigatorTree, WorkspaceNode } from './navigator-tree';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { ProgressService } from '@theia/core/lib/common/progress-service';
import { Deferred } from '@theia/core/lib/common/promise-util';
export declare class FileNavigatorModel extends FileTreeModel {
    protected readonly openerService: OpenerService;
    protected readonly tree: FileNavigatorTree;
    protected readonly workspaceService: WorkspaceService;
    protected readonly applicationState: FrontendApplicationStateService;
    protected readonly progressService: ProgressService;
    protected init(): void;
    protected readonly pendingBusyProgress: Map<string, Deferred<void>>;
    protected reportBusyProgress(): void;
    protected initializeRoot(): Promise<void>;
    previewNode(node: TreeNode): void;
    protected doOpenNode(node: TreeNode): void;
    getNodesByUri(uri: URI): IterableIterator<TreeNode>;
    protected updateRoot(): Promise<void>;
    protected createRoot(): Promise<TreeNode | undefined>;
    /**
     * Create multiple root node used to display
     * the multiple root workspace name.
     *
     * @returns `WorkspaceNode`
     */
    protected createMultipleRootNode(): WorkspaceNode;
    /**
     * Move the given source file or directory to the given target directory.
     */
    move(source: TreeNode, target: TreeNode): Promise<URI | undefined>;
    /**
     * Reveals node in the navigator by given file uri.
     *
     * @param uri uri to file which should be revealed in the navigator
     * @returns file tree node if the file with given uri was revealed, undefined otherwise
     */
    revealFile(uri: URI): Promise<TreeNode | undefined>;
    protected getNodeClosestToRootByUri(uri: URI): TreeNode | undefined;
}
//# sourceMappingURL=navigator-model.d.ts.map