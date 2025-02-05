import express = require('express');
import { BackendApplicationContribution } from '../../node';
import { ElectronTokenValidator } from './electron-token-validator';
/**
 * This component contributes an Express middleware that will refuse all
 * requests that do not include a specific token.
 */
export declare class ElectronTokenBackendContribution implements BackendApplicationContribution {
    protected readonly tokenValidator: ElectronTokenValidator;
    configure(app: express.Application): void;
    /**
     * Only allow token-bearers.
     */
    protected expressMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
//# sourceMappingURL=electron-token-backend-contribution.d.ts.map