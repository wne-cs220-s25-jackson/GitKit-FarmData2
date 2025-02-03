import { PluginDeployerEntry, PluginDeployerDirectoryHandlerContext } from '../../common/plugin-protocol';
export declare class PluginDeployerDirectoryHandlerContextImpl implements PluginDeployerDirectoryHandlerContext {
    private readonly pluginDeployerEntry;
    constructor(pluginDeployerEntry: PluginDeployerEntry);
    copy(origin: string, target: string): Promise<void>;
    pluginEntry(): PluginDeployerEntry;
}
//# sourceMappingURL=plugin-deployer-directory-handler-context-impl.d.ts.map