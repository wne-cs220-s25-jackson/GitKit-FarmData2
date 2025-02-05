import { Event, Emitter, Resource, ResourceReadOptions, ResourceResolver, URI } from '@theia/core';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
import { NotebookService } from './service/notebook-service';
import { NotebookCellModel } from './view-model/notebook-cell-model';
import { NotebookModel } from './view-model/notebook-model';
export declare class NotebookCellResource implements Resource {
    protected readonly onDidChangeContentsEmitter: Emitter<void>;
    get onDidChangeContents(): Event<void>;
    get onDidChangeReadOnly(): Event<boolean | MarkdownString> | undefined;
    get readOnly(): boolean | MarkdownString | undefined;
    protected cell: NotebookCellModel;
    protected notebook: NotebookModel;
    uri: URI;
    constructor(uri: URI, notebook: NotebookModel, cell: NotebookCellModel);
    readContents(options?: ResourceReadOptions | undefined): Promise<string>;
    dispose(): void;
}
export declare class NotebookCellResourceResolver implements ResourceResolver {
    protected readonly notebookService: NotebookService;
    resolve(uri: URI): Promise<Resource>;
}
export declare class NotebookOutputResourceResolver implements ResourceResolver {
    protected readonly notebookService: NotebookService;
    resolve(uri: URI): Promise<Resource>;
}
//# sourceMappingURL=notebook-cell-resource-resolver.d.ts.map