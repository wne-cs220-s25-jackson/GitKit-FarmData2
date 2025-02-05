"use strict";
// *****************************************************************************
// Copyright (C) 2021 Ericsson and others.
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
exports.OpenEditorsContextMenu = exports.OPEN_EDITORS_CONTEXT_MENU = void 0;
exports.OPEN_EDITORS_CONTEXT_MENU = ['open-editors-context-menu'];
var OpenEditorsContextMenu;
(function (OpenEditorsContextMenu) {
    OpenEditorsContextMenu.NAVIGATION = [...exports.OPEN_EDITORS_CONTEXT_MENU, '1_navigation'];
    OpenEditorsContextMenu.CLIPBOARD = [...exports.OPEN_EDITORS_CONTEXT_MENU, '2_clipboard'];
    OpenEditorsContextMenu.SAVE = [...exports.OPEN_EDITORS_CONTEXT_MENU, '3_save'];
    OpenEditorsContextMenu.COMPARE = [...exports.OPEN_EDITORS_CONTEXT_MENU, '4_compare'];
    OpenEditorsContextMenu.MODIFICATION = [...exports.OPEN_EDITORS_CONTEXT_MENU, '5_modification'];
})(OpenEditorsContextMenu || (exports.OpenEditorsContextMenu = OpenEditorsContextMenu = {}));
//# sourceMappingURL=navigator-open-editors-menus.js.map