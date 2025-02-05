import { TreeNode, CompositeTreeNode, SelectableTreeNode, ExpandableTreeNode, TreeImpl } from '@theia/core/lib/browser';
import { UriSelection } from '@theia/core/lib/common/selection';
import { ResourceEdit, ResourceFileEdit as MonacoResourceFileEdit, ResourceTextEdit as MonacoResourceTextEdit } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService';
export declare class BulkEditTree extends TreeImpl {
    initTree(edits: ResourceEdit[], fileContents: Map<string, string>): Promise<void>;
    private getChildren;
    private createBulkEditNode;
    private createBulkEditInfo;
    private getResourcePath;
}
export interface BulkEditNode extends UriSelection, SelectableTreeNode {
    parent: CompositeTreeNode;
    bulkEdit: MonacoResourceFileEdit | MonacoResourceTextEdit;
}
export declare namespace BulkEditNode {
    function is(node: TreeNode | undefined): node is BulkEditNode;
}
export interface BulkEditInfoNode extends UriSelection, SelectableTreeNode, ExpandableTreeNode {
    parent: CompositeTreeNode;
    fileContents?: string;
}
export declare namespace BulkEditInfoNode {
    function is(node: unknown): node is BulkEditInfoNode;
}
//# sourceMappingURL=bulk-edit-tree.d.ts.map