"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputContextMenuService = exports.OutputContextMenu = void 0;
const tslib_1 = require("tslib");
// *****************************************************************************
// Copyright (C) 2020 TypeFox and others.
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
const inversify_1 = require("@theia/core/shared/inversify");
const monaco_context_menu_1 = require("@theia/monaco/lib/browser/monaco-context-menu");
var OutputContextMenu;
(function (OutputContextMenu) {
    OutputContextMenu.MENU_PATH = ['output_context_menu'];
    OutputContextMenu.TEXT_EDIT_GROUP = [...OutputContextMenu.MENU_PATH, '0_text_edit_group'];
    OutputContextMenu.COMMAND_GROUP = [...OutputContextMenu.MENU_PATH, '1_command_group'];
    OutputContextMenu.WIDGET_GROUP = [...OutputContextMenu.MENU_PATH, '2_widget_group'];
})(OutputContextMenu || (exports.OutputContextMenu = OutputContextMenu = {}));
let OutputContextMenuService = class OutputContextMenuService extends monaco_context_menu_1.MonacoContextMenuService {
    menuPath() {
        return OutputContextMenu.MENU_PATH;
    }
};
exports.OutputContextMenuService = OutputContextMenuService;
exports.OutputContextMenuService = OutputContextMenuService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], OutputContextMenuService);
//# sourceMappingURL=output-context-menu.js.map