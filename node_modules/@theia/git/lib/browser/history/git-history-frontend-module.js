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
exports.createGitCommitDetailWidgetContainer = exports.bindGitHistoryModule = void 0;
const browser_1 = require("@theia/core/lib/browser");
const git_commit_detail_widget_options_1 = require("./git-commit-detail-widget-options");
const git_commit_detail_widget_1 = require("./git-commit-detail-widget");
const git_commit_detail_header_widget_1 = require("./git-commit-detail-header-widget");
const git_diff_tree_model_1 = require("../diff/git-diff-tree-model");
const git_commit_detail_open_handler_1 = require("./git-commit-detail-open-handler");
const git_scm_provider_1 = require("../git-scm-provider");
const scm_frontend_module_1 = require("@theia/scm/lib/browser/scm-frontend-module");
const git_resource_opener_1 = require("../diff/git-resource-opener");
const git_opener_in_secondary_area_1 = require("./git-opener-in-secondary-area");
require("../../../src/browser/style/git-icons.css");
function bindGitHistoryModule(bind) {
    bind(browser_1.WidgetFactory).toDynamicValue(ctx => ({
        id: git_scm_provider_1.GitScmProvider.GIT_COMMIT_DETAIL,
        createWidget: (options) => {
            const child = createGitCommitDetailWidgetContainer(ctx.container, options);
            return child.get(git_commit_detail_widget_1.GitCommitDetailWidget);
        }
    }));
    bind(git_commit_detail_open_handler_1.GitCommitDetailOpenHandler).toSelf();
    bind(browser_1.OpenHandler).toService(git_commit_detail_open_handler_1.GitCommitDetailOpenHandler);
}
exports.bindGitHistoryModule = bindGitHistoryModule;
function createGitCommitDetailWidgetContainer(parent, options) {
    const child = (0, scm_frontend_module_1.createScmTreeContainer)(parent);
    child.bind(git_commit_detail_widget_1.GitCommitDetailWidget).toSelf();
    child.bind(git_commit_detail_header_widget_1.GitCommitDetailHeaderWidget).toSelf();
    child.bind(git_diff_tree_model_1.GitDiffTreeModel).toSelf();
    child.bind(browser_1.TreeModel).toService(git_diff_tree_model_1.GitDiffTreeModel);
    child.bind(git_opener_in_secondary_area_1.GitOpenerInSecondaryArea).toSelf();
    child.bind(git_resource_opener_1.GitResourceOpener).toService(git_opener_in_secondary_area_1.GitOpenerInSecondaryArea);
    child.bind(git_commit_detail_widget_options_1.GitCommitDetailWidgetOptions).toConstantValue(options);
    const opener = child.get(git_opener_in_secondary_area_1.GitOpenerInSecondaryArea);
    const widget = child.get(git_commit_detail_widget_1.GitCommitDetailWidget);
    opener.setRefWidget(widget);
    return child;
}
exports.createGitCommitDetailWidgetContainer = createGitCommitDetailWidgetContainer;
//# sourceMappingURL=git-history-frontend-module.js.map