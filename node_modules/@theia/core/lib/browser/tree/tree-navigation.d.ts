import { TreeNode } from './tree';
export declare class TreeNavigationService {
    protected index: number;
    protected nodes: TreeNode[];
    get next(): TreeNode | undefined;
    get prev(): TreeNode | undefined;
    advance(): TreeNode | undefined;
    retreat(): TreeNode | undefined;
    push(node: TreeNode): void;
}
//# sourceMappingURL=tree-navigation.d.ts.map