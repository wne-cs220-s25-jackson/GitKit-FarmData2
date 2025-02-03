import { Disposable, Event } from '@theia/core/lib/common';
import { URI } from '@theia/core/shared/vscode-uri';
import { InternalTimelineOptions, Timeline, TimelineChangeEvent, TimelineItem, TimelineOptions, TimelineProvider, TimelineProvidersChangeEvent, TimelineSource } from '../common/timeline-model';
export declare class TimelineService {
    private readonly providers;
    private readonly onDidChangeProvidersEmitter;
    readonly onDidChangeProviders: Event<TimelineProvidersChangeEvent>;
    private readonly onDidChangeTimelineEmitter;
    readonly onDidChangeTimeline: Event<TimelineChangeEvent>;
    registerTimelineProvider(provider: TimelineProvider): Disposable;
    unregisterTimelineProvider(id: string): void;
    getSources(): TimelineSource[];
    getSchemas(): string[];
    getTimeline(id: string, uri: URI, options: TimelineOptions, internalOptions?: InternalTimelineOptions): Promise<Timeline | undefined>;
}
export declare class TimelineAggregate {
    readonly items: TimelineItem[];
    readonly source: string;
    readonly uri: string;
    private _cursor?;
    get cursor(): string | undefined;
    set cursor(cursor: string | undefined);
    constructor(timeline: Timeline);
    add(items: TimelineItem[]): void;
}
//# sourceMappingURL=timeline-service.d.ts.map