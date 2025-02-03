/**
 * Determines if haystack ends with needle.
 */
export declare function endsWith(haystack: string, needle: string): boolean;
export declare function isLowerAsciiLetter(code: number): boolean;
export declare function isUpperAsciiLetter(code: number): boolean;
export declare function equalsIgnoreCase(a: string, b: string): boolean;
/**
 * @returns the length of the common prefix of the two strings.
 */
export declare function commonPrefixLength(a: string, b: string): number;
/**
 * Escapes regular expression characters in a given string
 */
export declare function escapeRegExpCharacters(value: string): string;
export declare function startsWithIgnoreCase(str: string, candidate: string): boolean;
export declare function split(s: string, splitter: string): IterableIterator<string>;
export declare function escapeInvisibleChars(value: string): string;
export declare function unescapeInvisibleChars(value: string): string;
export declare function compare(a: string, b: string): number;
export declare function compareSubstring(a: string, b: string, aStart?: number, aEnd?: number, bStart?: number, bEnd?: number): number;
export declare function compareIgnoreCase(a: string, b: string): number;
export declare function compareSubstringIgnoreCase(a: string, b: string, aStart?: number, aEnd?: number, bStart?: number, bEnd?: number): number;
export declare function regExpFlags(regexp: RegExp): string;
//# sourceMappingURL=strings.d.ts.map