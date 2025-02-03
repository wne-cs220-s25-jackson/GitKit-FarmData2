import { ContextKeyService, ContextKey } from '@theia/core/lib/browser/context-key-service';
import { Emitter } from '@theia/core/lib/common';
export declare class CommentsContextKeyService {
    protected readonly contextKeyService: ContextKeyService;
    protected readonly contextKeys: Set<string>;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: import("@theia/core/lib/common").Event<void>;
    protected _commentIsEmpty: ContextKey<boolean>;
    protected _commentController: ContextKey<string | undefined>;
    protected _comment: ContextKey<string | undefined>;
    get commentController(): ContextKey<string | undefined>;
    get comment(): ContextKey<string | undefined>;
    get commentIsEmpty(): ContextKey<boolean>;
    protected init(): void;
    setExpression(expression: string): void;
    match(expression: string | undefined): boolean;
}
//# sourceMappingURL=comments-context-key-service.d.ts.map