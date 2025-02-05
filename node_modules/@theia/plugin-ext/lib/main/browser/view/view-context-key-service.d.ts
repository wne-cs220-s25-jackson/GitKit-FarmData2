import { ContextKey, ContextKeyService } from '@theia/core/lib/browser/context-key-service';
export declare class ViewContextKeyService {
    protected _viewItem: ContextKey<string>;
    get viewItem(): ContextKey<string>;
    protected _activeViewlet: ContextKey<string>;
    get activeViewlet(): ContextKey<string>;
    protected _activePanel: ContextKey<string>;
    get activePanel(): ContextKey<string>;
    protected _activeAuxiliary: ContextKey<string>;
    get activeAuxiliary(): ContextKey<string>;
    protected _focusedView: ContextKey<string>;
    get focusedView(): ContextKey<string>;
    protected readonly contextKeyService: ContextKeyService;
    protected init(): void;
    match(expression: string | undefined): boolean;
}
//# sourceMappingURL=view-context-key-service.d.ts.map