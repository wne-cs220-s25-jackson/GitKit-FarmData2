import { FileServiceContribution, FileService } from './file-service';
import { FileChange, FileDeleteOptions, FileOverwriteOptions, FileSystemProvider, FileType, FileWriteOptions, Stat, WatchOptions } from '../common/files';
import { Event, URI, Disposable, Emitter } from '@theia/core';
import { JsonSchemaDataStore } from '@theia/core/lib/browser/json-schema-store';
export declare class VSCodeFileSystemProvider implements FileSystemProvider {
    readonly capabilities: number;
    readonly onDidChangeCapabilities: Event<any>;
    protected readonly onDidChangeFileEmitter: Emitter<readonly FileChange[]>;
    readonly onDidChangeFile: Event<readonly FileChange[]>;
    readonly onFileWatchError: Event<any>;
    protected readonly store: JsonSchemaDataStore;
    watch(resource: URI, opts: WatchOptions): Disposable;
    stat(resource: URI): Promise<Stat>;
    mkdir(resource: URI): Promise<void>;
    readdir(resource: URI): Promise<[string, FileType][]>;
    delete(resource: URI, opts: FileDeleteOptions): Promise<void>;
    rename(from: URI, to: URI, opts: FileOverwriteOptions): Promise<void>;
    readFile(resource: URI): Promise<Uint8Array>;
    writeFile(resource: URI, content: Uint8Array, opts: FileWriteOptions): Promise<void>;
}
export declare class VSCodeFileServiceContribution implements FileServiceContribution {
    protected readonly provider: VSCodeFileSystemProvider;
    registerFileSystemProviders(service: FileService): void;
}
//# sourceMappingURL=vscode-file-service-contribution.d.ts.map