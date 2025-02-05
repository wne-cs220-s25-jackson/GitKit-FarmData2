import URI from '@theia/core/lib/common/uri';
import { SelectionService } from '@theia/core/lib/common';
import { NavigatableWidgetOptions, WidgetFactory, LabelProvider } from '@theia/core/lib/browser';
import { EditorWidget } from './editor-widget';
import { TextEditorProvider } from './editor';
export declare class EditorWidgetFactory implements WidgetFactory {
    static createID(uri: URI, counter?: number): string;
    static ID: string;
    readonly id: string;
    protected readonly labelProvider: LabelProvider;
    protected readonly editorProvider: TextEditorProvider;
    protected readonly selectionService: SelectionService;
    createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget>;
    protected createEditor(uri: URI, options?: NavigatableWidgetOptions): Promise<EditorWidget>;
    protected constructEditor(uri: URI): Promise<EditorWidget>;
    private setLabels;
}
//# sourceMappingURL=editor-widget-factory.d.ts.map