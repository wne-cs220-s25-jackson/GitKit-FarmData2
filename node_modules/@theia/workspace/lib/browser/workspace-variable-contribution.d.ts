import URI from '@theia/core/lib/common/uri';
import { ApplicationShell, NavigatableWidget, WidgetManager } from '@theia/core/lib/browser';
import { VariableContribution, VariableRegistry } from '@theia/variable-resolver/lib/browser';
import { WorkspaceService } from './workspace-service';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
export declare class WorkspaceVariableContribution implements VariableContribution {
    protected readonly workspaceService: WorkspaceService;
    protected readonly shell: ApplicationShell;
    protected readonly fileService: FileService;
    protected readonly widgetManager: WidgetManager;
    protected currentWidget: NavigatableWidget | undefined;
    protected init(): void;
    protected readonly recentlyVisibleIds: string[];
    protected get recentlyVisible(): NavigatableWidget | undefined;
    protected addRecentlyVisible(widget: NavigatableWidget): void;
    protected removeRecentlyVisible(widget: NavigatableWidget): void;
    protected updateCurrentWidget(): void;
    registerVariables(variables: VariableRegistry): void;
    protected registerWorkspaceRootVariables(variables: VariableRegistry): void;
    getWorkspaceRootUri(uri?: URI | undefined): URI | undefined;
    getResourceUri(): URI | undefined;
    getWorkspaceRelativePath(uri: URI, context?: URI): string | undefined;
}
//# sourceMappingURL=workspace-variable-contribution.d.ts.map