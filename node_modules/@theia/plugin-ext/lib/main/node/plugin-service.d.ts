/// <reference types="node" />
import * as http from 'http';
import * as express from '@theia/core/shared/express';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { WsRequestValidatorContribution } from '@theia/core/lib/node/ws-request-validators';
import { MaybePromise } from '@theia/core/lib/common';
import { ApplicationPackage } from '@theia/core/shared/@theia/application-package';
import { BackendRemoteService } from '@theia/core/lib/node/remote/backend-remote-service';
export declare class PluginApiContribution implements BackendApplicationContribution, WsRequestValidatorContribution {
    protected webviewExternalEndpointRegExp: RegExp;
    protected serveSameOrigin: boolean;
    protected readonly applicationPackage: ApplicationPackage;
    protected readonly remoteService: BackendRemoteService;
    protected init(): void;
    configure(app: express.Application): void;
    allowWsUpgrade(request: http.IncomingMessage): MaybePromise<boolean>;
    protected webviewExternalEndpointPattern(): string;
    /**
     * Returns a RegExp pattern matching the expected WebView endpoint's host.
     */
    protected webviewExternalEndpoint(): string;
}
//# sourceMappingURL=plugin-service.d.ts.map