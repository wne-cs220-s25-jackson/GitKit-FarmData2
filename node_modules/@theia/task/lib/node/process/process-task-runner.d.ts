import { ILogger } from '@theia/core';
import { RawProcessFactory, TerminalProcessOptions, TaskTerminalProcessFactory } from '@theia/process/lib/node';
import { ShellQuotedString, ShellQuotingFunctions } from '@theia/process/lib/common/shell-quoting';
import { TaskFactory } from './process-task';
import { TaskRunner } from '../task-runner-protocol';
import { Task } from '../task';
import { TaskConfiguration } from '../../common/task-protocol';
import { CommandOptions } from '../../common/process/task-protocol';
export interface OsSpecificCommand {
    command: string;
    args: Array<string | ShellQuotedString> | undefined;
    options: CommandOptions;
}
export interface ShellSpecificOptions {
    /** Arguments passed to the shell, aka `command` here. */
    execArgs: string[];
    /** Pack of functions used to escape the `subCommand` and `subArgs` to run in the shell. */
    quotingFunctions?: ShellQuotingFunctions;
}
/**
 * Task runner that runs a task as a process or a command inside a shell.
 */
export declare class ProcessTaskRunner implements TaskRunner {
    protected readonly logger: ILogger;
    protected readonly rawProcessFactory: RawProcessFactory;
    protected readonly taskTerminalProcessFactory: TaskTerminalProcessFactory;
    protected readonly taskFactory: TaskFactory;
    /**
     * Runs a task from the given task configuration.
     * @param taskConfig task configuration to run a task from. The provided task configuration must have a shape of `CommandProperties`.
     */
    run(taskConfig: TaskConfiguration, ctx?: string): Promise<Task>;
    protected getResolvedCommand(taskConfig: TaskConfiguration): TerminalProcessOptions;
    protected buildShellCommand(systemSpecificCommand: OsSpecificCommand, quotingFunctions?: ShellQuotingFunctions): string;
    protected getShellSpecificOptions(command: string): ShellSpecificOptions;
    protected getOsSpecificCommand(taskConfig: TaskConfiguration): OsSpecificCommand;
    protected getCommand(processType: 'process' | 'shell', terminalProcessOptions: TerminalProcessOptions): string | undefined;
    /**
     * This is task specific, to align with VS Code's behavior.
     *
     * When parsing arguments, VS Code will try to detect if the user already
     * tried to quote things.
     *
     * See: https://github.com/microsoft/vscode/blob/d363b988e1e58cf49963841c498681cdc6cb55a3/src/vs/workbench/contrib/tasks/browser/terminalTaskSystem.ts#L1101-L1127
     *
     * @param value
     * @param shellQuotingOptions
     */
    protected argumentNeedsQuotes(value: string, shellQuotingOptions: ShellQuotingFunctions): boolean;
    protected getSystemSpecificCommand(taskConfig: TaskConfiguration, system: 'windows' | 'linux' | 'osx' | undefined): OsSpecificCommand;
    protected asFsPath(uriOrPath: string): string;
    /**
     * @deprecated
     *
     * Remove ProcessTaskRunner.findCommand, introduce process "started" event
     * Checks for the existence of a file, at the provided path, and make sure that
     * it's readable and executable.
     */
    protected executableFileExists(filePath: string): Promise<boolean>;
}
//# sourceMappingURL=process-task-runner.d.ts.map