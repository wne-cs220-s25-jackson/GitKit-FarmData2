import { BulkEditTree } from './bulk-edit-tree';
import { TreeModelImpl, OpenerService, TreeNode } from '@theia/core/lib/browser';
import { ResourceEdit } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService';
export declare class BulkEditTreeModel extends TreeModelImpl {
    protected readonly tree: BulkEditTree;
    protected readonly openerService: OpenerService;
    protected doOpenNode(node: TreeNode): void;
    revealNode(node: TreeNode): void;
    initModel(edits: ResourceEdit[], fileContents: Map<string, string>): Promise<void>;
}
//# sourceMappingURL=bulk-edit-tree-model.d.ts.map