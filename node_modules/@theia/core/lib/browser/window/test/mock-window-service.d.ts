import { Event } from '../../../common/event';
import { WindowService } from '../window-service';
export declare class MockWindowService implements WindowService {
    openNewWindow(): undefined;
    openNewDefaultWindow(): void;
    focus(): void;
    reload(): void;
    isSafeToShutDown(): Promise<boolean>;
    setSafeToShutDown(): void;
    get onUnload(): Event<void>;
}
//# sourceMappingURL=mock-window-service.d.ts.map