import { CommandRegistry, Command, MenuModelRegistry, SelectionService, MessageService } from '@theia/core/lib/common';
import { FrontendApplication, AbstractViewContribution, OpenerService } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { EditorManager } from '@theia/editor/lib/browser';
import { GitDiffWidget } from './git-diff-widget';
import { GitDiffTreeModel } from './git-diff-tree-model';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { FileNavigatorContribution } from '@theia/navigator/lib/browser/navigator-contribution';
import { UriCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import { GitQuickOpenService } from '../git-quick-open-service';
import URI from '@theia/core/lib/common/uri';
import { Repository } from '../../common';
import { WorkspaceRootUriAwareCommandHandler } from '@theia/workspace/lib/browser/workspace-commands';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare namespace GitDiffCommands {
    const OPEN_FILE_DIFF: Command;
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
    const PREVIOUS_CHANGE: {
        id: string;
        tooltip: string;
        iconClass: string;
        originalLabel: string;
        label: string;
    };
    const NEXT_CHANGE: {
        id: string;
        tooltip: string;
        iconClass: string;
        originalLabel: string;
        label: string;
    };
}
export declare namespace ScmNavigatorMoreToolbarGroups {
    const SCM = "3_navigator_scm";
}
export declare class GitDiffContribution extends AbstractViewContribution<GitDiffWidget> implements TabBarToolbarContribution {
    protected readonly selectionService: SelectionService;
    protected readonly widgetManager: WidgetManager;
    protected readonly app: FrontendApplication;
    protected readonly quickOpenService: GitQuickOpenService;
    protected readonly fileService: FileService;
    protected openerService: OpenerService;
    protected readonly notifications: MessageService;
    protected readonly scmService: ScmService;
    protected readonly editorManager: EditorManager;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly fileNavigatorContribution: FileNavigatorContribution;
    protected readonly workspaceService: WorkspaceService;
    constructor(selectionService: SelectionService, widgetManager: WidgetManager, app: FrontendApplication, quickOpenService: GitQuickOpenService, fileService: FileService, openerService: OpenerService, notifications: MessageService, scmService: ScmService);
    registerMenus(menus: MenuModelRegistry): void;
    registerCommands(commands: CommandRegistry): void;
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
    protected findGitRepository(uri: URI): Repository | undefined;
    showWidget(options: GitDiffTreeModel.Options): Promise<GitDiffWidget>;
    protected newWorkspaceRootUriAwareCommandHandler(handler: UriCommandHandler<URI>): WorkspaceRootUriAwareCommandHandler;
}
//# sourceMappingURL=git-diff-contribution.d.ts.map