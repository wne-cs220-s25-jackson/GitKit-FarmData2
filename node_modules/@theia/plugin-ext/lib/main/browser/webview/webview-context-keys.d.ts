import { ApplicationShell, FocusTracker, Widget } from '@theia/core/lib/browser';
import { ContextKey, ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare class WebviewContextKeys {
    /**
     * Context key representing the `viewType` of the active `WebviewWidget`, if any.
     */
    activeWebviewPanelId: ContextKey<string>;
    /**
     * Context key representing the `viewType` of the active `CustomEditorWidget`, if any.
     */
    activeCustomEditorId: ContextKey<string>;
    protected applicationShell: ApplicationShell;
    protected contextKeyService: ContextKeyService;
    protected init(): void;
    protected handleDidChangeCurrentWidget(change: FocusTracker.IChangedArgs<Widget>): void;
}
//# sourceMappingURL=webview-context-keys.d.ts.map