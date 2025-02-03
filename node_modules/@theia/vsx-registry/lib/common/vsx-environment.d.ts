import type { OVSXRouterConfig } from '@theia/ovsx-client';
export declare const VSX_ENVIRONMENT_PATH = "/services/vsx-environment";
export declare const VSXEnvironment: unique symbol;
export interface VSXEnvironment {
    getRateLimit(): Promise<number>;
    getRegistryUri(): Promise<string>;
    getRegistryApiUri(): Promise<string>;
    getVscodeApiVersion(): Promise<string>;
    getOvsxRouterConfig?(): Promise<OVSXRouterConfig | undefined>;
}
//# sourceMappingURL=vsx-environment.d.ts.map