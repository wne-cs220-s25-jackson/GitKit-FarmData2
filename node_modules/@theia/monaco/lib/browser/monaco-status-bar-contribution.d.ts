import { DisposableCollection } from '@theia/core';
import { StatusBar, Widget, WidgetStatusBarContribution } from '@theia/core/lib/browser';
import { EditorWidget } from '@theia/editor/lib/browser';
import * as monaco from '@theia/monaco-editor-core';
export declare const EDITOR_STATUS_TABBING_CONFIG = "editor-status-tabbing-config";
export declare const EDITOR_STATUS_EOL = "editor-status-eol";
export declare class MonacoStatusBarContribution implements WidgetStatusBarContribution<EditorWidget> {
    protected readonly toDispose: DisposableCollection;
    canHandle(widget: Widget): widget is EditorWidget;
    activate(statusBar: StatusBar, editor: EditorWidget): void;
    deactivate(statusBar: StatusBar): void;
    protected setConfigTabSizeWidget(statusBar: StatusBar, model: monaco.editor.ITextModel): void;
    protected removeConfigTabSizeWidget(statusBar: StatusBar): void;
    protected setLineEndingWidget(statusBar: StatusBar, model: monaco.editor.ITextModel): void;
    protected removeLineEndingWidget(statusBar: StatusBar): void;
    protected getModel(editor: EditorWidget | undefined): monaco.editor.ITextModel | undefined;
}
//# sourceMappingURL=monaco-status-bar-contribution.d.ts.map