import { MenuModelRegistry, CommandRegistry, SelectionService } from '@theia/core';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { UriCommandHandler, UriAwareCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import URI from '@theia/core/lib/common/uri';
import { ScmHistoryWidget } from './scm-history-widget';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { SCM_HISTORY_ID, SCM_HISTORY_LABEL, ScmHistoryCommands, SCM_HISTORY_TOGGLE_KEYBINDING, ScmHistoryOpenViewArguments } from './scm-history-constants';
export { SCM_HISTORY_ID, SCM_HISTORY_LABEL, ScmHistoryCommands, SCM_HISTORY_TOGGLE_KEYBINDING, ScmHistoryOpenViewArguments };
export declare class ScmHistoryContribution extends AbstractViewContribution<ScmHistoryWidget> {
    protected readonly selectionService: SelectionService;
    protected readonly scmService: ScmService;
    constructor();
    openView(args?: Partial<ScmHistoryOpenViewArguments>): Promise<ScmHistoryWidget>;
    registerMenus(menus: MenuModelRegistry): void;
    registerCommands(commands: CommandRegistry): void;
    protected refreshWidget(uri: string | undefined): Promise<void>;
    protected newUriAwareCommandHandler(handler: UriCommandHandler<URI>): UriAwareCommandHandler<URI>;
}
//# sourceMappingURL=scm-history-contribution.d.ts.map