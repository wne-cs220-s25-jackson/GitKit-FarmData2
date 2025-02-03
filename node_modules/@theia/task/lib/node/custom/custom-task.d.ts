import { ILogger, MaybePromise } from '@theia/core/lib/common/';
import { Task, TaskOptions } from '../task';
import { TaskManager } from '../task-manager';
import { TaskInfo } from '../../common/task-protocol';
import { Process } from '@theia/process/lib/node';
export declare const TaskCustomOptions: unique symbol;
export interface TaskCustomOptions extends TaskOptions {
    process: Process;
}
export declare const TaskFactory: unique symbol;
export type TaskFactory = (options: TaskCustomOptions) => CustomTask;
/** Represents a Task launched as a fake process by `CustomTaskRunner`. */
export declare class CustomTask extends Task {
    protected readonly options: TaskCustomOptions;
    constructor(taskManager: TaskManager, logger: ILogger, options: TaskCustomOptions);
    kill(): Promise<void>;
    getRuntimeInfo(): MaybePromise<TaskInfo>;
    callbackTaskComplete(exitCode: number | undefined): MaybePromise<void>;
    get process(): Process;
}
//# sourceMappingURL=custom-task.d.ts.map