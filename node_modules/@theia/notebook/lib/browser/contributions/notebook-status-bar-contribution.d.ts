import { StatusBar, Widget, WidgetStatusBarContribution } from '@theia/core/lib/browser';
import { Disposable } from '@theia/core/lib/common';
import { NotebookEditorWidget } from '../notebook-editor-widget';
export declare const NOTEBOOK_CELL_SELECTION_STATUS_BAR_ID = "notebook-cell-selection-position";
export declare class NotebookStatusBarContribution implements WidgetStatusBarContribution<NotebookEditorWidget> {
    protected onDeactivate: Disposable | undefined;
    canHandle(widget: Widget): widget is NotebookEditorWidget;
    activate(statusBar: StatusBar, widget: NotebookEditorWidget): void;
    deactivate(statusBar: StatusBar): void;
    protected updateStatusbar(statusBar: StatusBar, editor?: NotebookEditorWidget): Promise<void>;
}
//# sourceMappingURL=notebook-status-bar-contribution.d.ts.map