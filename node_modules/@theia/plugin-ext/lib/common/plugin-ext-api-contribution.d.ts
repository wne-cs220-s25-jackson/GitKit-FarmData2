import { RPCProtocol } from './rpc-protocol';
import { PluginManager, Plugin } from './plugin-api-rpc';
import { interfaces } from '@theia/core/shared/inversify';
export declare const ExtPluginApiProvider = "extPluginApi";
/**
 * Provider for extension API description.
 */
export interface ExtPluginApiProvider {
    /**
     * Provide API description.
     */
    provideApi(): ExtPluginApi;
}
/**
 * Provider for backend extension API description.
 */
export interface ExtPluginBackendApiProvider {
    /**
     * Provide API description.
     */
    provideApi(): ExtPluginBackendApi;
}
/**
 * Provider for frontend extension API description.
 */
export interface ExtPluginFrontendApiProvider {
    /**
     * Provide API description.
     */
    provideApi(): ExtPluginFrontendApi;
}
/**
 * Backend Plugin API extension description.
 * This interface describes a script for the backend(NodeJs) runtime.
 */
export interface ExtPluginBackendApi {
    /**
     * Path to the script which should be loaded to provide api, module should export `provideApi` function with
     * [ExtPluginApiBackendInitializationFn](#ExtPluginApiBackendInitializationFn) signature
     */
    backendInitPath?: string;
}
/**
 * Frontend Plugin API extension description.
 * This interface describes a script for the frontend(WebWorker) runtime.
 */
export interface ExtPluginFrontendApi {
    /**
     * Initialization information for frontend part of Plugin API
     */
    frontendExtApi?: FrontendExtPluginApi;
}
/**
 * Plugin API extension description.
 * This interface describes scripts for both plugin runtimes: frontend(WebWorker) and backend(NodeJs)
 */
export interface ExtPluginApi extends ExtPluginBackendApi, ExtPluginFrontendApi {
}
export interface ExtPluginApiFrontendInitializationFn {
    (rpc: RPCProtocol, plugins: Map<string, Plugin>): void;
}
export interface ExtPluginApiBackendInitializationFn {
    (rpc: RPCProtocol, pluginManager: PluginManager): void;
}
/**
 * Interface contains information for frontend(WebWorker) Plugin API extension initialization
 */
export interface FrontendExtPluginApi {
    /**
     * path to js file
     */
    initPath: string;
    /** global variable name */
    initVariable: string;
    /**
     * init function name,
     * function should have  [ExtPluginApiFrontendInitializationFn](#ExtPluginApiFrontendInitializationFn)
     */
    initFunction: string;
}
export declare const MainPluginApiProvider: unique symbol;
/**
 * Implementation should contains main(Theia) part of new namespace in Plugin API.
 * [initialize](#initialize) will be called once per plugin runtime
 */
export interface MainPluginApiProvider {
    initialize(rpc: RPCProtocol, container: interfaces.Container): void;
}
//# sourceMappingURL=plugin-ext-api-contribution.d.ts.map