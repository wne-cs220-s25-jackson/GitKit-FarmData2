import { DisposableCollection } from '@theia/core';
import { IPCConnectionProvider } from '@theia/core/lib/node';
import { GitLocator, GitLocateOptions } from './git-locator-protocol';
export declare class GitLocatorClient implements GitLocator {
    protected readonly toDispose: DisposableCollection;
    protected readonly ipcConnectionProvider: IPCConnectionProvider;
    dispose(): void;
    locate(path: string, options: GitLocateOptions): Promise<string[]>;
}
//# sourceMappingURL=git-locator-client.d.ts.map