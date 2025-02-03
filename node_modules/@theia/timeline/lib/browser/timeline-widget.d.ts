import { Message } from '@theia/core/shared/@phosphor/messaging';
import { ApplicationShell, BaseWidget, Panel, PanelLayout } from '@theia/core/lib/browser';
import { TimelineTreeWidget } from './timeline-tree-widget';
import { TimelineService } from './timeline-service';
import { CommandRegistry, SelectionService } from '@theia/core/lib/common';
import { TimelineEmptyWidget } from './timeline-empty-widget';
import URI from '@theia/core/lib/common/uri';
import { URI as CodeURI } from '@theia/core/shared/vscode-uri';
export declare class TimelineWidget extends BaseWidget {
    protected panel: Panel;
    static ID: string;
    private readonly timelinesBySource;
    protected readonly resourceWidget: TimelineTreeWidget;
    protected readonly timelineService: TimelineService;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly applicationShell: ApplicationShell;
    protected readonly timelineEmptyWidget: TimelineEmptyWidget;
    protected readonly selectionService: SelectionService;
    constructor();
    protected init(): void;
    protected loadTimelineForSource(source: string, uri: CodeURI, reset: boolean): Promise<void>;
    loadTimeline(uri: URI, reset: boolean): Promise<void>;
    refresh(uri?: URI): void;
    private suitableWidgetsOpened;
    private getCurrentWidgetUri;
    protected get containerLayout(): PanelLayout | undefined;
    protected onUpdateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
}
//# sourceMappingURL=timeline-widget.d.ts.map