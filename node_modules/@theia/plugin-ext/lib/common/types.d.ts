/**
 * Returns `true` if the parameter has type "object" and not null, an array, a regexp, a date.
 */
export declare function isObject(obj: unknown): boolean;
export declare function mixin(destination: any, source: any, overwrite?: boolean): any;
export declare enum LogType {
    Info = 0,
    Error = 1
}
export interface LogPart {
    data: string;
    type: LogType;
}
export interface KeysToAnyValues {
    [key: string]: any;
}
export interface KeysToKeysToAnyValue {
    [key: string]: KeysToAnyValues;
}
/** copied from https://github.com/TypeFox/vscode/blob/70b8db24a37fafc77247de7f7cb5bb0195120ed0/src/vs/workbench/api/common/extHostTypes.ts#L18-L27 */
export declare function es5ClassCompat<T extends Function>(target: T): T;
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
 */
export declare function isArray(array: any): array is any[];
/**
 * @returns whether the provided parameter is undefined.
 */
export declare function isUndefined(obj: any): obj is undefined;
/**
 * @returns whether the provided parameter is undefined or null.
 */
export declare function isUndefinedOrNull(obj: any): obj is undefined | null;
/**
 * Asserts that the argument passed in is neither undefined nor null.
 */
export declare function assertIsDefined<T>(arg: T | null | undefined): T;
//# sourceMappingURL=types.d.ts.map