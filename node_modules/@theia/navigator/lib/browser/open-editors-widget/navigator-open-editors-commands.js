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
exports.OpenEditorsCommands = void 0;
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
var OpenEditorsCommands;
(function (OpenEditorsCommands) {
    OpenEditorsCommands.CLOSE_ALL_TABS_FROM_TOOLBAR = common_1.Command.toDefaultLocalizedCommand({
        id: 'navigator.close.all.editors.toolbar',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Close All Editors',
        iconClass: 'codicon codicon-close-all'
    });
    OpenEditorsCommands.SAVE_ALL_TABS_FROM_TOOLBAR = common_1.Command.toDefaultLocalizedCommand({
        id: 'navigator.save.all.editors.toolbar',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Save All',
        iconClass: 'codicon codicon-save-all'
    });
    OpenEditorsCommands.CLOSE_ALL_EDITORS_IN_GROUP_FROM_ICON = common_1.Command.toDefaultLocalizedCommand({
        id: 'navigator.close.all.in.area.icon',
        category: browser_1.CommonCommands.VIEW_CATEGORY,
        label: 'Close Group',
        iconClass: 'codicon codicon-close-all'
    });
    OpenEditorsCommands.SAVE_ALL_IN_GROUP_FROM_ICON = common_1.Command.toDefaultLocalizedCommand({
        id: 'navigator.save.all.in.area.icon',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Save All in Group',
        iconClass: 'codicon codicon-save-all'
    });
})(OpenEditorsCommands || (exports.OpenEditorsCommands = OpenEditorsCommands = {}));
//# sourceMappingURL=navigator-open-editors-commands.js.map