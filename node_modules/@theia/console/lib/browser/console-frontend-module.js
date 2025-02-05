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
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const console_contribution_1 = require("./console-contribution");
const console_manager_1 = require("./console-manager");
require("../../src/browser/style/index.css");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(console_manager_1.ConsoleManager).toSelf().inSingletonScope();
    bind(console_contribution_1.ConsoleContribution).toSelf().inSingletonScope();
    bind(browser_1.FrontendApplicationContribution).toService(console_contribution_1.ConsoleContribution);
    bind(core_1.CommandContribution).toService(console_contribution_1.ConsoleContribution);
    bind(browser_1.KeybindingContribution).toService(console_contribution_1.ConsoleContribution);
    bind(core_1.MenuContribution).toService(console_contribution_1.ConsoleContribution);
});
//# sourceMappingURL=console-frontend-module.js.map