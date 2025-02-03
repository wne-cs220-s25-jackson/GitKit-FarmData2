import { TaskProviderRegistry, TaskProvider } from './task-contribution';
import { TaskDefinitionRegistry } from './task-definition-registry';
import { TaskConfiguration, TaskCustomization, TaskConfigurationScope } from '../common';
export declare const ALL_TASK_TYPES: string;
export declare class ProvidedTaskConfigurations {
    /**
     * Map of source (name of extension, or path of root folder that the task config comes from) and `task config map`.
     * For the second level of inner map, the key is task label.
     * For the third level of inner map, the key is the task scope and value TaskConfiguration.
     */
    protected tasksMap: Map<string, Map<string, Map<string | undefined, TaskConfiguration>>>;
    protected readonly taskProviderRegistry: TaskProviderRegistry;
    protected readonly taskDefinitionRegistry: TaskDefinitionRegistry;
    private currentToken;
    private activatedProvidersTypes;
    private nextToken;
    startUserAction(): number;
    protected updateUserAction(token: number): void;
    protected pushActivatedProvidersType(taskType: string): void;
    protected isTaskProviderActivationNeeded(taskType?: string): boolean;
    /**
     * Activate providers for the given taskType
     * @param taskType A specific task type or '*' to indicate all task providers
     */
    protected activateProviders(taskType?: string): Promise<void>;
    /** returns a list of provided tasks matching an optional given type, or all if '*' is used */
    getTasks(token: number, type?: string): Promise<TaskConfiguration[]>;
    protected refreshTasks(token: number, taskType?: string): Promise<void>;
    protected resolveTaskConfigurations(taskProvider: TaskProvider): Promise<TaskConfiguration[]>;
    /** returns the task configuration for a given source and label or undefined if none */
    getTask(token: number, source: string, taskLabel: string, scope: TaskConfigurationScope): Promise<TaskConfiguration | undefined>;
    /**
     * Finds the detected task for the given task customization.
     * The detected task is considered as a "match" to the task customization if it has all the `required` properties.
     * In case that more than one customization is found, return the one that has the biggest number of matched properties.
     *
     * @param customization the task customization
     * @return the detected task for the given task customization. If the task customization is not found, `undefined` is returned.
     */
    getTaskToCustomize(token: number, customization: TaskCustomization, scope: TaskConfigurationScope): Promise<TaskConfiguration | undefined>;
    protected getCachedTask(source: string, taskLabel: string, scope?: TaskConfigurationScope): TaskConfiguration | undefined;
    protected cacheTasks(tasks: TaskConfiguration[]): void;
}
//# sourceMappingURL=provided-task-configurations.d.ts.map