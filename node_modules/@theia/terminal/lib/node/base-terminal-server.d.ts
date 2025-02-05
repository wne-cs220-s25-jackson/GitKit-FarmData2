import { ILogger, DisposableCollection } from '@theia/core/lib/common';
import { IBaseTerminalServer, IBaseTerminalServerOptions, IBaseTerminalClient, TerminalProcessInfo } from '../common/base-terminal-protocol';
import { TerminalProcess, ProcessManager, TaskTerminalProcess } from '@theia/process/lib/node';
export declare abstract class BaseTerminalServer implements IBaseTerminalServer {
    protected readonly processManager: ProcessManager;
    protected readonly logger: ILogger;
    protected client: IBaseTerminalClient | undefined;
    protected terminalToDispose: Map<number, DisposableCollection>;
    constructor(processManager: ProcessManager, logger: ILogger);
    abstract create(options: IBaseTerminalServerOptions): Promise<number>;
    attach(id: number): Promise<number>;
    onAttachAttempted(id: number): Promise<void>;
    getProcessId(id: number): Promise<number>;
    getProcessInfo(id: number): Promise<TerminalProcessInfo>;
    getCwdURI(id: number): Promise<string>;
    close(id: number): Promise<void>;
    getDefaultShell(): Promise<string>;
    dispose(): void;
    resize(id: number, cols: number, rows: number): Promise<void>;
    setClient(client: IBaseTerminalClient | undefined): void;
    protected notifyClientOnExit(term: TerminalProcess): DisposableCollection;
    protected postCreate(term: TerminalProcess): void;
    protected postAttachAttempted(term: TaskTerminalProcess): void;
}
//# sourceMappingURL=base-terminal-server.d.ts.map