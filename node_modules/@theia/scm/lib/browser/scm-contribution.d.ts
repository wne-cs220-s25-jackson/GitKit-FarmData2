import { AbstractViewContribution, FrontendApplicationContribution, LabelProvider, StatusBar, StatusBarEntry, KeybindingRegistry, ViewContainerTitleOptions, StylingParticipant, ColorTheme, CssStyleCollector } from '@theia/core/lib/browser';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { CommandRegistry, Command, DisposableCollection, CommandService, MenuModelRegistry } from '@theia/core/lib/common';
import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
import { ScmService } from './scm-service';
import { ScmWidget } from '../browser/scm-widget';
import { ScmQuickOpenService } from './scm-quick-open-service';
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution';
import { ColorRegistry } from '@theia/core/lib/browser/color-registry';
import { ScmColors } from './scm-colors';
import { ScmCommand } from './scm-provider';
import { ScmDecorationsService } from '../browser/decorations/scm-decorations-service';
import { DirtyDiffNavigator } from './dirty-diff/dirty-diff-navigator';
export declare const SCM_WIDGET_FACTORY_ID: string;
export declare const SCM_VIEW_CONTAINER_ID = "scm-view-container";
export declare const SCM_VIEW_CONTAINER_TITLE_OPTIONS: ViewContainerTitleOptions;
export declare namespace ScmMenus {
    const CHANGES_GROUP: string[];
}
export declare namespace SCM_COMMANDS {
    const CHANGE_REPOSITORY: {
        id: string;
        category: string;
        originalCategory: string;
        label: string;
        originalLabel: string;
    };
    const ACCEPT_INPUT: {
        id: string;
    };
    const TREE_VIEW_MODE: {
        id: string;
        tooltip: string;
        iconClass: string;
        originalLabel: string;
        label: string;
    };
    const LIST_VIEW_MODE: {
        id: string;
        tooltip: string;
        iconClass: string;
        originalLabel: string;
        label: string;
    };
    const COLLAPSE_ALL: {
        id: string;
        category: string;
        originalCategory: string;
        tooltip: string;
        iconClass: string;
        label: string;
        originalLabel: string;
    };
    const GOTO_NEXT_CHANGE: Command;
    const GOTO_PREVIOUS_CHANGE: Command;
    const SHOW_NEXT_CHANGE: Command;
    const SHOW_PREVIOUS_CHANGE: Command;
    const CLOSE_CHANGE_PEEK_VIEW: {
        id: string;
        category: string;
        originalCategory: string;
        label: string;
        originalLabel: string;
    };
}
export { ScmColors };
export declare class ScmContribution extends AbstractViewContribution<ScmWidget> implements FrontendApplicationContribution, TabBarToolbarContribution, ColorContribution, StylingParticipant {
    protected readonly statusBar: StatusBar;
    protected readonly scmService: ScmService;
    protected readonly scmQuickOpenService: ScmQuickOpenService;
    protected readonly labelProvider: LabelProvider;
    protected readonly commands: CommandService;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly contextKeys: ContextKeyService;
    protected readonly scmDecorationsService: ScmDecorationsService;
    protected readonly dirtyDiffNavigator: DirtyDiffNavigator;
    protected scmFocus: ContextKey<boolean>;
    constructor();
    protected init(): void;
    initializeLayout(): Promise<void>;
    onStart(): void;
    protected updateContextKeys(): void;
    registerCommands(commandRegistry: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    protected acceptInput(): Promise<void>;
    protected acceptInputCommand(): ScmCommand | undefined;
    protected readonly statusBarDisposable: DisposableCollection;
    protected updateStatusBar(): void;
    protected setStatusBarEntry(id: string, entry: StatusBarEntry): void;
    /**
     * It should be aligned with https://github.com/microsoft/vscode/blob/0dfa355b3ad185a6289ba28a99c141ab9e72d2be/src/vs/workbench/contrib/scm/browser/dirtydiffDecorator.ts#L808
     */
    registerColors(colors: ColorRegistry): void;
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
//# sourceMappingURL=scm-contribution.d.ts.map