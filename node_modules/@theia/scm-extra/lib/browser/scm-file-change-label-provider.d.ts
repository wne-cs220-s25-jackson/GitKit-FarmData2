import { LabelProviderContribution, DidChangeLabelEvent, LabelProvider } from '@theia/core/lib/browser/label-provider';
import { ScmFileChangeNode } from './scm-file-change-node';
import URI from '@theia/core/lib/common/uri';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
export declare class ScmFileChangeLabelProvider implements LabelProviderContribution {
    protected readonly labelProvider: LabelProvider;
    protected readonly scmService: ScmService;
    canHandle(element: object): number;
    getIcon(node: ScmFileChangeNode): string;
    getName(node: ScmFileChangeNode): string;
    getDescription(node: ScmFileChangeNode): string;
    affects(node: ScmFileChangeNode, event: DidChangeLabelEvent): boolean;
    getCaption(node: ScmFileChangeNode): string;
    relativePath(uri: URI | string): string;
    getStatusCaption(node: ScmFileChangeNode): string;
}
//# sourceMappingURL=scm-file-change-label-provider.d.ts.map