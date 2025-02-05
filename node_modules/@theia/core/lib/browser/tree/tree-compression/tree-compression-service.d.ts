import { ArrayUtils } from '../../../common/types';
import { TreeNode } from '../tree';
import { ExpandableTreeNode } from '../tree-expansion';
export interface CompressionParent extends ExpandableTreeNode {
    children: [CompressionChild];
}
export interface CompressionChild extends ExpandableTreeNode {
    parent: CompressionParent;
}
export type CompressionParticipant = CompressionChild | CompressionParent;
export interface CompressionHead extends CompressionParent {
    parent: ExpandableTreeNode;
}
export interface CompressionTail extends CompressionChild {
}
export declare const CompressionToggle: unique symbol;
export interface CompressionToggle {
    compress: boolean;
}
export declare class TreeCompressionService {
    /**
     * @returns `true` if the node has a single child that is a CompositeTreeNode
     * In that case, the child can be shown in the same row as the parent.
     */
    isCompressionParent(node?: unknown): node is CompressionParent;
    protected isVisibleExpandableNode(node?: unknown): node is ExpandableTreeNode;
    /**
     * @returns `true` if the node is a CompositeTreeNode and is its parent's sole child
     * In that case, the node can be shown in the same row as its parent.
     */
    isCompressionChild(node?: TreeNode): node is CompressionChild;
    /**
     * @returns `true` if the node is a CompositeTreeNode with a sole child, and the same is not true of its parent.
     * In that case, the node will appear as the first member of a compressed row.
     */
    isCompressionHead(node?: unknown): node is CompressionHead;
    /**
     * @returns `true` if the node's parent is a CompositeTreeNode with a sole child, and the same is not true of the node.
     * In that case, the node will appear as the last member of a compressed row.
     */
    isCompressionTail(node?: TreeNode): node is CompressionTail;
    /**
     * @returns `true` if the node is part of a compression row, either a {@link CompressionChild} or {@link CompressionParent}
     */
    isCompressionParticipant(node?: TreeNode): node is CompressionParticipant;
    /**
     * @returns a sequence of compressed items for the node if it is a {@link CompressionHead}.
     */
    getCompressedChildren(node?: CompressionHead): ArrayUtils.Tail<CompressionChild>;
    /**
     * @returns The {@link CompressionHead} of the node's compression chain, or undefined if the node is not a {@link CompressionParticipant}.
     */
    getCompressionHead(node?: TreeNode): CompressionHead | undefined;
    /**
     * @returns The compression chain of which the `node` is a part, or `undefined` if the `node` is not a {@link CompressionParticipant}
     */
    getCompressionChain(node?: TreeNode): ArrayUtils.HeadAndTail<CompressionParticipant> | undefined;
}
//# sourceMappingURL=tree-compression-service.d.ts.map