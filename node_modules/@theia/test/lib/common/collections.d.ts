import { Event } from '@theia/core';
import { CollectionDelta, TreeDeltaBuilder } from './tree-delta';
export declare function observableProperty(observationFunction: string): (target: any, property: string) => any;
export declare class ChangeBatcher {
    private emitBatch;
    readonly timeoutMs: number;
    private handle;
    private startTime;
    constructor(emitBatch: () => void, timeoutMs: number);
    changeOccurred(): void;
    flush(): void;
}
export declare class SimpleObservableCollection<V> {
    private equals;
    private _values;
    constructor(equals?: (left: V, right: V) => boolean);
    add(value: V): boolean;
    remove(value: V): boolean;
    private onChangeEmitter;
    onChanged: Event<CollectionDelta<V, V>>;
    get values(): readonly V[];
    clear(): void;
}
declare abstract class AbstractIndexedCollection<K, T> {
    private keys;
    private _values;
    abstract add(item: T): T | undefined;
    get values(): readonly T[];
    get size(): number;
    has(key: K): boolean;
    get(key: K): T | undefined;
    protected doAdd(key: K, value: T): T | undefined;
    remove(key: K): T | undefined;
}
export declare class TreeCollection<K, T, P> extends AbstractIndexedCollection<K, T> implements Iterable<[K, T]> {
    protected readonly owner: T | P;
    protected readonly pathOf: (v: T) => K[];
    protected readonly deltaBuilder: (v: T | undefined) => TreeDeltaBuilder<K, T> | undefined;
    constructor(owner: T | P, pathOf: (v: T) => K[], deltaBuilder: (v: T | undefined) => TreeDeltaBuilder<K, T> | undefined);
    add(item: T): T | undefined;
    remove(key: K): T | undefined;
    entries(): Iterator<[K, T], unknown, undefined>;
    [Symbol.iterator](): Iterator<[K, T], unknown, undefined>;
}
export declare function groupBy<K, T>(items: Iterable<T>, keyOf: (item: T) => K): Map<K, T[]>;
export {};
//# sourceMappingURL=collections.d.ts.map