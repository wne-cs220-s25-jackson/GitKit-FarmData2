import { RpcServer } from '@theia/core/lib/common/messaging/proxy-factory';
import { Disposable } from '@theia/core';
export interface TerminalProcessInfo {
    executable: string;
    arguments: string[];
}
export interface IBaseTerminalServerOptions {
}
export interface IBaseTerminalServer extends RpcServer<IBaseTerminalClient> {
    create(IBaseTerminalServerOptions: object): Promise<number>;
    getProcessId(id: number): Promise<number>;
    getProcessInfo(id: number): Promise<TerminalProcessInfo>;
    getCwdURI(id: number): Promise<string>;
    resize(id: number, cols: number, rows: number): Promise<void>;
    attach(id: number): Promise<number>;
    onAttachAttempted(id: number): Promise<void>;
    close(id: number): Promise<void>;
    getDefaultShell(): Promise<string>;
}
export declare namespace IBaseTerminalServer {
    function validateId(id?: number): boolean;
}
export interface IBaseTerminalExitEvent {
    terminalId: number;
    code?: number;
    reason?: TerminalExitReason;
    signal?: string;
    attached?: boolean;
}
export declare enum TerminalExitReason {
    Unknown = 0,
    Shutdown = 1,
    Process = 2,
    User = 3,
    Extension = 4
}
export interface IBaseTerminalErrorEvent {
    terminalId: number;
    error: Error;
    attached?: boolean;
}
export interface IBaseTerminalClient {
    onTerminalExitChanged(event: IBaseTerminalExitEvent): void;
    onTerminalError(event: IBaseTerminalErrorEvent): void;
    updateTerminalEnvVariables(): void;
    storeTerminalEnvVariables(data: string): void;
}
export declare class DispatchingBaseTerminalClient {
    protected readonly clients: Set<IBaseTerminalClient>;
    push(client: IBaseTerminalClient): Disposable;
    onTerminalExitChanged(event: IBaseTerminalExitEvent): void;
    onTerminalError(event: IBaseTerminalErrorEvent): void;
    updateTerminalEnvVariables(): void;
    storeTerminalEnvVariables(data: string): void;
}
//# sourceMappingURL=base-terminal-protocol.d.ts.map