import { Emitter, Event, ILogger } from '@theia/core/lib/common';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { Task } from './task';
import { ManagedTaskManager } from '../common';
/**
 * The {@link TaskManager} is the common component responsible for managing running tasks.
 */
export declare class TaskManager implements BackendApplicationContribution, ManagedTaskManager<Task> {
    protected readonly logger: ILogger;
    /** contains all running tasks */
    protected readonly tasks: Map<number, Task>;
    /** contains running tasks per context */
    protected readonly tasksPerCtx: Map<string, Task[]>;
    /** each task has this unique task id, for this back-end */
    protected id: number;
    /**
     * Emit when a registered task is deleted.
     */
    protected readonly deleteEmitter: Emitter<number>;
    constructor(logger: ILogger);
    /**
     * Registers a new task (in the given context if present). Each registered
     * task is considered to be currently running.
     * @param task the new task.
     * @param ctx  the provided context.
     *
     * @returns the registration id for the given task.
     */
    register(task: Task, ctx?: string): number;
    /**
     * Try to retrieve the registered task for the given id.
     * @param id the task registration id.
     *
     * @returns the task or `undefined` if no task was registered for the given id.
     */
    get(id: number): Task | undefined;
    /**
     * Returns all running tasks. If a context is provided, filter-down to
     * only tasks started from that context.
     * @param ctx the task execution context.
     *
     * @returns all running tasks for the given context or `undefined` if no tasks are registered for the given context.
     */
    getTasks(ctx?: string): Task[] | undefined;
    /**
     * Delete the given task from the task manager.
     * @param task the task to delete.
     */
    delete(task: Task): void;
    get onDelete(): Event<number>;
    /**
     * Is triggered on application stop to cleanup all ongoing tasks.
     */
    onStop(): void;
}
//# sourceMappingURL=task-manager.d.ts.map