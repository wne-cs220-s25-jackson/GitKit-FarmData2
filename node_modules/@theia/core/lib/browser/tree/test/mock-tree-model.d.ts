import { TreeNode, CompositeTreeNode } from '../tree';
export declare namespace MockTreeModel {
    interface Node {
        readonly id: string;
        readonly children?: Node[];
    }
    namespace Node {
        function toTreeNode(root: Node, parent?: CompositeTreeNode): TreeNode;
    }
    const HIERARCHICAL_MOCK_ROOT: () => TreeNode;
    const FLAT_MOCK_ROOT: () => TreeNode;
}
//# sourceMappingURL=mock-tree-model.d.ts.map