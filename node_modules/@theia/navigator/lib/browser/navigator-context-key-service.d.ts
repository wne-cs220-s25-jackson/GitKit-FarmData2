import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
export declare class NavigatorContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected _explorerViewletVisible: ContextKey<boolean>;
    get explorerViewletVisible(): ContextKey<boolean>;
    protected _explorerViewletFocus: ContextKey<boolean>;
    /** True if Explorer view has keyboard focus. */
    get explorerViewletFocus(): ContextKey<boolean>;
    protected _filesExplorerFocus: ContextKey<boolean>;
    /** True if File Explorer section has keyboard focus. */
    get filesExplorerFocus(): ContextKey<boolean>;
    protected _explorerResourceIsFolder: ContextKey<boolean>;
    get explorerResourceIsFolder(): ContextKey<boolean>;
    protected _isFileSystemResource: ContextKey<boolean>;
    /**
     * True when the Explorer or editor file is a file system resource that can be handled from a file system provider.
     */
    get isFileSystemResource(): ContextKey<boolean>;
    protected init(): void;
}
//# sourceMappingURL=navigator-context-key-service.d.ts.map