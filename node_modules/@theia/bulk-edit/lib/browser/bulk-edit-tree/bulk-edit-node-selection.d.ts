import { SelectionService } from '@theia/core/lib/common/selection-service';
import { SelectionCommandHandler } from '@theia/core/lib/common/selection-command-handler';
import { ResourceFileEdit, ResourceTextEdit } from '@theia/monaco-editor-core/esm/vs/editor/browser/services/bulkEditService';
export interface BulkEditNodeSelection {
    bulkEdit: ResourceFileEdit | ResourceTextEdit;
}
export declare namespace BulkEditNodeSelection {
    function is(arg: unknown): arg is BulkEditNodeSelection;
    class CommandHandler extends SelectionCommandHandler<BulkEditNodeSelection> {
        protected readonly selectionService: SelectionService;
        protected readonly options: SelectionCommandHandler.Options<BulkEditNodeSelection>;
        constructor(selectionService: SelectionService, options: SelectionCommandHandler.Options<BulkEditNodeSelection>);
    }
}
//# sourceMappingURL=bulk-edit-node-selection.d.ts.map