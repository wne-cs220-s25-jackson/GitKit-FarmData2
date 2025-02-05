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
const callhierarchy_contribution_1 = require("./callhierarchy-contribution");
const common_1 = require("@theia/core/lib/common");
const callhierarchy_service_1 = require("./callhierarchy-service");
const browser_1 = require("@theia/core/lib/browser");
const callhierarchy_1 = require("./callhierarchy");
const callhierarchy_tree_1 = require("./callhierarchy-tree");
const inversify_1 = require("@theia/core/shared/inversify");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    (0, common_1.bindContributionProvider)(bind, callhierarchy_service_1.CallHierarchyService);
    bind(callhierarchy_service_1.CallHierarchyServiceProvider).to(callhierarchy_service_1.CallHierarchyServiceProvider).inSingletonScope();
    (0, browser_1.bindViewContribution)(bind, callhierarchy_contribution_1.CallHierarchyContribution);
    bind(browser_1.WidgetFactory).toDynamicValue(context => ({
        id: callhierarchy_1.CALLHIERARCHY_ID,
        createWidget: () => (0, callhierarchy_tree_1.createHierarchyTreeWidget)(context.container)
    }));
});
//# sourceMappingURL=callhierarchy-frontend-module.js.map