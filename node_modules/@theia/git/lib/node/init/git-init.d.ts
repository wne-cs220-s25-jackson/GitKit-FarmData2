import { ILogger } from '@theia/core/lib/common/logger';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { MessageService } from '@theia/core';
/**
 * Initializer hook for Git.
 */
export declare const GitInit: unique symbol;
export interface GitInit extends Disposable {
    /**
     * Called before `Git` is ready to be used in Theia. Git operations cannot be executed before the returning promise is not resolved or rejected.
     */
    init(): Promise<void>;
}
/**
 * The default initializer. It is used in the browser.
 *
 * Configures the Git extension to use the Git executable from the `PATH`.
 */
export declare class DefaultGitInit implements GitInit {
    protected readonly toDispose: DisposableCollection;
    protected readonly logger: ILogger;
    protected readonly messages: MessageService;
    init(): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=git-init.d.ts.map