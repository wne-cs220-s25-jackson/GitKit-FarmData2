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
exports.EditorKeybindingContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const environment_1 = require("@theia/core/shared/@theia/application-package/lib/environment");
const os_1 = require("@theia/core/lib/common/os");
const editor_command_1 = require("./editor-command");
let EditorKeybindingContribution = class EditorKeybindingContribution {
    registerKeybindings(registry) {
        registry.registerKeybindings({
            command: editor_command_1.EditorCommands.GO_BACK.id,
            keybinding: os_1.isOSX ? 'ctrl+-' : os_1.isWindows ? 'alt+left' : /* isLinux */ 'ctrl+alt+-'
        }, {
            command: editor_command_1.EditorCommands.GO_FORWARD.id,
            keybinding: os_1.isOSX ? 'ctrl+shift+-' : os_1.isWindows ? 'alt+right' : /* isLinux */ 'ctrl+shift+-'
        }, {
            command: editor_command_1.EditorCommands.GO_LAST_EDIT.id,
            keybinding: 'ctrl+alt+q'
        }, {
            command: editor_command_1.EditorCommands.TOGGLE_WORD_WRAP.id,
            keybinding: 'alt+z'
        }, {
            command: editor_command_1.EditorCommands.REOPEN_CLOSED_EDITOR.id,
            keybinding: this.isElectron() ? 'ctrlcmd+shift+t' : 'alt+shift+t'
        });
    }
    isElectron() {
        return environment_1.environment.electron.is();
    }
};
exports.EditorKeybindingContribution = EditorKeybindingContribution;
exports.EditorKeybindingContribution = EditorKeybindingContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], EditorKeybindingContribution);
//# sourceMappingURL=editor-keybinding.js.map