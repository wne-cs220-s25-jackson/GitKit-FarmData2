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
exports.createTreeTestContainer = void 0;
const tree_1 = require("../tree");
const tree_model_1 = require("../tree-model");
const inversify_1 = require("inversify");
const tree_selection_impl_1 = require("../tree-selection-impl");
const tree_selection_1 = require("../tree-selection");
const tree_expansion_1 = require("../tree-expansion");
const tree_navigation_1 = require("../tree-navigation");
const tree_search_1 = require("../tree-search");
const fuzzy_search_1 = require("../fuzzy-search");
const mock_logger_1 = require("../../../common/test/mock-logger");
const common_1 = require("../../../common");
const label_provider_1 = require("../../label-provider");
const tree_focus_service_1 = require("../tree-focus-service");
function createTreeTestContainer() {
    const container = new inversify_1.Container({ defaultScope: 'Singleton' });
    container.bind(tree_1.TreeImpl).toSelf();
    container.bind(tree_1.Tree).toService(tree_1.TreeImpl);
    container.bind(tree_selection_impl_1.TreeSelectionServiceImpl).toSelf();
    container.bind(tree_selection_1.TreeSelectionService).toService(tree_selection_impl_1.TreeSelectionServiceImpl);
    container.bind(tree_expansion_1.TreeExpansionServiceImpl).toSelf();
    container.bind(tree_expansion_1.TreeExpansionService).toService(tree_expansion_1.TreeExpansionServiceImpl);
    container.bind(tree_navigation_1.TreeNavigationService).toSelf();
    container.bind(tree_model_1.TreeModelImpl).toSelf();
    container.bind(tree_model_1.TreeModel).toService(tree_model_1.TreeModelImpl);
    container.bind(tree_search_1.TreeSearch).toSelf();
    container.bind(fuzzy_search_1.FuzzySearch).toSelf();
    container.bind(mock_logger_1.MockLogger).toSelf();
    container.bind(tree_focus_service_1.TreeFocusService).to(tree_focus_service_1.TreeFocusServiceImpl);
    container.bind(common_1.ILogger).to(mock_logger_1.MockLogger);
    (0, common_1.bindContributionProvider)(container, label_provider_1.LabelProviderContribution);
    container.bind(label_provider_1.LabelProvider).toSelf().inSingletonScope();
    return container;
}
exports.createTreeTestContainer = createTreeTestContainer;
//# sourceMappingURL=tree-test-container.js.map