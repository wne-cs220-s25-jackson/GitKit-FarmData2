import { ViewContainer, ViewContainerTitleOptions, WidgetFactory, WidgetManager } from '@theia/core/lib/browser';
export declare const EXPLORER_VIEW_CONTAINER_ID = "explorer-view-container";
export declare const EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS: ViewContainerTitleOptions;
export declare class NavigatorWidgetFactory implements WidgetFactory {
    static ID: string;
    readonly id: string;
    protected openEditorsWidgetOptions: ViewContainer.Factory.WidgetOptions;
    protected fileNavigatorWidgetOptions: ViewContainer.Factory.WidgetOptions;
    protected readonly viewContainerFactory: ViewContainer.Factory;
    protected readonly widgetManager: WidgetManager;
    createWidget(): Promise<ViewContainer>;
}
//# sourceMappingURL=navigator-widget-factory.d.ts.map