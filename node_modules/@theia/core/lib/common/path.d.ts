export declare class Path {
    static separator: '/';
    static isDrive(segment: string): boolean;
    /**
     * vscode-uri always normalizes drive letters to lower case:
     * https://github.com/Microsoft/vscode-uri/blob/b1d3221579f97f28a839b6f996d76fc45e9964d8/src/index.ts#L1025
     * Theia path should be adjusted to this.
     */
    static normalizeDrive(path: string): string;
    /**
     * Normalize path separator to use Path.separator
     * @param Path candidate to normalize
     * @returns Normalized string path
     */
    static normalizePathSeparator(path: string): string;
    /**
     * Creates a windows path from the given path string.
     * A windows path uses an upper case drive letter and backwards slashes.
     * @param path The input path
     * @returns Windows style path
     */
    static windowsPath(path: string): string;
    /**
     * Tildify path, replacing `home` with `~` if user's `home` is present at the beginning of the path.
     * This is a non-operation for Windows.
     *
     * @param resourcePath
     * @param home
     */
    static tildify(resourcePath: string, home: string): string;
    /**
     * Untildify path, replacing `~` with `home` if `~` present at the beginning of the path.
     * This is a non-operation for Windows.
     *
     * @param resourcePath
     * @param home
     */
    static untildify(resourcePath: string, home: string): string;
    readonly isAbsolute: boolean;
    readonly isRoot: boolean;
    readonly root: Path | undefined;
    readonly base: string;
    readonly name: string;
    readonly ext: string;
    private _dir;
    private readonly raw;
    /**
     * The raw should be normalized, meaning that only '/' is allowed as a path separator.
     */
    constructor(raw: string);
    protected computeRoot(): Path | undefined;
    /**
     * Returns the parent directory if it exists (`hasDir === true`) or `this` otherwise.
     */
    get dir(): Path;
    /**
     * Returns `true` if this has a parent directory, `false` otherwise.
     *
     * _This implementation returns `true` if and only if this is not the root dir and
     * there is a path separator in the raw path._
     */
    get hasDir(): boolean;
    protected computeDir(): Path;
    join(...paths: string[]): Path;
    /**
     *
     * @param paths portions of a path
     * @returns a new Path if an absolute path can be computed from the segments passed in + this.raw
     * If no absolute path can be computed, returns undefined.
     *
     * Processes the path segments passed in from right to left (reverse order) concatenating until an
     * absolute path is found.
     */
    resolve(...paths: string[]): Path | undefined;
    toString(): string;
    /**
     * Converts the current path into a file system path.
     * @param format Determines the format of the path.
     * If `undefined`, the format will be determined by the `OS.backend.type` value.
     * @returns A file system path.
     */
    fsPath(format?: Path.Format): string;
    relative(path: Path): Path | undefined;
    isEqualOrParent(path: Path): boolean;
    relativity(path: Path): number;
    normalize(): Path;
}
export declare namespace Path {
    enum Format {
        Posix = 0,
        Windows = 1
    }
}
//# sourceMappingURL=path.d.ts.map