import { PluginDeployerResolverContext } from '../../../common/plugin-protocol';
import { LocalPluginDeployerResolver } from './local-plugin-deployer-resolver';
export declare class LocalDirectoryPluginDeployerResolver extends LocalPluginDeployerResolver {
    static LOCAL_DIR: string;
    protected get supportedScheme(): string;
    protected resolveFromLocalPath(pluginResolverContext: PluginDeployerResolverContext, localPath: string): Promise<void>;
}
//# sourceMappingURL=local-directory-plugin-deployer-resolver.d.ts.map