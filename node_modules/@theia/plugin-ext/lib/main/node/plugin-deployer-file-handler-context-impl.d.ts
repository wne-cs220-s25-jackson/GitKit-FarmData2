import { PluginDeployerEntry, PluginDeployerFileHandlerContext } from '../../common/plugin-protocol';
export declare class PluginDeployerFileHandlerContextImpl implements PluginDeployerFileHandlerContext {
    private readonly pluginDeployerEntry;
    constructor(pluginDeployerEntry: PluginDeployerEntry);
    unzip(sourcePath: string, destPath: string): Promise<void>;
    pluginEntry(): PluginDeployerEntry;
}
//# sourceMappingURL=plugin-deployer-file-handler-context-impl.d.ts.map