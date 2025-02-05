import { interfaces } from '@theia/core/shared/inversify';
import { BinaryBuffer } from '@theia/core/lib/common/buffer';
import { Disposable } from '@theia/core/lib/common/disposable';
import { FileSystemMain, IFileChangeDto } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { UriComponents } from '../../common/uri-components';
import { FileSystemProviderCapabilities, Stat, FileType, FileOverwriteOptions, FileDeleteOptions } from '@theia/filesystem/lib/common/files';
import { MarkdownString } from '../../common/plugin-api-rpc-model';
export declare class FileSystemMainImpl implements FileSystemMain, Disposable {
    private readonly _proxy;
    private readonly _fileProvider;
    private readonly _fileService;
    private readonly _disposables;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $registerFileSystemProvider(handle: number, scheme: string, capabilities: FileSystemProviderCapabilities, readonlyMessage?: MarkdownString): void;
    $unregisterProvider(handle: number): void;
    $onFileSystemChange(handle: number, changes: IFileChangeDto[]): void;
    $stat(uri: UriComponents): Promise<Stat>;
    $readdir(uri: UriComponents): Promise<[string, FileType][]>;
    $readFile(uri: UriComponents): Promise<BinaryBuffer>;
    $writeFile(uri: UriComponents, content: BinaryBuffer): Promise<void>;
    $rename(source: UriComponents, target: UriComponents, opts: FileOverwriteOptions): Promise<void>;
    $copy(source: UriComponents, target: UriComponents, opts: FileOverwriteOptions): Promise<void>;
    $mkdir(uri: UriComponents): Promise<void>;
    $delete(uri: UriComponents, opts: FileDeleteOptions): Promise<void>;
    private static _handleError;
}
//# sourceMappingURL=file-system-main-impl.d.ts.map