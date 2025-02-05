import { PluginDeployerEntry, PluginDeployerEntryType, PluginType } from '../../common/plugin-protocol';
import { PluginDeployerEntryImpl } from './plugin-deployer-entry-impl';
/**
 * Proxify call to plugin deployer entry by adding the deployer name as part of the updating path
 */
export declare class ProxyPluginDeployerEntry<T> implements PluginDeployerEntry {
    readonly deployer: T;
    readonly delegate: PluginDeployerEntryImpl;
    private readonly deployerName;
    constructor(deployer: T, delegate: PluginDeployerEntryImpl);
    id(): string;
    originalPath(): string;
    path(): string;
    getValue<V>(key: string): V;
    storeValue<V>(key: string, value: V): void;
    updatePath(newPath: string): void;
    getChanges(): string[];
    isFile(): Promise<boolean>;
    isDirectory(): Promise<boolean>;
    isResolved(): boolean;
    isAccepted(...types: PluginDeployerEntryType[]): boolean;
    accept(...types: PluginDeployerEntryType[]): void;
    hasError(): boolean;
    resolvedBy(): string;
    get type(): PluginType;
    set type(type: PluginType);
    get rootPath(): string;
    set rootPath(rootPath: string);
}
//# sourceMappingURL=plugin-deployer-proxy-entry-impl.d.ts.map