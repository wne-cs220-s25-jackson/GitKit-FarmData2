import type { URI } from '@theia/core';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { PluginDeployerDirectoryHandler, PluginDeployerEntry, PluginPackage, PluginDeployerDirectoryHandlerContext } from '../../../common/plugin-protocol';
import { PluginCliContribution } from '../plugin-cli-contribution';
export declare abstract class AbstractPluginDirectoryHandler implements PluginDeployerDirectoryHandler {
    protected readonly deploymentDirectory: Deferred<URI>;
    protected readonly pluginCli: PluginCliContribution;
    constructor();
    accept(resolvedPlugin: PluginDeployerEntry): Promise<boolean>;
    protected abstract acceptManifest(plugin: PluginPackage): boolean;
    abstract handle(context: PluginDeployerDirectoryHandlerContext): Promise<void>;
    protected copyDirectory(context: PluginDeployerDirectoryHandlerContext): Promise<void>;
    protected getExtensionDir(context: PluginDeployerDirectoryHandlerContext): Promise<string>;
}
export declare class PluginTheiaDirectoryHandler extends AbstractPluginDirectoryHandler {
    protected acceptManifest(plugin: PluginPackage): boolean;
    handle(context: PluginDeployerDirectoryHandlerContext): Promise<void>;
}
//# sourceMappingURL=plugin-theia-directory-handler.d.ts.map