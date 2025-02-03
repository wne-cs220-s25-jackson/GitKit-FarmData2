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
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const browser_1 = require("../../browser");
const electron_main_menu_factory_1 = require("./electron-main-menu-factory");
const electron_context_menu_renderer_1 = require("./electron-context-menu-renderer");
const electron_menu_contribution_1 = require("./electron-menu-contribution");
exports.default = new inversify_1.ContainerModule(bind => {
    bind(electron_main_menu_factory_1.ElectronMainMenuFactory).toSelf().inSingletonScope();
    bind(browser_1.ContextMenuRenderer).to(electron_context_menu_renderer_1.ElectronContextMenuRenderer).inSingletonScope();
    bind(browser_1.KeybindingContext).toConstantValue({
        id: 'theia.context',
        isEnabled: true
    });
    bind(electron_menu_contribution_1.ElectronMenuContribution).toSelf().inSingletonScope();
    for (const serviceIdentifier of [browser_1.FrontendApplicationContribution, browser_1.KeybindingContribution, common_1.CommandContribution, common_1.MenuContribution]) {
        bind(serviceIdentifier).toService(electron_menu_contribution_1.ElectronMenuContribution);
    }
    bind(electron_menu_contribution_1.CustomTitleWidget).toSelf().inSingletonScope();
    bind(electron_menu_contribution_1.CustomTitleWidgetFactory).toFactory(context => () => context.container.get(electron_menu_contribution_1.CustomTitleWidget));
    bind(browser_1.FrontendApplicationContribution).to(electron_context_menu_renderer_1.ElectronTextInputContextMenuContribution).inSingletonScope();
    bind(common_1.MenuContribution).to(electron_context_menu_renderer_1.ElectronTextInputContextMenuContribution).inSingletonScope();
});
//# sourceMappingURL=electron-menu-module.js.map