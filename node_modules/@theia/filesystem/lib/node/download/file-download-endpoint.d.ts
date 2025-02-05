import { Application } from '@theia/core/shared/express';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { FileDownloadHandler } from './file-download-handler';
export declare class FileDownloadEndpoint implements BackendApplicationContribution {
    protected static PATH: string;
    protected readonly singleFileDownloadHandler: FileDownloadHandler;
    protected readonly multiFileDownloadHandler: FileDownloadHandler;
    protected readonly downloadLinkHandler: FileDownloadHandler;
    configure(app: Application): void;
}
//# sourceMappingURL=file-download-endpoint.d.ts.map