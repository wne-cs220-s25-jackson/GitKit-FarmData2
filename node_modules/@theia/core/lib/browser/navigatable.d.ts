import URI from '../common/uri';
import { WidgetOpenHandler, WidgetOpenerOptions } from './widget-open-handler';
import { NavigatableWidget, NavigatableWidgetOptions } from './navigatable-types';
export * from './navigatable-types';
export declare abstract class NavigatableWidgetOpenHandler<W extends NavigatableWidget> extends WidgetOpenHandler<W> {
    protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions;
    protected serializeUri(uri: URI): string;
}
//# sourceMappingURL=navigatable.d.ts.map