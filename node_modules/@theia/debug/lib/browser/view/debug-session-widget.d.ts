import { interfaces, Container } from '@theia/core/shared/inversify';
import { Message, ApplicationShell, Widget, BaseWidget, StatefulWidget, ViewContainer, ViewContainerTitleOptions, WidgetManager } from '@theia/core/lib/browser';
import { DebugThreadsWidget } from './debug-threads-widget';
import { DebugStackFramesWidget } from './debug-stack-frames-widget';
import { DebugBreakpointsWidget } from './debug-breakpoints-widget';
import { DebugVariablesWidget } from './debug-variables-widget';
import { DebugToolBar } from './debug-toolbar-widget';
import { DebugViewModel } from './debug-view-model';
import { DebugWatchWidget } from './debug-watch-widget';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
export declare const DEBUG_VIEW_CONTAINER_TITLE_OPTIONS: ViewContainerTitleOptions;
export declare class DebugSessionWidget extends BaseWidget implements StatefulWidget, ApplicationShell.TrackableWidgetProvider {
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugSessionWidget;
    static subwidgets: (typeof DebugThreadsWidget | typeof DebugStackFramesWidget | typeof DebugBreakpointsWidget | typeof DebugVariablesWidget | typeof DebugWatchWidget)[];
    protected viewContainer: ViewContainer;
    protected readonly viewContainerFactory: ViewContainer.Factory;
    readonly model: DebugViewModel;
    protected readonly toolbar: DebugToolBar;
    protected readonly widgetManager: WidgetManager;
    protected readonly stateService: FrontendApplicationStateService;
    protected init(): void;
    protected onActivateRequest(msg: Message): void;
    protected onAfterShow(msg: Message): void;
    getTrackableWidgets(): Widget[];
    storeState(): object;
    restoreState(oldState: ViewContainer.State): void;
}
//# sourceMappingURL=debug-session-widget.d.ts.map