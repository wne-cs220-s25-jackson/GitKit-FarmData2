import URI from '@theia/core/lib/common/uri';
import { WorkspaceUtils } from './workspace-utils';
import { WorkspaceService } from './workspace-service';
import { UriCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare class WorkspaceDuplicateHandler implements UriCommandHandler<URI[]> {
    protected readonly fileService: FileService;
    protected readonly workspaceUtils: WorkspaceUtils;
    protected readonly workspaceService: WorkspaceService;
    /**
     * Determine if the command is visible.
     *
     * @param uris URIs of selected resources.
     * @returns `true` if the command is visible.
     */
    isVisible(uris: URI[]): boolean;
    /**
     * Determine if the command is enabled.
     *
     * @param uris URIs of selected resources.
     * @returns `true` if the command is enabled.
     */
    isEnabled(uris: URI[]): boolean;
    /**
     * Execute the command.
     *
     * @param uris URIs of selected resources.
     */
    execute(uris: URI[]): Promise<void>;
}
//# sourceMappingURL=workspace-duplicate-handler.d.ts.map