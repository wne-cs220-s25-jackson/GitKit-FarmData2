/// <reference types="node" />
import * as http from 'http';
import { ContributionProvider, MaybePromise } from '../common';
/**
 * Bind components to this symbol to filter WebSocket connections.
 */
export declare const WsRequestValidatorContribution: unique symbol;
export interface WsRequestValidatorContribution {
    /**
     * Return `false` to prevent the protocol upgrade from going through, blocking the WebSocket connection.
     *
     * @param request The HTTP connection upgrade request received by the server.
     */
    allowWsUpgrade(request: http.IncomingMessage): MaybePromise<boolean>;
}
/**
 * Central handler of `WsRequestValidatorContribution`.
 */
export declare class WsRequestValidator {
    protected readonly requestValidators: ContributionProvider<WsRequestValidatorContribution>;
    /**
     * Ask all bound `WsRequestValidatorContributions` if the WebSocket connection should be allowed or not.
     */
    allowWsUpgrade(request: http.IncomingMessage): Promise<boolean>;
}
//# sourceMappingURL=ws-request-validators.d.ts.map