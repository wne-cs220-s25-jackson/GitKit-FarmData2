import { Disposable, DisposableCollection, Emitter, Resource, URI } from '@theia/core';
import { BinaryBuffer } from '@theia/core/lib/common/buffer';
import { NotebookData, TransientOptions } from '../../common';
import { NotebookModel, NotebookModelProps } from '../view-model/notebook-model';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { NotebookCellModel, NotebookCellModelProps } from '../view-model/notebook-cell-model';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { NotebookMonacoTextModelService } from './notebook-monaco-text-model-service';
import { CellEditOperation } from '../notebook-types';
export declare const NotebookProvider: unique symbol;
export interface NotebookProviderInfo {
    readonly notebookType: string;
    readonly serializer: NotebookSerializer;
}
export interface NotebookSerializer {
    options: TransientOptions;
    toNotebook(data: BinaryBuffer): Promise<NotebookData>;
    fromNotebook(data: NotebookData): Promise<BinaryBuffer>;
}
export interface NotebookWorkspaceEdit {
    edits: {
        resource: URI;
        edit: CellEditOperation;
    }[];
}
export declare class NotebookService implements Disposable {
    protected fileService: FileService;
    protected notebookModelFactory: (props: NotebookModelProps) => NotebookModel;
    protected notebookCellModelFactory: (props: NotebookCellModelProps) => NotebookCellModel;
    protected textModelService: NotebookMonacoTextModelService;
    protected willUseNotebookSerializerEmitter: Emitter<string>;
    readonly onWillUseNotebookSerializer: import("@theia/core").Event<string>;
    protected readonly disposables: DisposableCollection;
    protected readonly notebookProviders: Map<string, NotebookProviderInfo>;
    protected readonly notebookModels: Map<string, NotebookModel>;
    protected readonly didRegisterNotebookSerializerEmitter: Emitter<string>;
    readonly onDidRegisterNotebookSerializer: import("@theia/core").Event<string>;
    protected readonly didRemoveViewTypeEmitter: Emitter<string>;
    readonly onDidRemoveViewType: import("@theia/core").Event<string>;
    protected readonly willOpenNotebookTypeEmitter: Emitter<string>;
    readonly onWillOpenNotebook: import("@theia/core").Event<string>;
    protected readonly didAddNotebookDocumentEmitter: Emitter<NotebookModel>;
    readonly onDidAddNotebookDocument: import("@theia/core").Event<NotebookModel>;
    protected readonly didRemoveNotebookDocumentEmitter: Emitter<NotebookModel>;
    readonly onDidRemoveNotebookDocument: import("@theia/core").Event<NotebookModel>;
    dispose(): void;
    protected readonly ready: Deferred<void>;
    /**
     * Marks the notebook service as ready. From this point on, the service will start dispatching the `onNotebookSerializer` event.
     */
    markReady(): void;
    registerNotebookSerializer(viewType: string, serializer: NotebookSerializer): Disposable;
    createNotebookModel(data: NotebookData, viewType: string, resource: Resource): Promise<NotebookModel>;
    getNotebookDataProvider(viewType: string): Promise<NotebookProviderInfo>;
    /**
     * When the application starts up, notebook providers from plugins are not registered yet.
     * It takes a few seconds for the plugin host to start so that notebook data providers can be registered.
     * This methods waits until the notebook provider is registered.
     */
    protected waitForNotebookProvider(type: string): Promise<NotebookProviderInfo>;
    getNotebookEditorModel(uri: URI): NotebookModel | undefined;
    getNotebookModels(): Iterable<NotebookModel>;
    willOpenNotebook(type: string): Promise<void>;
    listNotebookDocuments(): NotebookModel[];
    applyWorkspaceEdit(workspaceEdit: NotebookWorkspaceEdit): boolean;
    getCodeCellLanguage(model: NotebookModel): string;
}
//# sourceMappingURL=notebook-service.d.ts.map