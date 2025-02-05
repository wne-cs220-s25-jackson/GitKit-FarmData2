import { BaseWidget, StatefulWidget, Panel, PanelLayout, Message } from '@theia/core/lib/browser';
import { EditorManager, DiffNavigatorProvider } from '@theia/editor/lib/browser';
import { GitDiffTreeModel } from './git-diff-tree-model';
import { GitWatcher } from '../../common';
import { GitDiffHeaderWidget } from './git-diff-header-widget';
import { ScmService } from '@theia/scm/lib/browser/scm-service';
import { GitRepositoryProvider } from '../git-repository-provider';
import { ScmTreeWidget } from '@theia/scm/lib/browser/scm-tree-widget';
import { ScmPreferences } from '@theia/scm/lib/browser/scm-preferences';
export declare const GIT_DIFF = "git-diff";
export declare class GitDiffWidget extends BaseWidget implements StatefulWidget {
    protected readonly GIT_DIFF_TITLE: string;
    protected readonly repositoryProvider: GitRepositoryProvider;
    protected readonly diffNavigatorProvider: DiffNavigatorProvider;
    protected readonly editorManager: EditorManager;
    protected readonly gitWatcher: GitWatcher;
    protected readonly diffHeaderWidget: GitDiffHeaderWidget;
    protected readonly resourceWidget: ScmTreeWidget;
    protected readonly model: GitDiffTreeModel;
    protected readonly scmService: ScmService;
    protected readonly scmPreferences: ScmPreferences;
    protected panel: Panel;
    constructor();
    protected init(): void;
    set viewMode(mode: 'tree' | 'list');
    get viewMode(): 'tree' | 'list';
    setContent(options: GitDiffTreeModel.Options): Promise<void>;
    get containerLayout(): PanelLayout;
    /**
     * Updates the view mode based on the preference value.
     * @param preference the view mode preference.
     */
    protected updateViewMode(preference: 'tree' | 'list'): void;
    protected updateImmediately(): void;
    protected onUpdateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
    goToPreviousChange(): void;
    goToNextChange(): void;
    storeState(): object;
    restoreState(oldState: any): void;
}
//# sourceMappingURL=git-diff-widget.d.ts.map