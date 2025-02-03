"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const common_1 = require("@theia/core/lib/common");
const inversify_1 = require("@theia/core/shared/inversify");
const widget_manager_1 = require("@theia/core/lib/browser/widget-manager");
const view_contribution_1 = require("@theia/core/lib/browser/shell/view-contribution");
const typehierarchy_provider_1 = require("./typehierarchy-provider");
const typehierarchy_contribution_1 = require("./typehierarchy-contribution");
const typehierarchy_tree_widget_1 = require("./tree/typehierarchy-tree-widget");
const typehierarchy_service_1 = require("./typehierarchy-service");
const typehierarchy_tree_container_1 = require("./tree/typehierarchy-tree-container");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    (0, common_1.bindContributionProvider)(bind, typehierarchy_service_1.TypeHierarchyService);
    bind(typehierarchy_service_1.TypeHierarchyServiceProvider).to(typehierarchy_service_1.TypeHierarchyServiceProvider).inSingletonScope();
    bind(typehierarchy_provider_1.TypeHierarchyRegistry).toSelf().inSingletonScope();
    (0, view_contribution_1.bindViewContribution)(bind, typehierarchy_contribution_1.TypeHierarchyContribution);
    bind(widget_manager_1.WidgetFactory).toDynamicValue(context => ({
        id: typehierarchy_tree_widget_1.TypeHierarchyTreeWidget.WIDGET_ID,
        createWidget: () => (0, typehierarchy_tree_container_1.createHierarchyTreeWidget)(context.container)
    }));
});
//# sourceMappingURL=typehierarchy-frontend-module.js.map