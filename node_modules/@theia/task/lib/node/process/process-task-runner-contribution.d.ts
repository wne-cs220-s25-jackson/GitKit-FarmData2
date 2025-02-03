import { ProcessTaskRunner } from './process-task-runner';
import { TaskRunnerContribution, TaskRunnerRegistry } from '../task-runner';
export declare class ProcessTaskRunnerContribution implements TaskRunnerContribution {
    protected readonly processTaskRunner: ProcessTaskRunner;
    registerRunner(runners: TaskRunnerRegistry): void;
}
//# sourceMappingURL=process-task-runner-contribution.d.ts.map