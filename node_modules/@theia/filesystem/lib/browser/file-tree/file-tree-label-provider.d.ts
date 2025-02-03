import { LabelProviderContribution, DidChangeLabelEvent, LabelProvider } from '@theia/core/lib/browser/label-provider';
import { FileStatNode } from './file-tree';
import { TreeLabelProvider } from '@theia/core/lib/browser/tree/tree-label-provider';
export declare class FileTreeLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly treeLabelProvider: TreeLabelProvider;
    canHandle(element: object): number;
    getIcon(node: FileStatNode): string;
    getName(node: FileStatNode): string;
    getDescription(node: FileStatNode): string;
    affects(node: FileStatNode, event: DidChangeLabelEvent): boolean;
}
//# sourceMappingURL=file-tree-label-provider.d.ts.map