/**
 * A convenience class for managing a "map of maps" of arbitrary depth
 */
export declare class MultiKeyMap<K, V> {
    private readonly keyLength;
    private rootMap;
    constructor(keyLength: number);
    static create<S, T>(keyLength: number, data: [S[], T][]): MultiKeyMap<S, T>;
    set(key: readonly K[], value: V): V | undefined;
    get(key: readonly K[]): V | undefined;
    /**
     * Checks whether the given key is present in the map
     * @param key the key to test. It can have a length < the key length
     * @returns whether the key exists
     */
    has(key: readonly K[]): boolean;
    /**
     * Deletes the value with the given key from the map
     * @param key the key to remove.  It can have a length < the key length
     * @returns whether the key was present in the map
     */
    delete(key: readonly K[]): boolean;
    /**
     * Iterates over all entries in the map. The ordering semantics are like iterating over a map of maps.
     * @param handler Handler for each entry
     */
    forEach(handler: (value: V, key: K[]) => void): void;
    private doForeach;
}
//# sourceMappingURL=collections.d.ts.map