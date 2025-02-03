import { Command, CommandService, Disposable, Emitter, Event, URI } from '@theia/core';
import { StorageService } from '@theia/core/lib/browser';
import { NotebookKernelSourceAction } from '../../common';
import { NotebookModel } from '../view-model/notebook-model';
import { NotebookService } from './notebook-service';
export interface SelectedNotebookKernelChangeEvent {
    notebook: URI;
    oldKernel: string | undefined;
    newKernel: string | undefined;
}
export interface NotebookKernelMatchResult {
    readonly selected: NotebookKernel | undefined;
    readonly suggestions: NotebookKernel[];
    readonly all: NotebookKernel[];
    readonly hidden: NotebookKernel[];
}
export interface NotebookKernelChangeEvent {
    label?: true;
    description?: true;
    detail?: true;
    supportedLanguages?: true;
    hasExecutionOrder?: true;
    hasInterruptHandler?: true;
}
export interface NotebookKernel {
    readonly id: string;
    readonly viewType: string;
    readonly onDidChange: Event<Readonly<NotebookKernelChangeEvent>>;
    readonly extensionId: string;
    readonly localResourceRoot: URI;
    readonly preloadUris: URI[];
    readonly preloadProvides: string[];
    readonly handle: number;
    label: string;
    description?: string;
    detail?: string;
    supportedLanguages: string[];
    implementsInterrupt?: boolean;
    implementsExecutionOrder?: boolean;
    executeNotebookCellsRequest(uri: URI, cellHandles: number[]): Promise<void>;
    cancelNotebookCellExecution(uri: URI, cellHandles: number[]): Promise<void>;
}
export declare const enum ProxyKernelState {
    Disconnected = 1,
    Connected = 2,
    Initializing = 3
}
export interface INotebookProxyKernelChangeEvent extends NotebookKernelChangeEvent {
    connectionState?: true;
}
export interface NotebookTextModelLike {
    uri: URI;
    viewType: string;
}
declare class KernelInfo {
    protected static instanceCounter: number;
    score: number;
    readonly kernel: NotebookKernel;
    readonly handle: number;
    constructor(kernel: NotebookKernel);
}
export interface NotebookSourceActionChangeEvent {
    notebook?: URI;
    viewType: string;
}
export interface KernelSourceActionProvider {
    readonly viewType: string;
    onDidChangeSourceActions?: Event<void>;
    provideKernelSourceActions(): Promise<NotebookKernelSourceAction[]>;
}
export declare class SourceCommand implements Disposable {
    readonly command: Command;
    readonly model: NotebookTextModelLike;
    execution: Promise<void> | undefined;
    protected readonly onDidChangeStateEmitter: Emitter<void>;
    readonly onDidChangeState: Event<void>;
    constructor(command: Command, model: NotebookTextModelLike);
    run(commandService: CommandService): Promise<void>;
    protected runCommand(commandService: CommandService): Promise<void>;
    dispose(): void;
}
export declare class NotebookKernelService {
    protected notebookService: NotebookService;
    protected storageService: StorageService;
    protected readonly kernels: Map<string, KernelInfo>;
    protected notebookBindings: Record<string, string>;
    protected readonly kernelDetectionTasks: Map<string, string[]>;
    protected readonly onDidChangeKernelDetectionTasksEmitter: Emitter<string>;
    readonly onDidChangeKernelDetectionTasks: Event<string>;
    protected readonly onDidChangeSourceActionsEmitter: Emitter<NotebookSourceActionChangeEvent>;
    protected readonly kernelSourceActionProviders: Map<string, KernelSourceActionProvider[]>;
    readonly onDidChangeSourceActions: Event<NotebookSourceActionChangeEvent>;
    protected readonly onDidAddKernelEmitter: Emitter<NotebookKernel>;
    readonly onDidAddKernel: Event<NotebookKernel>;
    protected readonly onDidRemoveKernelEmitter: Emitter<NotebookKernel>;
    readonly onDidRemoveKernel: Event<NotebookKernel>;
    protected readonly onDidChangeSelectedNotebookKernelBindingEmitter: Emitter<SelectedNotebookKernelChangeEvent>;
    readonly onDidChangeSelectedKernel: Event<SelectedNotebookKernelChangeEvent>;
    protected readonly onDidChangeNotebookAffinityEmitter: Emitter<void>;
    readonly onDidChangeNotebookAffinity: Event<void>;
    init(): void;
    registerKernel(kernel: NotebookKernel): Disposable;
    /**
     * Helps to find the best matching kernel for a notebook.
     * @param notebook notebook to get the matching kernel for
     * @returns and object containing:
     *  all kernels sorted to match the notebook best first (affinity ascending, score descending, label))
     *  the selected kernel (if any)
     *  specific suggested kernels (if any)
     *  hidden kernels (if any)
     */
    getMatchingKernel(notebook: NotebookTextModelLike): NotebookKernelMatchResult;
    getSelectedNotebookKernel(notebook: NotebookTextModelLike): NotebookKernel | undefined;
    selectKernelForNotebook(kernel: NotebookKernel | undefined, notebook: NotebookTextModelLike): void;
    getSelectedOrSuggestedKernel(notebook: NotebookModel): NotebookKernel | undefined;
    getKernel(id: string): NotebookKernel | undefined;
    protected static score(kernel: NotebookKernel, notebook: NotebookTextModelLike): number;
    protected tryAutoBindNotebook(notebook: NotebookModel, onlyThisKernel?: NotebookKernel): void;
    registerNotebookKernelDetectionTask(notebookType: string): Disposable;
    getKernelDetectionTasks(notebook: NotebookTextModelLike): string[];
    registerKernelSourceActionProvider(viewType: string, provider: KernelSourceActionProvider): Disposable;
    getKernelSourceActionsFromProviders(notebook: NotebookTextModelLike): Promise<NotebookKernelSourceAction[]>;
}
export {};
//# sourceMappingURL=notebook-kernel-service.d.ts.map