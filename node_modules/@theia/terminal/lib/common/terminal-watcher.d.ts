import { Event } from '@theia/core/lib/common/event';
import { IBaseTerminalClient, IBaseTerminalExitEvent, IBaseTerminalErrorEvent } from './base-terminal-protocol';
export declare class TerminalWatcher {
    getTerminalClient(): IBaseTerminalClient;
    private onTerminalExitEmitter;
    private onTerminalErrorEmitter;
    private onStoreTerminalEnvVariablesRequestedEmitter;
    private onUpdateTerminalEnvVariablesRequestedEmitter;
    get onTerminalExit(): Event<IBaseTerminalExitEvent>;
    get onTerminalError(): Event<IBaseTerminalErrorEvent>;
    get onStoreTerminalEnvVariablesRequested(): Event<string>;
    get onUpdateTerminalEnvVariablesRequested(): Event<undefined>;
}
//# sourceMappingURL=terminal-watcher.d.ts.map