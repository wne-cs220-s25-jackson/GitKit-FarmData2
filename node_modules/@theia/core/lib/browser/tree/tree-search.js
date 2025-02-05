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
exports.TreeSearch = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const disposable_1 = require("../../common/disposable");
const event_1 = require("../../common/event");
const tree_1 = require("./tree");
const fuzzy_search_1 = require("./fuzzy-search");
const tree_iterator_1 = require("./tree-iterator");
const label_provider_1 = require("../label-provider");
let TreeSearch = class TreeSearch {
    constructor() {
        this.disposables = new disposable_1.DisposableCollection();
        this.filteredNodesEmitter = new event_1.Emitter();
        this._filterResult = [];
        this._filteredNodes = [];
        this._filteredNodesAndParents = new Set();
    }
    init() {
        this.disposables.push(this.filteredNodesEmitter);
    }
    getHighlights() {
        return new Map(this._filterResult.map(m => [m.item.id, this.toCaptionHighlight(m)]));
    }
    /**
     * Resolves to all the visible tree nodes that match the search pattern.
     */
    async filter(pattern) {
        const { root } = this.tree;
        this._filteredNodesAndParents = new Set();
        if (!pattern || !root) {
            this._filterResult = [];
            this._filteredNodes = [];
            this.fireFilteredNodesChanged(this._filteredNodes);
            return [];
        }
        const items = [...new tree_iterator_1.TopDownTreeIterator(root)];
        const transform = (node) => this.labelProvider.getName(node);
        this._filterResult = await this.fuzzySearch.filter({
            items,
            pattern,
            transform
        });
        this._filteredNodes = this._filterResult.map(({ item }) => {
            this.addAllParentsToFilteredSet(item);
            return item;
        });
        this.fireFilteredNodesChanged(this._filteredNodes);
        return this._filteredNodes.slice();
    }
    addAllParentsToFilteredSet(node) {
        let toAdd = node;
        while (toAdd && !this._filteredNodesAndParents.has(toAdd.id)) {
            this._filteredNodesAndParents.add(toAdd.id);
            toAdd = toAdd.parent;
        }
        ;
    }
    /**
     * Returns with the filtered nodes after invoking the `filter` method.
     */
    get filteredNodes() {
        return this._filteredNodes.slice();
    }
    /**
     * Event that is fired when the filtered nodes have been changed.
     */
    get onFilteredNodesChanged() {
        return this.filteredNodesEmitter.event;
    }
    passesFilters(node) {
        return this._filteredNodesAndParents.has(node.id);
    }
    dispose() {
        this.disposables.dispose();
    }
    fireFilteredNodesChanged(nodes) {
        this.filteredNodesEmitter.fire(nodes);
    }
    toCaptionHighlight(match) {
        return {
            ranges: match.ranges.map(this.mapRange.bind(this))
        };
    }
    mapRange(range) {
        const { offset, length } = range;
        return {
            offset,
            length
        };
    }
};
exports.TreeSearch = TreeSearch;
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_1.Tree),
    tslib_1.__metadata("design:type", Object)
], TreeSearch.prototype, "tree", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(fuzzy_search_1.FuzzySearch),
    tslib_1.__metadata("design:type", fuzzy_search_1.FuzzySearch)
], TreeSearch.prototype, "fuzzySearch", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], TreeSearch.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], TreeSearch.prototype, "init", null);
exports.TreeSearch = TreeSearch = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeSearch);
//# sourceMappingURL=tree-search.js.map