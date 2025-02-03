import { IBaseTerminalServer, IBaseTerminalServerOptions } from './base-terminal-protocol';
export declare const ITerminalServer: unique symbol;
export declare const terminalPath = "/services/terminal";
export declare const terminalsPath = "/services/terminals";
export interface ITerminalServer extends IBaseTerminalServer {
    create(ITerminalServerOptions: object): Promise<number>;
}
export interface ITerminalServerOptions extends IBaseTerminalServerOptions {
    command: string;
    args?: string[];
    options?: object;
}
//# sourceMappingURL=terminal-protocol.d.ts.map