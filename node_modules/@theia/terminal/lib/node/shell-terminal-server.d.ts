import { ILogger } from '@theia/core/lib/common/logger';
import { EnvironmentUtils } from '@theia/core/lib/node/environment-utils';
import { BaseTerminalServer } from './base-terminal-server';
import { ShellProcessFactory } from './shell-process';
import { ProcessManager } from '@theia/process/lib/node';
import { EnvironmentVariableCollectionWithPersistence, SerializableEnvironmentVariableCollection, IShellTerminalServer, IShellTerminalServerOptions } from '../common/shell-terminal-protocol';
import { URI } from '@theia/core';
import { MultiKeyMap } from '@theia/core/lib/common/collections';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering/markdown-string';
export declare class ShellTerminalServer extends BaseTerminalServer implements IShellTerminalServer {
    protected readonly shellFactory: ShellProcessFactory;
    protected environmentUtils: EnvironmentUtils;
    readonly collections: MultiKeyMap<string, EnvironmentVariableCollectionWithPersistence>;
    constructor(shellFactory: ShellProcessFactory, processManager: ProcessManager, logger: ILogger);
    create(options: IShellTerminalServerOptions): Promise<number>;
    private spawnAsPromised;
    hasChildProcesses(processId: number | undefined): Promise<boolean>;
    applyToProcessEnvironment(cwdUri: URI, env: {
        [key: string]: string | null;
    }): void;
    matchesRootUri(cwdUri: URI, rootUri: string): boolean;
    setCollection(extensionIdentifier: string, baseUri: string, persistent: boolean, collection: SerializableEnvironmentVariableCollection): void;
    private doSetCollection;
    restorePersisted(jsonValue: string): void;
    deleteCollection(extensionIdentifier: string): void;
    private updateCollections;
    protected persistCollections(): void;
    getEnvVarCollectionDescriptionsByExtension(id: number): Promise<Map<string, (string | MarkdownString | undefined)[]>>;
    getEnvVarCollections(): Promise<[string, string, boolean, SerializableEnvironmentVariableCollection][]>;
}
//# sourceMappingURL=shell-terminal-server.d.ts.map