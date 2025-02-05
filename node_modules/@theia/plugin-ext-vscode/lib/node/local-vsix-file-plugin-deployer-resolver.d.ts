import { PluginDeployerResolverContext } from '@theia/plugin-ext';
import { LocalPluginDeployerResolver } from '@theia/plugin-ext/lib/main/node/resolvers/local-plugin-deployer-resolver';
import { PluginVSCodeEnvironment } from '../common/plugin-vscode-environment';
export declare class LocalVSIXFilePluginDeployerResolver extends LocalPluginDeployerResolver {
    static LOCAL_FILE: string;
    static FILE_EXTENSION: string;
    protected readonly environment: PluginVSCodeEnvironment;
    protected get supportedScheme(): string;
    accept(pluginId: string): boolean;
    resolveFromLocalPath(pluginResolverContext: PluginDeployerResolverContext, localPath: string): Promise<void>;
}
//# sourceMappingURL=local-vsix-file-plugin-deployer-resolver.d.ts.map