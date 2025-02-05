import { ApplicationShell, FrontendApplication, QuickPickValue, WidgetManager } from '@theia/core/lib/browser';
import { OpenerService } from '@theia/core/lib/browser/opener-service';
import { CommandService, ILogger } from '@theia/core/lib/common';
import { MessageService } from '@theia/core/lib/common/message-service';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { QuickPickItemOrSeparator, QuickPickService } from '@theia/core/lib/common/quick-pick-service';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { EditorManager } from '@theia/editor/lib/browser';
import { ProblemManager } from '@theia/markers/lib/browser/problem/problem-manager';
import { TerminalService } from '@theia/terminal/lib/browser/base/terminal-service';
import { VariableResolverService } from '@theia/variable-resolver/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { NamedProblemMatcher, ProblemMatcher, RunTaskOption, TaskConfiguration, TaskConfigurationScope, TaskCustomization, TaskIdentifier, TaskInfo, TaskServer } from '../common';
import { TaskWatcher } from '../common/task-watcher';
import { ProvidedTaskConfigurations } from './provided-task-configurations';
import { TaskConfigurationClient, TaskConfigurations } from './task-configurations';
import { TaskResolverRegistry } from './task-contribution';
import { TaskDefinitionRegistry } from './task-definition-registry';
import { TaskNameResolver } from './task-name-resolver';
import { TaskSourceResolver } from './task-source-resolver';
import { ProblemMatcherRegistry } from './task-problem-matcher-registry';
import { TaskSchemaUpdater } from './task-schema-updater';
import { TaskConfigurationManager } from './task-configuration-manager';
import { TaskNode } from './task-node';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { TaskTerminalWidgetManager } from './task-terminal-widget-manager';
import { ShellTerminalServerProxy } from '@theia/terminal/lib/common/shell-terminal-protocol';
import { Mutex } from 'async-mutex';
import { TaskContextKeyService } from './task-context-key-service';
export interface QuickPickProblemMatcherItem {
    problemMatchers: NamedProblemMatcher[] | undefined;
    learnMore?: boolean;
}
interface TaskGraphNode {
    taskConfiguration: TaskConfiguration;
    node: TaskNode;
}
export declare enum TaskEndedTypes {
    TaskExited = 0,
    BackgroundTaskEnded = 1
}
export interface TaskEndedInfo {
    taskEndedType: TaskEndedTypes;
    value: number | boolean | undefined;
}
export interface LastRunTaskInfo {
    resolvedTask?: TaskConfiguration;
    option?: RunTaskOption;
}
export declare class TaskService implements TaskConfigurationClient {
    /**
     * The last executed task.
     */
    protected lastTask: LastRunTaskInfo;
    protected cachedRecentTasks: TaskConfiguration[];
    protected runningTasks: Map<number, {
        exitCode: Deferred<number | undefined>;
        terminateSignal: Deferred<string | undefined>;
        isBackgroundTaskEnded: Deferred<boolean | undefined>;
    }>;
    protected taskStartingLock: Mutex;
    protected readonly app: FrontendApplication;
    protected readonly shell: ApplicationShell;
    protected readonly taskServer: TaskServer;
    protected readonly logger: ILogger;
    protected readonly widgetManager: WidgetManager;
    protected readonly taskWatcher: TaskWatcher;
    protected readonly messageService: MessageService;
    protected readonly workspaceService: WorkspaceService;
    protected readonly taskConfigurations: TaskConfigurations;
    protected readonly providedTaskConfigurations: ProvidedTaskConfigurations;
    protected readonly variableResolverService: VariableResolverService;
    protected readonly taskResolverRegistry: TaskResolverRegistry;
    protected readonly terminalService: TerminalService;
    protected readonly editorManager: EditorManager;
    protected readonly problemManager: ProblemManager;
    protected readonly taskDefinitionRegistry: TaskDefinitionRegistry;
    protected readonly problemMatcherRegistry: ProblemMatcherRegistry;
    protected readonly quickPickService: QuickPickService;
    protected readonly openerService: OpenerService;
    protected readonly shellTerminalServer: ShellTerminalServerProxy;
    protected readonly taskNameResolver: TaskNameResolver;
    protected readonly taskSourceResolver: TaskSourceResolver;
    protected readonly taskSchemaUpdater: TaskSchemaUpdater;
    protected readonly taskConfigurationManager: TaskConfigurationManager;
    protected readonly commands: CommandService;
    protected readonly labelProvider: LabelProvider;
    protected monacoWorkspace: MonacoWorkspace;
    protected readonly taskTerminalWidgetManager: TaskTerminalWidgetManager;
    protected readonly taskContextKeyService: TaskContextKeyService;
    protected init(): void;
    protected getTaskIdentifier(taskConfig: TaskConfiguration): string;
    /**
     * Client should call this method to indicate that a new user-level action related to tasks has been started,
     * like invoking "Run Task..."
     * This method returns a token that can be used with various methods in this service.
     * As long as a client uses the same token, task providers will only asked once to contribute
     * tasks and the set of tasks will be cached. Each time the a new token is used, the cache of
     * contributed tasks is cleared.
     * @returns a token to be used for task-related actions
     */
    startUserAction(): number;
    /**
     * Returns an array of the task configurations configured in tasks.json and provided by the extensions.
     * @param token  The cache token for the user interaction in progress
     */
    getTasks(token: number): Promise<TaskConfiguration[]>;
    /**
     * Returns an array of the valid task configurations which are configured in tasks.json files
     * @param token  The cache token for the user interaction in progress
     *
     */
    getConfiguredTasks(token: number): Promise<TaskConfiguration[]>;
    /**
     * Returns an array that contains the task configurations provided by the task providers for the specified task type.
     * @param token  The cache token for the user interaction in progress
     * @param type The task type (filter) associated to the returning TaskConfigurations
     *
     * '*' indicates all tasks regardless of the type
     */
    getProvidedTasks(token: number, type?: string): Promise<TaskConfiguration[]>;
    addRecentTasks(tasks: TaskConfiguration | TaskConfiguration[]): void;
    get recentTasks(): TaskConfiguration[];
    set recentTasks(recent: TaskConfiguration[]);
    /**
     * Clears the list of recently used tasks.
     */
    clearRecentTasks(): void;
    /**
     * Open user ser
     */
    openUserTasks(): Promise<void>;
    /**
     * Returns a task configuration provided by an extension by task source, scope and label.
     * If there are no task configuration, returns undefined.
     * @param token  The cache token for the user interaction in progress
     * @param source The source for configured tasks
     * @param label  The label of the task to find
     * @param scope  The task scope to look in
     */
    getProvidedTask(token: number, source: string, label: string, scope: TaskConfigurationScope): Promise<TaskConfiguration | undefined>;
    /** Returns an array of running tasks 'TaskInfo' objects */
    getRunningTasks(): Promise<TaskInfo[]>;
    customExecutionComplete(id: number, exitCode: number | undefined): Promise<void>;
    /** Returns an array of task types that are registered, including the default types */
    getRegisteredTaskTypes(): Promise<string[]>;
    /**
     * Get the last executed task.
     *
     * @returns the last executed task or `undefined`.
     */
    getLastTask(): LastRunTaskInfo;
    /**
     * Runs a task, by task configuration label.
     * Note, it looks for a task configured in tasks.json only.
     * @param token  The cache token for the user interaction in progress
     * @param scope The scope where to look for tasks
     * @param taskLabel the label to look for
     */
    runConfiguredTask(token: number, scope: TaskConfigurationScope, taskLabel: string): Promise<void>;
    /**
     * Run the last executed task.
     * @param token  The cache token for the user interaction in progress
     */
    runLastTask(token: number): Promise<TaskInfo | undefined>;
    /**
     * Runs a task, by the source and label of the task configuration.
     * It looks for configured and detected tasks.
     * @param token  The cache token for the user interaction in progress
     * @param source The source for configured tasks
     * @param taskLabel The label to look for
     * @param scope  The scope where to look for tasks
     */
    run(token: number, source: string, taskLabel: string, scope: TaskConfigurationScope): Promise<TaskInfo | undefined>;
    /**
     * Runs a compound task
     * @param token  The cache token for the user interaction in progress
     * @param task The task to be executed
     * @param option options for executing the task
     */
    runCompoundTask(token: number, task: TaskConfiguration, option?: RunTaskOption): Promise<TaskInfo | undefined>;
    /**
     * A recursive function that runs a task and all its sub tasks that it depends on.
     * A task can be executed only when all of its dependencies have been executed, or when it doesn’t have any dependencies at all.
     */
    runTasksGraph(task: TaskConfiguration, tasks: TaskConfiguration[], option?: RunTaskOption): Promise<TaskInfo | undefined>;
    /**
     * Creates a graph of dependencies tasks from the root task and verify there is no DAG (Directed Acyclic Graph).
     * In case of detection of a circular dependency, an error is thrown with a message which describes the detected circular reference.
     */
    detectDirectedAcyclicGraph(task: TaskConfiguration, taskNode: TaskNode, tasks: TaskConfiguration[]): void;
    createChildTaskNode(task: TaskConfiguration, taskNode: TaskNode, childTaskIdentifier: string | TaskIdentifier, tasks: TaskConfiguration[]): TaskGraphNode;
    /**
     * Gets task configuration by task label or by a JSON object which represents a task identifier
     *
     * @param taskIdentifier The task label (string) or a JSON object which represents a TaskIdentifier (e.g. {"type":"npm", "script":"script1"})
     * @param tasks an array of the task configurations
     * @returns the correct TaskConfiguration object which matches the taskIdentifier
     */
    getDependentTask(taskIdentifier: string | TaskIdentifier, tasks: TaskConfiguration[]): TaskConfiguration;
    /**
     * Gets the matched task from an array of task configurations by TaskIdentifier.
     * In case that more than one task configuration matches, we returns the first one.
     *
     * @param taskIdentifier The task label (string) or a JSON object which represents a TaskIdentifier (e.g. {"type":"npm", "script":"script1"})
     * @param tasks An array of task configurations.
     * @returns The correct TaskConfiguration object which matches the taskIdentifier.
     */
    getTaskByTaskIdentifier(taskIdentifier: TaskIdentifier, tasks: TaskConfiguration[]): TaskConfiguration;
    runTask(task: TaskConfiguration, option?: RunTaskOption): Promise<TaskInfo | undefined>;
    /**
     * Terminates a task that is actively running.
     * @param activeTaskInfo the TaskInfo of the task that is actively running
     */
    terminateTask(activeTaskInfo: TaskInfo): Promise<void>;
    /**
     * Terminates a task that is actively running, and restarts it.
     * @param activeTaskInfo the TaskInfo of the task that is actively running
     */
    restartTask(activeTaskInfo: TaskInfo, option?: RunTaskOption): Promise<TaskInfo | undefined>;
    protected doRunTask(task: TaskConfiguration, option?: RunTaskOption): Promise<TaskInfo | undefined>;
    /**
     * Runs the first task with the given label.
     *
     * @param token  The cache token for the user interaction in progress
     * @param taskLabel The label of the task to be executed
     */
    runTaskByLabel(token: number, taskLabel: string): Promise<TaskInfo | undefined>;
    /**
     * Runs a task identified by the given identifier, but only if found in the given workspace folder
     *
     * @param token  The cache token for the user interaction in progress
     * @param workspaceFolderUri  The folder to restrict the search to
     * @param taskIdentifier The identifier to look for
     */
    runWorkspaceTask(token: number, workspaceFolderUri: string | undefined, taskIdentifier: string | TaskIdentifier): Promise<TaskInfo | undefined>;
    /**
     * Updates the task configuration in the `tasks.json`.
     * The task config, together with updates, will be written into the `tasks.json` if it is not found in the file.
     *
     * @param token  The cache token for the user interaction in progress
     * @param task task that the updates will be applied to
     * @param update the updates to be applied
     */
    updateTaskConfiguration(token: number, task: TaskConfiguration, update: {
        [name: string]: any;
    }): Promise<void>;
    protected getWorkspaceTasks(token: number, restrictToFolder: TaskConfigurationScope | undefined): Promise<TaskConfiguration[]>;
    protected resolveProblemMatchers(task: TaskConfiguration, customizationObject: TaskCustomization): Promise<ProblemMatcher[] | undefined>;
    protected getTaskCustomization(task: TaskConfiguration): Promise<TaskCustomization>;
    protected removeProblemMarkers(option?: RunTaskOption): Promise<void>;
    /**
     * Runs the resolved task and opens terminal widget if the task is based on a terminal process
     * @param resolvedTask the resolved task
     * @param option options to run the resolved task
     */
    protected runResolvedTask(resolvedTask: TaskConfiguration, option?: RunTaskOption): Promise<TaskInfo | undefined>;
    protected getCustomizeProblemMatcherItems(): Array<QuickPickValue<QuickPickProblemMatcherItem> | QuickPickItemOrSeparator>;
    /**
     * Run selected text in the last active terminal.
     */
    runSelectedText(): Promise<void>;
    attach(terminalId: number, taskInfo: TaskInfo): Promise<number | void>;
    protected getTerminalWidgetId(terminalId: number): string | undefined;
    /**
     * Opens an editor to configure the given task.
     *
     * @param token  The cache token for the user interaction in progress
     * @param task The task to configure
     */
    configure(token: number, task: TaskConfiguration): Promise<void>;
    protected isEventForThisClient(context: string | undefined): boolean;
    taskConfigurationChanged(event: string[]): void;
    protected getContext(): string | undefined;
    /** Kill task for a given id if task is found */
    kill(id: number): Promise<void>;
    isBackgroundTaskEnded(id: number): Promise<boolean | undefined>;
    getExitCode(id: number): Promise<number | undefined>;
    getTerminateSignal(id: number): Promise<string | undefined>;
}
export {};
//# sourceMappingURL=task-service.d.ts.map