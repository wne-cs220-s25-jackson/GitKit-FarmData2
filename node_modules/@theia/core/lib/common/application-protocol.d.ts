import { OS } from './os';
export declare const applicationPath = "/services/application";
export declare const ApplicationServer: unique symbol;
export interface ApplicationServer {
    getExtensionsInfos(): Promise<ExtensionInfo[]>;
    getApplicationInfo(): Promise<ApplicationInfo | undefined>;
    getApplicationRoot(): Promise<string>;
    getApplicationPlatform(): Promise<string>;
    /**
     * @deprecated since 1.25.0. Use `OS.backend.type()` instead.
     */
    getBackendOS(): Promise<OS.Type>;
}
export interface ExtensionInfo {
    name: string;
    version: string;
}
export interface ApplicationInfo {
    name: string;
    version: string;
}
//# sourceMappingURL=application-protocol.d.ts.map