import { Disposable } from './disposable';
import { Event } from './event';
import { CancellationToken } from './cancellation';
/**
 * Simple implementation of the deferred pattern.
 * An object that exposes a promise and functions to resolve and reject it.
 */
export declare class Deferred<T = void> {
    state: 'resolved' | 'rejected' | 'unresolved';
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (err?: unknown) => void;
    promise: Promise<T>;
    protected setState(state: 'resolved' | 'rejected'): void;
}
/**
 * @returns resolves after a specified number of milliseconds
 * @throws cancelled if a given token is cancelled before a specified number of milliseconds
 */
export declare function timeout(ms: number, token?: CancellationToken): Promise<void>;
/**
 * Creates a promise that is rejected after the given amount of time. A typical use case is to wait for another promise until a specified timeout using:
 * ```
 * Promise.race([ promiseToPerform, timeoutReject(timeout, 'Timeout error message') ]);
 * ```
 *
 * @param ms timeout in milliseconds
 * @param message error message on promise rejection
 * @returns rejection promise
 */
export declare function timeoutReject<T>(ms: number, message?: string): Promise<T>;
export declare function retry<T>(task: () => Promise<T>, retryDelay: number, retries: number): Promise<T>;
/**
 * A function to allow a promise resolution to be delayed by a number of milliseconds. Usage is as follows:
 *
 * `const stringValue = await myPromise.then(delay(600)).then(value => value.toString());`
 *
 * @param ms the number of millisecond to delay
 * @returns a function that returns a promise that returns the given value, but delayed
 */
export declare function delay<T>(ms: number): (value: T) => Promise<T>;
/**
 * Constructs a promise that will resolve after a given delay.
 * @param ms the number of milliseconds to wait
 */
export declare function wait(ms: number): Promise<void>;
export declare function waitForEvent<T>(event: Event<T>, ms: number, thisArg?: any, disposables?: Disposable[]): Promise<T>;
export declare function isThenable<T>(obj: unknown): obj is Promise<T>;
/**
 * Returns with a promise that waits until the first promise resolves to `true`.
 */
export declare function firstTrue(...promises: readonly Promise<boolean>[]): Promise<boolean>;
//# sourceMappingURL=promise-util.d.ts.map