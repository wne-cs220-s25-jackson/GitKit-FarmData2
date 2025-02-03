import { DisposableCollection, Event } from '@theia/core';
import { UriComponents } from '@theia/core/lib/common/uri';
import { interfaces } from '@theia/core/shared/inversify';
import { NotebookModelResolverService } from '@theia/notebook/lib/browser';
import { NotebookModel } from '@theia/notebook/lib/browser/view-model/notebook-model';
import { NotebookMonacoTextModelService } from '@theia/notebook/lib/browser/service/notebook-monaco-text-model-service';
import { NotebookDataDto, NotebookDocumentsExt, NotebookDocumentsMain } from '../../../common';
import { RPCProtocol } from '../../../common/rpc-protocol';
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { NotebookOpenHandler } from '@theia/notebook/lib/browser/notebook-open-handler';
export declare class NotebookDocumentsMainImpl implements NotebookDocumentsMain {
    protected readonly disposables: DisposableCollection;
    protected readonly proxy: NotebookDocumentsExt;
    protected readonly documentEventListenersMapping: Map<string, DisposableCollection>;
    protected readonly notebookModelResolverService: NotebookModelResolverService;
    protected readonly notebookMonacoTextModelService: NotebookMonacoTextModelService;
    protected readonly notebookOpenHandler: NotebookOpenHandler;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    get onDidAddNotebookCellModel(): Event<MonacoEditorModel>;
    dispose(): void;
    handleNotebooksAdded(notebooks: readonly NotebookModel[]): void;
    handleNotebooksRemoved(uris: UriComponents[]): void;
    $tryCreateNotebook(options: {
        viewType: string;
        content?: NotebookDataDto;
    }): Promise<UriComponents>;
    $tryOpenNotebook(uriComponents: UriComponents): Promise<UriComponents>;
    $trySaveNotebook(uriComponents: UriComponents): Promise<boolean>;
}
//# sourceMappingURL=notebook-documents-main.d.ts.map