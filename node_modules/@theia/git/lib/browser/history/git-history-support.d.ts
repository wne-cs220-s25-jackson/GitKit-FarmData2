import { Emitter, Disposable } from '@theia/core';
import { Git } from '../../common';
import { ScmHistorySupport, HistoryWidgetOptions } from '@theia/scm-extra/lib/browser/history/scm-history-widget';
import { ScmHistoryCommit } from '@theia/scm-extra/lib/browser/scm-file-change-node';
import { GitScmProvider } from '../git-scm-provider';
import { GitRepositoryTracker } from '../git-repository-tracker';
export declare class GitHistorySupport implements ScmHistorySupport {
    protected readonly provider: GitScmProvider;
    protected readonly git: Git;
    protected readonly repositoryTracker: GitRepositoryTracker;
    getCommitHistory(options?: HistoryWidgetOptions): Promise<ScmHistoryCommit[]>;
    protected readonly onDidChangeHistoryEmitter: Emitter<void>;
    readonly onDidChangeHistory: import("@theia/core").Event<void>;
    protected onGitEventDisposable: Disposable | undefined;
    protected onFirstListenerAdd(): void;
    protected onLastListenerRemove(): void;
}
//# sourceMappingURL=git-history-support.d.ts.map