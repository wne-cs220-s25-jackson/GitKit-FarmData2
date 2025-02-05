import { StorageService } from '@theia/core/lib/browser';
import { NotebookKernel, NotebookTextModelLike, NotebookKernelService } from './notebook-kernel-service';
import { CommandService, Disposable } from '@theia/core';
import { NotebookModel } from '../view-model/notebook-model';
interface KernelsList {
    [viewType: string]: string[];
}
interface MostRecentKernelsResult {
    selected?: NotebookKernel;
    all: NotebookKernel[];
}
export declare class NotebookKernelHistoryService implements Disposable {
    protected storageService: StorageService;
    protected notebookKernelService: NotebookKernelService;
    protected commandService: CommandService;
    protected static STORAGE_KEY: string;
    protected mostRecentKernelsMap: KernelsList;
    protected init(): void;
    getKernels(notebook: NotebookTextModelLike): MostRecentKernelsResult;
    resolveSelectedKernel(notebook: NotebookModel): Promise<NotebookKernel | undefined>;
    addMostRecentKernel(kernel: NotebookKernel): void;
    protected saveState(): void;
    protected loadState(): Promise<void>;
    clear(): void;
    dispose(): void;
}
export {};
//# sourceMappingURL=notebook-kernel-history-service.d.ts.map