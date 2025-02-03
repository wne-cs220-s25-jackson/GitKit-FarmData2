import { LabelProvider, LabelProviderContribution, DidChangeLabelEvent } from '@theia/core/lib/browser/label-provider';
import { MarkerInfoNode } from './marker-tree';
import { TreeLabelProvider } from '@theia/core/lib/browser/tree/tree-label-provider';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class MarkerTreeLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly treeLabelProvider: TreeLabelProvider;
    protected readonly workspaceService: WorkspaceService;
    canHandle(element: object): number;
    getIcon(node: MarkerInfoNode): string;
    getName(node: MarkerInfoNode): string;
    getLongName(node: MarkerInfoNode): string;
    getDescription(node: MarkerInfoNode): string;
    affects(node: MarkerInfoNode, event: DidChangeLabelEvent): boolean;
}
//# sourceMappingURL=marker-tree-label-provider.d.ts.map