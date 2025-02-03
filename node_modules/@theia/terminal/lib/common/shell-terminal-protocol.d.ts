import { RpcProxy } from '@theia/core';
import { IBaseTerminalServer, IBaseTerminalServerOptions } from './base-terminal-protocol';
import { OS } from '@theia/core/lib/common/os';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering/markdown-string';
export declare const IShellTerminalServer: unique symbol;
export interface IShellTerminalServer extends IBaseTerminalServer {
    hasChildProcesses(processId: number | undefined): Promise<boolean>;
    getEnvVarCollectionDescriptionsByExtension(id: number): Promise<Map<string, (string | MarkdownString | undefined)[]>>;
    getEnvVarCollections(): Promise<[string, string, boolean, SerializableEnvironmentVariableCollection][]>;
    restorePersisted(jsonValue: string): void;
    /**
     * Sets an extension's environment variable collection.
     */
    setCollection(extensionIdentifier: string, rootUri: string, persistent: boolean, collection: SerializableEnvironmentVariableCollection, description: string | MarkdownString | undefined): void;
    /**
     * Deletes an extension's environment variable collection.
     */
    deleteCollection(extensionIdentifier: string): void;
}
export declare const shellTerminalPath = "/services/shell-terminal";
export type ShellTerminalOSPreferences<T> = {
    [key in OS.Type]: T;
};
export interface IShellTerminalPreferences {
    shell: ShellTerminalOSPreferences<string | undefined>;
    shellArgs: ShellTerminalOSPreferences<string[]>;
}
export interface IShellTerminalServerOptions extends IBaseTerminalServerOptions {
    shell?: string;
    args?: string[] | string;
    rootURI?: string;
    cols?: number;
    rows?: number;
    env?: {
        [key: string]: string | null;
    };
    strictEnv?: boolean;
    isPseudo?: boolean;
}
export declare const ShellTerminalServerProxy: unique symbol;
export type ShellTerminalServerProxy = RpcProxy<IShellTerminalServer>;
export declare const NO_ROOT_URI = "<none>";
export interface EnvironmentVariableCollection {
    readonly variableMutators: ReadonlyMap<string, EnvironmentVariableMutator>;
    readonly description: string | MarkdownString | undefined;
}
export interface EnvironmentVariableCollectionWithPersistence extends EnvironmentVariableCollection {
    readonly persistent: boolean;
}
export declare enum EnvironmentVariableMutatorType {
    Replace = 1,
    Append = 2,
    Prepend = 3
}
export interface EnvironmentVariableMutatorOptions {
    applyAtProcessCreation?: boolean;
}
export interface EnvironmentVariableMutator {
    readonly value: string;
    readonly type: EnvironmentVariableMutatorType;
    readonly options: EnvironmentVariableMutatorOptions;
}
export interface SerializableEnvironmentVariableCollection {
    readonly description: string | MarkdownString | undefined;
    readonly mutators: [string, EnvironmentVariableMutator][];
}
//# sourceMappingURL=shell-terminal-protocol.d.ts.map