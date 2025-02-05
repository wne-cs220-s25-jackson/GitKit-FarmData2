import { Disposable } from '@theia/core';
export interface GitLocateOptions {
    readonly maxCount?: number;
}
export declare const GitLocator: unique symbol;
export interface GitLocator extends Disposable {
    /**
     * Resolves to the repository paths under the given absolute path.
     */
    locate(path: string, options: GitLocateOptions): Promise<string[]>;
}
//# sourceMappingURL=git-locator-protocol.d.ts.map