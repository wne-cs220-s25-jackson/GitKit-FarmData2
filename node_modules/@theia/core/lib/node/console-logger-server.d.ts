import { LoggerWatcher } from '../common/logger-watcher';
import { LogLevelCliContribution } from './logger-cli-contribution';
import { ILoggerServer, ILoggerClient } from '../common/logger-protocol';
export declare class ConsoleLoggerServer implements ILoggerServer {
    protected client: ILoggerClient | undefined;
    protected watcher: LoggerWatcher;
    protected cli: LogLevelCliContribution;
    protected init(): void;
    setLogLevel(name: string, newLogLevel: number): Promise<void>;
    getLogLevel(name: string): Promise<number>;
    log(name: string, logLevel: number, message: string, params: any[]): Promise<void>;
    child(name: string): Promise<void>;
    dispose(): void;
    setClient(client: ILoggerClient | undefined): void;
}
//# sourceMappingURL=console-logger-server.d.ts.map