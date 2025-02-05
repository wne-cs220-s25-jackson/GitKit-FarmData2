import { ApplicationShell, StatefulWidget } from '../shell';
import { BaseWidget, Message, SplitPanel, Widget } from './widget';
import { CompositeSaveable, Saveable, SaveableSource } from '../saveable';
import { Navigatable } from '../navigatable-types';
import { Emitter, URI } from '../../common';
/**
 * A widget containing a number of panes in a split layout.
 */
export declare class SplitWidget extends BaseWidget implements ApplicationShell.TrackableWidgetProvider, SaveableSource, Navigatable, StatefulWidget {
    protected readonly splitPanel: SplitPanel;
    protected readonly onDidChangeTrackableWidgetsEmitter: Emitter<Widget[]>;
    readonly onDidChangeTrackableWidgets: import("../../common").Event<Widget[]>;
    protected readonly compositeSaveable: CompositeSaveable;
    protected navigatable?: Navigatable;
    constructor(options?: SplitPanel.IOptions & {
        navigatable?: Navigatable;
    });
    get orientation(): SplitPanel.Orientation;
    set orientation(value: SplitPanel.Orientation);
    relativeSizes(): number[];
    setRelativeSizes(sizes: number[]): void;
    get handles(): readonly HTMLDivElement[];
    get saveable(): Saveable;
    getResourceUri(): URI | undefined;
    createMoveToUri(resourceUri: URI): URI | undefined;
    storeState(): SplitWidget.State;
    restoreState(oldState: SplitWidget.State): void;
    get panes(): readonly Widget[];
    getTrackableWidgets(): Widget[];
    protected fireDidChangeTrackableWidgets(): void;
    addPane(pane: Widget): void;
    insertPane(index: number, pane: Widget): void;
    protected onPaneAdded(pane: Widget): void;
    protected onPaneRemoved(pane: Widget): void;
    protected onActivateRequest(msg: Message): void;
}
export declare namespace SplitWidget {
    interface State {
        orientation?: SplitPanel.Orientation;
        widgets: readonly Widget[];
        relativeSizes?: number[];
    }
}
//# sourceMappingURL=split-widget.d.ts.map