import { CommandRegistry, MenuModelRegistry } from '@theia/core/lib/common';
import { AbstractViewContribution, FrontendApplicationContribution, FrontendApplication, PreferenceService } from '@theia/core/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { GettingStartedWidget } from './getting-started-widget';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { PreviewContribution } from '@theia/preview/lib/browser/preview-contribution';
import { WorkspaceService } from '@theia/workspace/lib/browser';
/**
 * Triggers opening the `GettingStartedWidget`.
 */
export declare const GettingStartedCommand: {
    id: string;
    label: string;
};
export declare class GettingStartedContribution extends AbstractViewContribution<GettingStartedWidget> implements FrontendApplicationContribution {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly editorManager: EditorManager;
    protected readonly fileService: FileService;
    protected readonly preferenceService: PreferenceService;
    protected readonly previewContribution: PreviewContribution;
    protected readonly stateService: FrontendApplicationStateService;
    protected readonly workspaceService: WorkspaceService;
    constructor();
    onStart(app: FrontendApplication): Promise<void>;
    protected openReadme(): Promise<void>;
    registerCommands(registry: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
}
//# sourceMappingURL=getting-started-contribution.d.ts.map