/// <reference types="node" />
import { ILogger } from '@theia/core/lib/common';
import { Process, ProcessOptions } from './process';
import { ProcessManager } from './process-manager';
import { IPty } from 'node-pty';
import { MultiRingBuffer, MultiRingBufferReadableStream } from './multi-ring-buffer';
import { DevNullStream } from './dev-null-stream';
import { Writable } from 'stream';
export declare const TerminalProcessOptions: unique symbol;
export interface TerminalProcessOptions extends ProcessOptions {
    /**
     * Windows only. Allow passing complex command lines already escaped for CommandLineToArgvW.
     */
    commandLine?: string;
    isPseudo?: boolean;
}
export declare const TerminalProcessFactory: unique symbol;
export interface TerminalProcessFactory {
    (options: TerminalProcessOptions): TerminalProcess;
}
export declare enum NodePtyErrors {
    EACCES = "Permission denied",
    ENOENT = "No such file or directory"
}
/**
 * Run arbitrary processes inside pseudo-terminals (PTY).
 *
 * Note: a PTY is not a shell process (bash/pwsh/cmd...)
 */
export declare class TerminalProcess extends Process {
    protected readonly options: TerminalProcessOptions;
    protected readonly ringBuffer: MultiRingBuffer;
    protected readonly terminal: IPty | undefined;
    private _delayedResizer;
    private _exitCode;
    readonly outputStream: MultiRingBufferReadableStream;
    readonly errorStream: DevNullStream;
    readonly inputStream: Writable;
    constructor(// eslint-disable-next-line @typescript-eslint/indent
    options: TerminalProcessOptions, processManager: ProcessManager, ringBuffer: MultiRingBuffer, logger: ILogger);
    /**
     * Helper for the constructor to attempt to create the pseudo-terminal encapsulating the shell process.
     *
     * @param command the shell command to launch
     * @param options options for the shell process
     * @param ringBuffer a ring buffer in which to collect terminal output
     * @returns the terminal PTY and a stream by which it may be sent input
     */
    private createPseudoTerminal;
    createOutputStream(): MultiRingBufferReadableStream;
    get pid(): number;
    get executable(): string;
    get arguments(): string[];
    protected onTerminalExit(code: number | undefined, signal: string | undefined): void;
    unregisterProcess(): void;
    kill(signal?: string): void;
    resize(cols: number, rows: number): void;
    write(data: string): void;
    protected checkTerminal(): void | never;
}
//# sourceMappingURL=terminal-process.d.ts.map