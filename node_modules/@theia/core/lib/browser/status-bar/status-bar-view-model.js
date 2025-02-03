"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.StatusBarViewModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const status_bar_types_1 = require("./status-bar-types");
let StatusBarViewModel = class StatusBarViewModel {
    constructor() {
        this.leftTree = new Array();
        this.rightTree = new Array();
        this.containerPointers = new Map();
        this.onDidChangeEmitter = new common_1.Emitter();
    }
    get onDidChange() {
        return this.onDidChangeEmitter.event;
    }
    *getLeft() {
        yield* this.getEntries(this.leftTree);
    }
    *getRight() {
        yield* this.getEntries(this.rightTree);
    }
    *getEntries(list) {
        for (const item of list) {
            yield* this.getChildren(item.leftChildren, status_bar_types_1.StatusBarAlignment.LEFT);
            yield { entry: item.head, id: item.id };
            yield* this.getChildren(item.rightChildren, status_bar_types_1.StatusBarAlignment.RIGHT);
        }
    }
    *getChildren(list, alignment, compact) {
        var _a, _b, _c;
        for (const item of list) {
            if (item.leftChildren.length || item.rightChildren.length) {
                console.warn(`Found embedded entries with affinity to ${item.id}. They will inherit alignment and compactness of parent.`);
            }
            yield* this.getChildren(item.leftChildren, alignment, (_a = item.head.affinity) === null || _a === void 0 ? void 0 : _a.compact);
            yield { entry: item.head, id: item.id, alignment, compact: compact || ((_b = item.head.affinity) === null || _b === void 0 ? void 0 : _b.compact) };
            yield* this.getChildren(item.rightChildren, alignment, (_c = item.head.affinity) === null || _c === void 0 ? void 0 : _c.compact);
        }
    }
    set(id, entry) {
        const existing = this.findElement(id);
        if (existing) {
            const oldEntry = existing.entry.head;
            existing.entry.head = entry;
            if (!this.shareSameContainer(entry, oldEntry)) {
                this.relocate(existing);
            }
            else if (!this.shareSamePriority(entry, oldEntry)) {
                this.sort(existing.container);
            }
        }
        else {
            const container = this.getContainerFor(entry);
            const viewModelEntry = { id, head: entry, leftChildren: [], rightChildren: [] };
            container.push(viewModelEntry);
            this.containerPointers.set(id, container);
            const pendingDependents = this.getDependentsOf(id);
            pendingDependents.forEach(newChild => this.relocate(newChild, true));
            this.sortDependents(viewModelEntry.leftChildren);
            this.sortDependents(viewModelEntry.rightChildren);
            this.sort(container);
        }
        this.onDidChangeEmitter.fire();
    }
    relocate(locationData, dontSort) {
        const newContainer = this.getContainerFor(locationData.entry.head);
        locationData.container.splice(locationData.index, 1);
        newContainer.push(locationData.entry);
        this.containerPointers.set(locationData.entry.id, newContainer);
        if (!dontSort) {
            this.sort(newContainer);
        }
    }
    getContainerFor(entry) {
        const affinityParent = entry.affinity && this.findElement(entry.affinity.id);
        if (affinityParent) {
            return entry.affinity.alignment === status_bar_types_1.StatusBarAlignment.LEFT ? affinityParent.entry.leftChildren : affinityParent.entry.rightChildren;
        }
        return entry.alignment === status_bar_types_1.StatusBarAlignment.LEFT ? this.leftTree : this.rightTree;
    }
    getDependentsOf(id) {
        var _a, _b, _c, _d;
        const dependents = [];
        for (let index = 0; index < this.rightTree.length || index < this.leftTree.length; index++) {
            if (((_b = (_a = this.rightTree[index]) === null || _a === void 0 ? void 0 : _a.head.affinity) === null || _b === void 0 ? void 0 : _b.id) === id) {
                dependents.push({ index, container: this.rightTree, entry: this.rightTree[index] });
            }
            if (((_d = (_c = this.leftTree[index]) === null || _c === void 0 ? void 0 : _c.head.affinity) === null || _d === void 0 ? void 0 : _d.id) === id) {
                dependents.push({ index, container: this.leftTree, entry: this.leftTree[index] });
            }
        }
        return dependents;
    }
    remove(id) {
        const location = this.findElement(id);
        if (location) {
            this.containerPointers.delete(id);
            location.container.splice(location.index, 1);
            const originalLeftLength = this.leftTree.length;
            const originalRightLength = this.rightTree.length;
            this.inline(location.entry.leftChildren, location.entry.rightChildren);
            if (originalLeftLength !== this.leftTree.length) {
                this.sortTop(this.leftTree);
            }
            if (originalRightLength !== this.rightTree.length) {
                this.sortTop(this.rightTree);
            }
            this.onDidChangeEmitter.fire();
            return true;
        }
        return false;
    }
    shareSamePositionParameters(left, right) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_a = left.priority) !== null && _a !== void 0 ? _a : 0) !== ((_b = right.priority) !== null && _b !== void 0 ? _b : 0)) {
            return false;
        }
        if (this.affinityMatters(left, right)) {
            return ((_c = left.affinity) === null || _c === void 0 ? void 0 : _c.id) === ((_d = right.affinity) === null || _d === void 0 ? void 0 : _d.id) && ((_e = left.affinity) === null || _e === void 0 ? void 0 : _e.alignment) === ((_f = right.affinity) === null || _f === void 0 ? void 0 : _f.alignment) && ((_g = left.affinity) === null || _g === void 0 ? void 0 : _g.compact) === ((_h = right.affinity) === null || _h === void 0 ? void 0 : _h.compact);
        }
        return left.alignment === right.alignment;
    }
    shareSameContainer(left, right) {
        var _a, _b, _c, _d;
        if (this.affinityMatters(left, right)) {
            return ((_a = left.affinity) === null || _a === void 0 ? void 0 : _a.id) === ((_b = right.affinity) === null || _b === void 0 ? void 0 : _b.id) && ((_c = left.affinity) === null || _c === void 0 ? void 0 : _c.alignment) === ((_d = right.affinity) === null || _d === void 0 ? void 0 : _d.alignment);
        }
        return left.alignment === right.alignment;
    }
    shareSamePriority(left, right) {
        var _a, _b, _c, _d;
        return ((_a = left.priority) !== null && _a !== void 0 ? _a : 0) === ((_b = right.priority) !== null && _b !== void 0 ? _b : 0) && (!this.affinityMatters(left, right) || ((_c = left.affinity) === null || _c === void 0 ? void 0 : _c.compact) === ((_d = right.affinity) === null || _d === void 0 ? void 0 : _d.compact));
    }
    affinityMatters(left, right) {
        return (left.affinity && this.containerPointers.has(left.affinity.id)) || Boolean(right.affinity && this.containerPointers.has(right.affinity.id));
    }
    findElement(id) {
        const container = id !== undefined && this.containerPointers.get(id);
        if (container) {
            const index = container.findIndex(candidate => candidate.id === id);
            if (index !== -1) {
                return { index, entry: container[index], container };
            }
        }
    }
    sort(container) {
        if (container === this.leftTree || container === this.rightTree) {
            this.sortTop(container);
        }
        else {
            this.sortDependents(container);
        }
    }
    sortTop(container) {
        container.sort((left, right) => this.comparePriority(left, right));
    }
    comparePriority(left, right) {
        var _a, _b;
        return ((_a = right.head.priority) !== null && _a !== void 0 ? _a : 0) - ((_b = left.head.priority) !== null && _b !== void 0 ? _b : 0);
    }
    sortDependents(container) {
        container.sort((left, right) => {
            var _a, _b, _c;
            if (((_a = left.head.affinity) === null || _a === void 0 ? void 0 : _a.compact) && !((_b = right.head.affinity) === null || _b === void 0 ? void 0 : _b.compact)) {
                return common_1.ArrayUtils.Sort.LeftBeforeRight;
            }
            else if ((_c = right.head.affinity) === null || _c === void 0 ? void 0 : _c.compact) {
                return common_1.ArrayUtils.Sort.RightBeforeLeft;
            }
            return this.comparePriority(left, right);
        });
    }
    inline(left, right) {
        for (const entry of left) {
            this.doAddTop(entry);
        }
        for (const entry of right) {
            this.doAddTop(entry);
        }
    }
    doAddTop(entry) {
        const container = entry.head.alignment === status_bar_types_1.StatusBarAlignment.LEFT ? this.leftTree : this.rightTree;
        this.containerPointers.set(entry.id, container);
        container.push(entry);
    }
};
exports.StatusBarViewModel = StatusBarViewModel;
exports.StatusBarViewModel = StatusBarViewModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], StatusBarViewModel);
//# sourceMappingURL=status-bar-view-model.js.map