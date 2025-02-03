import { Emitter, Resource, ResourceProvider, URI } from '@theia/core';
import { UriComponents } from '@theia/core/lib/common/uri';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { NotebookData } from '../../common';
import { NotebookModel } from '../view-model/notebook-model';
import { NotebookService } from './notebook-service';
import { NotebookTypeRegistry } from '../notebook-type-registry';
import { NotebookFileSelector } from '../../common/notebook-protocol';
export interface UntitledResource {
    untitledResource: URI | undefined;
}
export declare class NotebookModelResolverService {
    protected fileService: FileService;
    protected resourceProvider: ResourceProvider;
    protected notebookService: NotebookService;
    protected notebookTypeRegistry: NotebookTypeRegistry;
    protected onDidChangeDirtyEmitter: Emitter<NotebookModel>;
    readonly onDidChangeDirty: import("@theia/core").Event<NotebookModel>;
    protected onDidSaveNotebookEmitter: Emitter<UriComponents>;
    readonly onDidSaveNotebook: import("@theia/core").Event<UriComponents>;
    resolve(resource: URI, viewType?: string): Promise<NotebookModel>;
    resolveUntitledResource(arg: UntitledResource, viewType: string): Promise<NotebookModel>;
    resolveExistingNotebookData(resource: Resource, viewType: string): Promise<NotebookData>;
    protected getPossibleFileEnding(selectors: readonly NotebookFileSelector[]): string | undefined;
    protected possibleFileEnding(selector: NotebookFileSelector): string | undefined;
    protected findViewTypeForResource(resource: URI): string | undefined;
}
//# sourceMappingURL=notebook-model-resolver-service.d.ts.map