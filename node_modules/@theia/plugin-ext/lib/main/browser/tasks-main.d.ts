import { TasksMain, TaskExecutionDto, TaskDto } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { Disposable } from '@theia/core/lib/common';
import { TaskProvider, TaskResolver } from '@theia/task/lib/browser/task-contribution';
import { interfaces } from '@theia/core/shared/inversify';
import { TaskConfiguration } from '@theia/task/lib/common/task-protocol';
export declare class TasksMainImpl implements TasksMain, Disposable {
    private readonly proxy;
    private readonly taskProviderRegistry;
    private readonly taskResolverRegistry;
    private readonly taskWatcher;
    private readonly taskService;
    private readonly taskDefinitionRegistry;
    private readonly taskProviders;
    private readonly toDispose;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $registerTaskProvider(handle: number, type: string): void;
    $unregister(handle: number): void;
    $fetchTasks(taskVersion: string | undefined, taskType: string | undefined): Promise<TaskDto[]>;
    $executeTask(taskDto: TaskDto): Promise<TaskExecutionDto | undefined>;
    $taskExecutions(): Promise<{
        id: number;
        task: TaskDto;
    }[]>;
    $terminateTask(id: number): void;
    $customExecutionComplete(id: number, exitCode: number | undefined): Promise<void>;
    protected createTaskProvider(handle: number): TaskProvider;
    protected createTaskResolver(handle: number): TaskResolver;
    protected toTaskConfiguration(taskDto: TaskDto): TaskConfiguration;
    protected fromTaskConfiguration(task: TaskConfiguration): TaskDto;
    private convertTaskPresentation;
}
//# sourceMappingURL=tasks-main.d.ts.map