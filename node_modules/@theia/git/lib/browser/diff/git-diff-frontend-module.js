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
exports.createGitDiffWidgetContainer = exports.bindGitDiffModule = void 0;
const git_diff_contribution_1 = require("./git-diff-contribution");
const browser_1 = require("@theia/core/lib/browser");
const git_diff_widget_1 = require("./git-diff-widget");
const git_diff_header_widget_1 = require("./git-diff-header-widget");
const git_diff_tree_model_1 = require("./git-diff-tree-model");
const tab_bar_toolbar_1 = require("@theia/core/lib/browser/shell/tab-bar-toolbar");
const scm_frontend_module_1 = require("@theia/scm/lib/browser/scm-frontend-module");
const git_resource_opener_1 = require("./git-resource-opener");
const git_opener_in_primary_area_1 = require("./git-opener-in-primary-area");
require("../../../src/browser/style/diff.css");
function bindGitDiffModule(bind) {
    bind(git_diff_widget_1.GitDiffWidget).toSelf();
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: git_diff_widget_1.GIT_DIFF,
        createWidget: () => {
            const child = createGitDiffWidgetContainer(ctx.container);
            return child.get(git_diff_widget_1.GitDiffWidget);
        }
    })).inSingletonScope();
    (0, browser_1.bindViewContribution)(bind, git_diff_contribution_1.GitDiffContribution);
    bind(tab_bar_toolbar_1.TabBarToolbarContribution).toService(git_diff_contribution_1.GitDiffContribution);
}
exports.bindGitDiffModule = bindGitDiffModule;
function createGitDiffWidgetContainer(parent) {
    const child = (0, scm_frontend_module_1.createScmTreeContainer)(parent);
    child.bind(git_diff_header_widget_1.GitDiffHeaderWidget).toSelf();
    child.bind(git_diff_tree_model_1.GitDiffTreeModel).toSelf();
    child.bind(browser_1.TreeModel).toService(git_diff_tree_model_1.GitDiffTreeModel);
    child.bind(git_resource_opener_1.GitResourceOpener).to(git_opener_in_primary_area_1.GitOpenerInPrimaryArea);
    return child;
}
exports.createGitDiffWidgetContainer = createGitDiffWidgetContainer;
//# sourceMappingURL=git-diff-frontend-module.js.map