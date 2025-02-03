import { ExtensionLike, OVSXClient, VSXExtensionRaw, VSXQueryOptions, VSXQueryResult, VSXSearchOptions, VSXSearchResult } from './ovsx-types';
/**
 * Querying will only find exact matches.
 * Searching will try to find the query string in various fields.
 */
export declare class OVSXMockClient implements OVSXClient {
    extensions: VSXExtensionRaw[];
    constructor(extensions?: VSXExtensionRaw[]);
    setExtensions(extensions: VSXExtensionRaw[]): this;
    /**
     * @param baseUrl required to construct the URLs required by {@link VSXExtensionRaw}.
     * @param ids list of ids to generate {@link VSXExtensionRaw} from.
     */
    setExtensionsFromIds(baseUrl: string, ids: string[]): this;
    query(queryOptions?: VSXQueryOptions): Promise<VSXQueryResult>;
    search(searchOptions?: VSXSearchOptions): Promise<VSXSearchResult>;
    protected id(extension: ExtensionLike): string;
    /**
     * Case sensitive.
     */
    protected compare(expected?: string, value?: string): boolean;
    /**
     * Case insensitive.
     */
    protected includes(needle: string, value?: string): boolean;
    protected sort(a: VSXExtensionRaw, b: VSXExtensionRaw, searchOptions?: VSXSearchOptions): number;
}
export declare namespace OVSXMockClient {
    /**
     * URLs should respect the official OpenVSX API:
     * https://open-vsx.org/swagger-ui/index.html
     */
    class UrlBuilder {
        protected baseUrl: string;
        constructor(baseUrl: string);
        url(path: string): string;
        apiUrl(path: string): string;
        namespaceUrl(namespace: string, path?: string): string;
        extensionUrl(namespace: string, name: string, path?: string): string;
        extensionReviewsUrl(namespace: string, name: string): string;
        extensionFileUrl(namespace: string, name: string, version: string, path?: string): string;
    }
}
//# sourceMappingURL=ovsx-mock-client.d.ts.map