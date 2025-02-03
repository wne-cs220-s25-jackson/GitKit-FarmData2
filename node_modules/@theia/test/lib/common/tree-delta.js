"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics and others.
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
exports.AccumulatingTreeDeltaEmitter = exports.TreeDeltaBuilderImpl = exports.MappingTreeDeltaBuilder = exports.DeltaKind = void 0;
const core_1 = require("@theia/core");
const collections_1 = require("./collections");
var DeltaKind;
(function (DeltaKind) {
    DeltaKind[DeltaKind["NONE"] = 0] = "NONE";
    DeltaKind[DeltaKind["ADDED"] = 1] = "ADDED";
    DeltaKind[DeltaKind["REMOVED"] = 2] = "REMOVED";
    DeltaKind[DeltaKind["CHANGED"] = 3] = "CHANGED";
})(DeltaKind || (exports.DeltaKind = DeltaKind = {}));
class MappingTreeDeltaBuilder {
    constructor(wrapped, map, mapPartial) {
        this.wrapped = wrapped;
        this.map = map;
        this.mapPartial = mapPartial;
    }
    reportAdded(path, added) {
        this.wrapped.reportAdded(path, this.map(added));
    }
    reportRemoved(path) {
        this.wrapped.reportRemoved(path);
    }
    reportChanged(path, change) {
        this.wrapped.reportChanged(path, this.mapPartial(change));
    }
}
exports.MappingTreeDeltaBuilder = MappingTreeDeltaBuilder;
class TreeDeltaBuilderImpl {
    constructor() {
        this._currentDelta = [];
    }
    get currentDelta() {
        return this._currentDelta;
    }
    reportAdded(path, added) {
        this.findNode(path, (parentCollection, nodeIndex, residual) => {
            if (residual.length === 0) {
                // we matched an exact node
                const child = parentCollection[nodeIndex];
                if (child.type === DeltaKind.REMOVED) {
                    child.type = DeltaKind.CHANGED;
                }
                else if (child.type === DeltaKind.NONE) {
                    child.type = DeltaKind.ADDED;
                }
                child.value = added;
            }
            else {
                this.insert(parentCollection, nodeIndex, {
                    path: residual,
                    type: DeltaKind.ADDED,
                    value: added,
                });
            }
        });
    }
    reportRemoved(path) {
        this.findNode(path, (parentCollection, nodeIndex, residual) => {
            if (residual.length === 0) {
                // we matched an exact node
                const child = parentCollection[nodeIndex];
                if (child.type === DeltaKind.CHANGED) {
                    child.type = DeltaKind.REMOVED;
                    delete child.value;
                }
                else if (child.type === DeltaKind.ADDED) {
                    parentCollection.splice(nodeIndex, 1);
                }
                else if (child.type === DeltaKind.NONE) {
                    child.type = DeltaKind.REMOVED;
                }
            }
            else {
                this.insert(parentCollection, nodeIndex, {
                    path: residual,
                    type: DeltaKind.REMOVED,
                });
            }
        });
    }
    reportChanged(path, change) {
        this.findNode(path, (parentCollection, nodeIndex, residual) => {
            if (residual.length === 0) {
                // we matched an exact node
                const child = parentCollection[nodeIndex];
                if (child.type === DeltaKind.NONE) {
                    child.type = DeltaKind.CHANGED;
                    child.value = change;
                }
                else if (child.type === DeltaKind.CHANGED) {
                    Object.assign(child.value, change);
                }
            }
            else {
                this.insert(parentCollection, nodeIndex, {
                    path: residual,
                    type: DeltaKind.CHANGED,
                    value: change,
                });
            }
        });
    }
    insert(parentCollection, nodeIndex, delta) {
        if (nodeIndex < 0) {
            parentCollection.push(delta);
        }
        else {
            const child = parentCollection[nodeIndex];
            const prefixLength = computePrefixLength(delta.path, child.path);
            if (prefixLength === delta.path.length) {
                child.path = child.path.slice(prefixLength);
                delta.childDeltas = [child];
                parentCollection[nodeIndex] = delta;
            }
            else {
                const newNode = {
                    path: child.path.slice(0, prefixLength),
                    type: DeltaKind.NONE,
                    childDeltas: []
                };
                parentCollection[nodeIndex] = newNode;
                delta.path = delta.path.slice(prefixLength);
                newNode.childDeltas.push(delta);
                child.path = child.path.slice(prefixLength);
                newNode.childDeltas.push(child);
                if (newNode.path.length === 0) {
                    console.log('newNode');
                }
            }
            if (delta.path.length === 0) {
                console.log('delta');
            }
            if (child.path.length === 0) {
                console.log('child');
            }
        }
    }
    findNode(path, handler) {
        doFindNode(this._currentDelta, path, handler);
    }
}
exports.TreeDeltaBuilderImpl = TreeDeltaBuilderImpl;
function doFindNode(rootCollection, path, handler) {
    // handler parameters:
    // parent collection: the collection the node index refers to, if valid
    // nodeIndex: the index of the node that has a common path prefix with the path of the path we're searching
    // residual path: the path that has not been consumed looking for the path: if empty, we found the exact node
    let commonPrefixLength = 0;
    const childIndex = rootCollection.findIndex(delta => {
        commonPrefixLength = computePrefixLength(delta.path, path);
        return commonPrefixLength > 0;
    });
    if (childIndex >= 0) {
        // we know which child to insert into
        const child = rootCollection[childIndex];
        if (commonPrefixLength === child.path.length) {
            // we matched a child
            if (commonPrefixLength === path.length) {
                // it's an exact match: we already have a node for the given path
                handler(rootCollection, childIndex, []);
                return;
            }
            // we know the node is below the child
            if (child.type === DeltaKind.REMOVED || child.type === DeltaKind.ADDED) {
                // there will be no children deltas beneath added/remove nodes
                return;
            }
            if (!child.childDeltas) {
                child.childDeltas = [];
            }
            doFindNode(child.childDeltas, path.slice(child.path.length), handler);
        }
        else {
            handler(rootCollection, childIndex, path);
        }
    }
    else {
        // we have no node to insert into
        handler(rootCollection, -1, path);
    }
}
function computePrefixLength(left, right) {
    let i = 0;
    while (i < left.length && i < right.length && left[i] === right[i]) {
        i++;
    }
    return i;
}
class AccumulatingTreeDeltaEmitter extends TreeDeltaBuilderImpl {
    constructor(timeoutMillis) {
        super();
        this.onDidFlushEmitter = new core_1.Emitter();
        this.onDidFlush = this.onDidFlushEmitter.event;
        this.batcher = new collections_1.ChangeBatcher(() => this.doEmitDelta(), timeoutMillis);
    }
    flush() {
        this.batcher.flush();
    }
    doEmitDelta() {
        const batch = this._currentDelta;
        this._currentDelta = [];
        this.onDidFlushEmitter.fire(batch);
    }
    reportAdded(path, added) {
        super.reportAdded(path, added);
        // console.debug(`reported added, now: ${JSON.stringify(path, undefined, 3)}`);
        // logging levels don't work in plugin host: https://github.com/eclipse-theia/theia/issues/12234
        this.batcher.changeOccurred();
    }
    reportChanged(path, change) {
        super.reportChanged(path, change);
        // console.debug(`reported changed, now: ${JSON.stringify(path, undefined, 3)}`);
        // logging levels don't work in plugin host: https://github.com/eclipse-theia/theia/issues/12234
        this.batcher.changeOccurred();
    }
    reportRemoved(path) {
        super.reportRemoved(path);
        // console.debug(`reported removed, now: ${JSON.stringify(path, undefined, 3)}`);
        // logging levels don't work in plugin host: https://github.com/eclipse-theia/theia/issues/12234
        this.batcher.changeOccurred();
    }
}
exports.AccumulatingTreeDeltaEmitter = AccumulatingTreeDeltaEmitter;
//# sourceMappingURL=tree-delta.js.map