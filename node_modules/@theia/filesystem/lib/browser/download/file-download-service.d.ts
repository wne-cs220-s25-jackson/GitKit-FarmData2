import URI from '@theia/core/lib/common/uri';
import { ILogger } from '@theia/core/lib/common/logger';
import { FileDownloadData } from '../../common/download/file-download-data';
import { MessageService } from '@theia/core/lib/common/message-service';
export declare class FileDownloadService {
    protected anchor: HTMLAnchorElement | undefined;
    protected downloadCounter: number;
    protected readonly logger: ILogger;
    protected readonly messageService: MessageService;
    protected handleCopy(event: ClipboardEvent, downloadUrl: string): void;
    cancelDownload(id: string): Promise<void>;
    download(uris: URI[], options?: FileDownloadService.DownloadOptions): Promise<void>;
    protected forceDownload(id: string, title: string): Promise<void>;
    protected request(uris: URI[]): Request;
    protected requestInit(uris: URI[]): RequestInit;
    protected body(uris: URI[]): FileDownloadData;
    protected url(uris: URI[]): string;
    protected endpoint(): string;
    protected filesUrl(): string;
}
export declare namespace FileDownloadService {
    interface DownloadOptions {
        /**
         * `true` if the download link has to be copied to the clipboard. This will not trigger the actual download. Defaults to `false`.
         */
        readonly copyLink?: boolean;
    }
}
//# sourceMappingURL=file-download-service.d.ts.map