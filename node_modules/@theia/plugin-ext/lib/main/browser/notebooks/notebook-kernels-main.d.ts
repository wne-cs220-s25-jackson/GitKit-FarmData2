import { Event } from '@theia/core';
import { UriComponents } from '@theia/core/lib/common/uri';
import { CellExecuteUpdateDto, CellExecutionCompleteDto, NotebookKernelDto, NotebookKernelsMain } from '../../../common';
import { RPCProtocol } from '../../../common/rpc-protocol';
import { interfaces } from '@theia/core/shared/inversify';
import { NotebookKernelSourceAction } from '@theia/notebook/lib/common';
export interface KernelSourceActionProvider {
    readonly viewType: string;
    onDidChangeSourceActions?: Event<void>;
    provideKernelSourceActions(): Promise<NotebookKernelSourceAction[]>;
}
export declare class NotebookKernelsMainImpl implements NotebookKernelsMain {
    private readonly proxy;
    private readonly kernels;
    private readonly kernelDetectionTasks;
    private readonly kernelSourceActionProviders;
    private readonly kernelSourceActionProvidersEventRegistrations;
    private notebookKernelService;
    private notebookService;
    private languageService;
    private notebookExecutionStateService;
    private notebookEditorWidgetService;
    private readonly executions;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    $postMessage(handle: number, editorId: string | undefined, message: unknown): Promise<boolean>;
    $addKernel(handle: number, data: NotebookKernelDto): Promise<void>;
    $updateKernel(handle: number, data: Partial<NotebookKernelDto>): void;
    $removeKernel(handle: number): void;
    $updateNotebookPriority(handle: number, uri: UriComponents, value: number | undefined): void;
    $createExecution(handle: number, controllerId: string, uriComponents: UriComponents, cellHandle: number): void;
    $updateExecution(handle: number, updates: CellExecuteUpdateDto[]): void;
    $completeExecution(handle: number, data: CellExecutionCompleteDto): void;
    $createNotebookExecution(handle: number, controllerId: string, uri: UriComponents): void;
    $beginNotebookExecution(handle: number): void;
    $completeNotebookExecution(handle: number): void;
    $addKernelDetectionTask(handle: number, notebookType: string): Promise<void>;
    $removeKernelDetectionTask(handle: number): void;
    $addKernelSourceActionProvider(handle: number, eventHandle: number, notebookType: string): Promise<void>;
    $removeKernelSourceActionProvider(handle: number, eventHandle: number): void;
    $emitNotebookKernelSourceActionsChangeEvent(eventHandle: number): void;
    dispose(): void;
}
//# sourceMappingURL=notebook-kernels-main.d.ts.map