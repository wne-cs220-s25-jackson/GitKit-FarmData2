import { CellData, CellEditType, CellMetadataEdit, CellOutput, CellOutputItem, CellRange, NotebookCellContentChangeEvent, NotebookCellInternalMetadata, NotebookCellMetadata, NotebookCellsChangeInternalMetadataEvent, NotebookCellsChangeLanguageEvent, NotebookCellsChangeMetadataEvent, NotebookCellsChangeType, NotebookCellTextModelSplice, NotebookDocumentMetadata } from '../common';
import { NotebookCell } from './view-model/notebook-cell-model';
export interface NotebookTextModelChangedEvent {
    readonly rawEvents: NotebookContentChangedEvent[];
    readonly synchronous?: boolean;
    readonly endSelectionState?: SelectionState;
}
export type NotebookContentChangedEvent = (NotebookCellsInitializeEvent<NotebookCell> | NotebookDocumentChangeMetadataEvent | NotebookCellContentChangeEvent | NotebookCellsModelChangedEvent<NotebookCell> | NotebookCellsModelMoveEvent<NotebookCell> | NotebookOutputChangedEvent | NotebookOutputItemChangedEvent | NotebookCellsChangeLanguageEvent | NotebookCellsChangeMetadataEvent | NotebookCellsChangeInternalMetadataEvent | NotebookDocumentUnknownChangeEvent);
export interface NotebookCellsInitializeEvent<T> {
    readonly kind: NotebookCellsChangeType.Initialize;
    readonly changes: NotebookCellTextModelSplice<T>[];
}
export interface NotebookDocumentChangeMetadataEvent {
    readonly kind: NotebookCellsChangeType.ChangeDocumentMetadata;
    readonly metadata: NotebookDocumentMetadata;
}
export interface NotebookCellsModelChangedEvent<T> {
    readonly kind: NotebookCellsChangeType.ModelChange;
    readonly changes: NotebookCellTextModelSplice<T>[];
}
export interface NotebookModelWillAddRemoveEvent {
    readonly rawEvent: NotebookCellsModelChangedEvent<CellData>;
}
export interface NotebookCellsModelMoveEvent<T> {
    readonly kind: NotebookCellsChangeType.Move;
    readonly index: number;
    readonly length: number;
    readonly newIdx: number;
    readonly cells: T[];
}
export interface NotebookOutputChangedEvent {
    readonly kind: NotebookCellsChangeType.Output;
    readonly index: number;
    readonly outputs: CellOutput[];
    readonly append: boolean;
}
export interface NotebookOutputItemChangedEvent {
    readonly kind: NotebookCellsChangeType.OutputItem;
    readonly index: number;
    readonly outputId: string;
    readonly outputItems: CellOutputItem[];
    readonly append: boolean;
}
export interface NotebookDocumentUnknownChangeEvent {
    readonly kind: NotebookCellsChangeType.Unknown;
}
export declare enum SelectionStateType {
    Handle = 0,
    Index = 1
}
export interface SelectionHandleState {
    kind: SelectionStateType.Handle;
    primary: number | null;
    selections: number[];
}
export interface SelectionIndexState {
    kind: SelectionStateType.Index;
    focus: CellRange;
    selections: CellRange[];
}
export type SelectionState = SelectionHandleState | SelectionIndexState;
export interface NotebookModelWillAddRemoveEvent {
    readonly newCellIds?: number[];
    readonly rawEvent: NotebookCellsModelChangedEvent<CellData>;
}
export interface CellOutputEdit {
    editType: CellEditType.Output;
    index: number;
    outputs: CellOutput[];
    deleteCount?: number;
    append?: boolean;
}
export interface CellOutputEditByHandle {
    editType: CellEditType.Output;
    handle: number;
    outputs: CellOutput[];
    deleteCount?: number;
    append?: boolean;
}
export interface CellOutputItemEdit {
    editType: CellEditType.OutputItems;
    items: CellOutputItem[];
    outputId: string;
    append?: boolean;
}
export interface CellLanguageEdit {
    editType: CellEditType.CellLanguage;
    index: number;
    language: string;
}
export interface DocumentMetadataEdit {
    editType: CellEditType.DocumentMetadata;
    metadata: NotebookDocumentMetadata;
}
export interface CellMoveEdit {
    editType: CellEditType.Move;
    index: number;
    length: number;
    newIdx: number;
}
export interface CellReplaceEdit {
    editType: CellEditType.Replace;
    index: number;
    count: number;
    cells: CellData[];
}
export interface CellPartialMetadataEdit {
    editType: CellEditType.PartialMetadata;
    index: number;
    metadata: NullablePartialNotebookCellMetadata;
}
export type ImmediateCellEditOperation = CellOutputEditByHandle | CellOutputItemEdit | CellPartialInternalMetadataEditByHandle;
export type CellEditOperation = ImmediateCellEditOperation | CellReplaceEdit | CellOutputEdit | CellMetadataEdit | CellLanguageEdit | DocumentMetadataEdit | CellMoveEdit | CellPartialMetadataEdit;
export type NullablePartialNotebookCellInternalMetadata = {
    [Key in keyof Partial<NotebookCellInternalMetadata>]: NotebookCellInternalMetadata[Key] | null;
};
export type NullablePartialNotebookCellMetadata = {
    [Key in keyof Partial<NotebookCellMetadata>]: NotebookCellMetadata[Key] | null;
};
export interface CellPartialInternalMetadataEditByHandle {
    editType: CellEditType.PartialInternalMetadata;
    handle: number;
    internalMetadata: NullablePartialNotebookCellInternalMetadata;
}
export interface NotebookCellOutputsSplice {
    start: number;
    deleteCount: number;
    newOutputs: CellOutput[];
}
//# sourceMappingURL=notebook-types.d.ts.map