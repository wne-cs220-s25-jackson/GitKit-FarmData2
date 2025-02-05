/// <reference types="react" />
import { Disposable, Event } from '@theia/core';
import { NotebookModel } from '../view-model/notebook-model';
import { NotebookEditorWidget } from '../notebook-editor-widget';
import { NotebookContentChangedEvent } from '../notebook-types';
import { NotebookCellOutputModel } from '../view-model/notebook-cell-output-model';
import { NotebookCellModel } from '../view-model/notebook-cell-model';
export declare const CellOutputWebviewFactory: unique symbol;
export declare const CellOutputWebview: unique symbol;
export type CellOutputWebviewFactory = () => Promise<CellOutputWebview>;
export interface OutputRenderEvent {
    cellHandle: number;
    outputId: string;
    outputHeight: number;
}
export interface CellOutputWebview extends Disposable {
    readonly id: string;
    init(notebook: NotebookModel, editor: NotebookEditorWidget): void;
    render(): React.ReactNode;
    setCellHeight(cell: NotebookCellModel, height: number): void;
    cellsChanged(cellEvent: NotebookContentChangedEvent[]): void;
    onDidRenderOutput: Event<OutputRenderEvent>;
    requestOutputPresentationUpdate(cellHandle: number, output: NotebookCellOutputModel): void;
    isAttached(): boolean;
}
//# sourceMappingURL=cell-output-webview.d.ts.map