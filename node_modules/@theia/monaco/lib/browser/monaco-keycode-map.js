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
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CODE_MAP = void 0;
const browser = require("@theia/core/lib/browser");
const MonacoPlatform = require("@theia/monaco-editor-core/esm/vs/base/common/platform");
exports.KEY_CODE_MAP = [];
(function () {
    exports.KEY_CODE_MAP[3] = 7 /* KeyCode.PauseBreak */; // VK_CANCEL 0x03 Control-break processing
    exports.KEY_CODE_MAP[8] = 1 /* KeyCode.Backspace */;
    exports.KEY_CODE_MAP[9] = 2 /* KeyCode.Tab */;
    exports.KEY_CODE_MAP[13] = 3 /* KeyCode.Enter */;
    exports.KEY_CODE_MAP[16] = 4 /* KeyCode.Shift */;
    exports.KEY_CODE_MAP[17] = 5 /* KeyCode.Ctrl */;
    exports.KEY_CODE_MAP[18] = 6 /* KeyCode.Alt */;
    exports.KEY_CODE_MAP[19] = 7 /* KeyCode.PauseBreak */;
    exports.KEY_CODE_MAP[20] = 8 /* KeyCode.CapsLock */;
    exports.KEY_CODE_MAP[27] = 9 /* KeyCode.Escape */;
    exports.KEY_CODE_MAP[32] = 10 /* KeyCode.Space */;
    exports.KEY_CODE_MAP[33] = 11 /* KeyCode.PageUp */;
    exports.KEY_CODE_MAP[34] = 12 /* KeyCode.PageDown */;
    exports.KEY_CODE_MAP[35] = 13 /* KeyCode.End */;
    exports.KEY_CODE_MAP[36] = 14 /* KeyCode.Home */;
    exports.KEY_CODE_MAP[37] = 15 /* KeyCode.LeftArrow */;
    exports.KEY_CODE_MAP[38] = 16 /* KeyCode.UpArrow */;
    exports.KEY_CODE_MAP[39] = 17 /* KeyCode.RightArrow */;
    exports.KEY_CODE_MAP[40] = 18 /* KeyCode.DownArrow */;
    exports.KEY_CODE_MAP[45] = 19 /* KeyCode.Insert */;
    exports.KEY_CODE_MAP[46] = 20 /* KeyCode.Delete */;
    exports.KEY_CODE_MAP[48] = 21 /* KeyCode.Digit0 */;
    exports.KEY_CODE_MAP[49] = 22 /* KeyCode.Digit1 */;
    exports.KEY_CODE_MAP[50] = 23 /* KeyCode.Digit2 */;
    exports.KEY_CODE_MAP[51] = 24 /* KeyCode.Digit3 */;
    exports.KEY_CODE_MAP[52] = 25 /* KeyCode.Digit4 */;
    exports.KEY_CODE_MAP[53] = 26 /* KeyCode.Digit5 */;
    exports.KEY_CODE_MAP[54] = 27 /* KeyCode.Digit6 */;
    exports.KEY_CODE_MAP[55] = 28 /* KeyCode.Digit7 */;
    exports.KEY_CODE_MAP[56] = 29 /* KeyCode.Digit8 */;
    exports.KEY_CODE_MAP[57] = 30 /* KeyCode.Digit9 */;
    exports.KEY_CODE_MAP[65] = 31 /* KeyCode.KeyA */;
    exports.KEY_CODE_MAP[66] = 32 /* KeyCode.KeyB */;
    exports.KEY_CODE_MAP[67] = 33 /* KeyCode.KeyC */;
    exports.KEY_CODE_MAP[68] = 34 /* KeyCode.KeyD */;
    exports.KEY_CODE_MAP[69] = 35 /* KeyCode.KeyE */;
    exports.KEY_CODE_MAP[70] = 36 /* KeyCode.KeyF */;
    exports.KEY_CODE_MAP[71] = 37 /* KeyCode.KeyG */;
    exports.KEY_CODE_MAP[72] = 38 /* KeyCode.KeyH */;
    exports.KEY_CODE_MAP[73] = 39 /* KeyCode.KeyI */;
    exports.KEY_CODE_MAP[74] = 40 /* KeyCode.KeyJ */;
    exports.KEY_CODE_MAP[75] = 41 /* KeyCode.KeyK */;
    exports.KEY_CODE_MAP[76] = 42 /* KeyCode.KeyL */;
    exports.KEY_CODE_MAP[77] = 43 /* KeyCode.KeyM */;
    exports.KEY_CODE_MAP[78] = 44 /* KeyCode.KeyN */;
    exports.KEY_CODE_MAP[79] = 45 /* KeyCode.KeyO */;
    exports.KEY_CODE_MAP[80] = 46 /* KeyCode.KeyP */;
    exports.KEY_CODE_MAP[81] = 47 /* KeyCode.KeyQ */;
    exports.KEY_CODE_MAP[82] = 48 /* KeyCode.KeyR */;
    exports.KEY_CODE_MAP[83] = 49 /* KeyCode.KeyS */;
    exports.KEY_CODE_MAP[84] = 50 /* KeyCode.KeyT */;
    exports.KEY_CODE_MAP[85] = 51 /* KeyCode.KeyU */;
    exports.KEY_CODE_MAP[86] = 52 /* KeyCode.KeyV */;
    exports.KEY_CODE_MAP[87] = 53 /* KeyCode.KeyW */;
    exports.KEY_CODE_MAP[88] = 54 /* KeyCode.KeyX */;
    exports.KEY_CODE_MAP[89] = 55 /* KeyCode.KeyY */;
    exports.KEY_CODE_MAP[90] = 56 /* KeyCode.KeyZ */;
    exports.KEY_CODE_MAP[93] = 58 /* KeyCode.ContextMenu */;
    exports.KEY_CODE_MAP[96] = 98 /* KeyCode.Numpad0 */;
    exports.KEY_CODE_MAP[97] = 99 /* KeyCode.Numpad1 */;
    exports.KEY_CODE_MAP[98] = 100 /* KeyCode.Numpad2 */;
    exports.KEY_CODE_MAP[99] = 101 /* KeyCode.Numpad3 */;
    exports.KEY_CODE_MAP[100] = 102 /* KeyCode.Numpad4 */;
    exports.KEY_CODE_MAP[101] = 103 /* KeyCode.Numpad5 */;
    exports.KEY_CODE_MAP[102] = 104 /* KeyCode.Numpad6 */;
    exports.KEY_CODE_MAP[103] = 105 /* KeyCode.Numpad7 */;
    exports.KEY_CODE_MAP[104] = 106 /* KeyCode.Numpad8 */;
    exports.KEY_CODE_MAP[105] = 107 /* KeyCode.Numpad9 */;
    exports.KEY_CODE_MAP[106] = 108 /* KeyCode.NumpadMultiply */;
    exports.KEY_CODE_MAP[107] = 109 /* KeyCode.NumpadAdd */;
    exports.KEY_CODE_MAP[108] = 110 /* KeyCode.NUMPAD_SEPARATOR */;
    exports.KEY_CODE_MAP[109] = 111 /* KeyCode.NumpadSubtract */;
    exports.KEY_CODE_MAP[110] = 112 /* KeyCode.NumpadDecimal */;
    exports.KEY_CODE_MAP[111] = 113 /* KeyCode.NumpadDivide */;
    exports.KEY_CODE_MAP[112] = 59 /* KeyCode.F1 */;
    exports.KEY_CODE_MAP[113] = 60 /* KeyCode.F2 */;
    exports.KEY_CODE_MAP[114] = 61 /* KeyCode.F3 */;
    exports.KEY_CODE_MAP[115] = 62 /* KeyCode.F4 */;
    exports.KEY_CODE_MAP[116] = 63 /* KeyCode.F5 */;
    exports.KEY_CODE_MAP[117] = 64 /* KeyCode.F6 */;
    exports.KEY_CODE_MAP[118] = 65 /* KeyCode.F7 */;
    exports.KEY_CODE_MAP[119] = 66 /* KeyCode.F8 */;
    exports.KEY_CODE_MAP[120] = 67 /* KeyCode.F9 */;
    exports.KEY_CODE_MAP[121] = 68 /* KeyCode.F10 */;
    exports.KEY_CODE_MAP[122] = 69 /* KeyCode.F11 */;
    exports.KEY_CODE_MAP[123] = 70 /* KeyCode.F12 */;
    exports.KEY_CODE_MAP[124] = 71 /* KeyCode.F13 */;
    exports.KEY_CODE_MAP[125] = 72 /* KeyCode.F14 */;
    exports.KEY_CODE_MAP[126] = 73 /* KeyCode.F15 */;
    exports.KEY_CODE_MAP[127] = 74 /* KeyCode.F16 */;
    exports.KEY_CODE_MAP[128] = 75 /* KeyCode.F17 */;
    exports.KEY_CODE_MAP[129] = 76 /* KeyCode.F18 */;
    exports.KEY_CODE_MAP[130] = 77 /* KeyCode.F19 */;
    exports.KEY_CODE_MAP[144] = 83 /* KeyCode.NumLock */;
    exports.KEY_CODE_MAP[145] = 84 /* KeyCode.ScrollLock */;
    exports.KEY_CODE_MAP[186] = 85 /* KeyCode.Semicolon */;
    exports.KEY_CODE_MAP[187] = 86 /* KeyCode.Equal */;
    exports.KEY_CODE_MAP[188] = 87 /* KeyCode.Comma */;
    exports.KEY_CODE_MAP[189] = 88 /* KeyCode.Minus */;
    exports.KEY_CODE_MAP[190] = 89 /* KeyCode.Period */;
    exports.KEY_CODE_MAP[191] = 90 /* KeyCode.Slash */;
    exports.KEY_CODE_MAP[192] = 91 /* KeyCode.Backquote */;
    exports.KEY_CODE_MAP[193] = 115 /* KeyCode.ABNT_C1 */;
    exports.KEY_CODE_MAP[194] = 116 /* KeyCode.ABNT_C2 */;
    exports.KEY_CODE_MAP[219] = 92 /* KeyCode.BracketLeft */;
    exports.KEY_CODE_MAP[220] = 93 /* KeyCode.Backslash */;
    exports.KEY_CODE_MAP[221] = 94 /* KeyCode.BracketRight */;
    exports.KEY_CODE_MAP[222] = 95 /* KeyCode.Quote */;
    exports.KEY_CODE_MAP[223] = 96 /* KeyCode.OEM_8 */;
    exports.KEY_CODE_MAP[226] = 97 /* KeyCode.IntlBackslash */;
    /**
     * https://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
     * If an Input Method Editor is processing key input and the event is keydown, return 229.
     */
    exports.KEY_CODE_MAP[229] = 114 /* KeyCode.KEY_IN_COMPOSITION */;
    if (browser.isIE) {
        exports.KEY_CODE_MAP[91] = 57 /* KeyCode.Meta */;
    }
    else if (browser.isFirefox) {
        exports.KEY_CODE_MAP[59] = 85 /* KeyCode.Semicolon */;
        exports.KEY_CODE_MAP[107] = 86 /* KeyCode.Equal */;
        exports.KEY_CODE_MAP[109] = 88 /* KeyCode.Minus */;
        if (MonacoPlatform.OS === 2 /* MonacoPlatform.OperatingSystem.Macintosh */) {
            exports.KEY_CODE_MAP[224] = 57 /* KeyCode.Meta */;
        }
    }
    else if (browser.isWebKit) {
        exports.KEY_CODE_MAP[91] = 57 /* KeyCode.Meta */;
        if (MonacoPlatform.OS === 2 /* MonacoPlatform.OperatingSystem.Macintosh */) {
            // the two meta keys in the Mac have different key codes (91 and 93)
            exports.KEY_CODE_MAP[93] = 57 /* KeyCode.Meta */;
        }
        else {
            exports.KEY_CODE_MAP[92] = 57 /* KeyCode.Meta */;
        }
    }
})();
//# sourceMappingURL=monaco-keycode-map.js.map