import { Command, Disposable, Event } from '@theia/core/lib/common';
import { URI } from '@theia/core/shared/vscode-uri';
export interface TimelineItem {
    source: string;
    uri: string;
    handle: string;
    timestamp: number;
    label: string;
    id?: string;
    description?: string;
    detail?: string;
    command?: Command & {
        arguments?: unknown[];
    };
    contextValue?: string;
}
export interface TimelineChangeEvent {
    id: string;
    uri: URI | undefined;
    reset: boolean;
}
export interface TimelineProvidersChangeEvent {
    readonly added?: string[];
    readonly removed?: string[];
}
export interface TimelineOptions {
    cursor?: string;
    limit?: number | {
        timestamp: number;
        id?: string;
    };
}
export interface InternalTimelineOptions {
    cacheResults: boolean;
    resetCache: boolean;
}
export interface Timeline {
    source: string;
    paging?: {
        readonly cursor: string | undefined;
    };
    items: TimelineItem[];
}
export interface TimelineProviderDescriptor {
    id: string;
    label: string;
    scheme: string | string[];
}
export interface TimelineProvider extends TimelineProviderDescriptor, Disposable {
    onDidChange?: Event<TimelineChangeEvent>;
    provideTimeline(uri: URI, options: TimelineOptions, internalOptions?: InternalTimelineOptions): Promise<Timeline | undefined>;
}
export interface TimelineSource {
    id: string;
    label: string;
}
//# sourceMappingURL=timeline-model.d.ts.map