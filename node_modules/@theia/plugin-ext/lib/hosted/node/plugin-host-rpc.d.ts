import { ContainerModule } from '@theia/core/shared/inversify';
import { AbstractPluginManagerExtImpl, PluginHost, PluginManagerExtImpl } from '../../plugin/plugin-manager';
import { Plugin, PluginAPIFactory } from '../../common/plugin-api-rpc';
import { PluginModel } from '../../common/plugin-protocol';
import { EnvExtImpl } from '../../plugin/env';
import { PreferenceRegistryExtImpl } from '../../plugin/preference-registry';
import { ExtPluginApi } from '../../common/plugin-ext-api-contribution';
import { DebugExtImpl } from '../../plugin/debug/debug-ext';
import { EditorsAndDocumentsExtImpl } from '../../plugin/editors-and-documents';
import { WorkspaceExtImpl } from '../../plugin/workspace';
import { MessageRegistryExt } from '../../plugin/message-registry';
import { ClipboardExt } from '../../plugin/clipboard-ext';
import { KeyValueStorageProxy } from '../../plugin/plugin-storage';
import { WebviewsExtImpl } from '../../plugin/webviews';
import { TerminalServiceExtImpl } from '../../plugin/terminal-ext';
import { SecretsExtImpl } from '../../plugin/secrets-ext';
import { LocalizationExtImpl } from '../../plugin/localization-ext';
import { ProxyIdentifier } from '../../common/rpc-protocol';
import { PluginApiCache } from '../../plugin/node/plugin-container-module';
/**
 * The full set of all possible `Ext` interfaces that a plugin manager can support.
 */
export interface ExtInterfaces {
    envExt: EnvExtImpl;
    storageExt: KeyValueStorageProxy;
    debugExt: DebugExtImpl;
    editorsAndDocumentsExt: EditorsAndDocumentsExtImpl;
    messageRegistryExt: MessageRegistryExt;
    workspaceExt: WorkspaceExtImpl;
    preferenceRegistryExt: PreferenceRegistryExtImpl;
    clipboardExt: ClipboardExt;
    webviewExt: WebviewsExtImpl;
    terminalServiceExt: TerminalServiceExtImpl;
    secretsExt: SecretsExtImpl;
    localizationExt: LocalizationExtImpl;
}
/**
 * The RPC proxy identifier keys to set in the RPC object to register our `Ext` interface implementations.
 */
export type RpcKeys<EXT extends Partial<ExtInterfaces>> = Partial<Record<keyof EXT, ProxyIdentifier<any>>> & {
    $pluginManager: ProxyIdentifier<any>;
};
export declare const PluginContainerModuleLoader: unique symbol;
/**
 * A function that loads a `PluginContainerModule` exported by a plugin's entry-point
 * script, returning the per-`Container` cache of its exported API instances if the
 * module has an API factory registered.
 */
export type PluginContainerModuleLoader = (module: ContainerModule) => PluginApiCache<object> | undefined;
/**
 * Handle the RPC calls.
 *
 * @template PM is the plugin manager (ext) type
 * @template PAF is the plugin API factory type
 * @template EXT is the type identifying the `Ext` interfaces supported by the plugin manager
 */
export declare abstract class AbstractPluginHostRPC<PM extends AbstractPluginManagerExtImpl<any>, PAF, EXT extends Partial<ExtInterfaces>> {
    private readonly backendInitPath;
    private readonly extRpc;
    protected readonly rpc: any;
    protected readonly loadContainerModule: PluginContainerModuleLoader;
    protected readonly pluginManager: PM;
    protected readonly banner: string;
    protected apiFactory: PAF;
    constructor(name: string, backendInitPath: string | undefined, extRpc: RpcKeys<EXT>);
    initialize(): void;
    terminate(): Promise<void>;
    protected abstract createAPIFactory(extInterfaces: EXT): PAF;
    protected abstract createExtInterfaces(): EXT;
    protected registerExtInterfaces(extInterfaces: EXT): void;
    initContext(contextPath: string, plugin: Plugin): void;
    protected getBackendPluginPath(pluginModel: PluginModel): string | undefined;
    /**
     * Create the {@link PluginHost} that is required by my plugin manager ext interface to delegate
     * critical behaviour such as loading and initializing plugins to me.
     */
    createPluginHost(): PluginHost;
    /**
     * Initialize the end of the given provided extension API applicable to the current plugin host.
     * Errors should be propagated to the caller.
     *
     * @param extApi the extension API to initialize, if appropriate
     * @throws if any error occurs in initializing the extension API
     */
    protected abstract initExtApi(extApi: ExtPluginApi): void;
}
/**
 * The RPC handler for frontend-connection-scoped plugins (Theia and VSCode plugins).
 */
export declare class PluginHostRPC extends AbstractPluginHostRPC<PluginManagerExtImpl, PluginAPIFactory, ExtInterfaces> {
    protected readonly envExt: EnvExtImpl;
    protected readonly localizationExt: LocalizationExtImpl;
    protected readonly keyValueStorageProxy: KeyValueStorageProxy;
    protected readonly debugExt: DebugExtImpl;
    protected readonly editorsAndDocumentsExt: EditorsAndDocumentsExtImpl;
    protected readonly messageRegistryExt: MessageRegistryExt;
    protected readonly workspaceExt: WorkspaceExtImpl;
    protected readonly preferenceRegistryExt: PreferenceRegistryExtImpl;
    protected readonly clipboardExt: ClipboardExt;
    protected readonly webviewExt: WebviewsExtImpl;
    protected readonly terminalServiceExt: TerminalServiceExtImpl;
    protected readonly secretsExt: SecretsExtImpl;
    constructor();
    protected createExtInterfaces(): ExtInterfaces;
    protected createAPIFactory(extInterfaces: ExtInterfaces): PluginAPIFactory;
    protected initExtApi(extApi: ExtPluginApi): void;
}
//# sourceMappingURL=plugin-host-rpc.d.ts.map