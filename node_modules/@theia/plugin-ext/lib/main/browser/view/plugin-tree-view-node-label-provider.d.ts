import { LabelProviderContribution, LabelProvider } from '@theia/core/lib/browser/label-provider';
import { TreeLabelProvider } from '@theia/core/lib/browser/tree/tree-label-provider';
import { TreeViewNode } from './tree-view-widget';
export declare class PluginTreeViewNodeLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly treeLabelProvider: TreeLabelProvider;
    canHandle(element: TreeViewNode | any): number;
    getIcon(node: TreeViewNode): string | undefined;
    getName(node: TreeViewNode): string | undefined;
    getLongName(node: TreeViewNode): string | undefined;
}
//# sourceMappingURL=plugin-tree-view-node-label-provider.d.ts.map