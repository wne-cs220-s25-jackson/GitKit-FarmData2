import { Widget } from '@theia/core/lib/browser/widgets/widget';
import { CommandRegistry } from '@theia/core/lib/common';
import { AbstractViewContribution } from '@theia/core/lib/browser/shell/view-contribution';
import { MonacoBulkEditService } from '@theia/monaco/lib/browser/monaco-bulk-edit-service';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { BulkEditTreeWidget } from './bulk-edit-tree';
import { QuickViewService } from '@theia/core/lib/browser';
import { ResourceEdit } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService';
export declare class BulkEditContribution extends AbstractViewContribution<BulkEditTreeWidget> implements TabBarToolbarContribution {
    protected edits: ResourceEdit[];
    protected readonly quickView: QuickViewService;
    protected readonly bulkEditService: MonacoBulkEditService;
    constructor();
    protected init(): void;
    registerCommands(registry: CommandRegistry): void;
    registerToolbarItems(toolbarRegistry: TabBarToolbarRegistry): Promise<void>;
    protected withWidget<T>(widget: Widget | undefined, cb: (bulkEdit: BulkEditTreeWidget) => T): T | false;
    private previewEdit;
    private apply;
    private discard;
}
//# sourceMappingURL=bulk-edit-contribution.d.ts.map