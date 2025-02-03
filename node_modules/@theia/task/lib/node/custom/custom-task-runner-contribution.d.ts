import { CustomTaskRunner } from './custom-task-runner';
import { TaskRunnerContribution, TaskRunnerRegistry } from '../task-runner';
export declare class CustomTaskRunnerContribution implements TaskRunnerContribution {
    protected readonly customTaskRunner: CustomTaskRunner;
    registerRunner(runners: TaskRunnerRegistry): void;
}
//# sourceMappingURL=custom-task-runner-contribution.d.ts.map