import { ITableVirtualDelegate } from '@theia/monaco-editor-core/esm/vs/base/browser/ui/table/table';
import { BareFontInfo } from '@theia/monaco-editor-core/esm/vs/editor/common/config/fontInfo';
import { DisassembledInstructionEntry } from './disassembly-view-utilities';
export declare class DisassemblyViewTableDelegate implements ITableVirtualDelegate<DisassembledInstructionEntry> {
    protected readonly fontInfoProvider: {
        fontInfo: BareFontInfo;
        isSourceCodeRender: boolean;
    };
    constructor(fontInfoProvider: {
        fontInfo: BareFontInfo;
        isSourceCodeRender: boolean;
    });
    headerRowHeight: number;
    getHeight(row: DisassembledInstructionEntry): number;
}
//# sourceMappingURL=disassembly-view-table-delegate.d.ts.map