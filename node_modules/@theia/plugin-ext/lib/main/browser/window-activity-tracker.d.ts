import { Disposable, Emitter, Event } from '@theia/core';
export declare class WindowActivityTracker implements Disposable {
    readonly win: Window;
    private inactivityCounter;
    private readonly inactivityLimit;
    private readonly checkInactivityInterval;
    private interval;
    protected readonly onDidChangeActiveStateEmitter: Emitter<boolean>;
    private _activeState;
    constructor(win: Window);
    get onDidChangeActiveState(): Event<boolean>;
    private set activeState(value);
    private initializeListeners;
    dispose(): void;
    private resetInactivity;
    private checkInactivity;
    startTracking(): void;
    stopTracking(): void;
}
//# sourceMappingURL=window-activity-tracker.d.ts.map