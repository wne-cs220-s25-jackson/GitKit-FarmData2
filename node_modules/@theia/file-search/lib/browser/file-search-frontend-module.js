"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const common_1 = require("@theia/core/lib/common");
const browser_1 = require("@theia/core/lib/browser");
const quick_file_open_contribution_1 = require("./quick-file-open-contribution");
const quick_file_open_1 = require("./quick-file-open");
const file_search_service_1 = require("../common/file-search-service");
const quick_access_1 = require("@theia/core/lib/browser/quick-input/quick-access");
exports.default = new inversify_1.ContainerModule((bind) => {
    bind(file_search_service_1.FileSearchService).toDynamicValue(ctx => {
        const provider = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return provider.createProxy(file_search_service_1.fileSearchServicePath);
    }).inSingletonScope();
    bind(quick_file_open_contribution_1.QuickFileOpenFrontendContribution).toSelf().inSingletonScope();
    [common_1.CommandContribution, browser_1.KeybindingContribution, common_1.MenuContribution, quick_access_1.QuickAccessContribution].forEach(serviceIdentifier => bind(serviceIdentifier).toService(quick_file_open_contribution_1.QuickFileOpenFrontendContribution));
    bind(quick_file_open_1.QuickFileOpenService).toSelf().inSingletonScope();
});
//# sourceMappingURL=file-search-frontend-module.js.map