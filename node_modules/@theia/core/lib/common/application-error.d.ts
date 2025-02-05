export interface ApplicationError<C extends number, D> extends Error {
    readonly code: C;
    readonly data: D;
    toJson(): ApplicationError.Literal<D>;
}
export declare namespace ApplicationError {
    interface Literal<D> {
        message: string;
        data: D;
        stack?: string;
    }
    interface Constructor<C extends number, D> {
        (...args: any[]): ApplicationError<C, D>;
        code: C;
        is(arg: object | undefined): arg is ApplicationError<C, D>;
    }
    function declare<C extends number, D>(code: C, factory: (...args: any[]) => Literal<D>): Constructor<C, D>;
    function is<C extends number, D>(arg: object | undefined): arg is ApplicationError<C, D>;
    function fromJson<C extends number, D>(code: C, raw: Literal<D>): ApplicationError<C, D>;
}
//# sourceMappingURL=application-error.d.ts.map