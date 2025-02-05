/// <reference types="node" />
import { WsRequestValidatorContribution } from '@theia/core/lib/node/ws-request-validators';
import * as http from 'http';
/**
 * Prevents explicit WebSocket connections from the mini-browser virtual host.
 */
export declare class MiniBrowserWsRequestValidator implements WsRequestValidatorContribution {
    protected miniBrowserHostRe: RegExp;
    protected serveSameOrigin: boolean;
    protected init(): void;
    allowWsUpgrade(request: http.IncomingMessage): Promise<boolean>;
}
//# sourceMappingURL=mini-browser-ws-validator.d.ts.map