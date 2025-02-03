import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
export declare class TimelineContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected _timelineItem: ContextKey<string | undefined>;
    get timelineItem(): ContextKey<string | undefined>;
    protected init(): void;
}
//# sourceMappingURL=timeline-context-key-service.d.ts.map