import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
import { NotebookCellModel } from '../view-model/notebook-cell-model';
import { CellData } from '../../common';
export declare class NotebookClipboardService {
    protected copiedCell: CellData | undefined;
    protected readonly clipboardService: ClipboardService;
    copyCell(cell: NotebookCellModel): void;
    getCell(): CellData | undefined;
}
//# sourceMappingURL=notebook-clipboard-service.d.ts.map