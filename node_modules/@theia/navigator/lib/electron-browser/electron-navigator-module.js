"use strict";
// *****************************************************************************
// Copyright (C) 2021 EclipseSource and others.
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
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const electron_navigator_menu_contribution_1 = require("./electron-navigator-menu-contribution");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(core_1.MenuContribution).to(electron_navigator_menu_contribution_1.ElectronNavigatorMenuContribution).inSingletonScope();
    bind(core_1.CommandContribution).to(electron_navigator_menu_contribution_1.ElectronNavigatorMenuContribution).inSingletonScope();
    bind(browser_1.KeybindingContribution).to(electron_navigator_menu_contribution_1.ElectronNavigatorMenuContribution).inSingletonScope();
});
//# sourceMappingURL=electron-navigator-module.js.map