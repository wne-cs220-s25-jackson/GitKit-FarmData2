import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
import { OpenDialogOptionsMain, SaveDialogOptionsMain, DialogsMain, UploadDialogOptionsMain } from '../../common/plugin-api-rpc';
import { FileStat } from '@theia/filesystem/lib/common/files';
export declare class DialogsMainImpl implements DialogsMain {
    private workspaceService;
    private fileService;
    private environments;
    private fileDialogService;
    private uploadService;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    protected getRootStat(defaultUri: string | undefined): Promise<FileStat | undefined>;
    $showOpenDialog(options: OpenDialogOptionsMain): Promise<string[] | undefined>;
    $showSaveDialog(options: SaveDialogOptionsMain): Promise<string | undefined>;
    $showUploadDialog(options: UploadDialogOptionsMain): Promise<string[] | undefined>;
}
//# sourceMappingURL=dialogs-main.d.ts.map