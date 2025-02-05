import { TaskConfiguration } from '../common';
import { TaskDefinitionRegistry } from './task-definition-registry';
import { TaskConfigurations } from './task-configurations';
export declare class TaskNameResolver {
    protected taskDefinitionRegistry: TaskDefinitionRegistry;
    protected readonly taskConfigurations: TaskConfigurations;
    /**
     * Returns task name to display.
     * It is aligned with VS Code.
     */
    resolve(task: TaskConfiguration): string;
    private isDetectedTask;
}
//# sourceMappingURL=task-name-resolver.d.ts.map