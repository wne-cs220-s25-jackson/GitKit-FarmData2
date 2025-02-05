import URI from '@theia/core/lib/common/uri';
import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory';
import { EditorPreviewWidget } from './editor-preview-widget';
import { NavigatableWidgetOptions } from '@theia/core/lib/browser';
export interface EditorPreviewOptions extends NavigatableWidgetOptions {
    preview?: boolean;
}
export declare class EditorPreviewWidgetFactory extends EditorWidgetFactory {
    static ID: string;
    readonly id: string;
    createWidget(options: EditorPreviewOptions): Promise<EditorPreviewWidget>;
    protected constructEditor(uri: URI): Promise<EditorPreviewWidget>;
}
//# sourceMappingURL=editor-preview-widget-factory.d.ts.map