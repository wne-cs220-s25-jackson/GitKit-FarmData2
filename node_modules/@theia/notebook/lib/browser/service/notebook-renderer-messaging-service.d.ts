import { Emitter } from '@theia/core';
import { Disposable } from '@theia/core/shared/vscode-languageserver-protocol';
import { NotebookEditorWidgetService } from './notebook-editor-widget-service';
interface RendererMessage {
    editorId: string;
    rendererId: string;
    message: unknown;
}
export interface RendererMessaging extends Disposable {
    /**
     * Method called when a message is received. Should return a boolean
     * indicating whether a renderer received it.
     */
    receiveMessage?: (rendererId: string, message: unknown) => Promise<boolean>;
    /**
     * Sends a message to an extension from a renderer.
     */
    postMessage(rendererId: string, message: unknown): void;
}
export declare class NotebookRendererMessagingService implements Disposable {
    protected readonly postMessageEmitter: Emitter<RendererMessage>;
    readonly onPostMessage: import("@theia/core").Event<RendererMessage>;
    protected readonly willActivateRendererEmitter: Emitter<string>;
    readonly onWillActivateRenderer: import("@theia/core").Event<string>;
    protected readonly editorWidgetService: NotebookEditorWidgetService;
    protected readonly activations: Map<string, RendererMessage[] | undefined>;
    protected readonly scopedMessaging: Map<string, RendererMessaging>;
    receiveMessage(editorId: string | undefined, rendererId: string, message: unknown): Promise<boolean>;
    prepare(rendererId: string): void;
    getScoped(editorId: string): RendererMessaging;
    protected postMessage(editorId: string, rendererId: string, message: unknown): void;
    dispose(): void;
}
export {};
//# sourceMappingURL=notebook-renderer-messaging-service.d.ts.map