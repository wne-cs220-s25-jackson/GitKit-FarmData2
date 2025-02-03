import { CancellationToken } from '../common/cancellation';
import { ProgressClient } from '../common/progress-service-protocol';
import { ProgressMessage, ProgressUpdate } from '../common/message-service-protocol';
import { Event, Emitter } from '../common/event';
export interface LocationProgress {
    show: boolean;
}
export declare class ProgressLocationService implements ProgressClient {
    protected emitters: Map<string, Emitter<LocationProgress>[]>;
    protected lastEvents: Map<string, LocationProgress>;
    getProgress(locationId: string): LocationProgress | undefined;
    onProgress(locationId: string): Event<LocationProgress>;
    protected addEmitter(locationId: string): Emitter<LocationProgress>;
    protected readonly progressByLocation: Map<string, Set<string>>;
    showProgress(progressId: string, message: ProgressMessage, cancellationToken: CancellationToken): Promise<string | undefined>;
    protected processEvent(progressId: string, locationId: string, event: 'start' | 'done'): void;
    protected fireEvent(locationId: string, show: boolean): void;
    protected getOrCreateEmitters(locationId: string): Emitter<LocationProgress>[];
    protected getLocationId(message: ProgressMessage): string;
    reportProgress(progressId: string, update: ProgressUpdate, message: ProgressMessage, cancellationToken: CancellationToken): Promise<void>;
}
//# sourceMappingURL=progress-location-service.d.ts.map