import { CancellationToken } from '../common/cancellation';
import { ProgressClient } from '../common/progress-service-protocol';
import { ProgressMessage, ProgressUpdate } from '../common/message-service-protocol';
import { ProgressStatusBarItem } from './progress-status-bar-item';
import { ProgressLocationService } from './progress-location-service';
export declare class DispatchingProgressClient implements ProgressClient {
    protected statusBarItem: ProgressStatusBarItem;
    protected locationService: ProgressLocationService;
    showProgress(progressId: string, message: ProgressMessage, cancellationToken: CancellationToken): Promise<string | undefined>;
    reportProgress(progressId: string, update: ProgressUpdate, message: ProgressMessage, cancellationToken: CancellationToken): Promise<void>;
    protected getLocationId(message: ProgressMessage): string;
}
//# sourceMappingURL=progress-client.d.ts.map