import { Event, Emitter, WaitUntilEvent } from '../../common/event';
import { Disposable, DisposableCollection } from '../../common/disposable';
import { CancellationToken } from '../../common/cancellation';
import { Mutable } from '../../common';
import { AccessibilityInformation } from '../../common/accessibility';
export declare const Tree: unique symbol;
/**
 * The tree - an abstract data type.
 */
export interface Tree extends Disposable {
    /**
     * A root node of this tree.
     * Undefined if there is no root node.
     * Setting a root node refreshes the tree.
     */
    root: TreeNode | undefined;
    /**
     * Emit when the tree is changed.
     */
    readonly onChanged: Event<void>;
    /**
     * Return a node for the given identifier or undefined if such does not exist.
     */
    getNode(id: string | undefined): TreeNode | undefined;
    /**
     * Return a valid node in this tree matching to the given; otherwise undefined.
     */
    validateNode(node: TreeNode | undefined): TreeNode | undefined;
    /**
     * Refresh children of the root node.
     *
     * Return a valid refreshed composite root or `undefined` if such does not exist.
     */
    refresh(): Promise<Readonly<CompositeTreeNode> | undefined>;
    /**
     * Refresh children of a node for the give node id if it is valid.
     *
     * Return a valid refreshed composite node or `undefined` if such does not exist.
     */
    refresh(parent: Readonly<CompositeTreeNode>): Promise<Readonly<CompositeTreeNode> | undefined>;
    /**
     * Emit when the children of the given node are refreshed.
     */
    readonly onNodeRefreshed: Event<Readonly<CompositeTreeNode> & WaitUntilEvent>;
    /**
     * Emits when the busy state of the given node is changed.
     */
    readonly onDidChangeBusy: Event<TreeNode>;
    /**
     * Marks the give node as busy after a specified number of milliseconds.
     * A token source of the given token should be canceled to unmark.
     */
    markAsBusy(node: Readonly<TreeNode>, ms: number, token: CancellationToken): Promise<void>;
    /**
     * An update to the tree node occurred, but the tree structure remains unchanged
     */
    readonly onDidUpdate: Event<TreeNode[]>;
    markAsChecked(node: TreeNode, checked: boolean): void;
}
export interface TreeViewItemCheckboxInfo {
    checked: boolean;
    tooltip?: string;
    accessibilityInformation?: AccessibilityInformation;
}
/**
 * The tree node.
 */
export interface TreeNode {
    /**
     * An unique id of this node.
     */
    readonly id: string;
    /**
     * A human-readable name of this tree node.
     *
     * @deprecated use `LabelProvider.getName` instead or move this property to your tree node type
     */
    readonly name?: string;
    /**
     * A css string for this tree node icon.
     *
     * @deprecated use `LabelProvider.getIcon` instead or move this property to your tree node type
     */
    readonly icon?: string;
    /**
     * A human-readable description of this tree node.
     *
     * @deprecated use `LabelProvider.getLongName` instead or move this property to your tree node type
     */
    readonly description?: string;
    /**
     * Test whether this node should be rendered.
     * If undefined then node will be rendered.
     */
    readonly visible?: boolean;
    /**
     * A parent node of this tree node.
     * Undefined if this node is root.
     */
    readonly parent: Readonly<CompositeTreeNode> | undefined;
    /**
     * A previous sibling of this tree node.
     */
    readonly previousSibling?: TreeNode;
    /**
     * A next sibling of this tree node.
     */
    readonly nextSibling?: TreeNode;
    /**
     * Whether this node is busy. Greater than 0 then busy; otherwise not.
     */
    readonly busy?: number;
    /**
     * Whether this node is checked.
     */
    readonly checkboxInfo?: TreeViewItemCheckboxInfo;
}
export declare namespace TreeNode {
    function is(node: unknown): node is TreeNode;
    function equals(left: TreeNode | undefined, right: TreeNode | undefined): boolean;
    function isVisible(node: TreeNode | undefined): boolean;
}
/**
 * The composite tree node.
 */
export interface CompositeTreeNode extends TreeNode {
    /**
     * Child nodes of this tree node.
     */
    children: ReadonlyArray<TreeNode>;
}
export declare namespace CompositeTreeNode {
    function is(node: unknown): node is CompositeTreeNode;
    function getFirstChild(parent: CompositeTreeNode): TreeNode | undefined;
    function getLastChild(parent: CompositeTreeNode): TreeNode | undefined;
    function isAncestor(parent: CompositeTreeNode, child: TreeNode | undefined): boolean;
    function indexOf(parent: CompositeTreeNode, node: TreeNode | undefined): number;
    function addChildren(parent: CompositeTreeNode, children: TreeNode[]): CompositeTreeNode;
    function addChild(parent: CompositeTreeNode, child: TreeNode): CompositeTreeNode;
    function removeChild(parent: CompositeTreeNode, child: TreeNode): void;
    function setParent(child: TreeNode, index: number, parent: CompositeTreeNode): void;
}
/**
 * A default implementation of the tree.
 */
export declare class TreeImpl implements Tree {
    protected _root: TreeNode | undefined;
    protected readonly onChangedEmitter: Emitter<void>;
    protected readonly onNodeRefreshedEmitter: Emitter<CompositeTreeNode & WaitUntilEvent>;
    protected readonly toDispose: DisposableCollection;
    protected readonly onDidChangeBusyEmitter: Emitter<TreeNode>;
    readonly onDidChangeBusy: Event<TreeNode>;
    protected readonly onDidUpdateEmitter: Emitter<TreeNode[]>;
    readonly onDidUpdate: Event<TreeNode[]>;
    protected nodes: {
        [id: string]: Mutable<TreeNode> | undefined;
    };
    constructor();
    dispose(): void;
    get root(): TreeNode | undefined;
    protected toDisposeOnSetRoot: DisposableCollection;
    set root(root: TreeNode | undefined);
    get onChanged(): Event<void>;
    protected fireChanged(): void;
    get onNodeRefreshed(): Event<CompositeTreeNode & WaitUntilEvent>;
    protected fireNodeRefreshed(parent: CompositeTreeNode): Promise<void>;
    getNode(id: string | undefined): TreeNode | undefined;
    validateNode(node: TreeNode | undefined): TreeNode | undefined;
    refresh(raw?: CompositeTreeNode, cancellationToken?: CancellationToken): Promise<CompositeTreeNode | undefined>;
    protected resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]>;
    protected setChildren(parent: CompositeTreeNode, children: TreeNode[]): Promise<CompositeTreeNode | undefined>;
    protected removeNode(node: TreeNode | undefined): void;
    protected getRootNode(node: TreeNode): TreeNode;
    protected addNode(node: TreeNode | undefined): void;
    markAsBusy(raw: TreeNode, ms: number, token: CancellationToken): Promise<void>;
    markAsChecked(node: Mutable<TreeNode>, checked: boolean): void;
    protected doMarkAsBusy(node: Mutable<TreeNode>, ms: number, token: CancellationToken): Promise<void>;
    protected doSetBusy(node: Mutable<TreeNode>): void;
    protected doResetBusy(node: Mutable<TreeNode>): void;
}
//# sourceMappingURL=tree.d.ts.map