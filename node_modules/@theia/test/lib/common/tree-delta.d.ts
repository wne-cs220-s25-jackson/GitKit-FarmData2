import { Event } from '@theia/core';
export interface CollectionDelta<K, T> {
    added?: T[];
    removed?: K[];
}
export declare enum DeltaKind {
    NONE = 0,
    ADDED = 1,
    REMOVED = 2,
    CHANGED = 3
}
export interface TreeDelta<K, T> {
    path: K[];
    type: DeltaKind;
    value?: Partial<T>;
    childDeltas?: TreeDelta<K, T>[];
}
export interface TreeDeltaBuilder<K, T> {
    reportAdded(path: K[], added: T): void;
    reportRemoved(path: K[]): void;
    reportChanged(path: K[], change: Partial<T>): void;
}
export declare class MappingTreeDeltaBuilder<K, T, V> implements TreeDeltaBuilder<K, V> {
    private readonly wrapped;
    private readonly map;
    private readonly mapPartial;
    constructor(wrapped: TreeDeltaBuilder<K, T>, map: (value: V) => T, mapPartial: (value: Partial<V>) => Partial<T>);
    reportAdded(path: K[], added: V): void;
    reportRemoved(path: K[]): void;
    reportChanged(path: K[], change: Partial<V>): void;
}
export declare class TreeDeltaBuilderImpl<K, T> {
    protected _currentDelta: TreeDelta<K, T>[];
    get currentDelta(): TreeDelta<K, T>[];
    reportAdded(path: K[], added: T): void;
    reportRemoved(path: K[]): void;
    reportChanged(path: K[], change: Partial<T>): void;
    private insert;
    private findNode;
}
export declare class AccumulatingTreeDeltaEmitter<K, T> extends TreeDeltaBuilderImpl<K, T> {
    private batcher;
    private onDidFlushEmitter;
    onDidFlush: Event<TreeDelta<K, T>[]>;
    constructor(timeoutMillis: number);
    flush(): void;
    doEmitDelta(): void;
    reportAdded(path: K[], added: T): void;
    reportChanged(path: K[], change: Partial<T>): void;
    reportRemoved(path: K[]): void;
}
//# sourceMappingURL=tree-delta.d.ts.map