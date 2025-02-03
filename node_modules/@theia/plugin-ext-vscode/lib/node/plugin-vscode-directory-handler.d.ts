import type { RecursivePartial, URI } from '@theia/core';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { PluginDeployerDirectoryHandler, PluginDeployerEntry, PluginDeployerDirectoryHandlerContext, PluginPackage } from '@theia/plugin-ext';
import { PluginCliContribution } from '@theia/plugin-ext/lib/main/node/plugin-cli-contribution';
export declare class PluginVsCodeDirectoryHandler implements PluginDeployerDirectoryHandler {
    protected readonly deploymentDirectory: Deferred<URI>;
    protected readonly pluginCli: PluginCliContribution;
    accept(plugin: PluginDeployerEntry): Promise<boolean>;
    protected attemptResolution(plugin: PluginDeployerEntry): Promise<boolean>;
    protected deriveMetadata(plugin: PluginDeployerEntry): Promise<boolean>;
    handle(context: PluginDeployerDirectoryHandlerContext): Promise<void>;
    protected resolveFromSources(plugin: PluginDeployerEntry): Promise<boolean>;
    protected resolveFromVSIX(plugin: PluginDeployerEntry): Promise<boolean>;
    protected resolveFromNpmTarball(plugin: PluginDeployerEntry): Promise<boolean>;
    protected resolvePackage(plugin: PluginDeployerEntry, options?: {
        pluginPath: string;
        pck?: RecursivePartial<PluginPackage>;
    }): boolean;
    protected requirePackage(pluginPath: string): Promise<PluginPackage | undefined>;
}
//# sourceMappingURL=plugin-vscode-directory-handler.d.ts.map