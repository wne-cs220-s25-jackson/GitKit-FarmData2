import express = require('@theia/core/shared/express');
import { BackendApplicationContribution } from '@theia/core/lib/node';
export declare class NodeFileUploadService implements BackendApplicationContribution {
    private static readonly UPLOAD_DIR;
    configure(app: express.Application): Promise<void>;
    /**
     * @returns URL path on which to accept file uploads.
     */
    protected getHttpFileUploadPath(): Promise<string>;
    /**
     * @returns Path to a folder where to temporarily store uploads.
     */
    protected getTemporaryUploadDest(): Promise<string>;
    protected handleFileUpload(request: express.Request, response: express.Response): Promise<void>;
}
//# sourceMappingURL=node-file-upload-service.d.ts.map