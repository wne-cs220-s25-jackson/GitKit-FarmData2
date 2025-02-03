import { Widget } from './widgets';
import { StatusBar } from './status-bar';
import { FrontendApplicationContribution } from './frontend-application-contribution';
import { ContributionProvider } from '../common';
import { FrontendApplication } from './frontend-application';
export declare const WidgetStatusBarContribution: unique symbol;
export interface WidgetStatusBarContribution<T extends Widget> {
    canHandle(widget: Widget): widget is T;
    activate(statusBar: StatusBar, widget: T): void;
    deactivate(statusBar: StatusBar): void;
}
/**
 * Creates an empty {@link WidgetStatusBarContribution} that does nothing.
 * Useful for widgets that are not handled by any other contribution, for example:
 * * Settings widget
 * * Welcome widget
 * * Webview widget
 *
 * @param prototype Prototype to identify the kind of the widget.
 * @returns An empty {@link WidgetStatusBarContribution}.
 */
export declare function noopWidgetStatusBarContribution(prototype: Function): WidgetStatusBarContribution<Widget>;
export declare class WidgetStatusBarService implements FrontendApplicationContribution {
    protected readonly contributionProvider: ContributionProvider<WidgetStatusBarContribution<Widget>>;
    protected readonly statusBar: StatusBar;
    onStart(app: FrontendApplication): void;
    protected show(widget: Widget): void;
}
//# sourceMappingURL=widget-status-bar-service.d.ts.map