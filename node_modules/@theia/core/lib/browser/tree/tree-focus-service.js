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
exports.TreeFocusServiceImpl = exports.TreeFocusService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const tree_1 = require("./tree");
const tree_selection_1 = require("./tree-selection");
exports.TreeFocusService = Symbol('TreeFocusService');
let TreeFocusServiceImpl = class TreeFocusServiceImpl {
    constructor() {
        this.onDidChangeFocusEmitter = new common_1.Emitter();
    }
    get onDidChangeFocus() { return this.onDidChangeFocusEmitter.event; }
    get focusedNode() {
        const candidate = this.tree.getNode(this.focusedId);
        if (tree_selection_1.SelectableTreeNode.is(candidate)) {
            return candidate;
        }
    }
    setFocus(node) {
        if ((node === null || node === void 0 ? void 0 : node.id) !== this.focusedId) {
            this.focusedId = node === null || node === void 0 ? void 0 : node.id;
            this.onDidChangeFocusEmitter.fire(node);
        }
    }
    hasFocus(node) {
        return !!node && (node === null || node === void 0 ? void 0 : node.id) === this.focusedId;
    }
};
exports.TreeFocusServiceImpl = TreeFocusServiceImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_1.Tree),
    tslib_1.__metadata("design:type", Object)
], TreeFocusServiceImpl.prototype, "tree", void 0);
exports.TreeFocusServiceImpl = TreeFocusServiceImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], TreeFocusServiceImpl);
//# sourceMappingURL=tree-focus-service.js.map