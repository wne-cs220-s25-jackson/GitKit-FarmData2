import { FilepathBreadcrumb } from '@theia/filesystem/lib/browser/breadcrumbs/filepath-breadcrumb';
import { FilepathBreadcrumbClassNameFactory, FilepathBreadcrumbsContribution } from '@theia/filesystem/lib/browser/breadcrumbs/filepath-breadcrumbs-contribution';
import { WorkspaceService } from './workspace-service';
import URI from '@theia/core/lib/common/uri';
export declare class WorkspaceBreadcrumbsContribution extends FilepathBreadcrumbsContribution {
    protected readonly workspaceService: WorkspaceService;
    getContainerClassCreator(fileURI: URI): FilepathBreadcrumbClassNameFactory;
    getIconClassCreator(fileURI: URI): FilepathBreadcrumbClassNameFactory;
    protected filterBreadcrumbs(uri: URI, breadcrumb: FilepathBreadcrumb): boolean;
}
//# sourceMappingURL=workspace-breadcrumbs-contribution.d.ts.map