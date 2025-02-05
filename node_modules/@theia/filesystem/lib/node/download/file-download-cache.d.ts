import { ILogger } from '@theia/core/lib/common/logger';
export interface DownloadStorageItem {
    file: string;
    root?: string;
    size: number;
    remove: boolean;
    expire?: number;
}
export declare class FileDownloadCache {
    protected readonly logger: ILogger;
    protected readonly downloads: Map<string, DownloadStorageItem>;
    protected readonly expireTimeInMinutes: number;
    addDownload(id: string, downloadInfo: DownloadStorageItem): void;
    getDownload(id: string): DownloadStorageItem | undefined;
    deleteDownload(id: string): void;
    values(): {
        [key: string]: DownloadStorageItem;
    };
    protected deleteRecursively(pathToDelete: string): void;
    protected expireDownloads(): void;
}
//# sourceMappingURL=file-download-cache.d.ts.map