import { Emitter, Event } from '../common/event';
import { Deferred } from '../common/promise-util';
import { ILogger } from '../common/logger';
import { FrontendApplicationState } from '../common/frontend-application-state';
export { FrontendApplicationState };
export declare class FrontendApplicationStateService {
    protected readonly logger: ILogger;
    private _state;
    protected deferred: {
        [state: string]: Deferred<void>;
    };
    protected readonly stateChanged: Emitter<FrontendApplicationState>;
    get state(): FrontendApplicationState;
    set state(state: FrontendApplicationState);
    get onStateChanged(): Event<FrontendApplicationState>;
    protected doSetState(state: FrontendApplicationState): void;
    reachedState(state: FrontendApplicationState): Promise<void>;
    reachedAnyState(...states: FrontendApplicationState[]): Promise<void>;
}
//# sourceMappingURL=frontend-application-state.d.ts.map