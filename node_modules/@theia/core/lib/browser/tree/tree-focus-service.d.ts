import { Emitter, Event } from '../../common';
import { Tree, TreeNode } from './tree';
import { SelectableTreeNode } from './tree-selection';
export interface TreeFocusService {
    readonly focusedNode: SelectableTreeNode | undefined;
    readonly onDidChangeFocus: Event<SelectableTreeNode | undefined>;
    setFocus(node?: SelectableTreeNode): void;
    hasFocus(node?: TreeNode): boolean;
}
export declare const TreeFocusService: unique symbol;
export declare class TreeFocusServiceImpl implements TreeFocusService {
    protected focusedId: string | undefined;
    protected onDidChangeFocusEmitter: Emitter<SelectableTreeNode | undefined>;
    get onDidChangeFocus(): Event<SelectableTreeNode | undefined>;
    protected readonly tree: Tree;
    get focusedNode(): SelectableTreeNode | undefined;
    setFocus(node?: SelectableTreeNode): void;
    hasFocus(node?: TreeNode): boolean;
}
//# sourceMappingURL=tree-focus-service.d.ts.map