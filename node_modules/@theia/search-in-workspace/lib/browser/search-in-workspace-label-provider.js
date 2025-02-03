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
exports.SearchInWorkspaceLabelProvider = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const label_provider_1 = require("@theia/core/lib/browser/label-provider");
const search_in_workspace_result_tree_widget_1 = require("./search-in-workspace-result-tree-widget");
const uri_1 = require("@theia/core/lib/common/uri");
let SearchInWorkspaceLabelProvider = class SearchInWorkspaceLabelProvider {
    canHandle(element) {
        return search_in_workspace_result_tree_widget_1.SearchInWorkspaceRootFolderNode.is(element) || search_in_workspace_result_tree_widget_1.SearchInWorkspaceFileNode.is(element) ? 100 : 0;
    }
    getIcon(node) {
        if (search_in_workspace_result_tree_widget_1.SearchInWorkspaceFileNode.is(node)) {
            return this.labelProvider.getIcon(new uri_1.default(node.fileUri).withScheme('file'));
        }
        return this.labelProvider.folderIcon;
    }
    getName(node) {
        const uri = search_in_workspace_result_tree_widget_1.SearchInWorkspaceFileNode.is(node) ? node.fileUri : node.folderUri;
        return new uri_1.default(uri).displayName;
    }
    affects(node, event) {
        return search_in_workspace_result_tree_widget_1.SearchInWorkspaceFileNode.is(node) && event.affects(new uri_1.default(node.fileUri).withScheme('file'));
    }
};
exports.SearchInWorkspaceLabelProvider = SearchInWorkspaceLabelProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    tslib_1.__metadata("design:type", label_provider_1.LabelProvider)
], SearchInWorkspaceLabelProvider.prototype, "labelProvider", void 0);
exports.SearchInWorkspaceLabelProvider = SearchInWorkspaceLabelProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SearchInWorkspaceLabelProvider);
//# sourceMappingURL=search-in-workspace-label-provider.js.map