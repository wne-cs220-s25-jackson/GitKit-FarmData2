import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export type NotebookCellExecutionStateContext = 'idle' | 'pending' | 'executing' | 'succeeded' | 'failed';
/**
 * Context Keys for the Notebook Editor as defined by vscode in https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/notebook/common/notebookContextKeys.ts
 */
export declare const HAS_OPENED_NOTEBOOK = "userHasOpenedNotebook";
export declare const KEYBINDING_CONTEXT_NOTEBOOK_FIND_WIDGET_FOCUSED = "notebookFindWidgetFocused";
export declare const NOTEBOOK_EDITOR_FOCUSED = "notebookEditorFocused";
export declare const NOTEBOOK_CELL_LIST_FOCUSED = "notebookCellListFocused";
export declare const NOTEBOOK_OUTPUT_FOCUSED = "notebookOutputFocused";
export declare const NOTEBOOK_OUTPUT_INPUT_FOCUSED = "notebookOutputInputFocused";
export declare const NOTEBOOK_EDITOR_EDITABLE = "notebookEditable";
export declare const NOTEBOOK_HAS_RUNNING_CELL = "notebookHasRunningCell";
export declare const NOTEBOOK_USE_CONSOLIDATED_OUTPUT_BUTTON = "notebookUseConsolidatedOutputButton";
export declare const NOTEBOOK_BREAKPOINT_MARGIN_ACTIVE = "notebookBreakpointMargin";
export declare const NOTEBOOK_CELL_TOOLBAR_LOCATION = "notebookCellToolbarLocation";
export declare const NOTEBOOK_CURSOR_NAVIGATION_MODE = "notebookCursorNavigationMode";
export declare const NOTEBOOK_LAST_CELL_FAILED = "notebookLastCellFailed";
export declare const NOTEBOOK_VIEW_TYPE = "notebookType";
export declare const NOTEBOOK_CELL_TYPE = "notebookCellType";
export declare const NOTEBOOK_CELL_EDITABLE = "notebookCellEditable";
export declare const NOTEBOOK_CELL_FOCUSED = "notebookCellFocused";
export declare const NOTEBOOK_CELL_EDITOR_FOCUSED = "notebookCellEditorFocused";
export declare const NOTEBOOK_CELL_MARKDOWN_EDIT_MODE = "notebookCellMarkdownEditMode";
export declare const NOTEBOOK_CELL_LINE_NUMBERS = "notebookCellLineNumbers";
export declare const NOTEBOOK_CELL_EXECUTION_STATE = "notebookCellExecutionState";
export declare const NOTEBOOK_CELL_EXECUTING = "notebookCellExecuting";
export declare const NOTEBOOK_CELL_HAS_OUTPUTS = "notebookCellHasOutputs";
export declare const NOTEBOOK_CELL_INPUT_COLLAPSED = "notebookCellInputIsCollapsed";
export declare const NOTEBOOK_CELL_OUTPUT_COLLAPSED = "notebookCellOutputIsCollapsed";
export declare const NOTEBOOK_CELL_RESOURCE = "notebookCellResource";
export declare const NOTEBOOK_KERNEL = "notebookKernel";
export declare const NOTEBOOK_KERNEL_COUNT = "notebookKernelCount";
export declare const NOTEBOOK_KERNEL_SOURCE_COUNT = "notebookKernelSourceCount";
export declare const NOTEBOOK_KERNEL_SELECTED = "notebookKernelSelected";
export declare const NOTEBOOK_INTERRUPTIBLE_KERNEL = "notebookInterruptibleKernel";
export declare const NOTEBOOK_MISSING_KERNEL_EXTENSION = "notebookMissingKernelExtension";
export declare const NOTEBOOK_HAS_OUTPUTS = "notebookHasOutputs";
export declare const NOTEBOOK_CELL_CURSOR_FIRST_LINE = "cellEditorCursorPositionFirstLine";
export declare const NOTEBOOK_CELL_CURSOR_LAST_LINE = "cellEditorCursorPositionLastLine";
export declare namespace NotebookContextKeys {
    function initNotebookContextKeys(service: ContextKeyService): void;
}
//# sourceMappingURL=notebook-context-keys.d.ts.map