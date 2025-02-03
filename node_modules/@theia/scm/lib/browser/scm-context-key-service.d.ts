import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
export declare class ScmContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected _scmProvider: ContextKey<string | undefined>;
    get scmProvider(): ContextKey<string | undefined>;
    protected _scmResourceGroup: ContextKey<string | undefined>;
    get scmResourceGroup(): ContextKey<string | undefined>;
    protected init(): void;
    match(expression: string | undefined): boolean;
}
//# sourceMappingURL=scm-context-key-service.d.ts.map