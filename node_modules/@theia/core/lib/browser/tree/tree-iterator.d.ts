import { TreeNode } from './tree';
export interface TreeIterator extends Iterator<TreeNode> {
}
export declare namespace TreeIterator {
    interface Options {
        readonly pruneCollapsed: boolean;
        readonly pruneSiblings: boolean;
    }
    const DEFAULT_OPTIONS: Options;
}
export declare abstract class AbstractTreeIterator implements TreeIterator, Iterable<TreeNode> {
    protected readonly root: TreeNode;
    protected readonly delegate: IterableIterator<TreeNode>;
    protected readonly options: TreeIterator.Options;
    constructor(root: TreeNode, options?: Partial<TreeIterator.Options>);
    [Symbol.iterator](): IterableIterator<TreeNode>;
    next(): IteratorResult<TreeNode>;
    protected abstract iterator(node: TreeNode): IterableIterator<TreeNode>;
    protected children(node: TreeNode): TreeNode[] | undefined;
    protected isCollapsed(node: TreeNode): boolean;
    protected isEmpty(nodes: TreeNode[] | undefined): boolean;
}
export declare class DepthFirstTreeIterator extends AbstractTreeIterator {
    protected iterator(root: TreeNode): IterableIterator<TreeNode>;
}
export declare class BreadthFirstTreeIterator extends AbstractTreeIterator {
    protected iterator(root: TreeNode): IterableIterator<TreeNode>;
}
/**
 * This tree iterator visits all nodes from top to bottom considering the following rules.
 *
 * Let assume the following tree:
 * ```
 *   R
 *   |
 *   +---1
 *   |   |
 *   |   +---1.1
 *   |   |
 *   |   +---1.2
 *   |   |
 *   |   +---1.3
 *   |   |    |
 *   |   |    +---1.3.1
 *   |   |    |
 *   |   |    +---1.3.2
 *   |   |
 *   |   +---1.4
 *   |
 *   +---2
 *       |
 *       +---2.1
 * ```
 * When selecting `1.2` as the root, the normal `DepthFirstTreeIterator` would stop on `1.2` as it does not have children,
 * but this iterator will visit the next sibling (`1.3` and `1.4` but **not** `1.1`) nodes. So the expected traversal order will be
 * `1.2`, `1.3`, `1.3.1`, `1.3.2`,  and `1.4` then jumps to `2` and continues with `2.1`.
 */
export declare class TopDownTreeIterator extends AbstractTreeIterator {
    protected iterator(root: TreeNode): IterableIterator<TreeNode>;
    protected doNext(node: TreeNode): TreeNode | undefined;
    protected findFirstChild(node: TreeNode): TreeNode | undefined;
    protected findNextSibling(node: TreeNode | undefined): TreeNode | undefined;
}
/**
 * Unlike other tree iterators, this does not visit all the nodes, it stops once it reaches the root node
 * while traversing up the tree hierarchy in an inverse pre-order fashion. This is the counterpart of the `TopDownTreeIterator`.
 */
export declare class BottomUpTreeIterator extends AbstractTreeIterator {
    protected iterator(root: TreeNode): IterableIterator<TreeNode>;
    protected doNext(node: TreeNode): TreeNode | undefined;
    protected lastChild(node: TreeNode | undefined): TreeNode | undefined;
}
export declare namespace Iterators {
    /**
     * Generator for depth first, pre-order tree traversal iteration.
     */
    function depthFirst<T>(root: T, children: (node: T) => T[] | undefined, include?: (node: T) => boolean): IterableIterator<T>;
    /**
     * Generator for breadth first tree traversal iteration.
     */
    function breadthFirst<T>(root: T, children: (node: T) => T[] | undefined, include?: (node: T) => boolean): IterableIterator<T>;
    /**
     * Returns with the iterator of the argument.
     */
    function asIterator<T>(elements: ReadonlyArray<T>): IterableIterator<T>;
    /**
     * Returns an iterator that cycles indefinitely over the elements of iterable.
     *  - If `start` is given it starts the iteration from that element. Otherwise, it starts with the first element of the array.
     *  - If `start` is given, it must contain by the `elements` array. Otherwise, an error will be thrown.
     *
     * **Warning**: Typical uses of the resulting iterator may produce an infinite loop. You should use an explicit break.
     */
    function cycle<T>(elements: ReadonlyArray<T>, start?: T): IterableIterator<T>;
}
//# sourceMappingURL=tree-iterator.d.ts.map