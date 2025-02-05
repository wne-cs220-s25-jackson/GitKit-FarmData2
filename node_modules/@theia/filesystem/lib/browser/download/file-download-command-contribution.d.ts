import URI from '@theia/core/lib/common/uri';
import { SelectionService } from '@theia/core/lib/common/selection-service';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { FileDownloadService } from './file-download-service';
export declare class FileDownloadCommandContribution implements CommandContribution {
    protected readonly downloadService: FileDownloadService;
    protected readonly selectionService: SelectionService;
    registerCommands(registry: CommandRegistry): void;
    protected executeDownload(uris: URI[], options?: {
        copyLink?: boolean;
    }): Promise<void>;
    protected isDownloadEnabled(uris: URI[]): boolean;
    protected isDownloadVisible(uris: URI[]): boolean;
}
export declare namespace FileDownloadCommands {
    const DOWNLOAD: Command;
    const COPY_DOWNLOAD_LINK: Command;
}
//# sourceMappingURL=file-download-command-contribution.d.ts.map