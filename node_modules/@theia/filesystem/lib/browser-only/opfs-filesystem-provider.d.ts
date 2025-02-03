import { FileChange, FileDeleteOptions, FileOverwriteOptions, FileSystemProviderCapabilities, FileSystemProviderWithFileReadWriteCapability, FileType, FileWriteOptions, Stat, WatchOptions } from '../common/files';
import { Event, URI, Disposable } from '@theia/core';
import { OPFSInitialization } from './opfs-filesystem-initialization';
export declare class OPFSFileSystemProvider implements FileSystemProviderWithFileReadWriteCapability {
    capabilities: FileSystemProviderCapabilities;
    onDidChangeCapabilities: Event<void>;
    private readonly onDidChangeFileEmitter;
    readonly onDidChangeFile: Event<readonly FileChange[]>;
    onFileWatchError: Event<void>;
    protected readonly initialization: OPFSInitialization;
    private directoryHandle;
    private initialized;
    protected init(): void;
    watch(_resource: URI, _opts: WatchOptions): Disposable;
    exists(resource: URI): Promise<boolean>;
    stat(resource: URI): Promise<Stat>;
    mkdir(resource: URI): Promise<void>;
    readdir(resource: URI): Promise<[string, FileType][]>;
    delete(resource: URI, _opts: FileDeleteOptions): Promise<void>;
    rename(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    readFile(resource: URI): Promise<Uint8Array>;
    writeFile(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    /**
     * Returns the FileSystemHandle for the given resource given by a URI.
     * @param resource URI/path of the resource
     * @param options Options for the creation of the handle while traversing the path
     * @returns FileSystemHandle for the given resource
     */
    private toFileSystemHandle;
}
//# sourceMappingURL=opfs-filesystem-provider.d.ts.map