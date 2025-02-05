import { Command, URI } from '@theia/core';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering/markdown-string';
import { BinaryBuffer } from '@theia/core/lib/common/buffer';
import { UriComponents } from '@theia/core/lib/common/uri';
export interface NotebookCommand extends Command {
    title?: string;
    tooltip?: string;
    arguments?: any[];
}
export declare enum CellKind {
    Markup = 1,
    Code = 2
}
export interface NotebookCellMetadata {
    /**
     * custom metadata
     */
    [key: string]: unknown;
}
export interface NotebookCellInternalMetadata {
    executionId?: string;
    executionOrder?: number;
    lastRunSuccess?: boolean;
    runStartTime?: number;
    runStartTimeAdjustment?: number;
    runEndTime?: number;
    renderDuration?: {
        [key: string]: number;
    };
}
export type NotebookDocumentMetadata = Record<string, unknown>;
export interface NotebookCellStatusBarItem {
    readonly alignment: CellStatusbarAlignment;
    readonly priority?: number;
    readonly text: string;
    readonly tooltip?: string | MarkdownString;
    readonly command?: string | Command;
    readonly opacity?: string;
    readonly onlyShowWhenActive?: boolean;
}
export declare const enum CellStatusbarAlignment {
    Left = 1,
    Right = 2
}
export type TransientCellMetadata = {
    readonly [K in keyof NotebookCellMetadata]?: boolean;
};
export type CellContentMetadata = {
    readonly [K in keyof NotebookCellMetadata]?: boolean;
};
export type TransientDocumentMetadata = {
    readonly [K in keyof NotebookDocumentMetadata]?: boolean;
};
export interface TransientOptions {
    readonly transientOutputs: boolean;
    readonly transientCellMetadata: TransientCellMetadata;
    readonly transientDocumentMetadata: TransientDocumentMetadata;
}
export interface CellOutputItem {
    readonly mime: string;
    readonly data: BinaryBuffer;
}
export interface CellOutput {
    outputId: string;
    outputs: CellOutputItem[];
    metadata?: Record<string, unknown>;
}
export interface NotebookCellCollapseState {
    inputCollapsed?: boolean;
    outputCollapsed?: boolean;
}
export interface CellData {
    source: string;
    language: string;
    cellKind: CellKind;
    outputs: CellOutput[];
    metadata?: NotebookCellMetadata;
    internalMetadata?: NotebookCellInternalMetadata;
    collapseState?: NotebookCellCollapseState;
}
export interface NotebookDocumentMetadataEdit {
    editType: CellEditType.DocumentMetadata;
    metadata: NotebookDocumentMetadata;
}
export interface NotebookData {
    readonly cells: CellData[];
    readonly metadata: NotebookDocumentMetadata;
}
export interface NotebookContributionData {
    extension?: string;
    providerDisplayName: string;
    displayName: string;
    filenamePattern: (string)[];
    exclusive: boolean;
}
export interface NotebookCellTextModelSplice<T> {
    start: number;
    deleteCount: number;
    newItems: T[];
    /**
     * In case of e.g. deletion, the handle of the first cell that was deleted.
     * -1 in case of new Cells are added at the end.
     */
    startHandle: number;
}
export declare enum NotebookCellsChangeType {
    ModelChange = 1,
    Move = 2,
    ChangeCellLanguage = 5,
    Initialize = 6,
    ChangeCellMetadata = 7,
    Output = 8,
    OutputItem = 9,
    ChangeCellContent = 10,
    ChangeDocumentMetadata = 11,
    ChangeCellInternalMetadata = 12,
    Unknown = 100
}
export interface NotebookCellsChangeLanguageEvent {
    readonly kind: NotebookCellsChangeType.ChangeCellLanguage;
    readonly index: number;
    readonly language: string;
}
export interface NotebookCellsChangeMetadataEvent {
    readonly kind: NotebookCellsChangeType.ChangeCellMetadata;
    readonly index: number;
    readonly metadata: NotebookCellMetadata;
}
export interface NotebookCellsChangeInternalMetadataEvent {
    readonly kind: NotebookCellsChangeType.ChangeCellInternalMetadata;
    readonly index: number;
    readonly internalMetadata: NotebookCellInternalMetadata;
}
export interface NotebookCellContentChangeEvent {
    readonly kind: NotebookCellsChangeType.ChangeCellContent;
    readonly index: number;
}
export interface NotebookModelResource {
    notebookModelUri: URI;
}
export declare namespace NotebookModelResource {
    function is(item: unknown): item is NotebookModelResource;
    function create(uri: URI): NotebookModelResource;
}
export interface NotebookCellModelResource {
    notebookCellModelUri: URI;
}
export declare namespace NotebookCellModelResource {
    function is(item: unknown): item is NotebookCellModelResource;
    function create(uri: URI): NotebookCellModelResource;
}
export declare enum NotebookCellExecutionState {
    Unconfirmed = 1,
    Pending = 2,
    Executing = 3
}
export declare enum CellExecutionUpdateType {
    Output = 1,
    OutputItems = 2,
    ExecutionState = 3
}
export interface CellExecuteOutputEdit {
    editType: CellExecutionUpdateType.Output;
    cellHandle: number;
    append?: boolean;
    outputs: CellOutput[];
}
export interface CellExecuteOutputItemEdit {
    editType: CellExecutionUpdateType.OutputItems;
    append?: boolean;
    outputId: string;
    items: CellOutputItem[];
}
export interface CellExecutionStateUpdateDto {
    editType: CellExecutionUpdateType.ExecutionState;
    executionOrder?: number;
    runStartTime?: number;
    didPause?: boolean;
    isPaused?: boolean;
}
export interface CellMetadataEdit {
    editType: CellEditType.Metadata;
    index: number;
    metadata: NotebookCellMetadata;
}
export declare const enum CellEditType {
    Replace = 1,
    Output = 2,
    Metadata = 3,
    CellLanguage = 4,
    DocumentMetadata = 5,
    Move = 6,
    OutputItems = 7,
    PartialMetadata = 8,
    PartialInternalMetadata = 9
}
export interface NotebookKernelSourceAction {
    readonly label: string;
    readonly description?: string;
    readonly detail?: string;
    readonly command?: string | Command;
    readonly documentation?: UriComponents | string;
}
/**
 * Whether the provided mime type is a text stream like `stdout`, `stderr`.
 */
export declare function isTextStreamMime(mimeType: string): boolean;
export declare namespace CellUri {
    const cellUriScheme = "vscode-notebook-cell";
    const outputUriScheme = "vscode-notebook-cell-output";
    function generate(notebook: URI, handle: number): URI;
    function parse(cell: URI): {
        notebook: URI;
        handle: number;
    } | undefined;
    function generateCellOutputUri(notebook: URI, outputId?: string): URI;
    function parseCellOutputUri(uri: URI): {
        notebook: URI;
        outputId?: string;
    } | undefined;
    function generateCellPropertyUri(notebook: URI, handle: number, cellScheme: string): URI;
    function parseCellPropertyUri(uri: URI, propertyScheme: string): {
        notebook: URI;
        handle: number;
    } | undefined;
}
//# sourceMappingURL=notebook-common.d.ts.map