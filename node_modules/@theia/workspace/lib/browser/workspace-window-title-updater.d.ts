import { WindowTitleUpdater } from '@theia/core/lib/browser/window/window-title-updater';
import { Widget } from '@theia/core/lib/browser/widgets/widget';
import { WorkspaceService } from './workspace-service';
export declare class WorkspaceWindowTitleUpdater extends WindowTitleUpdater {
    protected readonly workspaceService: WorkspaceService;
    protected updateTitleWidget(widget?: Widget): void;
}
//# sourceMappingURL=workspace-window-title-updater.d.ts.map