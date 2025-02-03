import { Location } from '@theia/editor/lib/browser/editor';
import { DecoratedTreeNode } from '@theia/core/lib/browser/tree/tree-decorator';
import { TreeImpl, TreeNode, CompositeTreeNode, ExpandableTreeNode, SelectableTreeNode } from '@theia/core/lib/browser/tree';
import { TypeHierarchyProvider, TypeHierarchyDirection, TypeHierarchyItem } from '../typehierarchy-provider';
export declare class TypeHierarchyTree extends TreeImpl {
    provider: TypeHierarchyProvider | undefined;
    resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]>;
    /**
     * Returns with the direction of the type hierarchy attached to the root node. `undefined` if the root is not set.
     */
    protected get direction(): TypeHierarchyDirection | undefined;
    /**
     * Makes sure, the node and its children are resolved. Resolves it on demand.
     */
    protected ensureResolved(node: TypeHierarchyTree.Node): Promise<void>;
}
export declare namespace TypeHierarchyTree {
    interface InitOptions {
        readonly direction: TypeHierarchyDirection;
        readonly location: Location | undefined;
        readonly languageId: string | undefined;
    }
    interface RootNode extends Node {
        readonly direction: TypeHierarchyDirection;
    }
    namespace RootNode {
        function is(node: TreeNode | undefined): node is RootNode;
        function create(item: TypeHierarchyItem, direction: TypeHierarchyDirection): RootNode;
    }
    interface Node extends CompositeTreeNode, ExpandableTreeNode, SelectableTreeNode, DecoratedTreeNode {
        readonly item: TypeHierarchyItem;
        resolved: boolean;
    }
    namespace Node {
        function is(node: TreeNode | undefined): node is Node;
        function create(item: TypeHierarchyItem, direction: TypeHierarchyDirection, resolved?: boolean): Node;
    }
}
//# sourceMappingURL=typehierarchy-tree.d.ts.map