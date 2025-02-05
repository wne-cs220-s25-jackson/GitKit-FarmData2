import URI from '@theia/core/lib/common/uri';
import { Event } from '@theia/core/lib/common/event';
import { Disposable as IDisposable } from '@theia/core/lib/common/disposable';
import { BinaryBuffer, BinaryBufferReadableStream } from '@theia/core/lib/common/buffer';
import type { TextDocumentContentChangeEvent } from '@theia/core/shared/vscode-languageserver-protocol';
import { ReadableStreamEvents } from '@theia/core/lib/common/stream';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { MarkdownString } from '@theia/core/lib/common/markdown-rendering';
export declare const enum FileOperation {
    CREATE = 0,
    DELETE = 1,
    MOVE = 2,
    COPY = 3
}
export declare class FileOperationEvent {
    readonly resource: URI;
    readonly operation: FileOperation;
    readonly target?: FileStatWithMetadata | undefined;
    constructor(resource: URI, operation: FileOperation.DELETE);
    constructor(resource: URI, operation: FileOperation.CREATE | FileOperation.MOVE | FileOperation.COPY, target: FileStatWithMetadata);
    isOperation(operation: FileOperation.DELETE): boolean;
    isOperation(operation: FileOperation.MOVE | FileOperation.COPY | FileOperation.CREATE): this is {
        readonly target: FileStatWithMetadata;
    };
}
/**
 * Possible changes that can occur to a file.
 */
export declare const enum FileChangeType {
    UPDATED = 0,
    ADDED = 1,
    DELETED = 2
}
/**
 * Identifies a single change in a file.
 */
export interface FileChange {
    /**
     * The type of change that occurred to the file.
     */
    readonly type: FileChangeType;
    /**
     * The unified resource identifier of the file that changed.
     */
    readonly resource: URI;
}
export declare class FileChangesEvent {
    readonly changes: readonly FileChange[];
    constructor(changes: readonly FileChange[]);
    /**
     * Returns true if this change event contains the provided file with the given change type (if provided). In case of
     * type DELETED, this method will also return true if a folder got deleted that is the parent of the
     * provided file path.
     */
    contains(resource: URI, type?: FileChangeType): boolean;
    /**
     * Returns the changes that describe added files.
     */
    getAdded(): FileChange[];
    /**
     * Returns if this event contains added files.
     */
    gotAdded(): boolean;
    /**
     * Returns the changes that describe deleted files.
     */
    getDeleted(): FileChange[];
    /**
     * Returns if this event contains deleted files.
     */
    gotDeleted(): boolean;
    /**
     * Returns the changes that describe updated files.
     */
    getUpdated(): FileChange[];
    /**
     * Returns if this event contains updated files.
     */
    gotUpdated(): boolean;
    private getOfType;
    private hasType;
}
export interface BaseStat {
    /**
     * The unified resource identifier of this file or folder.
     */
    resource: URI;
    /**
     * The name which is the last segment
     * of the {{path}}.
     */
    name: string;
    /**
     * The size of the file.
     *
     * The value may or may not be resolved as
     * it is optional.
     */
    size?: number;
    /**
     * The last modification date represented as millis from unix epoch.
     *
     * The value may or may not be resolved as
     * it is optional.
     */
    mtime?: number;
    /**
     * The creation date represented as millis from unix epoch.
     *
     * The value may or may not be resolved as
     * it is optional.
     */
    ctime?: number;
    /**
     * A unique identifier that represents the
     * current state of the file or directory.
     *
     * The value may or may not be resolved as
     * it is optional.
     */
    etag?: string;
}
export declare namespace BaseStat {
    function is(arg: unknown): arg is BaseStat;
}
export interface BaseStatWithMetadata extends BaseStat {
    mtime: number;
    ctime: number;
    etag: string;
    size: number;
}
/**
 * A file resource with meta information.
 */
export interface FileStat extends BaseStat {
    /**
     * The resource is a file.
     */
    isFile: boolean;
    /**
     * The resource is a directory.
     */
    isDirectory: boolean;
    /**
     * The resource is a symbolic link.
     */
    isSymbolicLink: boolean;
    /**
     * The resource is read only.
     */
    isReadonly: boolean;
    /**
     * The children of the file stat or undefined if none.
     */
    children?: FileStat[];
}
export declare namespace FileStat {
    function is(arg: unknown): arg is FileStat;
    function asFileType(stat: FileStat): FileType;
    function toStat(stat: FileStat): Stat | {
        type: FileType;
    } & Partial<Stat>;
    function fromStat(resource: URI, stat: Stat): FileStatWithMetadata;
    function fromStat(resource: URI, stat: {
        type: FileType;
    } & Partial<Stat>): FileStat;
    function dir(resource: string | URI, stat?: Partial<Omit<Stat, 'type'>>): FileStat;
    function file(resource: string | URI, stat?: Partial<Omit<Stat, 'type'>>): FileStat;
}
export interface FileStatWithMetadata extends FileStat, BaseStatWithMetadata {
    mtime: number;
    ctime: number;
    etag: string;
    size: number;
    children?: FileStatWithMetadata[];
}
export interface ResolveFileResult {
    stat?: FileStat;
    success: boolean;
}
export interface ResolveFileResultWithMetadata extends ResolveFileResult {
    stat?: FileStatWithMetadata;
}
export interface FileContent extends BaseStatWithMetadata {
    /**
     * The content of a file as buffer.
     */
    value: BinaryBuffer;
}
export interface FileStreamContent extends BaseStatWithMetadata {
    /**
     * The content of a file as stream.
     */
    value: BinaryBufferReadableStream;
}
export interface WriteFileOptions {
    /**
     * The last known modification time of the file. This can be used to prevent dirty writes.
     */
    readonly mtime?: number;
    /**
     * The etag of the file. This can be used to prevent dirty writes.
     */
    readonly etag?: string;
}
export interface ReadFileOptions extends FileReadStreamOptions {
    /**
     * The optional etag parameter allows to return early from resolving the resource if
     * the contents on disk match the etag. This prevents accumulated reading of resources
     * that have been read already with the same etag.
     * It is the task of the caller to makes sure to handle this error case from the promise.
     */
    readonly etag?: string;
}
export interface WriteFileOptions {
    /**
     * The last known modification time of the file. This can be used to prevent dirty writes.
     */
    readonly mtime?: number;
    /**
     * The etag of the file. This can be used to prevent dirty writes.
     */
    readonly etag?: string;
}
export interface ResolveFileOptions {
    /**
     * Automatically continue resolving children of a directory until the provided resources
     * are found.
     */
    readonly resolveTo?: readonly URI[];
    /**
     * Automatically continue resolving children of a directory if the number of children is 1.
     */
    readonly resolveSingleChildDescendants?: boolean;
    /**
     * Will resolve mtime, ctime, size and etag of files if enabled. This can have a negative impact
     * on performance and thus should only be used when these values are required.
     */
    readonly resolveMetadata?: boolean;
}
export interface ResolveMetadataFileOptions extends ResolveFileOptions {
    readonly resolveMetadata: true;
}
export interface FileOperationOptions {
    /**
     * Indicates that a user action triggered the opening, e.g.
     * via mouse or keyboard use. Default is true.
     */
    fromUserGesture?: boolean;
}
export interface MoveFileOptions extends FileOperationOptions, Partial<FileOverwriteOptions> {
}
export interface CopyFileOptions extends FileOperationOptions, Partial<FileOverwriteOptions> {
}
export interface CreateFileOptions extends FileOperationOptions, Partial<FileOverwriteOptions> {
}
export declare class FileOperationError extends Error {
    fileOperationResult: FileOperationResult;
    options?: (ReadFileOptions & WriteFileOptions & CreateFileOptions) | undefined;
    constructor(message: string, fileOperationResult: FileOperationResult, options?: (ReadFileOptions & WriteFileOptions & CreateFileOptions) | undefined);
}
export declare const enum FileOperationResult {
    FILE_IS_DIRECTORY = 0,
    FILE_NOT_FOUND = 1,
    FILE_NOT_MODIFIED_SINCE = 2,
    FILE_MODIFIED_SINCE = 3,
    FILE_MOVE_CONFLICT = 4,
    FILE_READ_ONLY = 5,
    FILE_PERMISSION_DENIED = 6,
    FILE_TOO_LARGE = 7,
    FILE_INVALID_PATH = 8,
    FILE_EXCEEDS_MEMORY_LIMIT = 9,
    FILE_NOT_DIRECTORY = 10,
    FILE_OTHER_ERROR = 11
}
export interface FileOverwriteOptions {
    /**
     * Overwrite the file to create if it already exists on disk. Otherwise
     * an error will be thrown (FILE_MODIFIED_SINCE).
     */
    overwrite: boolean;
}
export interface FileReadStreamOptions {
    /**
     * Is an integer specifying where to begin reading from in the file. If position is undefined,
     * data will be read from the current file position.
     */
    readonly position?: number;
    /**
     * Is an integer specifying how many bytes to read from the file. By default, all bytes
     * will be read.
     */
    readonly length?: number;
    /**
     * If provided, the size of the file will be checked against the limits.
     */
    limits?: {
        readonly size?: number;
        readonly memory?: number;
    };
}
export interface FileUpdateOptions {
    readEncoding: string;
    writeEncoding: string;
    overwriteEncoding: boolean;
}
export interface FileUpdateResult extends Stat {
    encoding: string;
}
export interface FileWriteOptions {
    overwrite: boolean;
    create: boolean;
}
export interface FileOpenOptions {
    create: boolean;
}
export interface FileDeleteOptions {
    recursive: boolean;
    useTrash: boolean;
}
export declare enum FileType {
    Unknown = 0,
    File = 1,
    Directory = 2,
    SymbolicLink = 64
}
export declare enum FilePermission {
    /**
     * File is readonly.
     */
    Readonly = 1
}
export interface Stat {
    type: FileType;
    /**
     * The last modification date represented as millis from unix epoch.
     */
    mtime: number;
    /**
     * The creation date represented as millis from unix epoch.
     */
    ctime: number;
    size: number;
    permissions?: FilePermission;
}
export interface WatchOptions {
    recursive: boolean;
    excludes: string[];
}
export declare const enum FileSystemProviderCapabilities {
    None = 0,
    FileReadWrite = 2,
    FileOpenReadWriteClose = 4,
    FileReadStream = 16,
    FileFolderCopy = 8,
    PathCaseSensitive = 1024,
    Readonly = 2048,
    Trash = 4096,
    Access = 16777216,
    Update = 33554432
}
export declare enum FileSystemProviderErrorCode {
    FileExists = "EntryExists",
    FileNotFound = "EntryNotFound",
    FileNotADirectory = "EntryNotADirectory",
    FileIsADirectory = "EntryIsADirectory",
    FileExceedsMemoryLimit = "EntryExceedsMemoryLimit",
    FileTooLarge = "EntryTooLarge",
    NoPermissions = "NoPermissions",
    Unavailable = "Unavailable",
    Unknown = "Unknown"
}
export declare class FileSystemProviderError extends Error {
    readonly code: FileSystemProviderErrorCode;
    constructor(message: string, code: FileSystemProviderErrorCode);
}
export declare function createFileSystemProviderError(error: Error | string, code: FileSystemProviderErrorCode): FileSystemProviderError;
export declare function ensureFileSystemProviderError(error?: Error): Error;
export declare const FileSystemProvider: unique symbol;
/**
 * A {@link FileSystemProvider} provides the capabilities to read, write, discover, and to manage files and folders
 * of the underlying (potentially virtual) file system. {@link FileSystemProvider}s can be used to serve files from both the
 * local disk as well as remote locations like ftp-servers, REST-services etc. A {@link FileSystemProvider} is registered for a certain
 * scheme and can handle all resources whose uri does conform to that scheme.
 */
export interface FileSystemProvider {
    /** The {@link FileSystemProviderCapabilities} for this provider. */
    readonly capabilities: FileSystemProviderCapabilities;
    /** * Event that is fired if the capabilities of this provider have changed. */
    readonly onDidChangeCapabilities: Event<void>;
    /** Event that is fired if a (watched) file in the filesystem of this provider has changed. */
    readonly onDidChangeFile: Event<readonly FileChange[]>;
    /** Event that is fired if an error occurred when watching files in the filesystem of this provider. */
    readonly onFileWatchError: Event<void>;
    /**
     * Watch the given resource and react to changes by firing the {@link FileSystemProvider#onDidChangeFile} event.
     * @param resource `URI` of the resource to be watched.
     * @param opts Options to define if the resource should be watched recursively and to
     *  provide a set of resources that should be excluded from watching.
     *
     * @returns A `Disposable` that can be invoked to stop watching the resource.
     */
    watch(resource: URI, opts: WatchOptions): IDisposable;
    /**
     * Retrieve metadata about a given file.
     *
     * @param uri The `URI` of the file to retrieve meta data about.
     * @returns A promise of the metadata about the resource.
     */
    stat(resource: URI): Promise<Stat>;
    /**
     * Create a new directory using the given resource uri.
     * @param resource The `URI` of the new folder.
     */
    mkdir(resource: URI): Promise<void>;
    /**
     * Retrieve the content of a given directory.
     * @param resource The `URI` of the directory.
     *
     * @returns A map containing the {@link FileType} for each child resource, identified by name.
     */
    readdir(resource: URI): Promise<[string, FileType][]>;
    /**
     * Delete the given resource.
     * @param resource The `URI` of the resource to delete.
     * @param opts Options to define if files should be deleted recursively and if the trash should be used.
     */
    delete(resource: URI, opts: FileDeleteOptions): Promise<void>;
    /**
     * Rename a file or folder.
     * @param from `URI` of the existing file or folder.
     * @param to `URI` of the target location.
     * @param opts Options to define if existing files should be overwritten.
     */
    rename(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithFileFolderCopyCapability}.
     * See {@link FileSystemProviderWithFileFolderCopyCapability#copy}} for additional documentation.
     */
    copy?(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithFileReadWriteCapability}.
     * See {@link FileSystemProviderWithFileReadWriteCapability#readFile} for additional documentation.
     */
    readFile?(resource: URI): Promise<Uint8Array>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithFileReadWriteCapability}.
     * See {@link FileSystemProviderWithFileReadWriteCapability#writeFile} for additional documentation.
     */
    writeFile?(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithFileReadStreamCapability}.
     * See {@link FileSystemProviderWithFileReadStreamCapability#readFileStream} for additional documentation.
     */
    readFileStream?(resource: URI, opts: FileReadStreamOptions, token: CancellationToken): ReadableStreamEvents<Uint8Array>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithOpenReadWriteCloseCapability}.
     * See {@link FileSystemProviderWithOpenReadWriteCloseCapability#open} for additional documentation.
     */
    open?(resource: URI, opts: FileOpenOptions): Promise<number>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithOpenReadWriteCloseCapability}.
     * See {@link FileSystemProviderWithOpenReadWriteCloseCapability#close} for additional documentation.
     */
    close?(fd: number): Promise<void>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithOpenReadWriteCloseCapability}.
     * See {@link FileSystemProviderWithOpenReadWriteCloseCapability#read} for additional documentation.
     */
    read?(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithOpenReadWriteCloseCapability}.
     * See {@link FileSystemProviderWithOpenReadWriteCloseCapability#write} for additional documentation.
     */
    write?(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithAccessCapability}.
     * See {@link FileSystemProviderWithAccessCapability#access} for additional documentation.
     */
    access?(resource: URI, mode?: number): Promise<void>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithAccessCapability}.
     * See {@link FileSystemProviderWithAccessCapability#fsPath} for additional documentation.
     */
    fsPath?(resource: URI): Promise<string>;
    /**
     * Optional function that has to be implemented by {@link FileSystemProviderWithUpdateCapability}.
     * See {@link FileSystemProviderWithUpdateCapability#updateFile} for additional documentation.
     */
    updateFile?(resource: URI, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
}
/**
 * Subtype of {@link FileSystemProvider} that ensures that the optional functions needed for providers, that should be
 * able access files, are implemented.
 */
export interface FileSystemProviderWithAccessCapability extends FileSystemProvider {
    /**
     * Tests a user's permissions for the file or directory specified by URI.
     * @param resource The `URI` of the file that should be tested.
     * @param mode An optional integer that specifies the accessibility checks to be performed.
     *      Check `FileAccess.Constants` for possible values of mode.
     *      It is possible to create a mask consisting of the bitwise `OR` of two or more values (e.g. FileAccess.Constants.W_OK | FileAccess.Constants.R_OK).
     *      If `mode` is not defined, `FileAccess.Constants.F_OK` will be used instead.
     *
     * @returns A promise that resolves if the user has the required permissions, should be rejected otherwise.
     */
    access(resource: URI, mode?: number): Promise<void>;
    /**
     * Returns the path of the given file URI, specific to the backend's operating system.
     * If the URI is not a file URI, undefined is returned.
     *
     * USE WITH CAUTION: You should always prefer URIs to paths if possible, as they are
     * portable and platform independent. Paths should only be used in cases you directly
     * interact with the OS, e.g. when running a command on the shell.
     *
     * @param resource `URI` of the resource to derive the path from.
     *
     * @returns A promise of the corresponding file system path.
     */
    fsPath(resource: URI): Promise<string>;
}
export declare function hasAccessCapability(provider: FileSystemProvider): provider is FileSystemProviderWithAccessCapability;
/**
 * Subtype of {@link FileSystemProvider} that ensures that the optional functions needed, for providers that should be
 * able to update (text) files, are implemented.
 */
export interface FileSystemProviderWithUpdateCapability extends FileSystemProvider {
    /**
     * Update the content of the given (text) file according to the given text document changes.
     * @param resource `URI` of the resource to update.
     * @param changes Array of events describing the changes to the file.
     * @param opts The encoding options.
     *
     * @returns A promise of the file metadata that resolves after the update process has completed.
     */
    updateFile(resource: URI, changes: TextDocumentContentChangeEvent[], opts: FileUpdateOptions): Promise<FileUpdateResult>;
}
export declare function hasUpdateCapability(provider: FileSystemProvider): provider is FileSystemProviderWithUpdateCapability;
export interface ReadOnlyMessageFileSystemProvider {
    readOnlyMessage: MarkdownString | undefined;
    readonly onDidChangeReadOnlyMessage: Event<MarkdownString | undefined>;
}
export declare namespace ReadOnlyMessageFileSystemProvider {
    function is(arg: unknown): arg is ReadOnlyMessageFileSystemProvider;
}
/**
 * Subtype of {@link FileSystemProvider} that ensures that the optional functions, needed for providers
 * that should be able to read & write files, are implemented.
 */
export interface FileSystemProviderWithFileReadWriteCapability extends FileSystemProvider {
    /**
     * Read the contents of the given file as stream.
     * @param resource The `URI` of the file.
     *
     * @return The `ReadableStreamEvents` for the readable stream of the given file.
     */
    readFile(resource: URI): Promise<Uint8Array>;
    /**
     *  Write data to a file, replacing its entire contents.
     * @param resource The uri of the file.
     * @param content The new content of the file.
     * @param opts Options to define if the file should be created if missing and if an existing file should be overwritten.
     */
    writeFile(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
}
export declare function hasReadWriteCapability(provider: FileSystemProvider): provider is FileSystemProviderWithFileReadWriteCapability;
/**
 * Subtype of {@link FileSystemProvider} that ensures that the optional functions, needed for providers that should be able to copy
 * file folders, are implemented.
 */
export interface FileSystemProviderWithFileFolderCopyCapability extends FileSystemProvider {
    /**
     * Copy files or folders.
     * @param from `URI` of the existing file or folder.
     * @param to `URI` of the destination location.
     * @param opts Options to define if existing files should be overwritten.
     */
    copy(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
}
export declare function hasFileFolderCopyCapability(provider: FileSystemProvider): provider is FileSystemProviderWithFileFolderCopyCapability;
/**
 * Subtype of {@link FileSystemProvider} that ensures that the optional functions, needed for providers that should be able to open,read, write
 * or close files, are implemented.
 */
export interface FileSystemProviderWithOpenReadWriteCloseCapability extends FileSystemProvider {
    /**
     * Open the give file.
     * @param resource The `URI` of the file to open.
     * @param opts Options to define if the file should be created if it does not exist yet.
     *
     * @returns A promise of the file descriptor that resolves after the file is open.
     */
    open(resource: URI, opts: FileOpenOptions): Promise<number>;
    /**
     * Close the file with the given file descriptor.
     * @param fd the file descriptor to close.
     */
    close(fd: number): Promise<void>;
    /**
     * Read specified content from a given file descriptor into a data buffer.
     * @param fd The file descriptor referencing the file to read from.
     * @param pos The offset from the beginning of the file from which data should be read.
     * @param data The buffer that the data will be written to.
     * @param offset The offset in the buffer at which to start writing.
     * @param length The number of bytes to read.
     *
     * @returns A promise of the number of bytes read.
     */
    read(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
    /**
     * Write specified content from the data buffer to the file referenced by the given file descriptor.
     * @param fd The file descriptor referencing the file to write to.
     * @param pos The offset from the beginning of the file where this data should be written.
     * @param offset The part of the buffer to be read from.
     * @param length The number of bytes to write.
     *
     * @returns A promise of the number of bytes written.
     */
    write(fd: number, pos: number, data: Uint8Array, offset: number, length: number): Promise<number>;
}
export declare function hasOpenReadWriteCloseCapability(provider: FileSystemProvider): provider is FileSystemProviderWithOpenReadWriteCloseCapability;
/**
 * Subtype of {@link FileSystemProvider} that ensures that the optional functions, needed for providers that should be able to read
 * files as streams, are implemented.
 */
export interface FileSystemProviderWithFileReadStreamCapability extends FileSystemProvider {
    /**
     * Read the contents of the given file as stream.
     * @param resource The `URI` of the file.
     *
     * @return The `ReadableStreamEvents` for the readable stream of the given file.
     */
    readFileStream(resource: URI, opts: FileReadStreamOptions, token: CancellationToken): ReadableStreamEvents<Uint8Array>;
}
export declare function hasFileReadStreamCapability(provider: FileSystemProvider): provider is FileSystemProviderWithFileReadStreamCapability;
export declare function markAsFileSystemProviderError(error: Error, code: FileSystemProviderErrorCode): Error;
export declare function toFileSystemProviderErrorCode(error: Error | undefined | null): FileSystemProviderErrorCode;
export declare function toFileOperationResult(error: Error): FileOperationResult;
/**
 * A hint to disable etag checking for reading/writing.
 */
export declare const ETAG_DISABLED = "";
export declare function etag(stat: {
    mtime: number;
    size: number;
}): string;
export declare function etag(stat: {
    mtime: number | undefined;
    size: number | undefined;
}): string | undefined;
/**
 * Helper to format a raw byte size into a human readable label.
 */
export declare class BinarySize {
    static readonly KB = 1024;
    static readonly MB: number;
    static readonly GB: number;
    static readonly TB: number;
    static formatSize(size: number): string;
}
//# sourceMappingURL=files.d.ts.map