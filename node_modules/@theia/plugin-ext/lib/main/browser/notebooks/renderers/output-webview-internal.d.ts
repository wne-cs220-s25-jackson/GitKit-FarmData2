import type * as webviewCommunication from './webview-communication';
export interface RenderOptions {
    readonly lineLimit: number;
    readonly outputScrolling: boolean;
    readonly outputWordWrap: boolean;
}
export interface PreloadContext {
    readonly isWorkspaceTrusted: boolean;
    readonly rendererData: readonly webviewCommunication.RendererMetadata[];
    readonly renderOptions: RenderOptions;
    readonly staticPreloadsData: readonly string[];
}
export declare function outputWebviewPreload(ctx: PreloadContext): Promise<void>;
//# sourceMappingURL=output-webview-internal.d.ts.map