import { TreeNode } from './tree';
import { Event, Disposable, SelectionProvider } from '../../common';
/**
 * The tree selection service.
 */
export declare const TreeSelectionService: unique symbol;
export interface TreeSelectionService extends Disposable, SelectionProvider<ReadonlyArray<Readonly<SelectableTreeNode>>> {
    /**
     * The tree selection, representing the selected nodes from the tree. If nothing is selected, the
     * result will be empty.
     */
    readonly selectedNodes: ReadonlyArray<Readonly<SelectableTreeNode>>;
    /**
     * Emitted when the selection has changed in the tree.
     */
    readonly onSelectionChanged: Event<ReadonlyArray<Readonly<SelectableTreeNode>>>;
    /**
     * Registers the given selection into the tree selection service. If the selection state changes after adding the
     * `selectionOrTreeNode` argument, a selection changed event will be fired. If the argument is a tree node,
     * a it will be treated as a tree selection with the default selection type.
     */
    addSelection(selectionOrTreeNode: TreeSelection | Readonly<SelectableTreeNode>): void;
    /**
     * Clears all selected nodes
     */
    clearSelection(): void;
    /**
     * Store selection state.
     */
    storeState(): object;
    /**
     * Restore selection state.
     */
    restoreState(state: object): void;
}
/**
 * Representation of a tree selection.
 */
export interface TreeSelection {
    /**
     * The actual item that has been selected.
     */
    readonly node: Readonly<SelectableTreeNode>;
    /**
     * The optional tree selection type. Defaults to `SelectionType.DEFAULT`;
     */
    readonly type?: TreeSelection.SelectionType;
}
export declare namespace TreeSelection {
    /**
     * Enumeration of selection types.
     */
    enum SelectionType {
        DEFAULT = 0,
        TOGGLE = 1,
        RANGE = 2
    }
    function is(arg: unknown): arg is TreeSelection;
    function isRange(arg: TreeSelection | SelectionType | undefined): boolean;
    function isToggle(arg: TreeSelection | SelectionType | undefined): boolean;
}
/**
 * A selectable tree node.
 */
export interface SelectableTreeNode extends TreeNode {
    /**
     * `true` if the tree node is selected. Otherwise, `false`.
     */
    selected: boolean;
    /**
     * @deprecated @since 1.27.0. Use TreeFocusService to track the focused node.
     *
     * `true` if the tree node has the focus. Otherwise, `false`. Defaults to `false`.
     */
    focus?: boolean;
}
export declare namespace SelectableTreeNode {
    function is(node: unknown): node is SelectableTreeNode;
    function isSelected(node: unknown): node is SelectableTreeNode;
    /**
     * @deprecated @since 1.27.0. Use TreeFocusService to track the focused node.
     */
    function hasFocus(node: TreeNode | undefined): boolean;
    function isVisible(node: TreeNode | undefined): node is SelectableTreeNode;
    function getVisibleParent(node: TreeNode | undefined): SelectableTreeNode | undefined;
}
//# sourceMappingURL=tree-selection.d.ts.map