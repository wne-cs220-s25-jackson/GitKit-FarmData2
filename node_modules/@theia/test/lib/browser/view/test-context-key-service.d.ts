import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
export declare class TestContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected _contextValue: ContextKey<string | undefined>;
    get contextValue(): ContextKey<string | undefined>;
    protected init(): void;
}
//# sourceMappingURL=test-context-key-service.d.ts.map