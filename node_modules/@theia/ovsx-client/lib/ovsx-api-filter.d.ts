import { OVSXClient, VSXAllVersions, VSXExtensionRaw, VSXQueryOptions, VSXSearchEntry } from './ovsx-types';
export declare const OVSXApiFilterProvider: unique symbol;
export type OVSXApiFilterProvider = () => Promise<OVSXApiFilter>;
export declare const OVSXApiFilter: unique symbol;
/**
 * Filter various data types based on a pre-defined supported VS Code API version.
 */
export interface OVSXApiFilter {
    supportedApiVersion: string;
    findLatestCompatibleExtension(query: VSXQueryOptions): Promise<VSXExtensionRaw | undefined>;
    /**
     * Get the latest compatible extension version:
     * - A builtin extension is fetched based on the extension version which matches the API.
     * - An extension satisfies compatibility if its `engines.vscode` version is supported.
     *
     * @param extensionId the extension id.
     * @returns the data for the latest compatible extension version if available, else `undefined`.
     */
    getLatestCompatibleExtension(extensions: VSXExtensionRaw[]): VSXExtensionRaw | undefined;
    getLatestCompatibleVersion(searchEntry: VSXSearchEntry): VSXAllVersions | undefined;
}
export declare class OVSXApiFilterImpl implements OVSXApiFilter {
    client: OVSXClient;
    supportedApiVersion: string;
    constructor(client: OVSXClient, supportedApiVersion: string);
    findLatestCompatibleExtension(query: VSXQueryOptions): Promise<VSXExtensionRaw | undefined>;
    protected queryLatestCompatibleExtension(query: VSXQueryOptions): Promise<VSXExtensionRaw | undefined>;
    getLatestCompatibleExtension(extensions: VSXExtensionRaw[]): VSXExtensionRaw | undefined;
    getLatestCompatibleVersion(searchEntry: VSXSearchEntry): VSXAllVersions | undefined;
    protected isBuiltinNamespace(namespace: string): boolean;
    /**
     * @returns `a >= b`
     */
    protected versionGreaterThanOrEqualTo(a: string, b: string): boolean;
    protected supportedVscodeApiSatisfies(vscodeApiRange: string): boolean;
}
//# sourceMappingURL=ovsx-api-filter.d.ts.map