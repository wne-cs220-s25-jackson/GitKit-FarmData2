import { Disposable, DisposableCollection, ILogger } from '@theia/core/lib/common/';
import { TaskClient, TaskExitedEvent, TaskInfo, TaskServer, TaskConfiguration, TaskOutputProcessedEvent, RunTaskOption, BackgroundTaskEndedEvent } from '../common';
import { TaskManager } from './task-manager';
import { TaskRunnerRegistry } from './task-runner';
import { Task } from './task';
export declare class TaskServerImpl implements TaskServer, Disposable {
    /** Task clients, to send notifications-to. */
    protected clients: TaskClient[];
    /** Map of task id and task disposable */
    protected readonly toDispose: Map<number, DisposableCollection>;
    /** Map of task id and task background status. */
    protected readonly backgroundTaskStatusMap: Map<number, {
        isActive: boolean;
    }>;
    protected readonly logger: ILogger;
    protected readonly taskManager: TaskManager;
    protected readonly runnerRegistry: TaskRunnerRegistry;
    /** task context - {task id - problem collector} */
    private problemCollectors;
    dispose(): void;
    protected disposeByTaskId(taskId: number): void;
    getTasks(context?: string): Promise<TaskInfo[]>;
    run(taskConfiguration: TaskConfiguration, ctx?: string, option?: RunTaskOption): Promise<TaskInfo>;
    getRegisteredTaskTypes(): Promise<string[]>;
    customExecutionComplete(id: number, exitCode: number | undefined): Promise<void>;
    protected fireTaskExitedEvent(event: TaskExitedEvent, task?: Task): void;
    protected fireTaskCreatedEvent(event: TaskInfo, task?: Task): void;
    protected fireTaskOutputProcessedEvent(event: TaskOutputProcessedEvent): void;
    protected fireBackgroundTaskEndedEvent(event: BackgroundTaskEndedEvent): void;
    /** Kill task for a given id. Rejects if task is not found */
    kill(id: number): Promise<void>;
    /** Adds a client to this server */
    setClient(client: TaskClient): void;
    /** Removes a client, from this server */
    disconnectClient(client: TaskClient): void;
    private getCachedProblemCollector;
    private cacheProblemCollector;
    private removedCachedProblemCollector;
}
//# sourceMappingURL=task-server.d.ts.map