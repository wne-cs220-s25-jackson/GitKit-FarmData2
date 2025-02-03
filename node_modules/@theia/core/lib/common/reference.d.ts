import { Disposable, DisposableCollection } from './disposable';
import { Emitter, Event } from './event';
import { MaybePromise } from './types';
export interface Reference<T> extends Disposable {
    readonly object: T;
}
/**
 * Abstract class for a map of reference-counted disposable objects, with the
 * following features:
 *
 *    - values are not inserted explicitly; instead, acquire() is used to
 *      create the value for a given key, or return the previously created
 *      value for it. How the value is created for a given key is
 *      implementation specific.
 *
 *    - any subsquent acquire() with the same key will bump the reference
 *      count on that value. acquire() returns not the value directly but
 *      a reference object that holds the value. Calling dispose() on the
 *      reference decreases the value's effective reference count.
 *
 *    - a contained value will have its dispose() function called when its
 *      reference count reaches zero. The key/value pair will be purged
 *      from the collection.
 *
 *    - calling dispose() on the value directly, instead of calling it on
 *      the reference returned by acquire(), will automatically dispose
 *      all outstanding references to that value and the key/value pair
 *      will be purged from the collection.
 *
 *    - supports synchronous and asynchronous implementations. acquire() will
 *      return a Promise if the value cannot be created immediately
 *
 *    - functions has|keys|values|get are always synchronous and the result
 *      excludes asynchronous additions in flight.
 *
 *    - functions values|get return the value directly and not a reference
 *      to the value. Use these functions to obtain a value without bumping
 *      its reference count.
 *
 *    - clients can register to be notified when values are added and removed;
 *      notification for asynchronous additions happen when the creation
 *      completes, not when it's requested.
 *
 *    - keys can be any value/object that can be successfully stringified using
 *      JSON.stringify(), sans arguments
 *
 *    - calling dispose() on the collection will dispose all outstanding
 *      references to all contained values, which results in the disposal of
 *      the values themselves.
 */
export declare abstract class AbstractReferenceCollection<K, V extends Disposable> implements Disposable {
    protected readonly _keys: Map<string, K>;
    protected readonly _values: Map<string, V>;
    protected readonly references: Map<string, DisposableCollection>;
    protected readonly onDidCreateEmitter: Emitter<V>;
    readonly onDidCreate: Event<V>;
    protected readonly onWillDisposeEmitter: Emitter<V>;
    readonly onWillDispose: Event<V>;
    protected readonly toDispose: DisposableCollection;
    constructor();
    dispose(): void;
    clear(): void;
    has(args: K): boolean;
    keys(): K[];
    values(): V[];
    get(args: K): V | undefined;
    abstract acquire(args: K): MaybePromise<Reference<V>>;
    protected doAcquire(key: string, object: V): Reference<V>;
    protected toKey(args: K): string;
    protected createReferences(key: string, value: V): DisposableCollection;
}
/**
 * Asynchronous implementation of AbstractReferenceCollection that requires
 * the client to provide a value factory, used to service the acquire()
 * function. That factory may return a Promise if the value cannot be
 * created immediately.
 */
export declare class ReferenceCollection<K, V extends Disposable> extends AbstractReferenceCollection<K, V> {
    protected readonly factory: (key: K) => MaybePromise<V>;
    constructor(factory: (key: K) => MaybePromise<V>);
    acquire(args: K): Promise<Reference<V>>;
    protected readonly pendingValues: Map<string, MaybePromise<V>>;
    protected getOrCreateValue(key: string, args: K): Promise<V>;
}
/**
 * Synchronous implementation of AbstractReferenceCollection that requires
 * the client to provide a value factory, used to service the acquire()
 * function.
 */
export declare class SyncReferenceCollection<K, V extends Disposable> extends AbstractReferenceCollection<K, V> {
    protected readonly factory: (key: K) => V;
    constructor(factory: (key: K) => V);
    acquire(args: K): Reference<V>;
    protected getOrCreateValue(key: string, args: K): V;
}
//# sourceMappingURL=reference.d.ts.map