import { SelectionService } from '@theia/core/lib/common/selection-service';
import { SelectionCommandHandler } from '@theia/core/lib/common/selection-command-handler';
import { FileStat } from '../common/files';
export interface FileSelection {
    fileStat: FileStat;
}
export declare namespace FileSelection {
    function is(arg: unknown): arg is FileSelection;
    class CommandHandler extends SelectionCommandHandler<FileSelection> {
        protected readonly selectionService: SelectionService;
        protected readonly options: SelectionCommandHandler.Options<FileSelection>;
        constructor(selectionService: SelectionService, options: SelectionCommandHandler.Options<FileSelection>);
    }
}
//# sourceMappingURL=file-selection.d.ts.map