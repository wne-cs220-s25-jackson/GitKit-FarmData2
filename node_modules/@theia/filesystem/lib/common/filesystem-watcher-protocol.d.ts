import { RpcServer } from '@theia/core';
import { FileChangeType } from './files';
export { FileChangeType };
export declare const FileSystemWatcherService: unique symbol;
/**
 * Singleton implementation of the watch server.
 *
 * Since multiple clients all make requests to this service, we need to track those individually via a `clientId`.
 */
export interface FileSystemWatcherService extends RpcServer<FileSystemWatcherServiceClient> {
    /**
     * @param clientId arbitrary id used to identify a client.
     * @param uri the path to watch.
     * @param options optional parameters.
     * @returns promise to a unique `number` handle for this request.
     */
    watchFileChanges(clientId: number, uri: string, options?: WatchOptions): Promise<number>;
    /**
     * @param watcherId handle mapping to a previous `watchFileChanges` request.
     */
    unwatchFileChanges(watcherId: number): Promise<void>;
}
export interface FileSystemWatcherServiceClient {
    /** Listen for change events emitted by the watcher. */
    onDidFilesChanged(event: DidFilesChangedParams): void;
    /** The watcher can crash in certain conditions. */
    onError(event: FileSystemWatcherErrorParams): void;
}
export interface DidFilesChangedParams {
    /** Clients to route the events to. */
    clients?: number[];
    /** FileSystem changes that occurred. */
    changes: FileChange[];
}
export interface FileSystemWatcherErrorParams {
    /** Clients to route the events to. */
    clients: number[];
    /** The uri that originated the error. */
    uri: string;
}
export declare const FileSystemWatcherServer: unique symbol;
export interface FileSystemWatcherServer extends RpcServer<FileSystemWatcherClient> {
    /**
     * Start file watching for the given param.
     * Resolve when watching is started.
     * Return a watcher id.
     */
    watchFileChanges(uri: string, options?: WatchOptions): Promise<number>;
    /**
     * Stop file watching for the given id.
     * Resolve when watching is stopped.
     */
    unwatchFileChanges(watcherId: number): Promise<void>;
}
export interface FileSystemWatcherClient {
    /**
     * Notify when files under watched uris are changed.
     */
    onDidFilesChanged(event: DidFilesChangedParams): void;
    /**
     * Notify when unable to watch files because of Linux handle limit.
     */
    onError(): void;
}
export interface WatchOptions {
    ignored: string[];
}
export interface FileChange {
    uri: string;
    type: FileChangeType;
}
//# sourceMappingURL=filesystem-watcher-protocol.d.ts.map