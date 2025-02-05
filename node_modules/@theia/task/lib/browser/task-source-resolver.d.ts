import { TaskConfiguration } from '../common';
import { TaskDefinitionRegistry } from './task-definition-registry';
export declare class TaskSourceResolver {
    protected taskDefinitionRegistry: TaskDefinitionRegistry;
    /**
     * Returns task source to display.
     */
    resolve(task: TaskConfiguration): string;
}
//# sourceMappingURL=task-source-resolver.d.ts.map