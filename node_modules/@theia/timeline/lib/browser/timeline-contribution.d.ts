import { WidgetManager, ApplicationShell } from '@theia/core/lib/browser';
import { TimelineService } from './timeline-service';
import { CommandContribution, CommandRegistry } from '@theia/core/lib/common';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
export declare class TimelineContribution implements CommandContribution, TabBarToolbarContribution {
    protected readonly widgetManager: WidgetManager;
    protected readonly timelineService: TimelineService;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly tabBarToolbar: TabBarToolbarRegistry;
    protected readonly shell: ApplicationShell;
    /** @deprecated @since 1.28.0. Import from timeline-tree-model instead */
    static readonly LOAD_MORE_COMMAND: import("@theia/core/lib/common").Command;
    private readonly toolbarItem;
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
    registerCommands(commands: CommandRegistry): void;
    private checkWidget;
}
//# sourceMappingURL=timeline-contribution.d.ts.map