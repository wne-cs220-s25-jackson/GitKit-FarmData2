import { PluginDeployerResolver, PluginDeployerResolverContext } from '../../../common/plugin-protocol';
export declare abstract class LocalPluginDeployerResolver implements PluginDeployerResolver {
    resolve(pluginResolverContext: PluginDeployerResolverContext): Promise<void>;
    accept(pluginId: string): boolean;
    protected abstract get supportedScheme(): string;
    protected abstract resolveFromLocalPath(pluginResolverContext: PluginDeployerResolverContext, localPath: string): Promise<void>;
    private resolveLocalPluginPath;
}
//# sourceMappingURL=local-plugin-deployer-resolver.d.ts.map