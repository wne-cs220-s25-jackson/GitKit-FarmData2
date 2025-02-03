import { Event, Emitter, WaitUntilEvent } from '../../common/event';
import { DisposableCollection } from '../../common/disposable';
import { CancellationToken } from '../../common/cancellation';
import { ILogger } from '../../common/logger';
import { SelectionProvider } from '../../common/selection-service';
import { Tree, TreeNode, CompositeTreeNode } from './tree';
import { TreeSelectionService, SelectableTreeNode, TreeSelection } from './tree-selection';
import { TreeExpansionService, ExpandableTreeNode } from './tree-expansion';
import { TreeNavigationService } from './tree-navigation';
import { TreeIterator } from './tree-iterator';
import { TreeSearch } from './tree-search';
import { TreeFocusService } from './tree-focus-service';
/**
 * The tree model.
 */
export declare const TreeModel: unique symbol;
export interface TreeModel extends Tree, TreeSelectionService, TreeExpansionService {
    /**
     * Expands the given node. If the `node` argument is `undefined`, then expands the currently selected tree node.
     * If multiple tree nodes are selected, expands the most recently selected tree node.
     */
    expandNode(node?: Readonly<ExpandableTreeNode>): Promise<Readonly<ExpandableTreeNode> | undefined>;
    /**
     * Collapses the given node. If the `node` argument is `undefined`, then collapses the currently selected tree node.
     * If multiple tree nodes are selected, collapses the most recently selected tree node.
     */
    collapseNode(node?: Readonly<ExpandableTreeNode>): Promise<boolean>;
    /**
     * Collapses recursively. If the `node` argument is `undefined`, then collapses the currently selected tree node.
     * If multiple tree nodes are selected, collapses the most recently selected tree node.
     */
    collapseAll(node?: Readonly<CompositeTreeNode>): Promise<boolean>;
    /**
     * Toggles the expansion state of the given node. If not give, then it toggles the expansion state of the currently selected node.
     * If multiple nodes are selected, then the most recently selected tree node's expansion state will be toggled.
     */
    toggleNodeExpansion(node?: Readonly<ExpandableTreeNode>): Promise<void>;
    /**
     * Opens the given node or the currently selected on if the argument is `undefined`.
     * If multiple nodes are selected, open the most recently selected node.
     */
    openNode(node?: Readonly<TreeNode> | undefined): void;
    /**
     * Event when a node should be opened.
     */
    readonly onOpenNode: Event<Readonly<TreeNode>>;
    /**
     * Selects the parent node relatively to the selected taking into account node expansion.
     */
    selectParent(): void;
    /**
     * Navigates to the given node if it is defined. This method accepts both the tree node and its ID as an argument.
     * Navigation sets a node as a root node and expand it. Resolves to the node if the navigation was successful. Otherwise,
     * resolves to `undefined`.
     */
    navigateTo(nodeOrId: Readonly<TreeNode> | string | undefined): Promise<TreeNode | undefined>;
    /**
     * Tests whether it is possible to navigate forward.
     */
    canNavigateForward(): boolean;
    /**
     * Tests whether it is possible to navigate backward.
     */
    canNavigateBackward(): boolean;
    /**
     * Navigates forward.
     */
    navigateForward(): Promise<void>;
    /**
     * Navigates backward.
     */
    navigateBackward(): Promise<void>;
    /**
     * Selects the previous tree node, regardless of its selection or visibility state.
     */
    selectPrev(): void;
    /**
     * Selects the previous node relatively to the currently selected one. This method takes the expansion state of the tree into consideration.
     */
    selectPrevNode(type?: TreeSelection.SelectionType): void;
    /**
     * Returns the previous tree node, regardless of its selection or visibility state.
     */
    getPrevNode(node?: TreeNode): TreeNode | undefined;
    /**
     * Returns the previous selectable tree node.
     */
    getPrevSelectableNode(node?: TreeNode): SelectableTreeNode | undefined;
    /**
     * Selects the next tree node, regardless of its selection or visibility state.
     */
    selectNext(): void;
    /**
     * Selects the next node relatively to the currently selected one. This method takes the expansion state of the tree into consideration.
     */
    selectNextNode(type?: TreeSelection.SelectionType): void;
    /**
     * Returns the next tree node, regardless of its selection or visibility state.
     */
    getNextNode(node?: TreeNode): TreeNode | undefined;
    /**
     * Returns the next selectable tree node.
     */
    getNextSelectableNode(node?: TreeNode): SelectableTreeNode | undefined;
    /**
     * Selects the given tree node. Has no effect when the node does not exist in the tree. Discards any previous selection state.
     */
    selectNode(node: Readonly<SelectableTreeNode>): void;
    /**
     * Selects the given node if it was not yet selected, or unselects it if it was. Keeps the previous selection state and updates it
     * with the current toggle selection.
     */
    toggleNode(node: Readonly<SelectableTreeNode>): void;
    /**
     * Selects a range of tree nodes. The target of the selection range is the argument, the from tree node is the previous selected node.
     * If no node was selected previously, invoking this method does nothing.
     */
    selectRange(node: Readonly<SelectableTreeNode>): void;
    /**
     * Returns the node currently in focus in this tree, or undefined if no node is focused.
     */
    getFocusedNode(): SelectableTreeNode | undefined;
}
export declare class TreeModelImpl implements TreeModel, SelectionProvider<ReadonlyArray<Readonly<SelectableTreeNode>>> {
    protected readonly logger: ILogger;
    protected readonly tree: Tree;
    protected readonly selectionService: TreeSelectionService;
    protected readonly expansionService: TreeExpansionService;
    protected readonly navigationService: TreeNavigationService;
    protected readonly focusService: TreeFocusService;
    protected readonly treeSearch: TreeSearch;
    protected readonly onChangedEmitter: Emitter<void>;
    protected readonly onOpenNodeEmitter: Emitter<TreeNode>;
    protected readonly toDispose: DisposableCollection;
    protected init(): void;
    dispose(): void;
    protected handleExpansion(node: Readonly<ExpandableTreeNode>): void;
    /**
     * Select the given node if it is the ancestor of a selected node.
     */
    protected selectIfAncestorOfSelected(node: Readonly<ExpandableTreeNode>): void;
    get root(): TreeNode | undefined;
    set root(root: TreeNode | undefined);
    get onChanged(): Event<void>;
    get onOpenNode(): Event<TreeNode>;
    protected fireChanged(): void;
    get onNodeRefreshed(): Event<Readonly<CompositeTreeNode> & WaitUntilEvent>;
    getNode(id: string | undefined): TreeNode | undefined;
    getFocusedNode(): SelectableTreeNode | undefined;
    validateNode(node: TreeNode | undefined): TreeNode | undefined;
    refresh(parent?: Readonly<CompositeTreeNode>): Promise<CompositeTreeNode | undefined>;
    get selectedNodes(): readonly Readonly<SelectableTreeNode>[];
    get onSelectionChanged(): Event<readonly Readonly<SelectableTreeNode>[]>;
    get onExpansionChanged(): Event<Readonly<ExpandableTreeNode>>;
    expandNode(raw?: Readonly<ExpandableTreeNode>): Promise<ExpandableTreeNode | undefined>;
    protected getExpansionCandidates(raw?: Readonly<TreeNode>): IterableIterator<TreeNode | undefined>;
    collapseNode(raw?: Readonly<ExpandableTreeNode>): Promise<boolean>;
    collapseAll(raw?: Readonly<CompositeTreeNode>): Promise<boolean>;
    toggleNodeExpansion(raw?: Readonly<ExpandableTreeNode>): Promise<void>;
    selectPrev(): void;
    selectPrevNode(type?: TreeSelection.SelectionType): void;
    getPrevNode(node?: TreeNode | undefined): TreeNode | undefined;
    getPrevSelectableNode(node?: TreeNode | undefined): SelectableTreeNode | undefined;
    selectNext(): void;
    selectNextNode(type?: TreeSelection.SelectionType): void;
    getNextNode(node?: TreeNode | undefined): TreeNode | undefined;
    getNextSelectableNode(node?: TreeNode | undefined): SelectableTreeNode | undefined;
    protected selectNodeIfSelectable(node: TreeNode | undefined): void;
    protected doGetNode(iterator: TreeIterator): TreeNode | undefined;
    protected doGetNextNode<T extends TreeNode>(iterator: TreeIterator, criterion: (node: TreeNode) => node is T): T | undefined;
    protected isVisibleSelectableNode(node: TreeNode): node is SelectableTreeNode;
    protected createBackwardTreeIterator(node: TreeNode | undefined): TreeIterator | undefined;
    protected createBackwardIterator(node: TreeNode | undefined): TreeIterator | undefined;
    protected createTreeIterator(node: TreeNode | undefined): TreeIterator | undefined;
    protected createIterator(node: TreeNode | undefined): TreeIterator | undefined;
    protected createForwardIteratorForNode(node: TreeNode): TreeIterator;
    openNode(raw?: TreeNode | undefined): void;
    protected doOpenNode(node: TreeNode): void;
    selectParent(): void;
    navigateTo(nodeOrId: TreeNode | string | undefined): Promise<TreeNode | undefined>;
    canNavigateForward(): boolean;
    canNavigateBackward(): boolean;
    navigateForward(): Promise<void>;
    navigateBackward(): Promise<void>;
    protected doNavigate(node: TreeNode): Promise<void>;
    addSelection(selectionOrTreeNode: TreeSelection | Readonly<SelectableTreeNode>): void;
    clearSelection(): void;
    selectNode(node: Readonly<SelectableTreeNode>): void;
    toggleNode(node: Readonly<SelectableTreeNode>): void;
    selectRange(node: Readonly<SelectableTreeNode>): void;
    storeState(): TreeModelImpl.State;
    restoreState(state: TreeModelImpl.State): void;
    get onDidChangeBusy(): Event<TreeNode>;
    markAsBusy(node: Readonly<TreeNode>, ms: number, token: CancellationToken): Promise<void>;
    get onDidUpdate(): Event<TreeNode[]>;
    markAsChecked(node: TreeNode, checked: boolean): void;
}
export declare namespace TreeModelImpl {
    interface State {
        selection: object;
    }
}
//# sourceMappingURL=tree-model.d.ts.map