import { FileSystemWatcherClient, FileSystemWatcherServiceClient, DidFilesChangedParams, FileSystemWatcherErrorParams } from '../common/filesystem-watcher-protocol';
/**
 * This component routes watch events to the right clients.
 */
export declare class FileSystemWatcherServiceDispatcher implements FileSystemWatcherServiceClient {
    /**
     * Mapping of `clientId` to actual clients.
     */
    protected readonly clients: Map<number, FileSystemWatcherClient>;
    onDidFilesChanged(event: DidFilesChangedParams): void;
    onError(event: FileSystemWatcherErrorParams): void;
    /**
     * Listen for events targeted at `clientId`.
     */
    registerClient(clientId: number, client: FileSystemWatcherClient): void;
    unregisterClient(clientId: number): void;
    /**
     * Only yield registered clients for the given `clientIds`.
     *
     * If clientIds is empty, will return all clients.
     */
    protected iterRegisteredClients(clientIds?: number[]): Iterable<FileSystemWatcherClient>;
}
//# sourceMappingURL=filesystem-watcher-dispatcher.d.ts.map