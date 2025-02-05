import { ContributionProvider } from '@theia/core';
import { BackendApplicationContribution } from '@theia/core/lib/node';
import { TaskRunnerContribution, TaskRunnerRegistry } from './task-runner';
export declare class TaskBackendApplicationContribution implements BackendApplicationContribution {
    protected readonly contributionProvider: ContributionProvider<TaskRunnerContribution>;
    protected readonly taskRunnerRegistry: TaskRunnerRegistry;
    onStart(): void;
}
//# sourceMappingURL=task-backend-application-contribution.d.ts.map