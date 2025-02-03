import { LabelProviderContribution, LabelProvider, DidChangeLabelEvent } from '@theia/core/lib/browser/label-provider';
import { SearchInWorkspaceRootFolderNode, SearchInWorkspaceFileNode } from './search-in-workspace-result-tree-widget';
export declare class SearchInWorkspaceLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    canHandle(element: object): number;
    getIcon(node: SearchInWorkspaceRootFolderNode | SearchInWorkspaceFileNode): string;
    getName(node: SearchInWorkspaceRootFolderNode | SearchInWorkspaceFileNode): string;
    affects(node: SearchInWorkspaceRootFolderNode | SearchInWorkspaceFileNode, event: DidChangeLabelEvent): boolean;
}
//# sourceMappingURL=search-in-workspace-label-provider.d.ts.map