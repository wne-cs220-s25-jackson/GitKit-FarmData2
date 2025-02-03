"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputCommands = void 0;
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
var OutputCommands;
(function (OutputCommands) {
    const OUTPUT_CATEGORY = 'Output';
    const OUTPUT_CATEGORY_KEY = common_1.nls.getDefaultKey(OUTPUT_CATEGORY);
    /* #region VS Code `OutputChannel` API */
    // Based on: https://github.com/theia-ide/vscode/blob/standalone/0.19.x/src/vs/vscode.d.ts#L4692-L4745
    OutputCommands.APPEND = {
        id: 'output:append'
    };
    OutputCommands.APPEND_LINE = {
        id: 'output:appendLine'
    };
    OutputCommands.CLEAR = {
        id: 'output:clear'
    };
    OutputCommands.SHOW = {
        id: 'output:show'
    };
    OutputCommands.HIDE = {
        id: 'output:hide'
    };
    OutputCommands.DISPOSE = {
        id: 'output:dispose'
    };
    /* #endregion VS Code `OutputChannel` API */
    OutputCommands.CLEAR__WIDGET = common_1.Command.toLocalizedCommand({
        id: 'output:widget:clear',
        category: OUTPUT_CATEGORY,
        iconClass: (0, browser_1.codicon)('clear-all')
    }, '', OUTPUT_CATEGORY_KEY);
    OutputCommands.LOCK__WIDGET = common_1.Command.toLocalizedCommand({
        id: 'output:widget:lock',
        category: OUTPUT_CATEGORY,
        iconClass: (0, browser_1.codicon)('unlock')
    }, '', OUTPUT_CATEGORY_KEY);
    OutputCommands.UNLOCK__WIDGET = common_1.Command.toLocalizedCommand({
        id: 'output:widget:unlock',
        category: OUTPUT_CATEGORY,
        iconClass: (0, browser_1.codicon)('lock')
    }, '', OUTPUT_CATEGORY_KEY);
    OutputCommands.CLEAR__QUICK_PICK = common_1.Command.toLocalizedCommand({
        id: 'output:pick-clear',
        label: 'Clear Output Channel...',
        category: OUTPUT_CATEGORY
    }, 'theia/output/clearOutputChannel', OUTPUT_CATEGORY_KEY);
    OutputCommands.SHOW__QUICK_PICK = common_1.Command.toLocalizedCommand({
        id: 'output:pick-show',
        label: 'Show Output Channel...',
        category: OUTPUT_CATEGORY
    }, 'theia/output/showOutputChannel', OUTPUT_CATEGORY_KEY);
    OutputCommands.HIDE__QUICK_PICK = common_1.Command.toLocalizedCommand({
        id: 'output:pick-hide',
        label: 'Hide Output Channel...',
        category: OUTPUT_CATEGORY
    }, 'theia/output/hideOutputChannel', OUTPUT_CATEGORY_KEY);
    OutputCommands.DISPOSE__QUICK_PICK = common_1.Command.toLocalizedCommand({
        id: 'output:pick-dispose',
        label: 'Close Output Channel...',
        category: OUTPUT_CATEGORY
    }, 'theia/output/closeOutputChannel', OUTPUT_CATEGORY_KEY);
    OutputCommands.COPY_ALL = {
        id: 'output:copy-all',
    };
})(OutputCommands || (exports.OutputCommands = OutputCommands = {}));
//# sourceMappingURL=output-commands.js.map