import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from './workspace-service';
/**
 * Collection of workspace utility functions
 * @class
 */
export declare class WorkspaceUtils {
    protected readonly workspaceService: WorkspaceService;
    /**
     * Determine if root directory exists
     * for a given array of URIs
     * @param uris
     */
    containsRootDirectory(uris: URI[]): boolean;
}
//# sourceMappingURL=workspace-utils.d.ts.map