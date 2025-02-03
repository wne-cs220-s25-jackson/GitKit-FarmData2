export declare function illegalArgument(message?: string): Error;
export declare function readonly(name?: string): Error;
export declare function disposed(what: string): Error;
interface Errno {
    readonly code: string;
    readonly errno: number;
}
declare const ENOENT: "ENOENT";
type ErrnoException = Error & Errno;
/**
 * _(No such file or directory)_: Commonly raised by `fs` operations to indicate that a component of the specified pathname does not exist — no entity (file or directory) could be
 * found by the given path.
 */
export declare function isENOENT(arg: unknown): arg is ErrnoException & Readonly<{
    code: typeof ENOENT;
}>;
export {};
//# sourceMappingURL=errors.d.ts.map