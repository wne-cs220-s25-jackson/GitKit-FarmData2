"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.FileTreeLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const file_tree_1 = require("./file-tree");
const tree_label_provider_1 = require("@theia/core/lib/browser/tree/tree-label-provider");
let FileTreeLabelProvider = class FileTreeLabelProvider {
    canHandle(element) {
        return file_tree_1.FileStatNode.is(element) ?
            this.treeLabelProvider.canHandle(element) + 1 :
            0;
    }
    getIcon(node) {
        return this.labelProvider.getIcon(node.fileStat);
    }
    getName(node) {
        return this.labelProvider.getName(node.fileStat);
    }
    getDescription(node) {
        return this.labelProvider.getLongName(node.fileStat);
    }
    affects(node, event) {
        return event.affects(node.fileStat);
    }
};
exports.FileTreeLabelProvider = FileTreeLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], FileTreeLabelProvider.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_label_provider_1.TreeLabelProvider),
    tslib_1.__metadata("design:type", tree_label_provider_1.TreeLabelProvider)
], FileTreeLabelProvider.prototype, "treeLabelProvider", void 0);
exports.FileTreeLabelProvider = FileTreeLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileTreeLabelProvider);
//# sourceMappingURL=file-tree-label-provider.js.map