import { PluginDeployerResolverContext, PluginDeployerEntry, PluginDeployerResolverInit } from '../../common/plugin-protocol';
export declare class PluginDeployerResolverContextImpl<T> implements PluginDeployerResolverContext {
    private readonly sourceId;
    /**
     * Name of the resolver for this context
     */
    private resolverName;
    private pluginEntries;
    constructor(resolver: T, sourceId: string);
    addPlugin(pluginId: string, path: string): void;
    getPlugins(): PluginDeployerEntry[];
    getOriginId(): string;
}
export declare class PluginDeployerResolverInitImpl implements PluginDeployerResolverInit {
}
//# sourceMappingURL=plugin-deployer-resolver-context-impl.d.ts.map