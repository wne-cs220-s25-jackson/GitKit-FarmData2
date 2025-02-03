import { AbstractViewContribution, KeybindingRegistry, LabelProvider, FrontendApplication, FrontendApplicationContribution, StylingParticipant, ColorTheme, CssStyleCollector } from '@theia/core/lib/browser';
import { SearchInWorkspaceWidget } from './search-in-workspace-widget';
import { CommandRegistry, MenuModelRegistry, SelectionService, Command } from '@theia/core';
import { Widget } from '@theia/core/lib/browser/widgets';
import { UriCommandHandler, UriAwareCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { SearchInWorkspaceContextKeyService } from './search-in-workspace-context-key-service';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
export declare namespace SearchInWorkspaceCommands {
    const TOGGLE_SIW_WIDGET: {
        id: string;
    };
    const OPEN_SIW_WIDGET: Command;
    const REPLACE_IN_FILES: Command;
    const FIND_IN_FOLDER: Command;
    const FOCUS_NEXT_RESULT: Command;
    const FOCUS_PREV_RESULT: Command;
    const REFRESH_RESULTS: Command;
    const CANCEL_SEARCH: Command;
    const COLLAPSE_ALL: Command;
    const EXPAND_ALL: Command;
    const CLEAR_ALL: Command;
    const COPY_ALL: Command;
    const COPY_ONE: Command;
    const DISMISS_RESULT: Command;
    const REPLACE_RESULT: Command;
    const REPLACE_ALL_RESULTS: Command;
}
export declare class SearchInWorkspaceFrontendContribution extends AbstractViewContribution<SearchInWorkspaceWidget> implements FrontendApplicationContribution, TabBarToolbarContribution, StylingParticipant {
    protected readonly selectionService: SelectionService;
    protected readonly labelProvider: LabelProvider;
    protected readonly workspaceService: WorkspaceService;
    protected readonly fileService: FileService;
    protected readonly editorManager: EditorManager;
    protected readonly clipboardService: ClipboardService;
    protected readonly contextKeyService: SearchInWorkspaceContextKeyService;
    constructor();
    protected init(): void;
    initializeLayout(app: FrontendApplication): Promise<void>;
    registerCommands(commands: CommandRegistry): Promise<void>;
    protected withWidget<T>(widget: Widget | undefined, fn: (widget: SearchInWorkspaceWidget) => T): T | false;
    /**
     * Get the search term based on current editor selection.
     * @returns the selection if available.
     */
    protected getSearchTerm(): string;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerToolbarItems(toolbarRegistry: TabBarToolbarRegistry): Promise<void>;
    protected newUriAwareCommandHandler(handler: UriCommandHandler<URI>): UriAwareCommandHandler<URI>;
    protected newMultiUriAwareCommandHandler(handler: UriCommandHandler<URI[]>): UriAwareCommandHandler<URI[]>;
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
//# sourceMappingURL=search-in-workspace-frontend-contribution.d.ts.map