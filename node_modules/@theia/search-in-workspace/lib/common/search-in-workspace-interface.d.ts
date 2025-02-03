import { RpcServer } from '@theia/core';
export interface SearchInWorkspaceOptions {
    /**
     * Maximum number of results to return.  Defaults to unlimited.
     */
    maxResults?: number;
    /**
     * accepts suffixes of K, M or G which correspond to kilobytes,
     * megabytes and gigabytes, respectively. If no suffix is provided the input is
     * treated as bytes.
     *
     * defaults to '20M'
     */
    maxFileSize?: string;
    /**
     * Search case sensitively if true.
     */
    matchCase?: boolean;
    /**
     * Search whole words only if true.
     */
    matchWholeWord?: boolean;
    /**
     * Use regular expressions for search if true.
     */
    useRegExp?: boolean;
    /**
     * Use multiline search if true.
     */
    multiline?: boolean;
    /**
     * Include all .gitignored and hidden files.
     */
    includeIgnored?: boolean;
    /**
     * Glob pattern for matching files and directories to include the search.
     */
    include?: string[];
    /**
     * Glob pattern for matching files and directories to exclude the search.
     */
    exclude?: string[];
    /**
     * Whether symlinks should be followed while searching.
     */
    followSymlinks?: boolean;
}
export interface SearchInWorkspaceResult {
    /**
     * The string uri to the root folder that the search was performed.
     */
    root: string;
    /**
     * The string uri to the file containing the result.
     */
    fileUri: string;
    /**
     * matches found in the file
     */
    matches: SearchMatch[];
}
export interface SearchMatch {
    /**
     * The (1-based) line number of the result.
     */
    line: number;
    /**
     * The (1-based) character number in the result line.  For UTF-8 files,
     * one multi-byte character counts as one character.
     */
    character: number;
    /**
     * The length of the match, in characters.  For UTF-8 files, one
     * multi-byte character counts as one character.
     */
    length: number;
    /**
     * The text of the line containing the result.
     */
    lineText: string | LinePreview;
}
export interface LinePreview {
    text: string;
    character: number;
}
export declare namespace SearchInWorkspaceResult {
    /**
     * Sort search in workspace results according to file, line, character position
     * and then length.
     */
    function compare(a: SearchInWorkspaceResult, b: SearchInWorkspaceResult): number;
}
export declare const SearchInWorkspaceClient: unique symbol;
export interface SearchInWorkspaceClient {
    /**
     * Called by the server for every search match.
     */
    onResult(searchId: number, result: SearchInWorkspaceResult): void;
    /**
     * Called when no more search matches will come.
     */
    onDone(searchId: number, error?: string): void;
}
export declare const SIW_WS_PATH = "/services/search-in-workspace";
export declare const SearchInWorkspaceServer: unique symbol;
export interface SearchInWorkspaceServer extends RpcServer<SearchInWorkspaceClient> {
    /**
     * Start a search for WHAT in directories ROOTURIS. Return a unique search id.
     */
    search(what: string, rootUris: string[], opts?: SearchInWorkspaceOptions): Promise<number>;
    /**
     * Cancel an ongoing search.
     */
    cancel(searchId: number): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=search-in-workspace-interface.d.ts.map