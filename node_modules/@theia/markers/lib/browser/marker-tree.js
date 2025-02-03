"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.MarkerRootNode = exports.MarkerInfoNode = exports.MarkerNode = exports.MarkerTree = exports.MarkerOptions = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const marker_manager_1 = require("./marker-manager");
const selection_1 = require("@theia/core/lib/common/selection");
const uri_1 = require("@theia/core/lib/common/uri");
const problem_selection_1 = require("./problem/problem-selection");
exports.MarkerOptions = Symbol('MarkerOptions');
let MarkerTree = class MarkerTree extends browser_1.TreeImpl {
    constructor(markerManager, markerOptions) {
        super();
        this.markerManager = markerManager;
        this.markerOptions = markerOptions;
        this.toDispose.push(markerManager.onDidChangeMarkers(uri => this.refreshMarkerInfo(uri)));
        this.root = {
            visible: false,
            id: 'theia-' + markerOptions.kind + '-marker-widget',
            name: 'MarkerTree',
            kind: markerOptions.kind,
            children: [],
            parent: undefined
        };
    }
    async refreshMarkerInfo(uri) {
        const id = uri.toString();
        const existing = this.getNode(id);
        const markers = this.markerManager.findMarkers({ uri });
        if (markers.length <= 0) {
            if (MarkerInfoNode.is(existing)) {
                browser_1.CompositeTreeNode.removeChild(existing.parent, existing);
                this.removeNode(existing);
                this.fireChanged();
            }
            return;
        }
        const node = MarkerInfoNode.is(existing) ? existing : this.createMarkerInfo(id, uri);
        this.insertNodeWithMarkers(node, markers);
    }
    insertNodeWithMarkers(node, markers) {
        browser_1.CompositeTreeNode.addChild(node.parent, node);
        const children = this.getMarkerNodes(node, markers);
        node.numberOfMarkers = markers.length;
        this.setChildren(node, children);
    }
    async resolveChildren(parent) {
        if (MarkerRootNode.is(parent)) {
            const nodes = [];
            for (const id of this.markerManager.getUris()) {
                const uri = new uri_1.default(id);
                const existing = this.getNode(id);
                const markers = this.markerManager.findMarkers({ uri });
                const node = MarkerInfoNode.is(existing) ? existing : this.createMarkerInfo(id, uri);
                node.children = this.getMarkerNodes(node, markers);
                node.numberOfMarkers = node.children.length;
                nodes.push(node);
            }
            return nodes;
        }
        return super.resolveChildren(parent);
    }
    createMarkerInfo(id, uri) {
        return {
            children: [],
            expanded: true,
            uri,
            id,
            parent: this.root,
            selected: false,
            numberOfMarkers: 0
        };
    }
    getMarkerNodes(parent, markers) {
        return markers.map((marker, index) => this.createMarkerNode(marker, index, parent));
    }
    createMarkerNode(marker, index, parent) {
        const id = parent.id + '_' + index;
        const existing = this.getNode(id);
        if (MarkerNode.is(existing)) {
            existing.marker = marker;
            return existing;
        }
        return {
            id,
            name: 'marker',
            parent,
            selected: false,
            uri: parent.uri,
            marker
        };
    }
};
exports.MarkerTree = MarkerTree;
exports.MarkerTree = MarkerTree = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.unmanaged)()),
    tslib_1.__param(1, (0, inversify_1.unmanaged)()),
    tslib_1.__metadata("design:paramtypes", [marker_manager_1.MarkerManager, Object])
], MarkerTree);
var MarkerNode;
(function (MarkerNode) {
    function is(node) {
        return selection_1.UriSelection.is(node) && browser_1.SelectableTreeNode.is(node) && problem_selection_1.ProblemSelection.is(node);
    }
    MarkerNode.is = is;
})(MarkerNode || (exports.MarkerNode = MarkerNode = {}));
var MarkerInfoNode;
(function (MarkerInfoNode) {
    function is(node) {
        return browser_1.ExpandableTreeNode.is(node) && selection_1.UriSelection.is(node) && 'numberOfMarkers' in node;
    }
    MarkerInfoNode.is = is;
})(MarkerInfoNode || (exports.MarkerInfoNode = MarkerInfoNode = {}));
var MarkerRootNode;
(function (MarkerRootNode) {
    function is(node) {
        return browser_1.CompositeTreeNode.is(node) && 'kind' in node;
    }
    MarkerRootNode.is = is;
})(MarkerRootNode || (exports.MarkerRootNode = MarkerRootNode = {}));
//# sourceMappingURL=marker-tree.js.map