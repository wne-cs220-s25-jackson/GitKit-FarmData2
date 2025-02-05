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
exports.MarkerTreeLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const marker_tree_1 = require("./marker-tree");
const tree_label_provider_1 = require("@theia/core/lib/browser/tree/tree-label-provider");
const browser_1 = require("@theia/workspace/lib/browser");
let MarkerTreeLabelProvider = class MarkerTreeLabelProvider {
    canHandle(element) {
        return marker_tree_1.MarkerInfoNode.is(element) ?
            this.treeLabelProvider.canHandle(element) + 1 :
            0;
    }
    getIcon(node) {
        return this.labelProvider.getIcon(node.uri);
    }
    getName(node) {
        return this.labelProvider.getName(node.uri);
    }
    getLongName(node) {
        const description = [];
        const rootUri = this.workspaceService.getWorkspaceRootUri(node.uri);
        // In a multiple-root workspace include the root name to the label before the parent directory.
        if (this.workspaceService.isMultiRootWorkspaceOpened && rootUri) {
            description.push(this.labelProvider.getName(rootUri));
        }
        // If the given resource is not at the workspace root, include the parent directory to the label.
        if (rootUri && rootUri.toString() !== node.uri.parent.toString()) {
            description.push(this.labelProvider.getLongName(node.uri.parent));
        }
        // Get the full path of a resource which does not exist in the given workspace.
        if (!rootUri) {
            description.push(this.labelProvider.getLongName(node.uri.parent.withScheme('markers')));
        }
        return description.join(' ● ');
    }
    getDescription(node) {
        return this.labelProvider.getLongName(node.uri.parent);
    }
    affects(node, event) {
        return event.affects(node.uri) || event.affects(node.uri.parent);
    }
};
exports.MarkerTreeLabelProvider = MarkerTreeLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], MarkerTreeLabelProvider.prototype, "labelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(tree_label_provider_1.TreeLabelProvider),
    tslib_1.__metadata("design:type", tree_label_provider_1.TreeLabelProvider)
], MarkerTreeLabelProvider.prototype, "treeLabelProvider", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(browser_1.WorkspaceService),
    tslib_1.__metadata("design:type", browser_1.WorkspaceService)
], MarkerTreeLabelProvider.prototype, "workspaceService", void 0);
exports.MarkerTreeLabelProvider = MarkerTreeLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], MarkerTreeLabelProvider);
//# sourceMappingURL=marker-tree-label-provider.js.map