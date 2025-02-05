import { Message } from '@theia/core/shared/@phosphor/messaging';
import { BaseWidget, StatefulWidget, Panel, PanelLayout } from '@theia/core/lib/browser';
import { GitCommitDetailWidgetOptions } from './git-commit-detail-widget-options';
import { GitCommitDetailHeaderWidget } from './git-commit-detail-header-widget';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { GitDiffTreeModel } from '../diff/git-diff-tree-model';
import { ScmTreeWidget } from '@theia/scm/lib/browser/scm-tree-widget';
import { ScmPreferences } from '@theia/scm/lib/browser/scm-preferences';
export declare class GitCommitDetailWidget extends BaseWidget implements StatefulWidget {
    protected readonly options: GitCommitDetailWidgetOptions;
    protected panel: Panel;
    protected readonly scmService: ScmService;
    protected readonly commitDetailHeaderWidget: GitCommitDetailHeaderWidget;
    protected readonly resourceWidget: ScmTreeWidget;
    protected readonly model: GitDiffTreeModel;
    protected readonly scmPreferences: ScmPreferences;
    set viewMode(mode: 'tree' | 'list');
    get viewMode(): 'tree' | 'list';
    constructor(options: GitCommitDetailWidgetOptions);
    protected init(): void;
    get containerLayout(): PanelLayout;
    /**
     * Updates the view mode based on the preference value.
     * @param preference the view mode preference.
     */
    protected updateViewMode(preference: 'tree' | 'list'): void;
    protected updateImmediately(): void;
    protected onUpdateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
    storeState(): any;
    restoreState(oldState: any): void;
}
//# sourceMappingURL=git-commit-detail-widget.d.ts.map