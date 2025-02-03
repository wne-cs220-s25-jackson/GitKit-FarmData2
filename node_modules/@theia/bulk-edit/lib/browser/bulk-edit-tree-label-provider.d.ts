import { LabelProvider, LabelProviderContribution, DidChangeLabelEvent } from '@theia/core/lib/browser/label-provider';
import { BulkEditInfoNode } from './bulk-edit-tree';
import { TreeLabelProvider } from '@theia/core/lib/browser/tree/tree-label-provider';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class BulkEditTreeLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly treeLabelProvider: TreeLabelProvider;
    protected readonly workspaceService: WorkspaceService;
    canHandle(element: object): number;
    getIcon(node: BulkEditInfoNode): string;
    getName(node: BulkEditInfoNode): string;
    getLongName(node: BulkEditInfoNode): string;
    getDescription(node: BulkEditInfoNode): string;
    affects(node: BulkEditInfoNode, event: DidChangeLabelEvent): boolean;
}
//# sourceMappingURL=bulk-edit-tree-label-provider.d.ts.map