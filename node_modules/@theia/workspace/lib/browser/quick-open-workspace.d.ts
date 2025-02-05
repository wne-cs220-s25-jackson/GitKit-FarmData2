import { LabelProvider, QuickInputService, QuickInputButton } from '@theia/core/lib/browser';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { WorkspaceOpenHandlerContribution, WorkspaceService } from './workspace-service';
import { ContributionProvider } from '@theia/core/lib/common';
import { UntitledWorkspaceService } from '../common/untitled-workspace-service';
export declare class QuickOpenWorkspace {
    protected opened: boolean;
    protected readonly quickInputService: QuickInputService;
    protected readonly workspaceService: WorkspaceService;
    protected readonly labelProvider: LabelProvider;
    protected readonly envServer: EnvVariablesServer;
    protected untitledWorkspaceService: UntitledWorkspaceService;
    protected readonly workspaceOpenHandlers: ContributionProvider<WorkspaceOpenHandlerContribution>;
    protected readonly removeRecentWorkspaceButton: QuickInputButton;
    open(workspaces: string[]): Promise<void>;
    select(): void;
}
//# sourceMappingURL=quick-open-workspace.d.ts.map