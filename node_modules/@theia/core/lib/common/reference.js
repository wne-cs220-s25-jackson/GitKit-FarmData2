"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncReferenceCollection = exports.ReferenceCollection = exports.AbstractReferenceCollection = void 0;
const disposable_1 = require("./disposable");
const event_1 = require("./event");
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
class AbstractReferenceCollection {
    constructor() {
        this._keys = new Map();
        this._values = new Map();
        this.references = new Map();
        this.onDidCreateEmitter = new event_1.Emitter();
        this.onDidCreate = this.onDidCreateEmitter.event;
        this.onWillDisposeEmitter = new event_1.Emitter();
        this.onWillDispose = this.onWillDisposeEmitter.event;
        this.toDispose = new disposable_1.DisposableCollection();
        this.toDispose.push(this.onDidCreateEmitter);
        this.toDispose.push(this.onWillDisposeEmitter);
        this.toDispose.push(disposable_1.Disposable.create(() => this.clear()));
    }
    dispose() {
        this.toDispose.dispose();
    }
    clear() {
        for (const value of this._values.values()) {
            try {
                value.dispose();
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    has(args) {
        const key = this.toKey(args);
        return this.references.has(key);
    }
    keys() {
        return [...this._keys.values()];
    }
    values() {
        return [...this._values.values()];
    }
    get(args) {
        const key = this.toKey(args);
        return this._values.get(key);
    }
    doAcquire(key, object) {
        const references = this.references.get(key) || this.createReferences(key, object);
        const reference = {
            object,
            dispose: () => { }
        };
        references.push(reference);
        return reference;
    }
    toKey(args) {
        return JSON.stringify(args);
    }
    createReferences(key, value) {
        const references = new disposable_1.DisposableCollection();
        references.onDispose(() => value.dispose());
        const disposeObject = value.dispose.bind(value);
        value.dispose = () => {
            this.onWillDisposeEmitter.fire(value);
            disposeObject();
            this._values.delete(key);
            this._keys.delete(key);
            this.references.delete(key);
            references.dispose();
        };
        this.references.set(key, references);
        return references;
    }
}
exports.AbstractReferenceCollection = AbstractReferenceCollection;
/**
 * Asynchronous implementation of AbstractReferenceCollection that requires
 * the client to provide a value factory, used to service the acquire()
 * function. That factory may return a Promise if the value cannot be
 * created immediately.
 */
class ReferenceCollection extends AbstractReferenceCollection {
    constructor(factory) {
        super();
        this.factory = factory;
        this.pendingValues = new Map();
    }
    async acquire(args) {
        const key = this.toKey(args);
        const existing = this._values.get(key);
        if (existing) {
            return this.doAcquire(key, existing);
        }
        const object = await this.getOrCreateValue(key, args);
        return this.doAcquire(key, object);
    }
    async getOrCreateValue(key, args) {
        const existing = this.pendingValues.get(key);
        if (existing) {
            return existing;
        }
        const pending = this.factory(args);
        this._keys.set(key, args);
        this.pendingValues.set(key, pending);
        try {
            const value = await pending;
            this._values.set(key, value);
            this.onDidCreateEmitter.fire(value);
            return value;
        }
        catch (e) {
            this._keys.delete(key);
            throw e;
        }
        finally {
            this.pendingValues.delete(key);
        }
    }
}
exports.ReferenceCollection = ReferenceCollection;
/**
 * Synchronous implementation of AbstractReferenceCollection that requires
 * the client to provide a value factory, used to service the acquire()
 * function.
 */
class SyncReferenceCollection extends AbstractReferenceCollection {
    constructor(factory) {
        super();
        this.factory = factory;
    }
    acquire(args) {
        const key = this.toKey(args);
        const object = this.getOrCreateValue(key, args);
        return this.doAcquire(key, object);
    }
    getOrCreateValue(key, args) {
        const existing = this._values.get(key);
        if (existing) {
            return existing;
        }
        const value = this.factory(args);
        this._keys.set(key, args);
        this._values.set(key, value);
        this.onDidCreateEmitter.fire(value);
        return value;
    }
}
exports.SyncReferenceCollection = SyncReferenceCollection;
//# sourceMappingURL=reference.js.map