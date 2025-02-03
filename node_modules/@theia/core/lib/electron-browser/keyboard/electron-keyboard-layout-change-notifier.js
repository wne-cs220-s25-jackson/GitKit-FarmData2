"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ElectronKeyboardLayoutChangeNotifier = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("../../common/event");
/**
 * Keyboard layout changes are detected by the native-keymap package. This must happen in the
 * main process of Electron. The events are sent to the renderer process using Electron IPC.
 */
let ElectronKeyboardLayoutChangeNotifier = class ElectronKeyboardLayoutChangeNotifier {
    constructor() {
        this.nativeLayoutChanged = new event_1.Emitter();
    }
    get onDidChangeNativeLayout() {
        return this.nativeLayoutChanged.event;
    }
    init() {
        window.electronTheiaCore.onKeyboardLayoutChanged((newLayout) => this.nativeLayoutChanged.fire(newLayout));
    }
};
exports.ElectronKeyboardLayoutChangeNotifier = ElectronKeyboardLayoutChangeNotifier;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ElectronKeyboardLayoutChangeNotifier.prototype, "init", null);
exports.ElectronKeyboardLayoutChangeNotifier = ElectronKeyboardLayoutChangeNotifier = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronKeyboardLayoutChangeNotifier);
//# sourceMappingURL=electron-keyboard-layout-change-notifier.js.map