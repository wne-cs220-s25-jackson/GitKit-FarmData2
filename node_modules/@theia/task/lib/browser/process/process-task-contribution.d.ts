import { ProcessTaskResolver } from './process-task-resolver';
import { TaskContribution, TaskResolverRegistry } from '../task-contribution';
export declare class ProcessTaskContribution implements TaskContribution {
    protected readonly processTaskResolver: ProcessTaskResolver;
    registerResolvers(resolvers: TaskResolverRegistry): void;
}
//# sourceMappingURL=process-task-contribution.d.ts.map