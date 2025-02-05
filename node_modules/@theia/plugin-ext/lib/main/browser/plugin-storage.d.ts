import { interfaces } from '@theia/core/shared/inversify';
import { StorageMain } from '../../common/plugin-api-rpc';
import { PluginStorageKind } from '../../common/plugin-protocol';
import { KeysToAnyValues, KeysToKeysToAnyValue } from '../../common/types';
export declare class StorageMainImpl implements StorageMain {
    private readonly pluginServer;
    private readonly workspaceService;
    constructor(container: interfaces.Container);
    $set(key: string, value: KeysToAnyValues, isGlobal: boolean): Promise<boolean>;
    $get(key: string, isGlobal: boolean): Promise<KeysToAnyValues>;
    $getAll(isGlobal: boolean): Promise<KeysToKeysToAnyValue>;
    protected toKind(isGlobal: boolean): PluginStorageKind;
}
//# sourceMappingURL=plugin-storage.d.ts.map