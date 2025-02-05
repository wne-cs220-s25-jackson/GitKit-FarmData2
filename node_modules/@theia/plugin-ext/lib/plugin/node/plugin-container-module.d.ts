import { interfaces, ContainerModule } from '@theia/core/shared/inversify';
import { Plugin } from '../../common';
export type ApiFactory<T extends object> = (plugin: Plugin) => T;
/**
 * Bind a service identifier for the factory function creating API objects of
 * type `T` for a client plugin to a class providing a `call()` method that
 * implements that factory function.
 *
 * @template T the API object type that the factory creates
 * @param serviceIdentifier the injection key identifying the API factory function
 * @param factoryClass the class implementing the API factory function via its `call()` method
 */
export type BindApiFactory = <T extends object>(apiModuleName: string, serviceIdentifier: interfaces.ServiceIdentifier<ApiFactory<T>>, factoryClass: new () => {
    createApi: ApiFactory<T>;
}) => void;
/**
 * An analogue of the callback function in the constructor of the Inversify
 * `ContainerModule` providing a registry that, in addition to the standard
 * binding-related functions, includes a custom function for binding an
 * API factory.
 */
export type PluginContainerModuleCallBack = (registry: {
    bind: interfaces.Bind;
    unbind: interfaces.Unbind;
    isBound: interfaces.IsBound;
    rebind: interfaces.Rebind;
    bindApiFactory: BindApiFactory;
}) => void;
/**
 * Factory for an Inversify `ContainerModule` that supports registration of the plugin's
 * API factory. Use the `PluginContainerModule`'s `create()` method to create the container
 * module; its `callback` function provides a `registry` of Inversify binding functions that
 * includes a `bindApiFactory` function for binding the API factory.
 */
export declare const PluginContainerModule: symbol & {
    create(callback: PluginContainerModuleCallBack): ContainerModule;
};
/**
 * Definition of additional API provided by the `ContainerModule` created by the
 * {@link PluginContainerModule} factory function that is for internal use by Theia.
 */
export type InternalPluginContainerModule = ContainerModule & {
    /** Use my API factory binding to initialize the plugin API in some `container`. */
    initializeApi?: (container: interfaces.Container) => PluginApiCache<object>;
};
/**
 * An object that creates and caches the instance of the plugin API created by the
 * factory binding in a {@link PluginContainerModule} in some plugin host.
 *
 * @template T the custom API object's type
 */
export declare class PluginApiCache<T extends object> {
    private readonly apiModuleName;
    private readonly serviceIdentifier;
    private apiFactory;
    private pluginManager;
    private defaultApi;
    private pluginsApiImpl;
    private hookedModuleLoader;
    /**
     * Initializes me with the module name by which plugins import the API
     * and the service identifier to look up in the Inversify `Container` to
     * obtain the {@link ApiFactory} that will instantiate it.
     */
    constructor(apiModuleName: string, serviceIdentifier: interfaces.ServiceIdentifier<ApiFactory<T>>);
    initializeApi(container: interfaces.Container): void;
    /**
     * Hook into the override chain of JavaScript's `module` loading function
     * to implement ourselves, using the API provider's registered factory,
     * the construction of its default exports object.
     */
    private overrideInternalLoad;
    protected findPlugin(filePath: string): Plugin | undefined;
}
//# sourceMappingURL=plugin-container-module.d.ts.map