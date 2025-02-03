import { OVSXClient } from '@theia/ovsx-client';
import { RequestService } from '@theia/request';
import { RateLimiter } from 'limiter';
/**
 * Available options when downloading.
 */
export interface DownloadPluginsOptions {
    /**
     * Determines if a plugin should be unpacked.
     * Defaults to `false`.
     */
    packed?: boolean;
    /**
     * Determines if failures while downloading plugins should be ignored.
     * Defaults to `false`.
     */
    ignoreErrors?: boolean;
    /**
     * The supported vscode API version.
     * Used to determine extension compatibility.
     */
    apiVersion?: string;
    /**
     * Fetch plugins in parallel
     */
    parallel?: boolean;
}
export default function downloadPlugins(ovsxClient: OVSXClient, rateLimiter: RateLimiter, requestService: RequestService, options?: DownloadPluginsOptions): Promise<void>;
//# sourceMappingURL=download-plugins.d.ts.map