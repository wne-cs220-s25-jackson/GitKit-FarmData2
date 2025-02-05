import { LabelProviderContribution, LabelProvider } from '@theia/core/lib/browser/label-provider';
import { ScmFileChangeFolderNode, ScmFileChangeNode } from './scm-tree-model';
export declare class ScmTreeLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    canHandle(element: object): number;
    getName(node: ScmFileChangeFolderNode | ScmFileChangeNode): string;
}
//# sourceMappingURL=scm-tree-label-provider.d.ts.map