/// <reference types="node" />
import * as fs from 'fs';
import URI from '@theia/core/lib/common/uri';
import { Event } from '@theia/core/lib/common/event';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { FileSystemProviderWithFileReadWriteCapability, FileSystemProviderWithOpenReadWriteCloseCapability, FileSystemProviderWithFileFolderCopyCapability, FileSystemProviderCapabilities, Stat, FileType, FileWriteOptions, FileOpenOptions, FileDeleteOptions, FileOverwriteOptions, FileChange, WatchOptions, FileUpdateOptions, FileUpdateResult, FileReadStreamOptions } from '../common/files';
import { FileSystemWatcherServer } from '../common/filesystem-watcher-protocol';
import { TextDocumentContentChangeEvent } from '@theia/core/shared/vscode-languageserver-protocol';
import { EncodingService } from '@theia/core/lib/common/encoding-service';
import { ReadableStreamEvents } from '@theia/core/lib/common/stream';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
export declare namespace DiskFileSystemProvider {
    interface StatAndLink {
        stat: fs.Stats;
        symbolicLink?: {
            dangling: boolean;
        };
    }
}
export declare class DiskFileSystemProvider implements Disposable, FileSystemProviderWithFileReadWriteCapability, FileSystemProviderWithOpenReadWriteCloseCapability, FileSystemProviderWithFileFolderCopyCapability {
    private readonly BUFFER_SIZE;
    private readonly onDidChangeFileEmitter;
    readonly onDidChangeFile: Event<readonly FileChange[]>;
    private readonly onFileWatchErrorEmitter;
    readonly onFileWatchError: Event<void>;
    protected readonly toDispose: DisposableCollection;
    protected readonly watcher: FileSystemWatcherServer;
    protected readonly encodingService: EncodingService;
    protected init(): void;
    readonly onDidChangeCapabilities: Event<any>;
    protected _capabilities: FileSystemProviderCapabilities | undefined;
    get capabilities(): FileSystemProviderCapabilities;
    stat(resource: URI): Promise<Stat>;
    access(resource: URI, mode?: number): Promise<void>;
    fsPath(resource: URI): Promise<string>;
    protected statLink(path: string): Promise<DiskFileSystemProvider.StatAndLink>;
    readdir(resource: URI): Promise<[string, FileType][]>;
    private toType;
    readFile(resource: URI): Promise<Uint8Array>;
    readFileStream(resource: URI, opts: FileReadStreamOptions, token: CancellationToken): ReadableStreamEvents<Uint8Array>;
    writeFile(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    private mapHandleToPos;
    private writeHandles;
    private canFlush;
    open(resource: URI, opts: FileOpenOptions): Promise<number>;
    close(fd: number): Promise<void>;
    read(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    private normalizePos;
    private updatePos;
    write(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    private doWrite;
    mkdir(resource: URI): Promise<void>;
    delete(resource: URI, opts: FileDeleteOptions): Promise<void>;
    protected doDelete(filePath: string, opts: FileDeleteOptions): Promise<void>;
    protected rimraf(path: string): Promise<void>;
    protected rimrafMove(path: string): Promise<void>;
    protected rimrafUnlink(path: string): Promise<void>;
    rename(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    protected move(source: string, target: string): Promise<void>;
    copy(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    private validateTargetDeleted;
    protected doCopy(source: string, target: string, copiedSourcesIn?: {
        [path: string]: boolean;
    }): Promise<void>;
    protected mkdirp(path: string, mode?: number): Promise<void>;
    protected doCopyFile(source: string, target: string, mode: number): Promise<void>;
    watch(resource: URI, opts: WatchOptions): Disposable;
    updateFile(resource: URI, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
    protected toFilePath(resource: URI): string;
    private toFileSystemProviderError;
    dispose(): void;
}
//# sourceMappingURL=disk-file-system-provider.d.ts.map