import { DefaultUriLabelProviderContribution, URIIconReference } from '@theia/core/lib/browser/label-provider';
import URI from '@theia/core/lib/common/uri';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { WorkspaceService } from './workspace-service';
import { WorkspaceVariableContribution } from './workspace-variable-contribution';
export declare class WorkspaceUriLabelProviderContribution extends DefaultUriLabelProviderContribution {
    protected readonly workspaceVariable: WorkspaceVariableContribution;
    protected readonly workspaceService: WorkspaceService;
    init(): void;
    canHandle(element: object): number;
    getIcon(element: URI | URIIconReference | FileStat): string;
    getName(element: URI | URIIconReference | FileStat): string | undefined;
    /**
     * trims the workspace root from a file uri, if it is a child.
     */
    getLongName(element: URI | URIIconReference | FileStat): string | undefined;
    getDetails(element: URI | URIIconReference | FileStat): string | undefined;
    protected asURIIconReference(element: URI | URIIconReference | FileStat): URI | URIIconReference;
    protected getUri(element: URI | URIIconReference | FileStat): URI | undefined;
}
//# sourceMappingURL=workspace-uri-contribution.d.ts.map