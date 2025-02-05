import { FileTree, DirNode } from '@theia/filesystem/lib/browser';
import { FileStat } from '@theia/filesystem/lib/common/files';
import URI from '@theia/core/lib/common/uri';
import { TreeNode, CompositeTreeNode, SelectableTreeNode, CompressionToggle } from '@theia/core/lib/browser';
import { FileNavigatorFilter } from './navigator-filter';
import { FileNavigatorPreferences } from './navigator-preferences';
export declare class FileNavigatorTree extends FileTree {
    protected readonly filter: FileNavigatorFilter;
    protected readonly navigatorPreferences: FileNavigatorPreferences;
    protected readonly compressionToggle: CompressionToggle;
    protected init(): void;
    protected toggleCompression(): void;
    resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]>;
    protected toNodeId(uri: URI, parent: CompositeTreeNode): string;
    createId(root: WorkspaceRootNode, uri: URI): string;
    createWorkspaceRoot(rootFolder: FileStat, workspaceNode: WorkspaceNode): Promise<WorkspaceRootNode>;
}
/**
 * File tree root node for multi-root workspaces.
 */
export interface WorkspaceNode extends CompositeTreeNode, SelectableTreeNode {
    children: WorkspaceRootNode[];
}
export declare namespace WorkspaceNode {
    const id = "WorkspaceNodeId";
    const name = "WorkspaceNode";
    function is(node: TreeNode | undefined): node is WorkspaceNode;
    /**
     * Create a `WorkspaceNode` that can be used as a `Tree` root.
     */
    function createRoot(multiRootName?: string): WorkspaceNode;
}
/**
 * A node representing a folder from a multi-root workspace.
 */
export interface WorkspaceRootNode extends DirNode {
    parent: WorkspaceNode;
}
export declare namespace WorkspaceRootNode {
    function is(node: unknown): node is WorkspaceRootNode;
    function find(node: TreeNode | undefined): WorkspaceRootNode | undefined;
}
//# sourceMappingURL=navigator-tree.d.ts.map