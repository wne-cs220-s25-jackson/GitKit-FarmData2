"use strict";
// *****************************************************************************
// Copyright (C) 2020 Arm and others.
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
exports.ScmTreeLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const tree_1 = require("@theia/core/lib/browser/tree");
const scm_tree_model_1 = require("./scm-tree-model");
let ScmTreeLabelProvider = class ScmTreeLabelProvider {
    canHandle(element) {
        return tree_1.TreeNode.is(element) && (scm_tree_model_1.ScmFileChangeGroupNode.is(element) || scm_tree_model_1.ScmFileChangeFolderNode.is(element) || scm_tree_model_1.ScmFileChangeNode.is(element)) ? 60 : 0;
    }
    getName(node) {
        if (scm_tree_model_1.ScmFileChangeGroupNode.is(node)) {
            return node.groupLabel;
        }
        if (scm_tree_model_1.ScmFileChangeFolderNode.is(node)) {
            return node.path;
        }
        if (scm_tree_model_1.ScmFileChangeNode.is(node)) {
            return this.labelProvider.getName(new uri_1.default(node.sourceUri));
        }
        return '';
    }
};
exports.ScmTreeLabelProvider = ScmTreeLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], ScmTreeLabelProvider.prototype, "labelProvider", void 0);
exports.ScmTreeLabelProvider = ScmTreeLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ScmTreeLabelProvider);
//# sourceMappingURL=scm-tree-label-provider.js.map