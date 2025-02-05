import { Tree, TreeNode } from './tree';
import { Event, Emitter } from '../../common';
import { TreeSelectionState } from './tree-selection-state';
import { TreeSelectionService, SelectableTreeNode, TreeSelection } from './tree-selection';
import { TreeFocusService } from './tree-focus-service';
export declare class TreeSelectionServiceImpl implements TreeSelectionService {
    protected readonly tree: Tree;
    protected readonly focusService: TreeFocusService;
    protected readonly onSelectionChangedEmitter: Emitter<readonly Readonly<SelectableTreeNode>[]>;
    protected state: TreeSelectionState;
    protected init(): void;
    dispose(): void;
    get selectedNodes(): ReadonlyArray<Readonly<SelectableTreeNode>>;
    get onSelectionChanged(): Event<ReadonlyArray<Readonly<SelectableTreeNode>>>;
    protected fireSelectionChanged(): void;
    addSelection(selectionOrTreeNode: TreeSelection | Readonly<SelectableTreeNode>): void;
    clearSelection(): void;
    protected transiteTo(newState: TreeSelectionState, setFocus?: boolean): void;
    protected unselect(nodes: ReadonlyArray<SelectableTreeNode>): void;
    protected select(nodes: ReadonlyArray<SelectableTreeNode>): void;
    protected removeFocus(...nodes: ReadonlyArray<SelectableTreeNode>[]): void;
    protected addFocus(node: SelectableTreeNode | undefined): void;
    /**
     * Returns an array of the difference of two arrays. The returned array contains all elements that are contained by
     * `left` and not contained by `right`. `right` may also contain elements not present in `left`: these are simply ignored.
     */
    protected difference<T>(left: ReadonlyArray<T>, right: ReadonlyArray<T>): ReadonlyArray<T>;
    /**
     * Returns a reference to the argument if the node exists in the tree. Otherwise, `undefined`.
     */
    protected validateNode(node: Readonly<TreeNode>): Readonly<TreeNode> | undefined;
    storeState(): TreeSelectionServiceImpl.State;
    restoreState(state: TreeSelectionServiceImpl.State): void;
}
export declare namespace TreeSelectionServiceImpl {
    interface State {
        selectionStack: ReadonlyArray<FocusableTreeSelectionState>;
    }
    interface FocusableTreeSelectionState {
        focus?: string;
        node?: string;
        type?: TreeSelection.SelectionType;
    }
}
//# sourceMappingURL=tree-selection-impl.d.ts.map