import { TreeNode, CompositeTreeNode, SelectableTreeNode, ExpandableTreeNode, TreeImpl } from '@theia/core/lib/browser';
import { CallHierarchyItem, CallHierarchyIncomingCall } from '../callhierarchy';
import { CallHierarchyService } from '../callhierarchy-service';
export declare class CallHierarchyTree extends TreeImpl {
    protected _callHierarchyService: CallHierarchyService | undefined;
    set callHierarchyService(callHierarchyService: CallHierarchyService | undefined);
    get callHierarchyService(): CallHierarchyService | undefined;
    resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]>;
    protected toNodes(callers: CallHierarchyIncomingCall[], parent: CompositeTreeNode): TreeNode[];
    protected toNode(caller: CallHierarchyIncomingCall, parent: CompositeTreeNode | undefined): TreeNode;
}
export interface ItemNode extends SelectableTreeNode, ExpandableTreeNode {
    definition: CallHierarchyItem;
}
export declare namespace ItemNode {
    function is(node: TreeNode | undefined): node is ItemNode;
    function create(definition: CallHierarchyItem, parent: TreeNode | undefined): ItemNode;
}
export interface CallerNode extends SelectableTreeNode, ExpandableTreeNode {
    caller: CallHierarchyIncomingCall;
}
export declare namespace CallerNode {
    function is(node: TreeNode | undefined): node is CallerNode;
    function create(caller: CallHierarchyIncomingCall, parent: TreeNode | undefined): CallerNode;
}
//# sourceMappingURL=callhierarchy-tree.d.ts.map