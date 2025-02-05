import { KeysToAnyValues, KeysToKeysToAnyValue } from '../../common/types';
import { PluginStorageKind } from '../../common';
export interface Store {
    fsPath: string;
    values: KeysToKeysToAnyValue;
}
export declare class PluginsKeyValueStorage {
    private stores;
    private storesToSync;
    private syncStoresTimeout?;
    private deferredGlobalDataPath;
    private pluginPathsService;
    private envServer;
    private fsLocking;
    protected init(): void;
    set(key: string, value: KeysToAnyValues, kind: PluginStorageKind): Promise<boolean>;
    get(key: string, kind: PluginStorageKind): Promise<KeysToAnyValues>;
    getAll(kind: PluginStorageKind): Promise<KeysToKeysToAnyValue>;
    private getGlobalDataPath;
    private initializeStore;
    private getStore;
    private syncStores;
    private getSyncStoreTimeout;
    private getDataPath;
    private readFromFile;
    private writeToFile;
    private dispose;
}
//# sourceMappingURL=plugins-key-value-storage.d.ts.map