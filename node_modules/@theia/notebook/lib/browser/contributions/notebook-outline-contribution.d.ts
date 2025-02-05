import { FrontendApplicationContribution, LabelProvider } from '@theia/core/lib/browser';
import { NotebookEditorWidgetService } from '../service/notebook-editor-widget-service';
import { OutlineViewService } from '@theia/outline-view/lib/browser/outline-view-service';
import { NotebookModel } from '../view-model/notebook-model';
import { OutlineSymbolInformationNode } from '@theia/outline-view/lib/browser/outline-view-widget';
import { NotebookEditorWidget } from '../notebook-editor-widget';
import { DisposableCollection, URI } from '@theia/core';
import { NotebookService } from '../service/notebook-service';
export interface NotebookCellOutlineNode extends OutlineSymbolInformationNode {
    uri: URI;
}
export declare namespace NotebookCellOutlineNode {
    function is(element: object): element is NotebookCellOutlineNode;
}
export declare class NotebookOutlineContribution implements FrontendApplicationContribution {
    protected readonly notebookEditorWidgetService: NotebookEditorWidgetService;
    protected readonly outlineViewService: OutlineViewService;
    protected readonly labelProvider: LabelProvider;
    protected readonly notebookService: NotebookService;
    protected currentEditor?: NotebookEditorWidget;
    protected editorListeners: DisposableCollection;
    protected editorModelListeners: DisposableCollection;
    onStart(): void;
    protected updateOutline(editor: NotebookEditorWidget | undefined): Promise<void>;
    protected createRoots(model: NotebookModel): Promise<OutlineSymbolInformationNode[] | undefined>;
    selectCell(node: object): void;
}
//# sourceMappingURL=notebook-outline-contribution.d.ts.map