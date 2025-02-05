import type { MaybePromise } from './types';
export interface Prioritizeable<T> {
    readonly priority: number;
    readonly value: T;
}
export declare namespace Prioritizeable {
    type GetPriority<T> = (value: T) => MaybePromise<number>;
    type GetPrioritySync<T> = (value: T) => number;
    function toPrioritizeable<T>(rawValue: MaybePromise<T>, getPriority: GetPriority<T>): Promise<Prioritizeable<T>>;
    function toPrioritizeable<T>(rawValue: MaybePromise<T>[], getPriority: GetPriority<T>): Promise<Prioritizeable<T>[]>;
    function toPrioritizeableSync<T>(rawValue: T[], getPriority: GetPrioritySync<T>): Prioritizeable<T>[];
    function prioritizeAllSync<T>(values: T[], getPriority: GetPrioritySync<T>): Prioritizeable<T>[];
    function prioritizeAll<T>(values: MaybePromise<T>[], getPriority: GetPriority<T>): Promise<Prioritizeable<T>[]>;
    function isValid<T>(p: Prioritizeable<T>): boolean;
    function compare<T>(p: Prioritizeable<T>, p2: Prioritizeable<T>): number;
}
//# sourceMappingURL=prioritizeable.d.ts.map