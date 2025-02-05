import { MarkerNode } from './marker-tree';
import { TreeModelImpl, OpenerService, TreeNode, OpenerOptions } from '@theia/core/lib/browser';
export declare class MarkerTreeModel extends TreeModelImpl {
    protected readonly openerService: OpenerService;
    protected doOpenNode(node: TreeNode): void;
    protected getOpenerOptionsByMarker(node: MarkerNode): OpenerOptions | undefined;
    /**
     * Reveal the corresponding node at the marker.
     * @param node {TreeNode} the tree node.
     */
    revealNode(node: TreeNode): void;
}
//# sourceMappingURL=marker-tree-model.d.ts.map