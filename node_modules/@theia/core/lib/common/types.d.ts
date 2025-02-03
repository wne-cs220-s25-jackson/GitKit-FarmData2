export { ArrayUtils } from './array-utils';
export { Prioritizeable } from './prioritizeable';
type UnknownObject<T extends object> = Record<string | number | symbol, unknown> & {
    [K in keyof T]: unknown;
};
export type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};
export type MaybeArray<T> = T | T[];
export type MaybeNull<T> = {
    [P in keyof T]: T[P] | null;
};
export type MaybePromise<T> = T | PromiseLike<T>;
export type MaybeUndefined<T> = {
    [P in keyof T]?: T[P] | undefined;
};
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer I)[] ? RecursivePartial<I>[] : RecursivePartial<T[P]>;
};
export declare function isBoolean(value: unknown): value is boolean;
export declare function isString(value: unknown): value is string;
export declare function isNumber(value: unknown): value is number;
export declare function isError(value: unknown): value is Error;
export declare function isErrorLike(value: unknown): value is Error;
export declare function isFunction<T extends (...args: unknown[]) => unknown>(value: unknown): value is T;
/**
 * @returns whether the provided parameter is an empty JavaScript Object or not.
 */
export declare function isEmptyObject(obj: unknown): obj is object;
export declare function isObject<T extends object>(value: unknown): value is UnknownObject<T>;
export declare function isUndefined(value: unknown): value is undefined;
/**
 * @param value value to check.
 * @param every optional predicate ran on every element of the array.
 * @param thisArg value to substitute `this` with when invoking in the predicate.
 * @returns whether or not `value` is an array.
 */
export declare function isArray<T>(value: unknown, every?: (value: unknown) => unknown, thisArg?: unknown): value is T[];
export declare function isStringArray(value: unknown): value is string[];
/**
 * Creates a shallow copy with all ownkeys of the original object that are `null` made `undefined`
 */
export declare function nullToUndefined<T>(nullable: MaybeNull<T>): MaybeUndefined<T>;
/**
 * Throws when called and statically makes sure that all variants of a type were consumed.
 */
export declare function unreachable(_never: never, message?: string): never;
/**
 * @returns whether the provided parameter is defined.
 */
export declare function isDefined<T>(arg: T | null | undefined): arg is T;
/**
 * @returns whether the provided parameter is undefined or null.
 */
export declare function isUndefinedOrNull(obj: unknown): obj is undefined | null;
//# sourceMappingURL=types.d.ts.map