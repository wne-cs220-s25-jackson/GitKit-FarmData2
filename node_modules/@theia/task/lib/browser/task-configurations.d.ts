import { TaskConfiguration, TaskCustomization, TaskConfigurationScope } from '../common';
import { TaskDefinitionRegistry } from './task-definition-registry';
import { ProvidedTaskConfigurations } from './provided-task-configurations';
import { TaskConfigurationManager, TasksChange } from './task-configuration-manager';
import { TaskSchemaUpdater } from './task-schema-updater';
import { TaskSourceResolver } from './task-source-resolver';
import { Disposable, DisposableCollection } from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export interface TaskConfigurationClient {
    /**
     * The task configuration file has changed, so a client might want to refresh its configurations
     * @returns an array of strings, each one being a task label
     */
    taskConfigurationChanged: (event: string[]) => void;
}
/**
 * Watches a tasks.json configuration file and provides a parsed version of the contained task configurations
 */
export declare class TaskConfigurations implements Disposable {
    protected readonly toDispose: DisposableCollection;
    /**
     * Map of source (path of root folder that the task configs come from) and task config map.
     * For the inner map (i.e., task config map), the key is task label and value TaskConfiguration
     */
    protected tasksMap: Map<string, Map<string, TaskConfiguration>>;
    /**
     * Map of source (path of root folder that the task configs come from) and task customizations map.
     */
    protected taskCustomizationMap: Map<string, TaskCustomization[]>;
    protected client: TaskConfigurationClient | undefined;
    /**
     * Map of source (path of root folder that the task configs come from) and raw task configurations / customizations.
     * This map is used to store the data from `tasks.json` files in workspace.
     */
    private rawTaskConfigurations;
    protected readonly workspaceService: WorkspaceService;
    protected readonly taskDefinitionRegistry: TaskDefinitionRegistry;
    protected readonly providedTaskConfigurations: ProvidedTaskConfigurations;
    protected readonly taskConfigurationManager: TaskConfigurationManager;
    protected readonly taskSchemaUpdater: TaskSchemaUpdater;
    protected readonly taskSourceResolver: TaskSourceResolver;
    constructor();
    protected init(): void;
    setClient(client: TaskConfigurationClient): void;
    dispose(): void;
    /** returns the list of known task labels */
    getTaskLabels(): string[];
    /**
     * returns a collection of known tasks, which includes:
     * - all the configured tasks in `tasks.json`, and
     * - the customized detected tasks.
     *
     * The invalid task configs are not returned.
     */
    getTasks(token: number): Promise<TaskConfiguration[]>;
    getRawTaskConfigurations(scope?: TaskConfigurationScope): (TaskCustomization | TaskConfiguration)[];
    /**
     * returns a collection of invalid task configs as per the task schema defined in Theia.
     */
    getInvalidTaskConfigurations(): (TaskCustomization | TaskConfiguration)[];
    /** returns the task configuration for a given label or undefined if none */
    getTask(scope: TaskConfigurationScope, taskLabel: string): TaskConfiguration | undefined;
    /** returns the customized task for a given label or undefined if none */
    getCustomizedTask(token: number, scope: TaskConfigurationScope, taskLabel: string): Promise<TaskConfiguration | undefined>;
    /** removes tasks configured in the given task config file */
    private removeTasks;
    /**
     * Removes task customization objects found in the given task config file from the memory.
     * Please note: this function does not modify the task config file.
     */
    private removeTaskCustomizations;
    /**
     * Returns the task customizations by type from a given root folder in the workspace.
     * @param type the type of task customizations
     * @param rootFolder the root folder to find task customizations from. If `undefined`, this function returns an empty array.
     */
    private getTaskCustomizations;
    /**
     * Returns the customization object in `tasks.json` for the given task. Please note, this function
     * returns `undefined` if the given task is not a detected task, because configured tasks don't need
     * customization objects - users can modify its config directly in `tasks.json`.
     * @param taskConfig The task config, which could either be a configured task or a detected task.
     */
    getCustomizationForTask(taskConfig: TaskConfiguration): TaskCustomization | undefined;
    /**
     * Called when a change, to a config file we watch, is detected.
     */
    protected onDidTaskFileChange(fileChanges: TasksChange[]): Promise<void>;
    /**
     * Read the task configs from the task configuration manager, and updates the list of available tasks.
     */
    protected refreshTasks(scope: TaskConfigurationScope): Promise<void>;
    /** parses a config file and extracts the tasks launch configurations */
    protected readTasks(scope: TaskConfigurationScope): Promise<(TaskCustomization | TaskConfiguration)[] | undefined>;
    openUserTasks(): Promise<void>;
    /** Adds given task to a config file and opens the file to provide ability to edit task configuration. */
    configure(token: number, task: TaskConfiguration): Promise<void>;
    private getTaskCustomizationTemplate;
    /** Writes the task to a config file. Creates a config file if this one does not exist */
    saveTask(scope: TaskConfigurationScope, task: TaskConfiguration): Promise<boolean>;
    /**
     * This function is called after a change in TaskDefinitionRegistry happens.
     * It checks all tasks that have been loaded, and re-organized them in `tasksMap` and `taskCustomizationMap`.
     */
    protected reorganizeTasks(): void;
    private getTransformedRawTask;
    /**
     * Returns `true` if the given task configuration is valid as per the task schema defined in Theia
     * or contributed by Theia extensions and plugins, `false` otherwise.
     */
    private isTaskConfigValid;
    /**
     * Updates the task config in the `tasks.json`.
     * The task config, together with updates, will be written into the `tasks.json` if it is not found in the file.
     *
     * @param task task that the updates will be applied to
     * @param update the updates to be applied
     */
    updateTaskConfig(token: number, task: TaskConfiguration, update: {
        [name: string]: any;
    }): Promise<void>;
    private getKeyFromScope;
    private getScopeFromKey;
    /** checks if the config is a detected / contributed task */
    private isDetectedTask;
    private getTaskDefinition;
}
//# sourceMappingURL=task-configurations.d.ts.map