"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.FileNavigatorCommands = void 0;
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const browser_2 = require("@theia/workspace/lib/browser");
var FileNavigatorCommands;
(function (FileNavigatorCommands) {
    FileNavigatorCommands.REVEAL_IN_NAVIGATOR = common_1.Command.toLocalizedCommand({
        id: 'navigator.reveal',
        label: 'Reveal in Explorer'
    }, 'theia/navigator/reveal');
    FileNavigatorCommands.TOGGLE_HIDDEN_FILES = common_1.Command.toLocalizedCommand({
        id: 'navigator.toggle.hidden.files',
        label: 'Toggle Hidden Files'
    }, 'theia/navigator/toggleHiddenFiles');
    FileNavigatorCommands.TOGGLE_AUTO_REVEAL = common_1.Command.toLocalizedCommand({
        id: 'navigator.toggle.autoReveal',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Auto Reveal'
    }, 'theia/navigator/autoReveal', browser_1.CommonCommands.FILE_CATEGORY_KEY);
    FileNavigatorCommands.REFRESH_NAVIGATOR = common_1.Command.toLocalizedCommand({
        id: 'navigator.refresh',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Refresh in Explorer',
        iconClass: (0, browser_1.codicon)('refresh')
    }, 'theia/navigator/refresh', browser_1.CommonCommands.FILE_CATEGORY_KEY);
    FileNavigatorCommands.COLLAPSE_ALL = common_1.Command.toDefaultLocalizedCommand({
        id: 'navigator.collapse.all',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Collapse Folders in Explorer',
        iconClass: (0, browser_1.codicon)('collapse-all')
    });
    FileNavigatorCommands.ADD_ROOT_FOLDER = {
        id: 'navigator.addRootFolder'
    };
    FileNavigatorCommands.FOCUS = common_1.Command.toDefaultLocalizedCommand({
        id: 'workbench.files.action.focusFilesExplorer',
        category: browser_1.CommonCommands.FILE_CATEGORY,
        label: 'Focus on Files Explorer'
    });
    FileNavigatorCommands.OPEN = {
        id: 'navigator.open',
    };
    FileNavigatorCommands.OPEN_WITH = {
        id: 'navigator.openWith',
    };
    FileNavigatorCommands.NEW_FILE_TOOLBAR = {
        id: `${browser_2.WorkspaceCommands.NEW_FILE.id}.toolbar`,
        iconClass: (0, browser_1.codicon)('new-file')
    };
    FileNavigatorCommands.NEW_FOLDER_TOOLBAR = {
        id: `${browser_2.WorkspaceCommands.NEW_FOLDER.id}.toolbar`,
        iconClass: (0, browser_1.codicon)('new-folder')
    };
    /**
     * @deprecated since 1.21.0. Use WorkspaceCommands.COPY_RELATIVE_FILE_COMMAND instead.
     */
    FileNavigatorCommands.COPY_RELATIVE_FILE_PATH = browser_2.WorkspaceCommands.COPY_RELATIVE_FILE_PATH;
})(FileNavigatorCommands || (exports.FileNavigatorCommands = FileNavigatorCommands = {}));
//# sourceMappingURL=file-navigator-commands.js.map