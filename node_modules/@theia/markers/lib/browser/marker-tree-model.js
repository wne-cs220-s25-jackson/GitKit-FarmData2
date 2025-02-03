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
exports.MarkerTreeModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const marker_tree_1 = require("./marker-tree");
const browser_1 = require("@theia/core/lib/browser");
let MarkerTreeModel = class MarkerTreeModel extends browser_1.TreeModelImpl {
    doOpenNode(node) {
        if (marker_tree_1.MarkerNode.is(node)) {
            (0, browser_1.open)(this.openerService, node.uri, this.getOpenerOptionsByMarker(node));
        }
        else {
            super.doOpenNode(node);
        }
    }
    getOpenerOptionsByMarker(node) {
        return undefined;
    }
    /**
     * Reveal the corresponding node at the marker.
     * @param node {TreeNode} the tree node.
     */
    revealNode(node) {
        if (marker_tree_1.MarkerNode.is(node)) {
            (0, browser_1.open)(this.openerService, node.uri, { ...this.getOpenerOptionsByMarker(node), mode: 'reveal' });
        }
    }
};
exports.MarkerTreeModel = MarkerTreeModel;
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    tslib_1.__metadata("design:type", Object)
], MarkerTreeModel.prototype, "openerService", void 0);
exports.MarkerTreeModel = MarkerTreeModel = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MarkerTreeModel);
//# sourceMappingURL=marker-tree-model.js.map