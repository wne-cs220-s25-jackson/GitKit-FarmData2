import { Emitter, Event, Disposable, DisposableCollection } from '@theia/core';
import { ConsoleSession } from './console-session';
import { Severity } from '@theia/core/lib/common/severity';
export declare class ConsoleSessionManager implements Disposable {
    protected readonly sessions: Map<string, ConsoleSession>;
    protected _selectedSession: ConsoleSession | undefined;
    protected _severity: Severity | undefined;
    protected readonly sessionAddedEmitter: Emitter<ConsoleSession>;
    protected readonly sessionDeletedEmitter: Emitter<ConsoleSession>;
    protected readonly sessionWasShownEmitter: Emitter<ConsoleSession>;
    protected readonly sessionWasHiddenEmitter: Emitter<ConsoleSession>;
    protected readonly selectedSessionChangedEmitter: Emitter<ConsoleSession | undefined>;
    protected readonly severityChangedEmitter: Emitter<void>;
    get onDidAddSession(): Event<ConsoleSession>;
    get onDidDeleteSession(): Event<ConsoleSession>;
    get onDidShowSession(): Event<ConsoleSession>;
    get onDidHideSession(): Event<ConsoleSession>;
    get onDidChangeSelectedSession(): Event<ConsoleSession | undefined>;
    get onDidChangeSeverity(): Event<void>;
    protected readonly toDispose: DisposableCollection;
    protected readonly toDisposeOnSessionDeletion: Map<string, Disposable>;
    dispose(): void;
    get severity(): Severity | undefined;
    set severity(value: Severity | undefined);
    get all(): ConsoleSession[];
    get selectedSession(): ConsoleSession | undefined;
    set selectedSession(session: ConsoleSession | undefined);
    get(id: string): ConsoleSession | undefined;
    add(session: ConsoleSession): void;
    delete(id: string): void;
}
//# sourceMappingURL=console-session-manager.d.ts.map