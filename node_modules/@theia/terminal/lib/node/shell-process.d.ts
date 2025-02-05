import { ILogger } from '@theia/core/lib/common/logger';
import { TerminalProcess, ProcessManager, MultiRingBuffer } from '@theia/process/lib/node';
import { EnvironmentUtils } from '@theia/core/lib/node/environment-utils';
export declare const ShellProcessFactory: unique symbol;
export type ShellProcessFactory = (options: ShellProcessOptions) => ShellProcess;
export declare const ShellProcessOptions: unique symbol;
export interface ShellProcessOptions {
    shell?: string;
    args?: string[] | string;
    rootURI?: string;
    cols?: number;
    rows?: number;
    env?: {
        [key: string]: string | null;
    };
    strictEnv?: boolean;
    isPseudo?: boolean;
}
export declare function getRootPath(rootURI?: string): string;
export declare class ShellProcess extends TerminalProcess {
    protected static defaultCols: number;
    protected static defaultRows: number;
    constructor(// eslint-disable-next-line @typescript-eslint/indent
    options: ShellProcessOptions, processManager: ProcessManager, ringBuffer: MultiRingBuffer, logger: ILogger, environmentUtils: EnvironmentUtils);
    static getShellExecutablePath(): string;
    static getShellExecutableArgs(): string[];
}
//# sourceMappingURL=shell-process.d.ts.map