import { Disposable, DisposableCollection } from '@theia/core';
import { interfaces } from '@theia/core/shared/inversify';
import { UriComponents } from '@theia/core/lib/common/uri';
import { NotebookEditorWidget, NotebookService, NotebookEditorWidgetService } from '@theia/notebook/lib/browser';
import { NotebookModel } from '@theia/notebook/lib/browser/view-model/notebook-model';
import { NotebookDocumentsAndEditorsMain, NotebooksExt } from '../../../common';
import { RPCProtocol } from '../../../common/rpc-protocol';
import { WidgetManager } from '@theia/core/lib/browser';
import { NotebookEditorsMainImpl } from './notebook-editors-main';
import { NotebookDocumentsMainImpl } from './notebook-documents-main';
import { Mutex } from 'async-mutex';
import { TabsMainImpl } from '../tabs/tabs-main';
interface NotebookAndEditorDelta {
    removedDocuments: UriComponents[];
    addedDocuments: NotebookModel[];
    removedEditors: string[];
    addedEditors: NotebookEditorWidget[];
    newActiveEditor?: string | null;
    visibleEditors?: string[];
}
declare class NotebookAndEditorState {
    readonly documents: Set<NotebookModel>;
    readonly textEditors: Map<string, NotebookEditorWidget>;
    readonly activeEditor: string | null | undefined;
    readonly visibleEditors: Map<string, NotebookEditorWidget>;
    static computeDelta(before: NotebookAndEditorState | undefined, after: NotebookAndEditorState): NotebookAndEditorDelta;
    constructor(documents: Set<NotebookModel>, textEditors: Map<string, NotebookEditorWidget>, activeEditor: string | null | undefined, visibleEditors: Map<string, NotebookEditorWidget>);
}
export declare class NotebooksAndEditorsMain implements NotebookDocumentsAndEditorsMain {
    protected readonly notebookDocumentsMain: NotebookDocumentsMainImpl;
    protected readonly notebookEditorsMain: NotebookEditorsMainImpl;
    protected readonly proxy: NotebooksExt;
    protected readonly disposables: DisposableCollection;
    protected readonly editorListeners: Map<string, Disposable[]>;
    protected currentState?: NotebookAndEditorState;
    protected readonly updateMutex: Mutex;
    protected readonly notebookService: NotebookService;
    protected readonly notebookEditorService: NotebookEditorWidgetService;
    protected readonly WidgetManager: WidgetManager;
    constructor(rpc: RPCProtocol, container: interfaces.Container, tabsMain: TabsMainImpl, notebookDocumentsMain: NotebookDocumentsMainImpl, notebookEditorsMain: NotebookEditorsMainImpl);
    dispose(): void;
    private handleEditorAdd;
    private handleEditorRemove;
    private updateState;
    private doUpdateState;
    private onDelta;
    private static isDeltaEmpty;
    private static asModelAddData;
    private static asEditorAddData;
}
export {};
//# sourceMappingURL=notebook-documents-and-editors-main.d.ts.map