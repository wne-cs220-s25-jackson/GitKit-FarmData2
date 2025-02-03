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
exports.MonacoResolvedKeybinding = void 0;
const keybindings_1 = require("@theia/monaco-editor-core/esm/vs/base/common/keybindings");
const keybindingLabels_1 = require("@theia/monaco-editor-core/esm/vs/base/common/keybindingLabels");
const usLayoutResolvedKeybinding_1 = require("@theia/monaco-editor-core/esm/vs/platform/keybinding/common/usLayoutResolvedKeybinding");
const MonacoPlatform = require("@theia/monaco-editor-core/esm/vs/base/common/platform");
const keys_1 = require("@theia/core/lib/browser/keys");
const os_1 = require("@theia/core/lib/common/os");
const monaco_keycode_map_1 = require("./monaco-keycode-map");
class MonacoResolvedKeybinding extends keybindings_1.ResolvedKeybinding {
    constructor(keySequence, keybindingService) {
        super();
        this.keySequence = keySequence;
        this.chords = keySequence.map(keyCode => {
            // eslint-disable-next-line no-null/no-null
            const keyLabel = keyCode.key ? keybindingService.acceleratorForKey(keyCode.key) : null;
            const keyAriaLabel = keyLabel;
            return new keybindings_1.ResolvedChord(keyCode.ctrl, keyCode.shift, keyCode.alt, keyCode.meta, keyLabel, keyAriaLabel);
        });
    }
    getLabel() {
        return keybindingLabels_1.UILabelProvider.toLabel(MonacoPlatform.OS, this.chords, p => p.keyLabel);
    }
    getAriaLabel() {
        return keybindingLabels_1.UILabelProvider.toLabel(MonacoPlatform.OS, this.chords, p => p.keyAriaLabel);
    }
    getElectronAccelerator() {
        if (this.hasMultipleChords()) {
            // Electron cannot handle chords
            // eslint-disable-next-line no-null/no-null
            return null;
        }
        return keybindingLabels_1.ElectronAcceleratorLabelProvider.toLabel(MonacoPlatform.OS, this.chords, p => p.keyLabel);
    }
    getUserSettingsLabel() {
        return keybindingLabels_1.UserSettingsLabelProvider.toLabel(MonacoPlatform.OS, this.chords, p => p.keyLabel);
    }
    isWYSIWYG() {
        return true;
    }
    hasMultipleChords() {
        return this.chords.length > 1;
    }
    getDispatchChords() {
        return this.keySequence.map(keyCode => usLayoutResolvedKeybinding_1.USLayoutResolvedKeybinding.getDispatchStr(this.toKeybinding(keyCode)));
    }
    getSingleModifierDispatchChords() {
        return this.keySequence.map(keybinding => this.getSingleModifierDispatchPart(keybinding));
    }
    getSingleModifierDispatchPart(code) {
        var _a, _b, _c, _d, _e;
        if (((_a = code.key) === null || _a === void 0 ? void 0 : _a.keyCode) === undefined) {
            return null; // eslint-disable-line no-null/no-null
        }
        if (monaco_keycode_map_1.KEY_CODE_MAP[(_b = code.key) === null || _b === void 0 ? void 0 : _b.keyCode] === 5 /* MonacoKeyCode.Ctrl */ && !code.shift && !code.alt && !code.meta) {
            return 'ctrl';
        }
        if (monaco_keycode_map_1.KEY_CODE_MAP[(_c = code.key) === null || _c === void 0 ? void 0 : _c.keyCode] === 4 /* MonacoKeyCode.Shift */ && !code.ctrl && !code.alt && !code.meta) {
            return 'shift';
        }
        if (monaco_keycode_map_1.KEY_CODE_MAP[(_d = code.key) === null || _d === void 0 ? void 0 : _d.keyCode] === 6 /* MonacoKeyCode.Alt */ && !code.shift && !code.ctrl && !code.meta) {
            return 'alt';
        }
        if (monaco_keycode_map_1.KEY_CODE_MAP[(_e = code.key) === null || _e === void 0 ? void 0 : _e.keyCode] === 57 /* MonacoKeyCode.Meta */ && !code.shift && !code.alt && !code.ctrl) {
            return 'meta';
        }
        return null; // eslint-disable-line no-null/no-null
    }
    toKeybinding(keyCode) {
        return new keybindings_1.KeyCodeChord(keyCode.ctrl, keyCode.shift, keyCode.alt, keyCode.meta, monaco_keycode_map_1.KEY_CODE_MAP[keyCode.key.keyCode]);
    }
    getChords() {
        return this.chords;
    }
    static toKeybinding(keybindings) {
        return keybindings.map(binding => this.keyCode(binding)).join(' ');
    }
    static keyCode(keybinding) {
        const keyCode = keybinding instanceof keybindings_1.KeyCodeChord ? keybinding.keyCode : usLayoutResolvedKeybinding_1.USLayoutResolvedKeybinding['_scanCodeToKeyCode'](keybinding.scanCode);
        const sequence = {
            first: keys_1.Key.getKey(this.monaco2BrowserKeyCode(keyCode & 0xff)),
            modifiers: []
        };
        if (keybinding.ctrlKey) {
            if (os_1.isOSX) {
                sequence.modifiers.push(keys_1.KeyModifier.MacCtrl);
            }
            else {
                sequence.modifiers.push(keys_1.KeyModifier.CtrlCmd);
            }
        }
        if (keybinding.shiftKey) {
            sequence.modifiers.push(keys_1.KeyModifier.Shift);
        }
        if (keybinding.altKey) {
            sequence.modifiers.push(keys_1.KeyModifier.Alt);
        }
        if (keybinding.metaKey && sequence.modifiers.indexOf(keys_1.KeyModifier.CtrlCmd) === -1) {
            sequence.modifiers.push(keys_1.KeyModifier.CtrlCmd);
        }
        return keys_1.KeyCode.createKeyCode(sequence);
    }
    static keySequence(keybinding) {
        return keybinding.map(part => this.keyCode(part));
    }
    static monaco2BrowserKeyCode(keyCode) {
        for (let i = 0; i < monaco_keycode_map_1.KEY_CODE_MAP.length; i++) {
            if (monaco_keycode_map_1.KEY_CODE_MAP[i] === keyCode) {
                return i;
            }
        }
        return -1;
    }
}
exports.MonacoResolvedKeybinding = MonacoResolvedKeybinding;
//# sourceMappingURL=monaco-resolved-keybinding.js.map