import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { PluginDeployerImpl } from './plugin-deployer-impl';
import { PluginsKeyValueStorage } from './plugins-key-value-storage';
import { PluginServer, PluginStorageKind, PluginType, UnresolvedPluginEntry, PluginIdentifiers, PluginDeployOptions } from '../../common/plugin-protocol';
import { KeysToAnyValues, KeysToKeysToAnyValue } from '../../common/types';
export declare class PluginServerHandler implements PluginServer {
    protected readonly pluginDeployer: PluginDeployerImpl;
    protected readonly pluginsKeyValueStorage: PluginsKeyValueStorage;
    deploy(pluginEntry: string, arg2?: PluginType | CancellationToken, options?: PluginDeployOptions): Promise<void>;
    protected doDeploy(pluginEntry: UnresolvedPluginEntry, options?: PluginDeployOptions): Promise<number>;
    uninstall(pluginId: PluginIdentifiers.VersionedId): Promise<void>;
    undeploy(pluginId: PluginIdentifiers.VersionedId): Promise<void>;
    setStorageValue(key: string, value: KeysToAnyValues, kind: PluginStorageKind): Promise<boolean>;
    getStorageValue(key: string, kind: PluginStorageKind): Promise<KeysToAnyValues>;
    getAllStorageValues(kind: PluginStorageKind): Promise<KeysToKeysToAnyValue>;
}
//# sourceMappingURL=plugin-server-handler.d.ts.map