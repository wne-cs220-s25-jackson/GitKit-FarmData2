import URI from '@theia/core/lib/common/uri';
import { CompositeTreeNode, TreeNode, CompressedTreeModel } from '@theia/core/lib/browser';
import { FileStatNode } from './file-tree';
import { LocationService } from '../location';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { FileService } from '../file-service';
import { FileChangesEvent, FileChange } from '../../common/files';
import { MessageService } from '@theia/core/lib/common/message-service';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
export declare class FileTreeModel extends CompressedTreeModel implements LocationService {
    protected readonly labelProvider: LabelProvider;
    protected readonly fileService: FileService;
    protected readonly messageService: MessageService;
    protected readonly environments: EnvVariablesServer;
    protected init(): void;
    get location(): URI | undefined;
    set location(uri: URI | undefined);
    drives(): Promise<URI[]>;
    get selectedFileStatNodes(): Readonly<FileStatNode>[];
    getNodesByUri(uri: URI): IterableIterator<TreeNode>;
    protected onFilesChanged(changes: FileChangesEvent): void;
    protected isRootAffected(changes: FileChangesEvent): boolean;
    protected getAffectedUris(changes: FileChangesEvent): URI[];
    protected isFileContentChanged(change: FileChange): boolean;
    protected refreshAffectedNodes(uris: URI[]): boolean;
    protected getAffectedNodes(uris: URI[]): Map<string, CompositeTreeNode>;
    copy(source: URI, target: Readonly<FileStatNode>): Promise<URI>;
    /**
     * Move the given source file or directory to the given target directory.
     */
    move(source: TreeNode, target: TreeNode): Promise<URI | undefined>;
    protected shouldReplace(fileName: string): Promise<boolean>;
}
//# sourceMappingURL=file-tree-model.d.ts.map