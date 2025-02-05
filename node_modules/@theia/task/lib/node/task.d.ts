import { ILogger, Disposable, DisposableCollection, Emitter, Event, MaybePromise } from '@theia/core/lib/common/';
import { TaskInfo, TaskExitedEvent, TaskConfiguration, TaskOutputEvent, ManagedTask, ManagedTaskManager } from '../common/task-protocol';
/**
 * Represents the options used for running a task.
 */
export interface TaskOptions {
    /** The task label */
    label: string;
    /** The task configuration which should be executed */
    config: TaskConfiguration;
    /** The optional execution context */
    context?: string;
}
/**
 * A {@link Task} represents the execution state of a `TaskConfiguration`.
 * Implementing classes have to call the {@link Task#fireOutputLine} function
 * whenever a new output occurs during the execution.
 */
export declare abstract class Task implements Disposable, ManagedTask {
    protected readonly taskManager: ManagedTaskManager<Task>;
    protected readonly logger: ILogger;
    protected readonly options: TaskOptions;
    protected taskId: number;
    protected readonly toDispose: DisposableCollection;
    readonly exitEmitter: Emitter<TaskExitedEvent>;
    readonly outputEmitter: Emitter<TaskOutputEvent>;
    constructor(taskManager: ManagedTaskManager<Task>, logger: ILogger, options: TaskOptions);
    /**
     * Terminate this task.
     *
     * @returns a promise that resolves once the task has been properly terminated.
     */
    abstract kill(): Promise<void>;
    get onExit(): Event<TaskExitedEvent>;
    get onOutput(): Event<TaskOutputEvent>;
    /** Has to be called when a task has concluded its execution. */
    protected fireTaskExited(event: TaskExitedEvent): void;
    protected fireOutputLine(event: TaskOutputEvent): void;
    /**
     * Retrieves the runtime information about this task.
     * The runtime information computation may happen asynchronous.
     *
     * @returns (a promise of) the runtime information as `TaskInfo`.
     */
    abstract getRuntimeInfo(): MaybePromise<TaskInfo>;
    get id(): number;
    get context(): string | undefined;
    get label(): string;
    dispose(): void;
}
//# sourceMappingURL=task.d.ts.map