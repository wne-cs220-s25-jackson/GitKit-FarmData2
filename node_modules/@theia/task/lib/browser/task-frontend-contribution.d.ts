import { ILogger, ContributionProvider, CommandContribution, Command, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core/lib/common';
import { QuickOpenTask, TaskTerminateQuickOpen, TaskRunningQuickOpen, TaskRestartRunningQuickOpen } from './quick-open-task';
import { FrontendApplication, FrontendApplicationContribution, QuickAccessContribution, KeybindingRegistry, KeybindingContribution, StorageService, StatusBar } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { TaskContribution, TaskResolverRegistry, TaskProviderRegistry } from './task-contribution';
import { TaskService } from './task-service';
import { TaskSchemaUpdater } from './task-schema-updater';
import { TaskWatcher } from '../common';
import { EditorManager } from '@theia/editor/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
export declare namespace TaskCommands {
    const TASK_RUN: Command;
    const TASK_RUN_BUILD: Command;
    const TASK_RUN_TEST: Command;
    const WORKBENCH_RUN_TASK: Command;
    const TASK_RUN_LAST: Command;
    const TASK_ATTACH: Command;
    const TASK_RUN_TEXT: Command;
    const TASK_CONFIGURE: Command;
    const TASK_OPEN_USER: Command;
    const TASK_CLEAR_HISTORY: Command;
    const TASK_SHOW_RUNNING: Command;
    const TASK_TERMINATE: Command;
    const TASK_RESTART_RUNNING: Command;
}
export declare class TaskFrontendContribution implements CommandContribution, MenuContribution, KeybindingContribution, FrontendApplicationContribution, QuickAccessContribution {
    protected readonly quickOpenTask: QuickOpenTask;
    protected readonly editorManager: EditorManager;
    protected readonly app: FrontendApplication;
    protected readonly logger: ILogger;
    protected readonly widgetManager: WidgetManager;
    protected readonly contributionProvider: ContributionProvider<TaskContribution>;
    protected readonly taskProviderRegistry: TaskProviderRegistry;
    protected readonly taskResolverRegistry: TaskResolverRegistry;
    protected readonly taskService: TaskService;
    protected readonly schemaUpdater: TaskSchemaUpdater;
    protected readonly storageService: StorageService;
    protected readonly taskRunningQuickOpen: TaskRunningQuickOpen;
    protected readonly taskTerminateQuickOpen: TaskTerminateQuickOpen;
    protected readonly taskRestartRunningQuickOpen: TaskRestartRunningQuickOpen;
    protected readonly taskWatcher: TaskWatcher;
    protected readonly statusBar: StatusBar;
    protected readonly workspaceService: WorkspaceService;
    protected init(): void;
    onStart(): void;
    onStop(): void;
    /**
     * Contribute a status-bar item to trigger
     * the `Show Running Tasks` command.
     */
    protected updateRunningTasksItem(): Promise<void>;
    registerCommands(registry: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerQuickAccessProvider(): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
}
//# sourceMappingURL=task-frontend-contribution.d.ts.map