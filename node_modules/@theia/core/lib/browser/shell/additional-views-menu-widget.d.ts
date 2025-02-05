import { CommandRegistry, Disposable, MenuModelRegistry, MenuPath } from '../../common';
import { Title, Widget } from '../widgets';
import { SidebarMenuWidget } from './sidebar-menu-widget';
import { SideTabBar } from './tab-bars';
export declare const AdditionalViewsMenuWidgetFactory: unique symbol;
export type AdditionalViewsMenuWidgetFactory = (side: 'left' | 'right') => AdditionalViewsMenuWidget;
export declare const AdditionalViewsMenuPath: unique symbol;
export declare class AdditionalViewsMenuWidget extends SidebarMenuWidget {
    static readonly ID = "sidebar.additional.views";
    protected menuPath: MenuPath;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly menuModelRegistry: MenuModelRegistry;
    protected menuDisposables: Disposable[];
    updateAdditionalViews(sender: SideTabBar, event: {
        titles: Title<Widget>[];
        startIndex: number;
    }): void;
    protected registerMenuAction(sender: SideTabBar, title: Title<Widget>, index: number): void;
}
//# sourceMappingURL=additional-views-menu-widget.d.ts.map