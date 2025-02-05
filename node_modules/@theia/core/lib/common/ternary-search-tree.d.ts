import URI from './uri';
export interface IKeyIterator<K> {
    reset(key: K): this;
    next(): this;
    hasNext(): boolean;
    cmp(a: string): number;
    value(): string;
}
export declare class PathIterator implements IKeyIterator<string> {
    private readonly _splitOnBackslash;
    private readonly _caseSensitive;
    private _value;
    private _from;
    private _to;
    constructor(_splitOnBackslash?: boolean, _caseSensitive?: boolean);
    reset(key: string): this;
    hasNext(): boolean;
    next(): this;
    cmp(a: string): number;
    value(): string;
}
export declare class UriIterator implements IKeyIterator<URI> {
    protected readonly caseSensitive: boolean;
    private _pathIterator;
    private _value;
    private _states;
    private _stateIdx;
    constructor(caseSensitive: boolean);
    reset(key: URI): this;
    next(): this;
    hasNext(): boolean;
    cmp(a: string): number;
    value(): string;
}
export declare class TernarySearchTree<K, V> {
    static forUris<E>(caseSensitive: boolean): TernarySearchTree<URI, E>;
    static forPaths<E>(): TernarySearchTree<string, E>;
    private _iter;
    private _root;
    constructor(segments: IKeyIterator<K>);
    clear(): void;
    set(key: K, element: V): V | undefined;
    get(key: K): V | undefined;
    delete(key: K): void;
    findSubstr(key: K): V | undefined;
    findSuperstr(key: K): Iterator<V> | undefined;
    private _nodeIterator;
    forEach(callback: (value: V, index: K) => any): void;
    private _forEach;
}
//# sourceMappingURL=ternary-search-tree.d.ts.map