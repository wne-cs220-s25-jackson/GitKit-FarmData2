import { MaybePromise } from '../../common/types';
import { TreeImpl, CompositeTreeNode, TreeNode, SelectableTreeNode, ExpandableTreeNode } from '../tree';
import { TreeElement, CompositeTreeElement, TreeSource } from './tree-source';
export declare class SourceTree extends TreeImpl {
    resolveChildren(parent: TreeElementNodeParent): Promise<TreeNode[]>;
    protected resolveElements(parent: TreeElementNodeParent): MaybePromise<IterableIterator<TreeElement>>;
    protected toNode(element: TreeElement, index: number, parent: TreeElementNodeParent): TreeElementNode;
}
export type TreeElementNodeParent = CompositeTreeElementNode | TreeSourceNode;
export interface TreeElementNode extends TreeNode, SelectableTreeNode {
    element: TreeElement;
    parent: TreeElementNodeParent;
}
export declare namespace TreeElementNode {
    function is(node: TreeNode | undefined): node is TreeElementNode;
}
export interface CompositeTreeElementNode extends TreeElementNode, CompositeTreeNode, ExpandableTreeNode {
    element: CompositeTreeElement;
    children: TreeElementNode[];
    parent: TreeElementNodeParent;
}
export declare namespace CompositeTreeElementNode {
    function is(node: TreeNode | undefined): node is CompositeTreeElementNode;
}
export interface TreeSourceNode extends CompositeTreeNode, SelectableTreeNode {
    visible: false;
    children: TreeElementNode[];
    parent: undefined;
    source: TreeSource;
}
export declare namespace TreeSourceNode {
    function is(node: TreeNode | undefined): node is TreeSourceNode;
    function to(source: undefined): undefined;
    function to(source: TreeSource): TreeSourceNode;
    function to(source: TreeSource | undefined): TreeSourceNode | undefined;
}
//# sourceMappingURL=source-tree.d.ts.map