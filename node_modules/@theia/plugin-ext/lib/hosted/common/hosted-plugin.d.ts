/// <reference types="lodash" />
import { interfaces } from '@theia/core/shared/inversify';
import { PluginMetadata, HostedPluginServer, DeployedPlugin, PluginServer, PluginIdentifiers } from '../../common/plugin-protocol';
import { AbstractPluginManagerExt } from '../../common/plugin-api-rpc';
import { Disposable, DisposableCollection, Emitter, ILogger, ContributionProvider, RpcProxy } from '@theia/core';
import { MainPluginApiProvider } from '../../common/plugin-ext-api-contribution';
import { PluginPathsService } from '../../main/common/plugin-paths-protocol';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { Measurement, Stopwatch } from '@theia/core/lib/common';
export type PluginHost = 'frontend' | string;
export declare const ALL_ACTIVATION_EVENT = "*";
export declare function isConnectionScopedBackendPlugin(plugin: DeployedPlugin): boolean;
export declare abstract class AbstractHostedPluginSupport<PM extends AbstractPluginManagerExt<any>, HPS extends HostedPluginServer | RpcProxy<HostedPluginServer>> {
    protected readonly clientId: string;
    protected container: interfaces.Container;
    protected readonly logger: ILogger;
    protected readonly server: HPS;
    protected readonly mainPluginApiProviders: ContributionProvider<MainPluginApiProvider>;
    protected readonly pluginServer: PluginServer;
    protected readonly pluginPathsService: PluginPathsService;
    protected readonly envServer: EnvVariablesServer;
    protected readonly stopwatch: Stopwatch;
    protected theiaReadyPromise: Promise<unknown>;
    protected readonly managers: Map<string, PM>;
    protected readonly contributions: Map<`${string}.${string}`, PluginContributions>;
    protected readonly activationEvents: Set<string>;
    protected readonly onDidChangePluginsEmitter: Emitter<void>;
    readonly onDidChangePlugins: import("@theia/core").Event<void>;
    protected readonly deferredWillStart: Deferred<void>;
    /**
     * Resolves when the initial plugins are loaded and about to be started.
     */
    get willStart(): Promise<void>;
    protected readonly deferredDidStart: Deferred<void>;
    /**
     * Resolves when the initial plugins are started.
     */
    get didStart(): Promise<void>;
    constructor(clientId: string);
    protected init(): void;
    protected abstract createTheiaReadyPromise(): Promise<unknown>;
    get plugins(): PluginMetadata[];
    getPlugin(id: PluginIdentifiers.UnversionedId): DeployedPlugin | undefined;
    /** do not call it, except from the plugin frontend contribution */
    onStart(container: interfaces.Container): void;
    protected afterStart(): void;
    protected loadQueue: Promise<void>;
    load: import("lodash").DebouncedFuncLeading<() => Promise<void>>;
    protected runOperation(operation: () => Promise<void>): Promise<void>;
    protected doLoad(): Promise<void>;
    protected beforeSyncPlugins(toDisconnect: DisposableCollection): Promise<void>;
    protected beforeLoadContributions(toDisconnect: DisposableCollection): Promise<void>;
    protected afterLoadContributions(toDisconnect: DisposableCollection): Promise<void>;
    /**
     * Sync loaded and deployed plugins:
     * - undeployed plugins are unloaded
     * - newly deployed plugins are initialized
     */
    protected syncPlugins(): Promise<void>;
    /**
     * Accept a deployed plugin to load in this host, or reject it, or adapt it for loading.
     * The result may be a boolean to accept (`true`) or reject (`false`) the plugin as is,
     * or else an adaptation of the original `plugin` to load in its stead.
     */
    protected abstract acceptPlugin(plugin: DeployedPlugin): boolean | DeployedPlugin;
    /**
     * Always synchronous in order to simplify handling disconnections.
     * @throws never
     */
    protected loadContributions(toDisconnect: DisposableCollection): Map<PluginHost, PluginContributions[]>;
    protected abstract handleContributions(plugin: DeployedPlugin): Disposable;
    protected startPlugins(contributionsByHost: Map<PluginHost, PluginContributions[]>, toDisconnect: DisposableCollection): Promise<void>;
    protected abstract obtainManager(host: string, hostContributions: PluginContributions[], toDisconnect: DisposableCollection): Promise<PM | undefined>;
    protected abstract getStoragePath(): Promise<string | undefined>;
    protected abstract getHostGlobalStoragePath(): Promise<string>;
    activateByEvent(activationEvent: string): Promise<void>;
    activatePlugin(id: string): Promise<void>;
    protected handlePluginStarted(manager: PM, plugin: DeployedPlugin): void;
    protected measure(name: string): Measurement;
    protected getPluginCount(plugins: number): string;
}
export declare class PluginContributions extends DisposableCollection {
    readonly plugin: DeployedPlugin;
    constructor(plugin: DeployedPlugin);
    state: PluginContributions.State;
}
export declare namespace PluginContributions {
    enum State {
        INITIALIZING = 0,
        LOADING = 1,
        LOADED = 2,
        STARTING = 3,
        STARTED = 4
    }
}
//# sourceMappingURL=hosted-plugin.d.ts.map