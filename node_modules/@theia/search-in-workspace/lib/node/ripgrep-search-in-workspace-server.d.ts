import { ILogger } from '@theia/core';
import { RawProcessFactory } from '@theia/process/lib/node';
import { SearchInWorkspaceServer, SearchInWorkspaceOptions, SearchInWorkspaceClient } from '../common/search-in-workspace-interface';
export declare const RgPath: unique symbol;
/**
 * Typing for ripgrep's arbitrary data object:
 *
 *   https://docs.rs/grep-printer/0.1.0/grep_printer/struct.JSON.html#object-arbitrary-data
 */
export type IRgBytesOrText = {
    bytes: string;
} | {
    text: string;
};
export interface IRgSubmatch {
    match: IRgBytesOrText;
    start: number;
    end: number;
}
export declare class RipgrepSearchInWorkspaceServer implements SearchInWorkspaceServer {
    protected readonly logger: ILogger;
    protected readonly rawProcessFactory: RawProcessFactory;
    private ongoingSearches;
    private nextSearchId;
    private client;
    protected readonly rgPath: string;
    constructor(logger: ILogger, rawProcessFactory: RawProcessFactory);
    setClient(client: SearchInWorkspaceClient | undefined): void;
    protected getArgs(options?: SearchInWorkspaceOptions): string[];
    /**
     * Add glob patterns to ripgrep's arguments
     * @param args ripgrep set of arguments
     * @param patterns patterns to include as globs
     * @param exclude whether to negate the glob pattern or not
     */
    protected addGlobArgs(args: Set<string>, patterns: string[], exclude?: boolean): void;
    /**
     * Transforms relative patterns to absolute paths, one for each given search path.
     * The resulting paths are not validated in the file system as the pattern keeps glob information.
     *
     * @returns The resulting list may be larger than the received patterns as a relative pattern may
     * resolve to multiple absolute patterns up to the number of search paths.
     */
    protected replaceRelativeToAbsolute(roots: string[], patterns?: string[]): string[];
    /**
     * Tests if the pattern is relative and should/can be made absolute.
     */
    protected isPatternRelative(pattern: string): boolean;
    /**
     * By default, sets the search directories for the string WHAT to the provided ROOTURIS directories
     * and returns the assigned search id.
     *
     * The include / exclude (options in SearchInWorkspaceOptions) are lists of patterns for files to
     * include / exclude during search (glob characters are allowed).
     *
     * include patterns successfully recognized as absolute paths will override the default search and set
     * the search directories to the ones provided as includes.
     * Relative paths are allowed, the application will attempt to translate them to valid absolute paths
     * based on the applicable search directories.
     */
    search(what: string, rootUris: string[], options?: SearchInWorkspaceOptions): Promise<number>;
    /**
     * The default search paths are set to be the root paths associated to a workspace
     * however the search scope can be further refined with the include paths available in the search options.
     * This method will replace the searching paths to the ones specified in the 'include' options but as long
     * as the 'include' paths can be successfully validated as existing.
     *
     * Therefore the returned array of paths can be either the workspace root paths or a set of validated paths
     * derived from the include options which can be used to perform the search.
     *
     * Any pattern that resulted in a valid search path will be removed from the 'include' list as it is
     * provided as an equivalent search path instead.
     */
    protected extractSearchPathsFromIncludes(rootPaths: string[], options: SearchInWorkspaceOptions): Promise<string[]>;
    /**
     * Transform include/exclude option patterns from relative patterns to absolute patterns.
     * E.g. './abc/foo.*' to '${root}/abc/foo.*', the transformation does not validate the
     * pattern against the file system as glob suffixes remain.
     *
     * @returns undefined if the pattern cannot be converted into an absolute path.
     */
    protected getAbsolutePathFromPattern(root: string, pattern: string): Promise<string | undefined>;
    /**
     * Returns the root folder uri that a file belongs to.
     * In case that a file belongs to more than one root folders, returns the root folder that is closest to the file.
     * If the file is not from the current workspace, returns empty string.
     * @param filePath string path of the file
     * @param rootUris string URIs of the root folders in the current workspace
     */
    private getRoot;
    cancel(searchId: number): Promise<void>;
    private wrapUpSearch;
    dispose(): void;
}
//# sourceMappingURL=ripgrep-search-in-workspace-server.d.ts.map