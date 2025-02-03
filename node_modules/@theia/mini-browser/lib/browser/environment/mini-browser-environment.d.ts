import { Endpoint, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
/**
 * Fetch values from the backend's environment and caches them locally.
 * Helps with deploying various mini-browser endpoints.
 */
export declare class MiniBrowserEnvironment implements FrontendApplicationContribution {
    protected _hostPatternPromise: Promise<string>;
    protected _hostPattern?: string;
    protected environment: EnvVariablesServer;
    protected init(): void;
    get hostPatternPromise(): Promise<string>;
    get hostPattern(): string | undefined;
    onStart(): Promise<void>;
    /**
     * Throws if `hostPatternPromise` is not yet resolved.
     */
    getEndpoint(uuid: string, hostname?: string): Endpoint;
    /**
     * Throws if `hostPatternPromise` is not yet resolved.
     */
    getRandomEndpoint(): Endpoint;
    protected getHostPattern(): Promise<string>;
    protected getDefaultHostname(): string;
}
//# sourceMappingURL=mini-browser-environment.d.ts.map