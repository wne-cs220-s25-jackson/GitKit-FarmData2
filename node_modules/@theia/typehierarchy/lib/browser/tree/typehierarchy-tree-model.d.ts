import { TreeNode } from '@theia/core/lib/browser/tree/tree';
import { TreeModelImpl } from '@theia/core/lib/browser/tree/tree-model';
import { TypeHierarchyRegistry } from '../typehierarchy-provider';
import { TypeHierarchyTree } from './typehierarchy-tree';
export declare class TypeHierarchyTreeModel extends TreeModelImpl {
    protected readonly registry: TypeHierarchyRegistry;
    protected doOpenNode(node: TreeNode): void;
    /**
     * Initializes the tree by calculating and setting a new tree root node.
     */
    initialize(options: TypeHierarchyTree.InitOptions): Promise<void>;
    /**
     * If the tree root is set, it resets it with the inverse type hierarchy direction.
     */
    flipDirection(): Promise<void>;
}
//# sourceMappingURL=typehierarchy-tree-model.d.ts.map