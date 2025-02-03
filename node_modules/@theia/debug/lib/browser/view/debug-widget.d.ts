import { interfaces, Container } from '@theia/core/shared/inversify';
import { BaseWidget, Message, ApplicationShell, Widget, StatefulWidget, ViewContainer } from '@theia/core/lib/browser';
import { DebugSessionWidget } from './debug-session-widget';
import { DebugConfigurationWidget } from './debug-configuration-widget';
import { DebugViewModel } from './debug-view-model';
import { DebugSessionManager } from '../debug-session-manager';
import { ProgressBarFactory } from '@theia/core/lib/browser/progress-bar-factory';
export declare class DebugWidget extends BaseWidget implements StatefulWidget, ApplicationShell.TrackableWidgetProvider {
    static createContainer(parent: interfaces.Container): Container;
    static createWidget(parent: interfaces.Container): DebugWidget;
    static ID: string;
    static LABEL: string;
    readonly model: DebugViewModel;
    readonly sessionManager: DebugSessionManager;
    protected readonly toolbar: DebugConfigurationWidget;
    protected readonly sessionWidget: DebugSessionWidget;
    protected readonly progressBarFactory: ProgressBarFactory;
    protected init(): void;
    protected onActivateRequest(msg: Message): void;
    getTrackableWidgets(): Widget[];
    storeState(): object;
    restoreState(oldState: ViewContainer.State): void;
}
//# sourceMappingURL=debug-widget.d.ts.map