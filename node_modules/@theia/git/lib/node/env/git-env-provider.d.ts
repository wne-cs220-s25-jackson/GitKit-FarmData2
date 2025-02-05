import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
/**
 * Provides an additional environment object when executing every single Git command.
 */
export declare const GitEnvProvider: unique symbol;
export interface GitEnvProvider extends Disposable {
    /**
     * The additional environment object that will be set before executing every single Git command.
     */
    getEnv(): Promise<Object>;
}
/**
 * The default Git environment provider. Does nothing.
 */
export declare class DefaultGitEnvProvider implements GitEnvProvider {
    protected toDispose: DisposableCollection;
    protected init(): void;
    getEnv(): Promise<Object>;
    dispose(): void;
}
//# sourceMappingURL=git-env-provider.d.ts.map