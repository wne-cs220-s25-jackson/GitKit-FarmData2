import { ILogger } from '@theia/core/lib/common/';
import { Process, IProcessExitEvent } from '@theia/process/lib/node';
import { Task, TaskOptions } from '../task';
import { TaskManager } from '../task-manager';
import { ProcessType, ProcessTaskInfo } from '../../common/process/task-protocol';
import { TaskExitedEvent } from '../../common/task-protocol';
export declare function removeAnsiEscapeCodes(str: string): string;
export declare const TaskProcessOptions: unique symbol;
export interface TaskProcessOptions extends TaskOptions {
    process: Process;
    processType: ProcessType;
    command?: string;
}
export declare const TaskFactory: unique symbol;
export type TaskFactory = (options: TaskProcessOptions) => ProcessTask;
/** Represents a Task launched as a process by `ProcessTaskRunner`. */
export declare class ProcessTask extends Task {
    protected readonly options: TaskProcessOptions;
    protected command: string | undefined;
    constructor(taskManager: TaskManager, logger: ILogger, options: TaskProcessOptions);
    kill(): Promise<void>;
    protected getTaskExitedEvent(evt: IProcessExitEvent): Promise<TaskExitedEvent>;
    getRuntimeInfo(): ProcessTaskInfo;
    get process(): Process;
    get processType(): ProcessType;
}
//# sourceMappingURL=process-task.d.ts.map