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
exports.PluginTreeViewNodeLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const uri_1 = require("@theia/core/lib/common/uri");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const tree_label_provider_1 = require("@theia/core/lib/browser/tree/tree-label-provider");
const tree_1 = require("@theia/core/lib/browser/tree/tree");
const themables_1 = require("@theia/monaco-editor-core/esm/vs/base/common/themables");
let PluginTreeViewNodeLabelProvider = class PluginTreeViewNodeLabelProvider {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canHandle(element) {
        if (tree_1.TreeNode.is(element) && ('resourceUri' in element || 'themeIcon' in element)) {
            return Number.MAX_SAFE_INTEGER - 512;
        }
        return 0;
    }
    getIcon(node) {
        if (node.icon) {
            return node.icon;
        }
        if (node.themeIcon) {
            if (node.themeIcon.id === 'file' || node.themeIcon.id === 'folder') {
                const uri = node.resourceUri && new uri_1.default(node.resourceUri) || undefined;
                if (uri) {
                    return this.labelProvider.getIcon(label_provider_1.URIIconReference.create(node.themeIcon.id, uri));
                }
            }
            return themables_1.ThemeIcon.asClassName(node.themeIcon);
        }
        if (node.resourceUri) {
            return this.labelProvider.getIcon(new uri_1.default(node.resourceUri));
        }
        return undefined;
    }
    getName(node) {
        if (node.name) {
            return node.name;
        }
        if (node.resourceUri) {
            return this.labelProvider.getName(new uri_1.default(node.resourceUri));
        }
        return undefined;
    }
    getLongName(node) {
        if (typeof node.description === 'string') {
            return node.description;
        }
        if (node.description === true && node.resourceUri) {
            return this.labelProvider.getLongName(new uri_1.default(node.resourceUri));
        }
        return undefined;
    }
};
exports.PluginTreeViewNodeLabelProvider = PluginTreeViewNodeLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], PluginTreeViewNodeLabelProvider.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_label_provider_1.TreeLabelProvider),
    tslib_1.__metadata("design:type", tree_label_provider_1.TreeLabelProvider)
], PluginTreeViewNodeLabelProvider.prototype, "treeLabelProvider", void 0);
exports.PluginTreeViewNodeLabelProvider = PluginTreeViewNodeLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], PluginTreeViewNodeLabelProvider);
//# sourceMappingURL=plugin-tree-view-node-label-provider.js.map