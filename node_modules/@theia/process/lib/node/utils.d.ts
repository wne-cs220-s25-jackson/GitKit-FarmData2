/**
 * Parses the given line into an array of args respecting escapes and string literals.
 * @param line the given line to parse
 */
export declare function parseArgs(line: string | undefined): string[];
/**
 * Convert a signal number to its short name (using the signal definitions of
 * the current host).  Should never be called on Windows.  For Linux, this is
 * only valid for the x86 and ARM architectures, since other architectures may
 * use different numbers, see signal(7).
 */
export declare function signame(sig: number): string;
/**
 * Convert a code number to its short name
 */
export declare function codename(code: number): string;
//# sourceMappingURL=utils.d.ts.map