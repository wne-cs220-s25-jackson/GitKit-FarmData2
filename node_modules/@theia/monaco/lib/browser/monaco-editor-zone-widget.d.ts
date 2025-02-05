import { Disposable, DisposableCollection, Event, Emitter } from '@theia/core';
import * as monaco from '@theia/monaco-editor-core';
export interface MonacoEditorViewZone extends monaco.editor.IViewZone {
    id: string;
}
export declare class MonacoEditorZoneWidget implements Disposable {
    readonly showArrow: boolean;
    private arrow;
    readonly zoneNode: HTMLDivElement;
    readonly containerNode: HTMLDivElement;
    protected readonly onDidLayoutChangeEmitter: Emitter<monaco.editor.IDimension>;
    readonly onDidLayoutChange: Event<monaco.editor.IDimension>;
    protected viewZone: MonacoEditorViewZone | undefined;
    protected readonly toHide: DisposableCollection;
    protected readonly toDispose: DisposableCollection;
    editor: monaco.editor.IStandaloneCodeEditor;
    constructor(editorInstance: monaco.editor.IStandaloneCodeEditor, showArrow?: boolean);
    dispose(): void;
    protected _options: MonacoEditorZoneWidget.Options | undefined;
    get options(): MonacoEditorZoneWidget.Options | undefined;
    hide(): void;
    show(options: MonacoEditorZoneWidget.Options): void;
    layout(heightInLines: number): void;
    protected updateTop(top: number): void;
    protected updateHeight(zoneHeight: number): void;
    protected updateContainerHeight(zoneHeight: number): void;
    protected computeContainerHeight(zoneHeight: number): {
        height: number;
        frameWidth: number;
    };
    protected updateWidth(info?: monaco.editor.EditorLayoutInfo): void;
    protected computeWidth(info?: monaco.editor.EditorLayoutInfo): number;
    protected computeLeft(info?: monaco.editor.EditorLayoutInfo): number;
}
export declare namespace MonacoEditorZoneWidget {
    interface Options {
        afterLineNumber: number;
        afterColumn?: number;
        heightInLines: number;
        showFrame?: boolean;
        frameWidth?: number;
    }
}
//# sourceMappingURL=monaco-editor-zone-widget.d.ts.map