import { Deferred } from '@theia/core/lib/common/promise-util';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import URI from '@theia/core/lib/common/uri';
export declare class WebviewEnvironment {
    protected _hostPatternPromise: Promise<string>;
    protected readonly externalEndpointHost: Deferred<string>;
    protected readonly environments: EnvVariablesServer;
    protected init(): void;
    protected doInit(): Promise<void>;
    get hostPatternPromise(): Promise<string>;
    externalEndpointUrl(): Promise<URI>;
    externalEndpoint(): Promise<string>;
    resourceRoot(host: string): Promise<string>;
    cspSource(): Promise<string>;
    protected getHostPattern(): Promise<string>;
}
//# sourceMappingURL=webview-environment.d.ts.map