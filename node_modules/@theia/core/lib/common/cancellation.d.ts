import { Event } from './event';
export interface CancellationToken {
    readonly isCancellationRequested: boolean;
    readonly onCancellationRequested: Event<void>;
}
export declare namespace CancellationToken {
    const None: CancellationToken;
    const Cancelled: CancellationToken;
    function is(value: unknown): value is CancellationToken;
}
export declare class CancellationError extends Error {
    constructor();
}
export declare class CancellationTokenSource {
    private _token;
    private _parentListener?;
    constructor(parent?: CancellationToken);
    get token(): CancellationToken;
    cancel(): void;
    dispose(): void;
}
export declare function cancelled(): Error;
export declare function isCancelled(err: Error | undefined): boolean;
export declare function checkCancelled(token?: CancellationToken): void;
//# sourceMappingURL=cancellation.d.ts.map