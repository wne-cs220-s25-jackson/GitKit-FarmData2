import URI from '@theia/core/lib/common/uri';
import { MaybeArray } from '@theia/core/lib/common/types';
import { MessageService } from '@theia/core/lib/common/message-service';
import { FileStat } from '../../common/files';
import { DefaultFileDialogService, OpenFileDialogProps, SaveFileDialogProps } from '../../browser/file-dialog';
import { OpenDialogOptions, SaveDialogOptions } from '../../electron-common/electron-api';
import '@theia/core/lib/electron-common/electron-api';
export declare class ElectronFileDialogService extends DefaultFileDialogService {
    protected readonly messageService: MessageService;
    showOpenDialog(props: OpenFileDialogProps & {
        canSelectMany: true;
    }, folder?: FileStat): Promise<MaybeArray<URI> | undefined>;
    showOpenDialog(props: OpenFileDialogProps, folder?: FileStat): Promise<URI | undefined>;
    showSaveDialog(props: SaveFileDialogProps, folder?: FileStat): Promise<URI | undefined>;
    protected canReadWrite(uris: MaybeArray<URI>): Promise<boolean>;
    protected canRead(uris: MaybeArray<URI>): Promise<boolean>;
    protected toOpenDialogOptions(uri: URI, props: OpenFileDialogProps): OpenDialogOptions;
    protected toSaveDialogOptions(uri: URI, props: SaveFileDialogProps): SaveDialogOptions;
}
//# sourceMappingURL=electron-file-dialog-service.d.ts.map