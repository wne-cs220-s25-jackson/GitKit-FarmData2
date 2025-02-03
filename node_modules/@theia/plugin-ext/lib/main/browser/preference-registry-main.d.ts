import { PreferenceScope, PreferenceProviderProvider } from '@theia/core/lib/browser/preferences';
import { interfaces } from '@theia/core/shared/inversify';
import { PreferenceRegistryMain, PreferenceData } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { ConfigurationTarget } from '../../plugin/types-impl';
import { FileStat } from '@theia/filesystem/lib/common/files';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
export declare function getPreferences(preferenceProviderProvider: PreferenceProviderProvider, rootFolders: FileStat[]): PreferenceData;
export declare class PreferenceRegistryMainImpl implements PreferenceRegistryMain, Disposable {
    private readonly proxy;
    private readonly preferenceService;
    protected readonly toDispose: DisposableCollection;
    constructor(prc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $updateConfigurationOption(target: boolean | ConfigurationTarget | undefined, key: string, value: any, resource?: string, withLanguageOverride?: boolean): Promise<void>;
    $removeConfigurationOption(target: boolean | ConfigurationTarget | undefined, key: string, resource?: string, withLanguageOverride?: boolean): Promise<void>;
    private parseConfigurationTarget;
    protected getEffectiveKey(key: string, scope: PreferenceScope, withLanguageOverride?: boolean, resource?: string): string;
}
//# sourceMappingURL=preference-registry-main.d.ts.map