import { Emitter, Event } from './event';
import { ILoggerClient, ILogLevelChangedEvent } from './logger-protocol';
export declare class LoggerWatcher {
    getLoggerClient(): ILoggerClient;
    protected onLogLevelChangedEmitter: Emitter<ILogLevelChangedEvent>;
    get onLogLevelChanged(): Event<ILogLevelChangedEvent>;
    protected onLogConfigChangedEmitter: Emitter<void>;
    get onLogConfigChanged(): Event<void>;
}
//# sourceMappingURL=logger-watcher.d.ts.map