import { DebugAdapter, DebugAdapterSession } from './debug-model';
import { DebugChannel } from './debug-service';
/**
 * [DebugAdapterSession](#DebugAdapterSession) implementation.
 */
export declare class DebugAdapterSessionImpl implements DebugAdapterSession {
    readonly id: string;
    protected readonly debugAdapter: DebugAdapter;
    private channel;
    private isClosed;
    constructor(id: string, debugAdapter: DebugAdapter);
    start(channel: DebugChannel): Promise<void>;
    protected onDebugAdapterExit(): void;
    protected onDebugAdapterError(error: Error): void;
    protected send(message: string): void;
    protected write(message: string): void;
    stop(): Promise<void>;
}
//# sourceMappingURL=debug-adapter-session.d.ts.map