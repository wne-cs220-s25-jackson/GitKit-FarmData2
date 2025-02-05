/// <reference types="lodash" />
import { FrontendApplication, FrontendApplicationContribution, Widget } from '@theia/core/lib/browser';
import { StatusBar } from '@theia/core/lib/browser/status-bar/status-bar';
import { AbstractViewContribution } from '@theia/core/lib/browser/shell/view-contribution';
import { ProblemManager, ProblemStat } from './problem-manager';
import { ProblemWidget } from './problem-widget';
import { MenuPath, MenuModelRegistry } from '@theia/core/lib/common/menu';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { SelectionService } from '@theia/core/lib/common/selection-service';
import { ProblemSelection } from './problem-selection';
export declare const PROBLEMS_CONTEXT_MENU: MenuPath;
export declare namespace ProblemsMenu {
    const CLIPBOARD: string[];
    const PROBLEMS: string[];
}
export declare namespace ProblemsCommands {
    const COLLAPSE_ALL: Command;
    const COLLAPSE_ALL_TOOLBAR: Command;
    const COPY: Command;
    const COPY_MESSAGE: Command;
    const CLEAR_ALL: Command;
}
export declare class ProblemContribution extends AbstractViewContribution<ProblemWidget> implements FrontendApplicationContribution, TabBarToolbarContribution {
    protected readonly problemManager: ProblemManager;
    protected readonly statusBar: StatusBar;
    protected readonly selectionService: SelectionService;
    constructor();
    onStart(app: FrontendApplication): void;
    initializeLayout(app: FrontendApplication): Promise<void>;
    protected updateStatusBarElement: import("lodash").DebouncedFunc<() => void>;
    protected setStatusBarElement(problemStat: ProblemStat): void;
    /**
     * Get the tooltip to be displayed when hovering over the problem statusbar item.
     * - Displays `No Problems` when no problems are present.
     * - Displays a human-readable label which describes for each type of problem stat properties,
     * their overall count and type when any one of these properties has a positive count.
     * @param stat the problem stat describing the number of `errors`, `warnings` and `infos`.
     *
     * @return the tooltip to be displayed in the statusbar.
     */
    protected getStatusBarTooltip(stat: ProblemStat): string;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerToolbarItems(toolbarRegistry: TabBarToolbarRegistry): Promise<void>;
    protected collapseAllProblems(): Promise<void>;
    protected addToClipboard(content: string): void;
    protected copy(selection: ProblemSelection): void;
    protected copyMessage(selection: ProblemSelection): void;
    protected withWidget<T>(widget: Widget | undefined, cb: (problems: ProblemWidget) => T): T | false;
}
//# sourceMappingURL=problem-contribution.d.ts.map