import { Disposable } from '@theia/core';
import { OpenWithService } from '@theia/core/lib/browser';
import { NotebookTypeDescriptor } from '../common/notebook-protocol';
import { NotebookOpenHandler } from './notebook-open-handler';
export declare class NotebookTypeRegistry {
    protected readonly openWithService: OpenWithService;
    protected readonly notebookOpenHandler: NotebookOpenHandler;
    private readonly _notebookTypes;
    get notebookTypes(): readonly NotebookTypeDescriptor[];
    registerNotebookType(type: NotebookTypeDescriptor, providerName: string): Disposable;
}
//# sourceMappingURL=notebook-type-registry.d.ts.map