import { ApplicationShell, ViewContainer as ViewContainerWidget, WidgetManager, QuickViewService, ViewContainerIdentifier, ViewContainerTitleOptions, Widget, FrontendApplicationContribution, StatefulWidget, TreeViewWelcomeWidget, ViewContainerPart } from '@theia/core/lib/browser';
import { ViewContainer, View, ViewWelcome } from '../../../common';
import { PluginSharedStyle } from '../plugin-shared-style';
import { PluginViewWidget, PluginViewWidgetIdentifier } from './plugin-view-widget';
import { ScmContribution } from '@theia/scm/lib/browser/scm-contribution';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
import { DebugFrontendApplicationContribution } from '@theia/debug/lib/browser/debug-frontend-application-contribution';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { CommandRegistry } from '@theia/core/lib/common/command';
import { MenuModelRegistry } from '@theia/core/lib/common/menu';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { ViewContextKeyService } from './view-context-key-service';
import { TreeViewWidget } from './tree-view-widget';
import { WebviewView, WebviewViewResolver } from '../webview-views/webview-views';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
export declare const PLUGIN_VIEW_FACTORY_ID = "plugin-view";
export declare const PLUGIN_VIEW_CONTAINER_FACTORY_ID = "plugin-view-container";
export declare const PLUGIN_VIEW_DATA_FACTORY_ID = "plugin-view-data";
export type ViewDataProvider = (params: {
    state?: object;
    viewInfo: View;
}) => Promise<TreeViewWidget>;
export interface ViewContainerInfo {
    id: string;
    location: string;
    options: ViewContainerTitleOptions;
    onViewAdded: () => void;
}
export declare class PluginViewRegistry implements FrontendApplicationContribution {
    protected readonly shell: ApplicationShell;
    protected readonly style: PluginSharedStyle;
    protected readonly widgetManager: WidgetManager;
    protected readonly scm: ScmContribution;
    protected readonly explorer: FileNavigatorContribution;
    protected readonly debug: DebugFrontendApplicationContribution;
    protected readonly commands: CommandRegistry;
    protected readonly menus: MenuModelRegistry;
    protected readonly quickView: QuickViewService;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly viewContextKeys: ViewContextKeyService;
    protected readonly onDidExpandViewEmitter: Emitter<string>;
    readonly onDidExpandView: Event<string>;
    private readonly views;
    private readonly viewsWelcome;
    private readonly viewContainers;
    private readonly containerViews;
    private readonly viewClauseContexts;
    private readonly viewDataProviders;
    private readonly viewDataState;
    private readonly webviewViewResolvers;
    protected readonly onNewResolverRegisteredEmitter: Emitter<{
        readonly viewType: string;
    }>;
    readonly onNewResolverRegistered: Event<{
        readonly viewType: string;
    }>;
    private readonly webviewViewRevivals;
    private nextViewContainerId;
    private static readonly BUILTIN_VIEW_CONTAINERS;
    private static readonly ID_MAPPINGS;
    protected init(): void;
    protected updateViewWelcomeVisibility(viewId: string): Promise<void>;
    protected updateViewVisibility(viewId: string): Promise<void>;
    protected isViewVisible(viewId: string): boolean;
    registerViewContainer(location: string, viewContainer: ViewContainer): Disposable;
    protected toggleViewContainer(id: string): Promise<void>;
    protected doRegisterViewContainer(id: string, location: string, options: ViewContainerTitleOptions): Disposable;
    getContainerViews(viewContainerId: string): string[];
    registerView(viewContainerId: string, view: View): Disposable;
    resolveWebviewView(viewId: string, webview: WebviewView, cancellation: CancellationToken): Promise<void>;
    registerWebviewView(viewId: string, resolver: WebviewViewResolver): Promise<Disposable>;
    protected createNewWebviewView(viewId: string): Promise<WebviewView>;
    registerViewWelcome(viewWelcome: ViewWelcome): Disposable;
    handleViewWelcomeChange(viewId: string): Promise<void>;
    protected getTreeViewWelcomeWidget(viewId: string): Promise<TreeViewWelcomeWidget | undefined>;
    getViewWelcomes(viewId: string): ViewWelcome[];
    getView(viewId: string): Promise<PluginViewWidget | undefined>;
    openView(viewId: string, options?: {
        activate?: boolean;
        reveal?: boolean;
    }): Promise<PluginViewWidget | undefined>;
    protected doOpenView(viewId: string): Promise<PluginViewWidget | undefined>;
    protected prepareView(widget: PluginViewWidget): Promise<void>;
    protected getOrCreateViewContainerWidget(containerId: string): Promise<ViewContainerWidget>;
    openViewContainer(containerId: string): Promise<ViewContainerWidget | undefined>;
    protected prepareViewContainer(viewContainerId: string, containerWidget: ViewContainerWidget): Promise<void>;
    protected registerWidgetPartEvents(widget: PluginViewWidget, containerWidget: ViewContainerWidget): ViewContainerPart | undefined;
    protected getViewContainerId(container: ViewContainerWidget): string | undefined;
    protected getPluginViewContainer(viewContainerId: string): Promise<ViewContainerWidget | undefined>;
    protected initViewContainer(containerId: string): Promise<void>;
    initWidgets(): Promise<void>;
    removeStaleWidgets(): Promise<void>;
    protected toViewContainerIdentifier(viewContainerId: string): ViewContainerIdentifier;
    protected toViewContainerId(identifier: ViewContainerIdentifier): string;
    protected toPluginViewWidgetIdentifier(viewId: string): PluginViewWidgetIdentifier;
    protected toViewId(identifier: PluginViewWidgetIdentifier): string;
    protected toViewWelcomeId(index: number, viewId: string): string;
    /**
     * retrieve restored layout state from previous user session but close widgets
     * widgets should be opened only when view data providers are registered
     */
    onDidInitializeLayout(): void;
    registerViewDataProvider(viewId: string, provider: ViewDataProvider): Disposable;
    protected initView(viewId: string, toDispose: DisposableCollection): Promise<void>;
    protected createViewDataWidget(viewId: string, webviewId?: string): Promise<Widget | undefined>;
    protected createWebviewWidget(viewId: string, webviewId?: string): Promise<Widget | undefined>;
    protected storeViewDataStateOnDispose(viewId: string, widget: Widget & StatefulWidget): void;
    protected isVisibleWidget(widget: Widget): boolean;
    protected updateFocusedView(): void;
}
//# sourceMappingURL=plugin-view-registry.d.ts.map