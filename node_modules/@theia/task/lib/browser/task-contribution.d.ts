import { Disposable } from '@theia/core/lib/common/disposable';
import { TaskConfiguration } from '../common/task-protocol';
import { WaitUntilEvent, Emitter } from '@theia/core/lib/common/event';
export declare const TaskContribution: unique symbol;
/**
 * A {@link TaskContribution} allows to contribute custom {@link TaskResolver}s and/or {@link TaskProvider}s.
 *
 *  ### Example usage
 * ```typescript
 * @injectable()
 * export class ProcessTaskContribution implements TaskContribution {
 *
 *     @inject(ProcessTaskResolver)
 *     protected readonly processTaskResolver: ProcessTaskResolver;
 *
 *     registerResolvers(resolvers: TaskResolverRegistry): void {
 *         resolvers.register('process', this.processTaskResolver);
 *         resolvers.register('shell', this.processTaskResolver);
 *     }
 * }
 * ```
 */
export interface TaskContribution {
    /**
     * Register task resolvers using the given `TaskResolverRegistry`.
     * @param resolvers the task resolver registry.
     */
    registerResolvers?(resolvers: TaskResolverRegistry): void;
    /**
     * Register task providers using the given `TaskProviderRegistry`.
     * @param resolvers the task provider registry.
     */
    registerProviders?(providers: TaskProviderRegistry): void;
}
/**
 * A {@link TaskResolver} is used to preprocess/resolve a task before sending
 * it to the Task Server. For instance, the resolver can be used to add missing information to the configuration
 * (e.g default values for optional parameters).
 */
export interface TaskResolver {
    /**
     * Resolves a `TaskConfiguration` before sending it for execution to the `TaskServer` (Backend).
     * @param taskConfig the configuration that should be resolved.
     *
     * @returns a promise of the resolved `TaskConfiguration`.
     */
    resolveTask(taskConfig: TaskConfiguration): Promise<TaskConfiguration>;
}
/**
 * A {@link TaskProvider} can be used to define the set of tasks that should
 * be provided to the system. i.e. that are available for the user to run.
 */
export interface TaskProvider {
    /**
     * Retrieves the task configurations which are provided programmatically to the system.
     *
     * @returns a promise of the provided tasks configurations.
     */
    provideTasks(): Promise<TaskConfiguration[]>;
}
export interface WillResolveTaskProvider extends WaitUntilEvent {
    taskType?: string;
}
/**
 * The {@link TaskResolverRegistry} is the common component for registration and provision of
 * {@link TaskResolver}s. Theia will collect all {@link TaskContribution}s and invoke {@link TaskContribution#registerResolvers}
 * for each contribution.
 */
export declare class TaskResolverRegistry {
    protected readonly onWillProvideTaskResolverEmitter: Emitter<WillResolveTaskProvider>;
    /**
     * Emit when the registry provides a registered resolver. i.e. when the {@link TaskResolverRegistry#getResolver}
     * function is called.
     */
    readonly onWillProvideTaskResolver: import("@theia/core/lib/common/event").Event<WillResolveTaskProvider>;
    protected taskResolvers: Map<string, TaskResolver>;
    protected executionResolvers: Map<string, TaskResolver>;
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` of the specified type.
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     *
     * @deprecated since 1.12.0 use `registerTaskResolver` instead.
     *
     * @param type the task configuration type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    register(type: string, resolver: TaskResolver): Disposable;
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` of the specified type.
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     *
     * @param type the task configuration type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    registerTaskResolver(type: string, resolver: TaskResolver): Disposable;
    /**
     * Retrieves the {@link TaskResolver} registered for the given type task configuration type.
     *
     * @deprecated since 1.12.0 use `getTaskResolver()` instead.
     *
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    getResolver(type: string): Promise<TaskResolver | undefined>;
    /**
     * Retrieves the {@link TaskResolver} registered for the given type task configuration type.
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    getTaskResolver(type: string): Promise<TaskResolver | undefined>;
    /**
     * Registers the given {@link TaskResolver} to resolve the `TaskConfiguration` for the
     * specified type of execution ('shell', 'process' or 'customExecution').
     * If there is already a `TaskResolver` registered for the specified type the registration will
     * be overwritten with the new value.
     *
     * @param type the task execution type for which the given resolver should be registered.
     * @param resolver the task resolver that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver
     */
    registerExecutionResolver(type: string, resolver: TaskResolver): Disposable;
    /**
     * Retrieves the {@link TaskResolver} registered for the given type of execution ('shell', 'process' or 'customExecution')..
     * @param type the task configuration type
     *
     * @returns a promise of the registered `TaskResolver` or `undefined` if no resolver is registered for the given type.
     */
    getExecutionResolver(executionType: string): TaskResolver | undefined;
}
/**
 * The {@link TaskProviderRegistry} is the common component for registration and provision of
 * {@link TaskProvider}s. Theia will collect all {@link TaskContribution}s and invoke {@link TaskContribution#registerProviders}
 * for each contribution.
 */
export declare class TaskProviderRegistry {
    protected readonly onWillProvideTaskProviderEmitter: Emitter<WillResolveTaskProvider>;
    /**
     * Emit when the registry provides a registered task provider. i.e. when the {@link TaskProviderRegistry#getProvider}
     * function is called.
     */
    readonly onWillProvideTaskProvider: import("@theia/core/lib/common/event").Event<WillResolveTaskProvider>;
    protected providers: Map<string, TaskProvider>;
    protected init(): void;
    /**
     * Registers the given {@link TaskProvider} for task configurations of the specified type
     * @param type the task configuration type for which the given provider should be registered.
     * @param provider the `TaskProvider` that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given resolver.
     */
    register(type: string, provider: TaskProvider, handle?: number): Disposable;
    /**
     * Initiates activation of a TaskProvider with the given type
     * @param type the task configuration type, '*' indicates, all providers.
     */
    activateProvider(type: string): Promise<void>;
    /**
     * Retrieves the {@link TaskProvider} registered for the given type task configuration type.
     * If there is already a `TaskProvider` registered for the specified type the registration will
     * be overwritten with the new value.
     * @param type the task configuration type.
     *
     * @returns a promise of the registered `TaskProvider`` or `undefined` if no provider is registered for the given type.
     */
    getProvider(type: string): Promise<TaskProvider | undefined>;
    /**
     * Retrieve all registered {@link TaskProvider}s.
     *
     * Use {@link activateProvider} to control registration of providers as needed.
     * @returns a promise of all registered {@link TaskProvider}s.
     */
    getProviders(): Promise<TaskProvider[]>;
}
//# sourceMappingURL=task-contribution.d.ts.map