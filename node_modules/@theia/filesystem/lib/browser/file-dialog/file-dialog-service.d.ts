import URI from '@theia/core/lib/common/uri';
import { MaybeArray } from '@theia/core/lib/common';
import { LabelProvider } from '@theia/core/lib/browser';
import { FileStat } from '../../common/files';
import { DirNode } from '../file-tree';
import { OpenFileDialogFactory, OpenFileDialogProps, SaveFileDialogFactory, SaveFileDialogProps } from './file-dialog';
import { FileService } from '../file-service';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { UserWorkingDirectoryProvider } from '@theia/core/lib/browser/user-working-directory-provider';
export declare const FileDialogService: unique symbol;
export interface FileDialogService {
    showOpenDialog(props: OpenFileDialogProps & {
        canSelectMany: true;
    }, folder?: FileStat): Promise<MaybeArray<URI> | undefined>;
    showOpenDialog(props: OpenFileDialogProps, folder?: FileStat): Promise<URI | undefined>;
    showOpenDialog(props: OpenFileDialogProps, folder?: FileStat): Promise<MaybeArray<URI> | undefined>;
    showSaveDialog(props: SaveFileDialogProps, folder?: FileStat): Promise<URI | undefined>;
}
export declare class DefaultFileDialogService implements FileDialogService {
    protected readonly environments: EnvVariablesServer;
    protected readonly fileService: FileService;
    protected readonly openFileDialogFactory: OpenFileDialogFactory;
    protected readonly labelProvider: LabelProvider;
    protected readonly saveFileDialogFactory: SaveFileDialogFactory;
    protected readonly rootProvider: UserWorkingDirectoryProvider;
    showOpenDialog(props: OpenFileDialogProps & {
        canSelectMany: true;
    }, folder?: FileStat): Promise<MaybeArray<URI> | undefined>;
    showOpenDialog(props: OpenFileDialogProps, folder?: FileStat): Promise<URI | undefined>;
    showSaveDialog(props: SaveFileDialogProps, folder?: FileStat): Promise<URI | undefined>;
    protected getRootNode(folderToOpen?: FileStat): Promise<DirNode | undefined>;
}
//# sourceMappingURL=file-dialog-service.d.ts.map