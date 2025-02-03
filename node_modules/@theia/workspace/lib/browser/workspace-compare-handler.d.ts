import URI from '@theia/core/lib/common/uri';
import { UriCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import { DiffService } from './diff-service';
export declare class WorkspaceCompareHandler implements UriCommandHandler<URI[]> {
    protected readonly diffService: DiffService;
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
//# sourceMappingURL=workspace-compare-handler.d.ts.map