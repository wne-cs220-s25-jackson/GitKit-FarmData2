import { RequestService } from '@theia/core/shared/@theia/request';
import { PluginDeployerResolver, PluginDeployerResolverContext } from '../../common';
/**
 * Resolver that handle the github: protocol
 * github:<org>/<repo>/<filename>@latest
 * github:<org>/<repo>/<filename>@<version>
 */
export declare class GithubPluginDeployerResolver implements PluginDeployerResolver {
    private static PREFIX;
    private static GITHUB_ENDPOINT;
    private unpackedFolder;
    protected readonly request: RequestService;
    constructor();
    /**
     * Grab the remote file specified by Github URL
     */
    resolve(pluginResolverContext: PluginDeployerResolverContext): Promise<void>;
    protected grabGithubFile(pluginResolverContext: PluginDeployerResolverContext, orgName: string, repoName: string, filename: string, version: string): Promise<void>;
    /**
     * Handle only the plugins that starts with github:
     */
    accept(pluginId: string): boolean;
}
//# sourceMappingURL=plugin-github-resolver.d.ts.map