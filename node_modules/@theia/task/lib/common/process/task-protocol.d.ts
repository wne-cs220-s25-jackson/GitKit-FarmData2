import { TaskConfiguration, TaskInfo } from '../task-protocol';
import { ApplicationError } from '@theia/core/lib/common/application-error';
export type ProcessType = 'shell' | 'process';
export interface CommandOptions {
    /**
     * The 'current working directory' the task will run in. Can be a uri-as-string
     * or plain string path. If the cwd is meant to be somewhere under the workspace,
     * one can use the variable `${workspaceFolder}`, which will be replaced by its path,
     * at runtime. If not specified, defaults to the workspace root.
     * ex:  cwd: '${workspaceFolder}/foo'
     */
    cwd?: string;
    /**
     * The environment of the executed program or shell. If omitted the parent process' environment is used.
     */
    env?: {
        [key: string]: string | undefined;
    };
    /**
     * Configuration of the shell when task type is `shell`
     */
    shell?: {
        /**
         * The shell to use.
         */
        executable: string;
        /**
         * The arguments to be passed to the shell executable to run in command mode
         * (e.g ['-c'] for bash or ['/S', '/C'] for cmd.exe).
         */
        args?: string[];
    };
}
export interface CommandProperties {
    readonly command?: string;
    readonly args?: string[];
    readonly options?: CommandOptions;
}
/** Configuration of a Task that may be run as a process or a command inside a shell. */
export interface ProcessTaskConfiguration extends TaskConfiguration, CommandProperties {
    readonly type: ProcessType;
    /**
     * Windows specific task configuration
     */
    readonly windows?: CommandProperties;
    /**
     * macOS specific task configuration
     */
    readonly osx?: CommandProperties;
    /**
     * Linux specific task configuration
     */
    readonly linux?: CommandProperties;
}
export interface ProcessTaskInfo extends TaskInfo {
    /** process id. Defined if task is run as a process */
    readonly processId?: number;
    /** process task command */
    readonly command?: string;
}
export declare namespace ProcessTaskInfo {
    function is(info: TaskInfo): info is ProcessTaskInfo;
}
export declare namespace ProcessTaskError {
    const CouldNotRun: ApplicationError.Constructor<1, {
        code: string;
    }>;
}
//# sourceMappingURL=task-protocol.d.ts.map