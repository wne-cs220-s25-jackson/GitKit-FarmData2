import { AbstractViewContribution } from '@theia/core/lib/browser/shell/view-contribution';
import { FrontendApplication } from '@theia/core/lib/browser/frontend-application';
import { FrontendApplicationContribution } from '@theia/core/lib/browser/frontend-application-contribution';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { Widget } from '@theia/core/lib/browser/widgets';
import { OutlineViewWidget } from './outline-view-widget';
export declare const OUTLINE_WIDGET_FACTORY_ID = "outline-view";
/**
 * Collection of `outline-view` commands.
 */
export declare namespace OutlineViewCommands {
    /**
     * Command which collapses all nodes from the `outline-view` tree.
     */
    const COLLAPSE_ALL: Command;
    /**
     * Command which expands all nodes from the `outline-view` tree.
     */
    const EXPAND_ALL: Command;
}
export declare class OutlineViewContribution extends AbstractViewContribution<OutlineViewWidget> implements FrontendApplicationContribution, TabBarToolbarContribution {
    constructor();
    initializeLayout(app: FrontendApplication): Promise<void>;
    registerCommands(commands: CommandRegistry): void;
    registerToolbarItems(toolbar: TabBarToolbarRegistry): Promise<void>;
    /**
     * Collapse all nodes in the outline view tree.
     */
    protected collapseAllItems(): Promise<void>;
    protected expandAllItems(): Promise<void>;
    /**
     * Determine if the current widget is the `outline-view`.
     */
    protected withWidget<T>(widget: Widget | undefined, cb: (widget: OutlineViewWidget) => T): T | false;
}
//# sourceMappingURL=outline-view-contribution.d.ts.map