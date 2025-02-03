import { TabBar, Widget, DockPanel, Title, Panel } from '@phosphor/widgets';
import { AttachedProperty } from '@phosphor/properties';
import { TabBarRenderer, SideTabBar } from './tab-bars';
import { SidebarMenuWidget, SidebarMenu } from './sidebar-menu-widget';
import { SplitPositionHandler } from './split-panels';
import { FrontendApplicationStateService } from '../frontend-application-state';
import { TheiaDockPanel } from './theia-dock-panel';
import { SidePanelToolbar } from './side-panel-toolbar';
import { TabBarToolbarRegistry, TabBarToolbar } from './tab-bar-toolbar';
import { DisposableCollection } from '../../common/disposable';
import { ContextMenuRenderer } from '../context-menu-renderer';
import { MenuPath } from '../../common/menu';
import { SidebarBottomMenuWidget } from './sidebar-bottom-menu-widget';
import { SidebarTopMenuWidget } from './sidebar-top-menu-widget';
import { AdditionalViewsMenuWidget, AdditionalViewsMenuWidgetFactory } from './additional-views-menu-widget';
/** The class name added to the left and right area panels. */
export declare const LEFT_RIGHT_AREA_CLASS = "theia-app-sides";
export declare const SidePanelHandlerFactory: unique symbol;
export declare const SIDE_PANEL_TOOLBAR_CONTEXT_MENU: MenuPath;
/**
 * A class which manages a dock panel and a related side bar. This is used for the left and right
 * panel of the application shell.
 */
export declare class SidePanelHandler {
    /**
     * A property that can be attached to widgets in order to determine the insertion index
     * of their title in the tab bar.
     */
    protected static readonly rankProperty: AttachedProperty<Widget, number | undefined>;
    /**
     * The tab bar displays the titles of the widgets in the side panel. Visibility of the widgets
     * is controlled entirely through tab selection: a widget is revealed by setting the `currentTitle`
     * accordingly in the tab bar, and the panel is hidden by setting that property to `null`. The
     * tab bar itself remains visible as long as there is at least one widget.
     */
    tabBar: SideTabBar;
    /**
     * Conditional menu placed below the tabBar. Manages overflowing/hidden tabs.
     * Is only visible if there are overflowing tabs.
     */
    additionalViewsMenu: AdditionalViewsMenuWidget;
    /**
     * The menu placed on the sidebar top.
     * Displayed as icons.
     * Open menus when on clicks.
     */
    topMenu: SidebarMenuWidget;
    /**
     * The menu placed on the sidebar bottom.
     * Displayed as icons.
     * Open menus when on clicks.
     */
    bottomMenu: SidebarMenuWidget;
    /**
     * A tool bar, which displays a title and widget specific command buttons.
     */
    toolBar: SidePanelToolbar;
    /**
     * The widget container is a dock panel in `single-document` mode, which means that the panel
     * cannot be split.
     */
    dockPanel: TheiaDockPanel;
    /**
     * The panel that contains the tab bar and the dock panel. This one is hidden whenever the dock
     * panel is empty.
     */
    container: Panel;
    /**
     * The current state of the side panel.
     */
    readonly state: SidePanel.State;
    /**
     * The shell area where the panel is placed. This property should not be modified directly, but
     * only by calling `create`.
     */
    protected side: 'left' | 'right';
    /**
     * Options that control the behavior of the side panel.
     */
    protected options: SidePanel.Options;
    protected tabBarToolBarRegistry: TabBarToolbarRegistry;
    protected tabBarToolBarFactory: () => TabBarToolbar;
    protected tabBarRendererFactory: () => TabBarRenderer;
    protected sidebarTopWidgetFactory: () => SidebarTopMenuWidget;
    protected sidebarBottomWidgetFactory: () => SidebarBottomMenuWidget;
    protected additionalViewsMenuFactory: AdditionalViewsMenuWidgetFactory;
    protected splitPositionHandler: SplitPositionHandler;
    protected readonly applicationStateService: FrontendApplicationStateService;
    protected readonly dockPanelFactory: TheiaDockPanel.Factory;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    /**
     * Create the side bar and dock panel widgets.
     */
    create(side: 'left' | 'right', options: SidePanel.Options): void;
    protected createSideBar(): SideTabBar;
    protected createSidePanel(): TheiaDockPanel;
    protected createToolbar(): SidePanelToolbar;
    protected createAdditionalViewsWidget(): AdditionalViewsMenuWidget;
    protected createSidebarTopMenu(): SidebarTopMenuWidget;
    protected createSidebarBottomMenu(): SidebarBottomMenuWidget;
    protected createSidebarMenu<T extends SidebarMenuWidget>(factory: () => T): T;
    protected showContextMenu(e: MouseEvent): void;
    protected createContainer(): Panel;
    /**
     * Create an object that describes the current side panel layout. This object may contain references
     * to widgets; these need to be transformed before the layout can be serialized.
     */
    getLayoutData(): SidePanel.LayoutData;
    /**
     * Apply a side panel layout that has been previously created with `getLayoutData`.
     */
    setLayoutData(layoutData: SidePanel.LayoutData): void;
    /**
     * Activate a widget residing in the side panel by ID.
     *
     * @returns the activated widget if it was found
     */
    activate(id: string): Widget | undefined;
    /**
     * Expand a widget residing in the side panel by ID. If no ID is given and the panel is
     * currently collapsed, the last active tab of this side panel is expanded. If no tab
     * was expanded previously, the first one is taken.
     *
     * @returns the expanded widget if it was found
     */
    expand(id?: string): Widget | undefined;
    /**
     * Collapse the sidebar so no items are expanded.
     */
    collapse(): Promise<void>;
    /**
     * Add a widget and its title to the dock panel and side bar.
     *
     * If the widget is already added, it will be moved.
     */
    addWidget(widget: Widget, options: SidePanel.WidgetOptions): void;
    /**
     * Add a menu to the sidebar top.
     *
     * If the menu is already added, it will be ignored.
     */
    addTopMenu(menu: SidebarMenu): void;
    /**
     * Remove a menu from the sidebar top.
     *
     * @param menuId id of the menu to remove
     */
    removeTopMenu(menuId: string): void;
    /**
     * Add a menu to the sidebar bottom.
     *
     * If the menu is already added, it will be ignored.
     */
    addBottomMenu(menu: SidebarMenu): void;
    /**
     * Remove a menu from the sidebar bottom.
     *
     * @param menuId id of the menu to remove
     */
    removeBottomMenu(menuId: string): void;
    protected updateToolbarTitle: () => void;
    /**
     * Refresh the visibility of the side bar and dock panel.
     */
    refresh(): void;
    /**
     * Sets the size of the side panel.
     *
     * @param size the desired size (width) of the panel in pixels.
     */
    resize(size: number): void;
    /**
     * Compute the current width of the panel. This implementation assumes that the parent of
     * the panel container is a `SplitPanel`.
     */
    protected getPanelSize(): number | undefined;
    /**
     * Determine the default size to apply when the panel is expanded for the first time.
     */
    protected getDefaultPanelSize(): number | undefined;
    /**
     * Modify the width of the panel. This implementation assumes that the parent of the panel
     * container is a `SplitPanel`.
     */
    protected setPanelSize(size: number): Promise<void>;
    protected readonly toDisposeOnCurrentTabChanged: DisposableCollection;
    /**
     * Handle a `currentChanged` signal from the sidebar. The side panel is refreshed so it displays
     * the new selected widget.
     */
    protected onCurrentTabChanged(sender: SideTabBar, { currentTitle, currentIndex }: TabBar.ICurrentChangedArgs<Widget>): void;
    /**
     * Handle a `tabDetachRequested` signal from the sidebar. A drag is started so the widget can be
     * moved to another application shell area.
     */
    protected onTabDetachRequested(sender: SideTabBar, { title, tab, clientX, clientY }: TabBar.ITabDetachRequestedArgs<Widget>): void;
    protected onTabsOverflowChanged(sender: SideTabBar, event: {
        titles: Title<Widget>[];
        startIndex: number;
    }): void;
    protected onWidgetAdded(sender: DockPanel, widget: Widget): void;
    protected onWidgetRemoved(sender: DockPanel, widget: Widget): void;
    protected updateSashState(sidePanelElement: Panel | null, sidePanelCollapsed: boolean): void;
}
export declare namespace SidePanel {
    /**
     * Options that control the behavior of side panels.
     */
    interface Options {
        /**
         * When a widget is being dragged and the distance of the mouse cursor to the shell border
         * is below this threshold, the respective side panel is expanded so the widget can be dropped
         * into that panel. Set this to `-1` to disable expanding the side panel while dragging.
         */
        expandThreshold: number;
        /**
         * The duration in milliseconds of the animation shown when a side panel is expanded.
         * Set this to `0` to disable expansion animation.
         */
        expandDuration: number;
        /**
         * The ratio of the available shell size to use as initial size for the side panel.
         */
        initialSizeRatio: number;
        /**
         * How large the panel should be when it's expanded and empty.
         */
        emptySize: number;
    }
    /**
     * The options for adding a widget to a side panel.
     */
    interface WidgetOptions {
        /**
         * The rank order of the widget among its siblings.
         */
        rank?: number;
    }
    /**
     * Data to save and load the layout of a side panel.
     */
    interface LayoutData {
        type: 'sidepanel';
        items?: WidgetItem[];
        size?: number;
    }
    /**
     * Data structure used to save and restore the side panel layout.
     */
    interface WidgetItem extends WidgetOptions {
        /** Can be undefined in case the widget could not be restored. */
        widget?: Widget;
        expanded?: boolean;
        pinned?: boolean;
    }
    interface State {
        /**
         * Indicates whether the panel is empty.
         */
        empty: boolean;
        /**
         * Indicates whether the panel is expanded, collapsed, or in a transition between the two.
         */
        expansion: ExpansionState;
        /**
         * A promise that is resolved when the currently pending side panel updates are done.
         */
        pendingUpdate: Promise<void>;
        /**
         * The index of the last tab that was selected. When the panel is expanded, it tries to restore
         * the tab selection to the previous state.
         */
        lastActiveTabIndex?: number;
        /**
         * The width or height of the panel before it was collapsed. When the panel is expanded, it tries
         * to restore its size to this value.
         */
        lastPanelSize?: number;
    }
    enum ExpansionState {
        collapsed = "collapsed",
        expanding = "expanding",
        expanded = "expanded",
        collapsing = "collapsing"
    }
}
//# sourceMappingURL=side-panel-handler.d.ts.map