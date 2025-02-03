"use strict";
// *****************************************************************************
// Copyright (C) 2023 Mathieu Bussieres and others.
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
exports.TestItemCollection = exports.TestItemImpl = exports.TestTagImpl = void 0;
const tslib_1 = require("tslib");
const collections_1 = require("@theia/test/lib/common/collections");
const tests_1 = require("./tests");
class TestTagImpl {
    constructor(id) {
        this.id = id;
    }
}
exports.TestTagImpl = TestTagImpl;
class TestItemImpl {
    constructor(id, uri, label) {
        this.id = id;
        this.uri = uri;
        this.children = new TestItemCollection(this, (v) => v.path, (v) => v.deltaBuilder);
        this.tags = [];
        this.canResolveChildren = false;
        this.busy = false;
        this.label = '';
        this.label = label;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notifyPropertyChange(property, value) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = {};
        val[property] = value;
        if (this.path) {
            (_a = this.deltaBuilder) === null || _a === void 0 ? void 0 : _a.reportChanged(this.path, val);
        }
    }
    get deltaBuilder() {
        if (this._deltaBuilder) {
            return this._deltaBuilder;
        }
        else if (this.parent) {
            this._deltaBuilder = this.parent._deltaBuilder;
            return this._deltaBuilder;
        }
        else {
            return undefined;
        }
    }
    get path() {
        if (this._path) {
            return this._path;
        }
        else if (this.parent && this.parent.path) {
            this._path = [...this.parent.path, this.id];
            return this._path;
        }
        else {
            return [this.id];
        }
    }
    ;
    get realParent() {
        return this._parent;
    }
    set realParent(v) {
        this.iterate(item => {
            item._path = undefined;
            return true;
        });
        this._parent = v;
    }
    get parent() {
        const p = this.realParent;
        if (p instanceof tests_1.TestControllerImpl) {
            return undefined;
        }
        return p;
    }
    iterate(toDo) {
        if (toDo(this)) {
            for (const tuple of this.children) {
                const child = tuple[1];
                if (!child.iterate(toDo)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
}
exports.TestItemImpl = TestItemImpl;
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Array)
], TestItemImpl.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Boolean)
], TestItemImpl.prototype, "canResolveChildren", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Boolean)
], TestItemImpl.prototype, "busy", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", String)
], TestItemImpl.prototype, "label", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "description", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "sortText", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "range", void 0);
tslib_1.__decorate([
    (0, collections_1.observableProperty)('notifyPropertyChange'),
    tslib_1.__metadata("design:type", Object)
], TestItemImpl.prototype, "error", void 0);
class TestItemCollection {
    constructor(owner, pathOf, deltaBuilder) {
        this.owner = owner;
        this.pathOf = pathOf;
        this.deltaBuilder = deltaBuilder;
        this.values = new collections_1.TreeCollection(owner, pathOf, deltaBuilder);
    }
    get size() {
        return this.values.size;
    }
    replace(items) {
        const toRemove = this.values.values.map(item => item.id);
        items.forEach(item => this.add(item));
        toRemove.forEach(key => this.delete(key));
    }
    forEach(callback, thisArg) {
        this.values.values.forEach(item => callback(item, this), thisArg);
    }
    add(item) {
        if (!(item instanceof TestItemImpl)) {
            throw new Error('Not an instance of TestItem');
        }
        item.realParent = this.owner;
        item._deltaBuilder = this.deltaBuilder(this.owner);
        this.values.add(item);
    }
    delete(itemId) {
        this.values.remove(itemId);
    }
    get(itemId) {
        return this.values.get(itemId);
    }
    [Symbol.iterator]() {
        return this.values.entries();
    }
    find(path) {
        let currentCollection = this;
        let item;
        for (let i = 0; i < path.length; i++) {
            item = currentCollection.get(path[i]);
            if (!item) {
                return undefined;
            }
            currentCollection = item.children;
        }
        return item;
    }
}
exports.TestItemCollection = TestItemCollection;
//# sourceMappingURL=test-item.js.map