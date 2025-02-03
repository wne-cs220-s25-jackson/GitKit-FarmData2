import { ViewContainer, ViewContainerTitleOptions, WidgetFactory, WidgetManager } from '@theia/core/lib/browser';
export declare const SEARCH_VIEW_CONTAINER_ID = "search-view-container";
export declare const SEARCH_VIEW_CONTAINER_TITLE_OPTIONS: ViewContainerTitleOptions;
export declare class SearchInWorkspaceFactory implements WidgetFactory {
    readonly id = "search-view-container";
    protected searchWidgetOptions: ViewContainer.Factory.WidgetOptions;
    protected readonly viewContainerFactory: ViewContainer.Factory;
    protected readonly widgetManager: WidgetManager;
    createWidget(): Promise<ViewContainer>;
}
//# sourceMappingURL=search-in-workspace-factory.d.ts.map