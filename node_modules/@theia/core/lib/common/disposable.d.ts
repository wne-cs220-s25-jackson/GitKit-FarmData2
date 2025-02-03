import { Event, Emitter } from './event';
export interface Disposable {
    /**
     * Dispose this object.
     */
    dispose(): void;
}
export declare namespace Disposable {
    function is(arg: unknown): arg is Disposable;
    function create(func: () => void): Disposable;
    /** Always provides a reference to a new disposable. */
    const NULL: Disposable;
}
/**
 * Utility for tracking a collection of Disposable objects.
 *
 * This utility provides a number of benefits over just using an array of
 * Disposables:
 *
 * - the collection is auto-pruned when an element it contains is disposed by
 * any code that has a reference to it
 * - you can register to be notified when all elements in the collection have
 * been disposed [1]
 * - you can conveniently dispose all elements by calling dispose()
 * on the collection
 *
 * Unlike an array, however, this utility does not give you direct access to
 * its elements.
 *
 * Being notified when all elements are disposed is simple:
 * ```
 * const dc = new DisposableCollection(myDisposables);
 * dc.onDispose(() => {
 *    console.log('All elements in the collection have been disposed');
 * });
 * ```
 *
 * [1] The collection will notify only once. It will continue to function in so
 * far as accepting new Disposables and pruning them when they are disposed, but
 * such activity will never result in another notification.
 */
export declare class DisposableCollection implements Disposable {
    protected readonly disposables: Disposable[];
    protected readonly onDisposeEmitter: Emitter<void>;
    constructor(...toDispose: Disposable[]);
    /**
     * This event is fired only once
     * on first dispose of not empty collection.
     */
    get onDispose(): Event<void>;
    protected checkDisposed(): void;
    get disposed(): boolean;
    private disposingElements;
    dispose(): void;
    push(disposable: Disposable): Disposable;
    pushAll(disposables: Disposable[]): Disposable[];
}
export type DisposableGroup = {
    push(disposable: Disposable): void;
} | {
    add(disposable: Disposable): void;
};
export declare namespace DisposableGroup {
    function canPush(candidate?: DisposableGroup): candidate is {
        push(disposable: Disposable): void;
    };
    function canAdd(candidate?: DisposableGroup): candidate is {
        add(disposable: Disposable): void;
    };
}
export declare function disposableTimeout(...args: Parameters<typeof setTimeout>): Disposable;
/**
 * Wrapper for a {@link Disposable} that is not available immediately.
 */
export declare class DisposableWrapper implements Disposable {
    private disposed;
    private disposable;
    set(disposable: Disposable): void;
    dispose(): void;
}
//# sourceMappingURL=disposable.d.ts.map