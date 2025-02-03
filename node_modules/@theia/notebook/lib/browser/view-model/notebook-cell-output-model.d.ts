import { Disposable } from '@theia/core';
import { CellOutput, CellOutputItem } from '../../common';
export declare class NotebookCellOutputModel implements Disposable {
    protected rawOutput: CellOutput;
    private didChangeDataEmitter;
    readonly onDidChangeData: import("@theia/core").Event<void>;
    get outputId(): string;
    get outputs(): CellOutputItem[];
    get metadata(): Record<string, unknown> | undefined;
    constructor(rawOutput: CellOutput);
    replaceData(rawData: CellOutput): void;
    appendData(items: CellOutputItem[]): void;
    dispose(): void;
    getData(): CellOutput;
    private optimizeOutputItems;
}
//# sourceMappingURL=notebook-cell-output-model.d.ts.map