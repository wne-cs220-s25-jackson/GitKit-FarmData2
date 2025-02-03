/// <reference types="mocha" />
/// <reference types="node" />
import { Disposable, DisposableCollection } from '../common';
/**
 * @param collection If a collection is passed in, the new disposable is added to that collection. Otherwise, the new disposable is returned.
 */
export declare function createDisposableListener<K>(emitter: NodeJS.EventEmitter, signal: string, handler: (event: K, ...args: unknown[]) => unknown, collection: DisposableCollection): void;
export declare function createDisposableListener<K>(emitter: NodeJS.EventEmitter, signal: string, handler: (event: K, ...args: unknown[]) => unknown): Disposable;
//# sourceMappingURL=event-utils.d.ts.map