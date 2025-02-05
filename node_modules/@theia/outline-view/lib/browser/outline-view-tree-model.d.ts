import { CompositeTreeNode, TreeModelImpl, ExpandableTreeNode, TreeNode } from '@theia/core/lib/browser';
export declare class OutlineViewTreeModel extends TreeModelImpl {
    /**
     * Handle the expansion of the tree node.
     * - The method is a no-op in order to preserve focus on the editor
     * after attempting to perform a `collapse-all`.
     * @param node the expandable tree node.
     */
    protected handleExpansion(node: Readonly<ExpandableTreeNode>): void;
    collapseAll(raw?: Readonly<CompositeTreeNode>): Promise<boolean>;
    /**
     * The default behavior of `openNode` calls `doOpenNode` which by default
     * toggles the expansion of the node. Overriding to prevent expansion, but
     * allow for the `onOpenNode` event to still fire on a double-click event.
     */
    openNode(raw?: TreeNode | undefined): void;
    expandAll(raw?: TreeNode): void;
    areNodesCollapsed(): boolean;
}
//# sourceMappingURL=outline-view-tree-model.d.ts.map