import { Message } from '@theia/core/shared/@phosphor/messaging';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { BaseWidget, StatefulWidget, Panel, PanelLayout, ApplicationShell } from '@theia/core/lib/browser';
import { ScmCommitWidget } from './scm-commit-widget';
import { ScmAmendWidget } from './scm-amend-widget';
import { ScmNoRepositoryWidget } from './scm-no-repository-widget';
import { ScmService } from './scm-service';
import { ScmTreeWidget } from './scm-tree-widget';
import { ScmPreferences } from './scm-preferences';
export declare class ScmWidget extends BaseWidget implements StatefulWidget {
    protected panel: Panel;
    static ID: string;
    protected readonly shell: ApplicationShell;
    protected readonly scmService: ScmService;
    protected readonly commitWidget: ScmCommitWidget;
    readonly resourceWidget: ScmTreeWidget;
    protected readonly amendWidget: ScmAmendWidget;
    readonly noRepositoryWidget: ScmNoRepositoryWidget;
    protected readonly scmPreferences: ScmPreferences;
    set viewMode(mode: 'tree' | 'list');
    get viewMode(): 'tree' | 'list';
    constructor();
    protected init(): void;
    get containerLayout(): PanelLayout;
    /**
     * Updates the view mode based on the preference value.
     * @param preference the view mode preference.
     */
    protected updateViewMode(preference: 'tree' | 'list'): void;
    protected readonly toDisposeOnRefresh: DisposableCollection;
    protected refresh(): void;
    protected updateImmediately(): void;
    protected onUpdateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(msg: Message): void;
    protected focusInput(): void;
    storeState(): any;
    restoreState(oldState: any): void;
    collapseScmTree(): void;
}
//# sourceMappingURL=scm-widget.d.ts.map