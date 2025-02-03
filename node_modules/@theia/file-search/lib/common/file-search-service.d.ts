import { CancellationToken } from '@theia/core';
export declare const fileSearchServicePath = "/services/search";
/**
 * The JSON-RPC file search service interface.
 */
export interface FileSearchService {
    /**
     * finds files by a given search pattern.
     * @return the matching file uris
     */
    find(searchPattern: string, options: FileSearchService.Options, cancellationToken?: CancellationToken): Promise<string[]>;
}
export declare const FileSearchService: unique symbol;
export declare namespace FileSearchService {
    interface BaseOptions {
        useGitIgnore?: boolean;
        includePatterns?: string[];
        excludePatterns?: string[];
    }
    interface RootOptions {
        [rootUri: string]: BaseOptions;
    }
    interface Options extends BaseOptions {
        rootUris?: string[];
        rootOptions?: RootOptions;
        fuzzyMatch?: boolean;
        limit?: number;
    }
}
export declare const WHITESPACE_QUERY_SEPARATOR: RegExp;
//# sourceMappingURL=file-search-service.d.ts.map