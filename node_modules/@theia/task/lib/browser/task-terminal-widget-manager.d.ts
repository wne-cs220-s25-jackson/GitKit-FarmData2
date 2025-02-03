import { ApplicationShell, WidgetOpenerOptions } from '@theia/core/lib/browser';
import { TerminalWidget } from '@theia/terminal/lib/browser/base/terminal-widget';
import { TerminalWidgetFactoryOptions } from '@theia/terminal/lib/browser/terminal-widget-impl';
import { TerminalService } from '@theia/terminal/lib/browser/base/terminal-service';
import { TaskConfiguration, TaskWatcher, TaskServer, TaskInfo } from '../common';
import { TaskDefinitionRegistry } from './task-definition-registry';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
export interface TaskTerminalWidget extends TerminalWidget {
    readonly kind: 'task';
    dedicated?: boolean;
    taskId?: number;
    taskConfig?: TaskConfiguration;
    busy?: boolean;
}
export declare namespace TaskTerminalWidget {
    function is(widget: TerminalWidget): widget is TaskTerminalWidget;
}
export interface TaskTerminalWidgetOpenerOptions extends WidgetOpenerOptions {
    taskConfig?: TaskConfiguration;
    taskInfo?: TaskInfo;
}
export declare namespace TaskTerminalWidgetOpenerOptions {
    function isDedicatedTerminal(options: TaskTerminalWidgetOpenerOptions): boolean;
    function isNewTerminal(options: TaskTerminalWidgetOpenerOptions): boolean;
    function isSharedTerminal(options: TaskTerminalWidgetOpenerOptions): boolean;
    function echoExecutedCommand(options: TaskTerminalWidgetOpenerOptions): boolean;
}
export declare class TaskTerminalWidgetManager {
    protected readonly shell: ApplicationShell;
    protected readonly taskDefinitionRegistry: TaskDefinitionRegistry;
    protected readonly terminalService: TerminalService;
    protected readonly taskWatcher: TaskWatcher;
    protected readonly taskServer: TaskServer;
    protected readonly workspaceService: WorkspaceService;
    protected init(): void;
    newTaskTerminal(factoryOptions: TerminalWidgetFactoryOptions): Promise<TerminalWidget>;
    open(factoryOptions: TerminalWidgetFactoryOptions, openerOptions: TaskTerminalWidgetOpenerOptions): Promise<TerminalWidget>;
    protected getWidgetToRunTask(factoryOptions: TerminalWidgetFactoryOptions, openerOptions: TaskTerminalWidgetOpenerOptions): Promise<{
        isNew: boolean;
        widget: TerminalWidget;
    }>;
    protected getTaskTerminalWidgets(): TaskTerminalWidget[];
    protected updateTerminalOnTaskExit(terminal: TaskTerminalWidget, showReuseMessage: boolean, closeOnFinish: boolean): void;
}
//# sourceMappingURL=task-terminal-widget-manager.d.ts.map