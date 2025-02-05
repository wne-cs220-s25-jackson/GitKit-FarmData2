import URI from '@theia/core/lib/common/uri';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { FileWriteOptions, FileOpenOptions, FileChangeType, FileSystemProviderCapabilities, FileChange, Stat, FileOverwriteOptions, WatchOptions, FileType, FileSystemProvider, FileDeleteOptions, FileSystemProviderErrorCode, FileUpdateOptions, FileUpdateResult, FileReadStreamOptions, ReadOnlyMessageFileSystemProvider } from './files';
import { RpcServer, RpcProxy, RpcProxyFactory } from '@theia/core/lib/common/messaging/proxy-factory';
import { ApplicationError } from '@theia/core/lib/common/application-error';
import { Deferred } from '@theia/core/lib/common/promise-util';
import type { TextDocumentContentChangeEvent } from '@theia/core/shared/vscode-languageserver-protocol';
import { ReadableStreamEvents } from '@theia/core/lib/common/stream';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
export declare const remoteFileSystemPath = "/services/remote-filesystem";
export declare const RemoteFileSystemServer: unique symbol;
export interface RemoteFileSystemServer extends RpcServer<RemoteFileSystemClient> {
    getCapabilities(): Promise<FileSystemProviderCapabilities>;
    stat(resource: string): Promise<Stat>;
    getReadOnlyMessage(): Promise<MarkdownString | undefined>;
    access(resource: string, mode?: number): Promise<void>;
    fsPath(resource: string): Promise<string>;
    open(resource: string, opts: FileOpenOptions): Promise<number>;
    close(fd: number): Promise<void>;
    read(fd: number, pos: number, length: number): Promise<{
        bytes: Uint8Array;
        bytesRead: number;
    }>;
    readFileStream(resource: string, handle: number, opts: FileReadStreamOptions, token: CancellationToken): Promise<void>;
    readFile(resource: string): Promise<Uint8Array>;
    write(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    writeFile(resource: string, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    delete(resource: string, opts: FileDeleteOptions): Promise<void>;
    mkdir(resource: string): Promise<void>;
    readdir(resource: string): Promise<[string, FileType][]>;
    rename(source: string, target: string, opts: FileOverwriteOptions): Promise<void>;
    copy(source: string, target: string, opts: FileOverwriteOptions): Promise<void>;
    watch(watcher: number, resource: string, opts: WatchOptions): Promise<void>;
    unwatch(watcher: number): Promise<void>;
    updateFile(resource: string, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
}
export interface RemoteFileChange {
    readonly type: FileChangeType;
    readonly resource: string;
}
export interface RemoteFileStreamError extends Error {
    code?: FileSystemProviderErrorCode;
}
export interface RemoteFileSystemClient {
    notifyDidChangeFile(event: {
        changes: RemoteFileChange[];
    }): void;
    notifyFileWatchError(): void;
    notifyDidChangeCapabilities(capabilities: FileSystemProviderCapabilities): void;
    notifyDidChangeReadOnlyMessage(readOnlyMessage: MarkdownString | undefined): void;
    onFileStreamData(handle: number, data: Uint8Array): void;
    onFileStreamEnd(handle: number, error: RemoteFileStreamError | undefined): void;
}
export declare const RemoteFileSystemProviderError: ApplicationError.Constructor<-33005, {
    code: FileSystemProviderErrorCode;
    name: string;
}>;
export declare class RemoteFileSystemProxyFactory<T extends object> extends RpcProxyFactory<T> {
    protected serializeError(e: any): any;
    protected deserializeError(capturedError: Error, e: any): any;
}
/**
 * Frontend component.
 *
 * Wraps the remote filesystem provider living on the backend.
 */
export declare class RemoteFileSystemProvider implements Required<FileSystemProvider>, Disposable, ReadOnlyMessageFileSystemProvider {
    private readonly onDidChangeFileEmitter;
    readonly onDidChangeFile: import("@theia/core/lib/common/event").Event<readonly FileChange[]>;
    private readonly onFileWatchErrorEmitter;
    readonly onFileWatchError: import("@theia/core/lib/common/event").Event<void>;
    private readonly onDidChangeCapabilitiesEmitter;
    readonly onDidChangeCapabilities: import("@theia/core/lib/common/event").Event<void>;
    private readonly onDidChangeReadOnlyMessageEmitter;
    readonly onDidChangeReadOnlyMessage: import("@theia/core/lib/common/event").Event<MarkdownString | undefined>;
    private readonly onFileStreamDataEmitter;
    private readonly onFileStreamData;
    private readonly onFileStreamEndEmitter;
    private readonly onFileStreamEnd;
    protected readonly toDispose: DisposableCollection;
    protected watcherSequence: number;
    /**
     * We'll track the currently allocated watchers, in order to re-allocate them
     * with the same options once we reconnect to the backend after a disconnection.
     */
    protected readonly watchOptions: Map<number, {
        uri: string;
        options: WatchOptions;
    }>;
    private _capabilities;
    get capabilities(): FileSystemProviderCapabilities;
    private _readOnlyMessage;
    get readOnlyMessage(): MarkdownString | undefined;
    protected readonly readyDeferred: Deferred<void>;
    readonly ready: Promise<void>;
    protected streamHandleSeq: number;
    /**
     * Wrapped remote filesystem.
     */
    protected readonly server: RpcProxy<RemoteFileSystemServer>;
    protected init(): void;
    dispose(): void;
    protected setCapabilities(capabilities: FileSystemProviderCapabilities): void;
    protected setReadOnlyMessage(readOnlyMessage: MarkdownString | undefined): void;
    stat(resource: URI): Promise<Stat>;
    access(resource: URI, mode?: number): Promise<void>;
    fsPath(resource: URI): Promise<string>;
    open(resource: URI, opts: FileOpenOptions): Promise<number>;
    close(fd: number): Promise<void>;
    read(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    readFile(resource: URI): Promise<Uint8Array>;
    readFileStream(resource: URI, opts: FileReadStreamOptions, token: CancellationToken): ReadableStreamEvents<Uint8Array>;
    write(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    writeFile(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    delete(resource: URI, opts: FileDeleteOptions): Promise<void>;
    mkdir(resource: URI): Promise<void>;
    readdir(resource: URI): Promise<[string, FileType][]>;
    rename(resource: URI, target: URI, opts: FileOverwriteOptions): Promise<void>;
    copy(resource: URI, target: URI, opts: FileOverwriteOptions): Promise<void>;
    updateFile(resource: URI, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
    watch(resource: URI, options: WatchOptions): Disposable;
    /**
     * When a frontend disconnects (e.g. bad connection) the backend resources will be cleared.
     *
     * This means that we need to re-allocate the watchers when a frontend reconnects.
     */
    protected reconnect(): void;
}
/**
 * Backend component.
 *
 * JSON-RPC server exposing a wrapped file system provider remotely.
 */
export declare class FileSystemProviderServer implements RemoteFileSystemServer {
    private readonly BUFFER_SIZE;
    /**
     * Mapping of `watcherId` to a disposable watcher handle.
     */
    protected watchers: Map<number, Disposable>;
    protected readonly toDispose: DisposableCollection;
    dispose(): void;
    protected client: RemoteFileSystemClient | undefined;
    setClient(client: RemoteFileSystemClient | undefined): void;
    /**
     * Wrapped file system provider.
     */
    protected readonly provider: FileSystemProvider & Partial<Disposable>;
    protected init(): void;
    getCapabilities(): Promise<FileSystemProviderCapabilities>;
    getReadOnlyMessage(): Promise<MarkdownString | undefined>;
    stat(resource: string): Promise<Stat>;
    access(resource: string, mode?: number): Promise<void>;
    fsPath(resource: string): Promise<string>;
    open(resource: string, opts: FileOpenOptions): Promise<number>;
    close(fd: number): Promise<void>;
    read(fd: number, pos: number, length: number): Promise<{
        bytes: Uint8Array;
        bytesRead: number;
    }>;
    write(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    readFile(resource: string): Promise<Uint8Array>;
    writeFile(resource: string, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    delete(resource: string, opts: FileDeleteOptions): Promise<void>;
    mkdir(resource: string): Promise<void>;
    readdir(resource: string): Promise<[string, FileType][]>;
    rename(source: string, target: string, opts: FileOverwriteOptions): Promise<void>;
    copy(source: string, target: string, opts: FileOverwriteOptions): Promise<void>;
    updateFile(resource: string, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
    watch(requestedWatcherId: number, resource: string, opts: WatchOptions): Promise<void>;
    unwatch(watcherId: number): Promise<void>;
    readFileStream(resource: string, handle: number, opts: FileReadStreamOptions, token: CancellationToken): Promise<void>;
}
//# sourceMappingURL=remote-file-system-provider.d.ts.map