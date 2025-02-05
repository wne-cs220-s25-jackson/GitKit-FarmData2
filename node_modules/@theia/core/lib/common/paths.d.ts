/**
 * The forward slash path separator.
 */
export declare const sep = "/";
/**
 * The native path separator depending on the OS.
 */
export declare const nativeSep: string;
/**
 * @returns the base name of a path.
 */
export declare function basename(path: string): string;
/**
 * @returns `.far` from `boo.far` or the empty string.
 */
export declare function extname(path: string): string;
export declare function normalize(path: string, toOSPath?: boolean): string;
/**
 * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
 * `getRoot('files:///files/path') === files:///`,
 * or `getRoot('\\server\shares\path') === \\server\shares\`
 */
export declare function getRoot(path: string, sep?: string): string;
export declare function isEqualOrParent(path: string, candidate: string, ignoreCase?: boolean): boolean;
//# sourceMappingURL=paths.d.ts.map