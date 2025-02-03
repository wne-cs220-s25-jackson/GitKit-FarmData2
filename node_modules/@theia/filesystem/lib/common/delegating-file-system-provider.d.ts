import URI from '@theia/core/lib/common/uri';
import { Event, CancellationToken } from '@theia/core/lib/common';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { FileSystemProvider, FileSystemProviderCapabilities, WatchOptions, FileDeleteOptions, FileOverwriteOptions, FileWriteOptions, FileOpenOptions, FileChange, Stat, FileType, FileUpdateOptions, FileUpdateResult, FileReadStreamOptions } from './files';
import type { TextDocumentContentChangeEvent } from '@theia/core/shared/vscode-languageserver-protocol';
import { ReadableStreamEvents } from '@theia/core/lib/common/stream';
export declare class DelegatingFileSystemProvider implements Required<FileSystemProvider>, Disposable {
    protected readonly delegate: FileSystemProvider;
    protected readonly options: DelegatingFileSystemProvider.Options;
    protected readonly toDispose: DisposableCollection;
    private readonly onDidChangeFileEmitter;
    readonly onDidChangeFile: Event<readonly FileChange[]>;
    private readonly onFileWatchErrorEmitter;
    readonly onFileWatchError: Event<void>;
    constructor(delegate: FileSystemProvider, options: DelegatingFileSystemProvider.Options, toDispose?: DisposableCollection);
    dispose(): void;
    get capabilities(): FileSystemProviderCapabilities;
    get onDidChangeCapabilities(): Event<void>;
    watch(resource: URI, opts: WatchOptions): Disposable;
    stat(resource: URI): Promise<Stat>;
    access(resource: URI, mode?: number): Promise<void>;
    fsPath(resource: URI): Promise<string>;
    mkdir(resource: URI): Promise<void>;
    rename(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    copy(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    readFile(resource: URI): Promise<Uint8Array>;
    readFileStream(resource: URI, opts: FileReadStreamOptions, token: CancellationToken): ReadableStreamEvents<Uint8Array>;
    readdir(resource: URI): Promise<[string, FileType][]>;
    writeFile(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    open(resource: URI, opts: FileOpenOptions): Promise<number>;
    close(fd: number): Promise<void>;
    read(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    write(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    delete(resource: URI, opts: FileDeleteOptions): Promise<void>;
    updateFile(resource: URI, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
    protected handleFileChanges(changes: readonly FileChange[]): void;
    /**
     * Converts to an underlying fs provider resource format.
     *
     * For example converting `user-storage` resources to `file` resources under a user home:
     * user-storage:/user/settings.json => file://home/.theia/settings.json
     */
    toUnderlyingResource(resource: URI): URI;
    /**
     * Converts from an underlying fs provider resource format.
     *
     * For example converting `file` resources under a user home to `user-storage` resource:
     * - file://home/.theia/settings.json => user-storage:/user/settings.json
     * - file://documents/some-document.txt => undefined
     */
    fromUnderlyingResource(resource: URI): URI | undefined;
}
export declare namespace DelegatingFileSystemProvider {
    interface Options {
        uriConverter: URIConverter;
    }
    interface URIConverter {
        /**
         * Converts to an underlying fs provider resource format.
         * Returns undefined if the given resource is not valid resource.
         *
         * For example converting `user-storage` resources to `file` resources under a user home:
         * user-storage:/user/settings.json => file://home/.theia/settings.json
         * user-storage:/settings.json => undefined
         */
        to(resource: URI): URI | undefined;
        /**
         * Converts from an underlying fs provider resource format.
         *
         * For example converting `file` resources under a user home to `user-storage` resource:
         * - file://home/.theia/settings.json => user-storage:/settings.json
         * - file://documents/some-document.txt => undefined
         */
        from(resource: URI): URI | undefined;
    }
}
//# sourceMappingURL=delegating-file-system-provider.d.ts.map