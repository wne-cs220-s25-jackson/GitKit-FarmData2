import { RequestService } from '@theia/core/shared/@theia/request';
import { PluginDeployerResolver, PluginDeployerResolverContext } from '../../common';
/**
 * Resolver that handle the http(s): protocol
 * http://path/to/my.plugin
 * https://path/to/my.plugin
 */
export declare class HttpPluginDeployerResolver implements PluginDeployerResolver {
    private unpackedFolder;
    protected readonly request: RequestService;
    constructor();
    /**
     * Grab the remote file specified by the given URL
     */
    resolve(pluginResolverContext: PluginDeployerResolverContext): Promise<void>;
    /**
     * Handle only the plugins that starts with http or https:
     */
    accept(pluginId: string): boolean;
}
//# sourceMappingURL=plugin-http-resolver.d.ts.map