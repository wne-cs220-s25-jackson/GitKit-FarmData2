"use strict";
// *****************************************************************************
// Copyright (C) 2020 Alibaba Inc. and others.
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
exports.SidebarTopMenuWidget = void 0;
const tslib_1 = require("tslib");
const sidebar_menu_widget_1 = require("./sidebar-menu-widget");
const inversify_1 = require("inversify");
/**
 * The menu widget placed on the top of the sidebar.
 */
let SidebarTopMenuWidget = class SidebarTopMenuWidget extends sidebar_menu_widget_1.SidebarMenuWidget {
};
exports.SidebarTopMenuWidget = SidebarTopMenuWidget;
exports.SidebarTopMenuWidget = SidebarTopMenuWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SidebarTopMenuWidget);
//# sourceMappingURL=sidebar-top-menu-widget.js.map