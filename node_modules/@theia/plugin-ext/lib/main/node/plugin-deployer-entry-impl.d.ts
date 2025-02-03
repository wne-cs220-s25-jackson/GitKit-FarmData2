import { PluginDeployerEntry, PluginDeployerEntryType, PluginType } from '../../common/plugin-protocol';
export declare class PluginDeployerEntryImpl implements PluginDeployerEntry {
    readonly originId: string;
    readonly pluginId: string;
    private initPath;
    private currentPath;
    private map;
    private resolved;
    private acceptedTypes;
    private changes;
    private resolvedByName;
    private _type;
    private _rootPath;
    constructor(originId: string, pluginId: string, initPath?: string);
    id(): string;
    originalPath(): string;
    path(): string;
    getValue<T>(key: string): T;
    storeValue<T>(key: string, value: T): void;
    updatePath(newPath: string, transformerName?: string): void;
    getChanges(): string[];
    isFile(): Promise<boolean>;
    isDirectory(): Promise<boolean>;
    hasError(): boolean;
    isResolved(): boolean;
    accept(...types: PluginDeployerEntryType[]): void;
    isAccepted(...types: PluginDeployerEntryType[]): boolean;
    setResolvedBy(name: string): void;
    resolvedBy(): string;
    get type(): PluginType;
    set type(type: PluginType);
    get rootPath(): string;
    set rootPath(rootPath: string);
}
//# sourceMappingURL=plugin-deployer-entry-impl.d.ts.map