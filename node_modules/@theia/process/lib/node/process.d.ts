/// <reference types="node" />
import { ILogger, Emitter, Event } from '@theia/core/lib/common';
import { Readable, Writable } from 'stream';
import { IProcessStartEvent, IProcessExitEvent, ProcessErrorEvent, ProcessType, ManagedProcessManager, ManagedProcess } from '../common/process-manager-types';
export { IProcessStartEvent, IProcessExitEvent, ProcessErrorEvent, ProcessType };
/**
 * Options to spawn a new process (`spawn`).
 *
 * For more information please refer to the spawn function of Node's
 * child_process module:
 *
 *   https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 */
export interface ProcessOptions {
    readonly command: string;
    args?: string[];
    options?: {
        [key: string]: any;
    };
}
/**
 * Options to fork a new process using the current Node interpreter (`fork`).
 *
 * For more information please refer to the fork function of Node's
 * child_process module:
 *
 *   https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
 */
export interface ForkOptions {
    readonly modulePath: string;
    args?: string[];
    options?: object;
}
export declare abstract class Process implements ManagedProcess {
    protected readonly processManager: ManagedProcessManager;
    protected readonly logger: ILogger;
    protected readonly type: ProcessType;
    protected readonly options: ProcessOptions | ForkOptions;
    readonly id: number;
    protected readonly startEmitter: Emitter<IProcessStartEvent>;
    protected readonly exitEmitter: Emitter<IProcessExitEvent>;
    protected readonly closeEmitter: Emitter<IProcessExitEvent>;
    protected readonly errorEmitter: Emitter<ProcessErrorEvent>;
    protected _killed: boolean;
    /**
     * The OS process id.
     */
    abstract readonly pid: number;
    /**
     * The stdout stream.
     */
    abstract readonly outputStream: Readable;
    /**
     * The stderr stream.
     */
    abstract readonly errorStream: Readable;
    /**
     * The stdin stream.
     */
    abstract readonly inputStream: Writable;
    constructor(processManager: ManagedProcessManager, logger: ILogger, type: ProcessType, options: ProcessOptions | ForkOptions);
    abstract kill(signal?: string): void;
    get killed(): boolean;
    get onStart(): Event<IProcessStartEvent>;
    /**
     * Wait for the process to exit, streams can still emit data.
     */
    get onExit(): Event<IProcessExitEvent>;
    get onError(): Event<ProcessErrorEvent>;
    /**
     * Waits for both process exit and for all the streams to be closed.
     */
    get onClose(): Event<IProcessExitEvent>;
    protected emitOnStarted(): void;
    /**
     * Emit the onExit event for this process.  Only one of code and signal
     * should be defined.
     */
    protected emitOnExit(code?: number, signal?: string): void;
    /**
     * Emit the onClose event for this process.  Only one of code and signal
     * should be defined.
     */
    protected emitOnClose(code?: number, signal?: string): void;
    protected handleOnExit(event: IProcessExitEvent): void;
    protected emitOnError(err: ProcessErrorEvent): void;
    protected emitOnErrorAsync(error: ProcessErrorEvent): Promise<void>;
    protected handleOnError(error: ProcessErrorEvent): void;
    protected isForkOptions(options: unknown): options is ForkOptions;
    protected readonly initialCwd: string;
    /**
     * @returns the current working directory as a URI (usually file:// URI)
     */
    getCwdURI(): Promise<string>;
}
//# sourceMappingURL=process.d.ts.map