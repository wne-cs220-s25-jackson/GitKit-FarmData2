import { ProgressUpdate, ProgressMessage } from './message-service-protocol';
import { CancellationToken } from './cancellation';
export declare const ProgressClient: unique symbol;
export interface ProgressClient {
    /**
     * Show a progress message with possible actions to user.
     */
    showProgress(progressId: string, message: ProgressMessage, cancellationToken: CancellationToken): Promise<string | undefined>;
    /**
     * Update a previously created progress message.
     */
    reportProgress(progressId: string, update: ProgressUpdate, message: ProgressMessage, cancellationToken: CancellationToken): Promise<void>;
}
//# sourceMappingURL=progress-service-protocol.d.ts.map