import { Disposable } from '@theia/core';
import { NotebookRendererDescriptor } from '../common/notebook-protocol';
export interface NotebookRendererInfo {
    readonly id: string;
    readonly displayName: string;
    readonly mimeTypes: string[];
    readonly entrypoint: {
        readonly extends?: string;
        readonly uri: string;
    };
    readonly requiresMessaging: boolean;
}
export interface NotebookPreloadInfo {
    readonly type: string;
    readonly entrypoint: string;
}
export declare class NotebookRendererRegistry {
    private readonly _notebookRenderers;
    get notebookRenderers(): readonly NotebookRendererInfo[];
    private readonly _staticNotebookPreloads;
    get staticNotebookPreloads(): readonly NotebookPreloadInfo[];
    registerNotebookRenderer(type: NotebookRendererDescriptor, basePath: string): Disposable;
    registerStaticNotebookPreload(type: string, entrypoint: string, basePath: string): Disposable;
}
//# sourceMappingURL=notebook-renderer-registry.d.ts.map