import { CompressionToggle, TreeCompressionService } from './tree-compression-service';
import { TreeNode } from '../tree';
import { TreeModelImpl } from '../tree-model';
import { TreeSelection } from '../tree-selection';
import { ExpandableTreeNode } from '../tree-expansion';
import { TopDownTreeIterator, TreeIterator } from '../tree-iterator';
export declare class TopDownCompressedTreeIterator extends TopDownTreeIterator {
    protected isCollapsed(candidate: TreeNode): boolean;
}
declare enum BackOrForward {
    Forward = 0,
    Backward = 1
}
export declare class CompressedTreeModel extends TreeModelImpl {
    protected readonly compressionToggle: CompressionToggle;
    protected readonly compressionService: TreeCompressionService;
    protected selectAdjacentRow(direction: BackOrForward, type?: TreeSelection.SelectionType, startingPoint?: Readonly<TreeNode> | undefined): void;
    selectPrevRow(type?: TreeSelection.SelectionType): void;
    selectNextRow(type?: TreeSelection.SelectionType): void;
    protected createForwardIteratorForNode(node: TreeNode): TreeIterator;
    protected selectIfAncestorOfSelected(node: Readonly<ExpandableTreeNode>): void;
}
export {};
//# sourceMappingURL=compressed-tree-model.d.ts.map