import { Emitter, Event } from '@theia/core/lib/common/event';
import { TaskClient, TaskExitedEvent, TaskInfo, TaskOutputProcessedEvent, BackgroundTaskEndedEvent } from './task-protocol';
export declare class TaskWatcher {
    getTaskClient(): TaskClient;
    protected onTaskCreatedEmitter: Emitter<TaskInfo>;
    protected onTaskExitEmitter: Emitter<TaskExitedEvent>;
    protected onDidStartTaskProcessEmitter: Emitter<TaskInfo>;
    protected onDidEndTaskProcessEmitter: Emitter<TaskExitedEvent>;
    protected onOutputProcessedEmitter: Emitter<TaskOutputProcessedEvent>;
    protected onBackgroundTaskEndedEmitter: Emitter<BackgroundTaskEndedEvent>;
    get onTaskCreated(): Event<TaskInfo>;
    get onTaskExit(): Event<TaskExitedEvent>;
    get onDidStartTaskProcess(): Event<TaskInfo>;
    get onDidEndTaskProcess(): Event<TaskExitedEvent>;
    get onOutputProcessed(): Event<TaskOutputProcessedEvent>;
    get onBackgroundTaskEnded(): Event<BackgroundTaskEndedEvent>;
}
//# sourceMappingURL=task-watcher.d.ts.map