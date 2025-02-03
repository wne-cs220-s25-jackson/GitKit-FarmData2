/// <reference types="node" />
import * as http from 'http';
import { WsRequestValidatorContribution } from '../ws-request-validators';
import { BackendApplicationHosts } from './backend-application-hosts';
export declare class WsOriginValidator implements WsRequestValidatorContribution {
    protected readonly backendApplicationHosts: BackendApplicationHosts;
    allowWsUpgrade(request: http.IncomingMessage): boolean;
}
//# sourceMappingURL=ws-origin-validator.d.ts.map