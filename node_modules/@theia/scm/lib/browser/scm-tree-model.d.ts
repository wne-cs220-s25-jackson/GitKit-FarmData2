import { TreeModelImpl, TreeNode, CompositeTreeNode, SelectableTreeNode, ExpandableTreeNode } from '@theia/core/lib/browser/tree';
import { ScmProvider, ScmResourceGroup, ScmResource, ScmResourceDecorations } from './scm-provider';
import { ScmContextKeyService } from './scm-context-key-service';
export declare const ScmTreeModelProps: unique symbol;
export interface ScmTreeModelProps {
    defaultExpansion?: 'collapsed' | 'expanded';
    nestingThreshold?: number;
}
export interface ScmFileChangeRootNode extends CompositeTreeNode {
    rootUri: string;
    children: ScmFileChangeGroupNode[];
}
export interface ScmFileChangeGroupNode extends ExpandableTreeNode {
    groupId: string;
    groupLabel: string;
    children: (ScmFileChangeFolderNode | ScmFileChangeNode)[];
}
export declare namespace ScmFileChangeGroupNode {
    function is(node: TreeNode): node is ScmFileChangeGroupNode;
}
export interface ScmFileChangeFolderNode extends ExpandableTreeNode, SelectableTreeNode {
    groupId: string;
    path: string;
    sourceUri: string;
    children: (ScmFileChangeFolderNode | ScmFileChangeNode)[];
}
export declare namespace ScmFileChangeFolderNode {
    function is(node: TreeNode): node is ScmFileChangeFolderNode;
}
export interface ScmFileChangeNode extends SelectableTreeNode {
    sourceUri: string;
    decorations?: ScmResourceDecorations;
}
export declare namespace ScmFileChangeNode {
    function is(node: TreeNode): node is ScmFileChangeNode;
    function getGroupId(node: ScmFileChangeNode): string;
}
export declare abstract class ScmTreeModel extends TreeModelImpl {
    private _languageId;
    protected provider: ScmProvider | undefined;
    protected readonly props: ScmTreeModelProps;
    protected readonly contextKeys: ScmContextKeyService;
    get languageId(): string | undefined;
    abstract canTabToWidget(): boolean;
    protected _viewMode: 'tree' | 'list';
    set viewMode(id: 'tree' | 'list');
    get viewMode(): 'tree' | 'list';
    abstract get rootUri(): string | undefined;
    abstract get groups(): ScmResourceGroup[];
    protected createTree(): ScmFileChangeRootNode;
    protected toGroupNode(group: ScmResourceGroup, parent: CompositeTreeNode): ScmFileChangeGroupNode;
    protected buildFileChangeTree(sortedResources: {
        resource: ScmResource;
        pathParts: string[];
    }[], start: number, end: number, level: number, parent: (ScmFileChangeGroupNode | ScmFileChangeFolderNode)): (ScmFileChangeFolderNode | ScmFileChangeNode)[];
    protected compareNodes: (a: ScmFileChangeFolderNode | ScmFileChangeNode, b: ScmFileChangeFolderNode | ScmFileChangeNode) => number;
    protected doCompareNodes(a: ScmFileChangeFolderNode | ScmFileChangeNode, b: ScmFileChangeFolderNode | ScmFileChangeNode): number;
    protected toFileChangeFolderNode(resources: {
        resource: ScmResource;
        pathParts: string[];
    }[], start: number, end: number, level: number, nodeRelativePath: string, parent: (ScmFileChangeGroupNode | ScmFileChangeFolderNode)): ScmFileChangeFolderNode;
    protected getRoot(node: ScmFileChangeGroupNode | ScmFileChangeFolderNode): ScmFileChangeRootNode;
    protected toFileChangeNode(resource: ScmResource, parent: CompositeTreeNode): ScmFileChangeNode;
    protected revealNode(node: TreeNode): Promise<void>;
    getResourceFromNode(node: ScmFileChangeNode): ScmResource | undefined;
    getResourceGroupFromNode(node: ScmFileChangeGroupNode): ScmResourceGroup | undefined;
    getResourcesFromFolderNode(node: ScmFileChangeFolderNode): ScmResource[];
    getSelectionArgs(selectedNodes: Readonly<SelectableTreeNode[]>): ScmResource[];
    protected collectResources(resources: ScmResource[], node: TreeNode, group: ScmResourceGroup): void;
    execInNodeContext(node: TreeNode, callback: () => void): void;
    findGroup(groupId: string): ScmResourceGroup | undefined;
    storeState(): any;
    restoreState(oldState: any): void;
}
//# sourceMappingURL=scm-tree-model.d.ts.map