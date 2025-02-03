import { LabelProviderContribution } from '../label-provider';
import { TreeNode } from './tree';
export declare class TreeLabelProvider implements LabelProviderContribution {
    canHandle(element: object): number;
    getIcon(node: TreeNode): string | undefined;
    getName(node: TreeNode): string | undefined;
    getLongName(node: TreeNode): string | undefined;
}
//# sourceMappingURL=tree-label-provider.d.ts.map