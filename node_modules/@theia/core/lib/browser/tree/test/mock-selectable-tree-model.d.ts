import { CompositeTreeNode } from '../tree';
import { SelectableTreeNode } from '../tree-selection';
export declare namespace MockSelectableTreeModel {
    interface SelectableNode {
        readonly id: string;
        readonly selected: boolean;
        readonly focused?: boolean;
        readonly children?: SelectableNode[];
    }
    namespace SelectableNode {
        function toTreeNode(root: SelectableNode, parent?: SelectableTreeNode & CompositeTreeNode): SelectableTreeNode;
    }
    const HIERARCHICAL_MOCK_ROOT: () => SelectableTreeNode;
}
//# sourceMappingURL=mock-selectable-tree-model.d.ts.map