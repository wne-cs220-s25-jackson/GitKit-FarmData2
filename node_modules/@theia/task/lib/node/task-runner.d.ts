import { Disposable } from '@theia/core/lib/common/disposable';
import { ProcessTaskRunner } from './process/process-task-runner';
import { TaskRunner } from './task-runner-protocol';
export { TaskRunner };
export declare const TaskRunnerContribution: unique symbol;
/** The {@link TaskRunnerContribution} can be used to contribute custom {@link TaskRunner}s. */
export interface TaskRunnerContribution {
    /**
     * Register custom runners using the given {@link TaskRunnerRegistry}.
     * @param runners the common task runner registry.
     */
    registerRunner(runners: TaskRunnerRegistry): void;
}
/**
 * The {@link TaskRunnerRegistry} is the common component for the registration and provisioning of
 * {@link TaskRunner}s. Theia will collect all {@link TaskRunner}s and invoke {@link TaskRunnerContribution#registerRunner}
 * for each contribution. The `TaskServer` will use the runners provided by this registry to execute `TaskConfiguration`s that
 * have been triggered by the user.
 */
export declare class TaskRunnerRegistry {
    protected runners: Map<string, TaskRunner>;
    /** A Task Runner that will be used for executing a Task without an associated Runner. */
    protected defaultRunner: TaskRunner;
    protected readonly processTaskRunner: ProcessTaskRunner;
    protected init(): void;
    /**
     * Registers the given {@link TaskRunner} to execute Tasks of the specified type.
     * If there is already a {@link TaskRunner} registered for the specified type the registration will
     * be overwritten with the new value.
     * @param type the task type for which the given runner should be registered.
     * @param runner the task runner that should be registered.
     *
     * @returns a `Disposable` that can be invoked to unregister the given runner.
     */
    registerRunner(type: string, runner: TaskRunner): Disposable;
    /**
     * Looks for a registered {@link TaskRunner} for each of the task types in sequence and returns the first that is found
     * If no task runner is registered for any of the types, the default runner is returned.
     * @param types the task types.
     *
     * @returns the registered {@link TaskRunner} or a default runner if none is registered for the specified types.
     */
    getRunner(...types: string[]): TaskRunner;
    /**
     * Derives all task types for which a {@link TaskRunner} is registered.
     *
     * @returns all derived task types.
     */
    getRunnerTypes(): string[];
}
//# sourceMappingURL=task-runner.d.ts.map