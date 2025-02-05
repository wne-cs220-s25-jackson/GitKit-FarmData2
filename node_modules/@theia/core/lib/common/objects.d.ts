export declare function deepClone<T>(obj: T): T;
export declare function deepFreeze<T>(obj: T): T;
export declare function notEmpty<T>(arg: T | undefined | null): arg is T;
/**
 * `true` if the argument is an empty object. Otherwise, `false`.
 */
export declare function isEmpty(arg: Object): boolean;
export declare function cloneAndChange(obj: any, changer: (orig: any) => any): any;
//# sourceMappingURL=objects.d.ts.map