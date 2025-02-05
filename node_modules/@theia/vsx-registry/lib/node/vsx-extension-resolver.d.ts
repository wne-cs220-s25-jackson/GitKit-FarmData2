import { PluginDeployerHandler, PluginDeployerResolver, PluginDeployerResolverContext, PluginDeployOptions } from '@theia/plugin-ext/lib/common/plugin-protocol';
import { OVSXClientProvider } from '../common/ovsx-client-provider';
import { OVSXApiFilterProvider, VSXExtensionRaw, VSXTargetPlatform } from '@theia/ovsx-client';
import { RequestService } from '@theia/core/shared/@theia/request';
import { PluginVSCodeEnvironment } from '@theia/plugin-ext-vscode/lib/common/plugin-vscode-environment';
import { PluginUninstallationManager } from '@theia/plugin-ext/lib/main/node/plugin-uninstallation-manager';
export declare class VSXExtensionResolver implements PluginDeployerResolver {
    protected clientProvider: OVSXClientProvider;
    protected pluginDeployerHandler: PluginDeployerHandler;
    protected requestService: RequestService;
    protected readonly environment: PluginVSCodeEnvironment;
    protected readonly uninstallationManager: PluginUninstallationManager;
    protected vsxApiFilter: OVSXApiFilterProvider;
    accept(pluginId: string): boolean;
    static readonly TEMP_DIR_PREFIX = "vscode-download";
    static readonly TARGET_PLATFORM: VSXTargetPlatform;
    resolve(context: PluginDeployerResolverContext, options?: PluginDeployOptions): Promise<void>;
    protected getTempDir(): Promise<string>;
    protected hasSameOrNewerVersion(id: string, extension: VSXExtensionRaw): string | undefined;
    protected download(downloadUrl: string, downloadPath: string): Promise<boolean>;
}
//# sourceMappingURL=vsx-extension-resolver.d.ts.map