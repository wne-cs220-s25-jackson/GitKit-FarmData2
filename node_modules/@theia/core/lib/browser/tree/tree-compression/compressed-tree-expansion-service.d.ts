import { CompressionToggle, TreeCompressionService } from './tree-compression-service';
import { ExpandableTreeNode, TreeExpansionServiceImpl } from '../tree-expansion';
export declare class CompressedExpansionService extends TreeExpansionServiceImpl {
    protected readonly compressionToggle: CompressionToggle;
    protected readonly compressionService: TreeCompressionService;
    expandNode(raw: ExpandableTreeNode): Promise<ExpandableTreeNode | undefined>;
    collapseNode(raw: ExpandableTreeNode): Promise<boolean>;
}
//# sourceMappingURL=compressed-tree-expansion-service.d.ts.map