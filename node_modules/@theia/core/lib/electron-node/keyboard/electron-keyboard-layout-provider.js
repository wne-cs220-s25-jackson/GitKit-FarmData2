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
exports.ElectronKeyboardLayoutProvider = void 0;
const tslib_1 = require("tslib");
const nativeKeymap = require("@theia/electron/shared/native-keymap");
const inversify_1 = require("inversify");
let ElectronKeyboardLayoutProvider = class ElectronKeyboardLayoutProvider {
    getNativeLayout() {
        return Promise.resolve(this.getNativeLayoutSync());
    }
    getNativeLayoutSync() {
        return {
            info: nativeKeymap.getCurrentKeyboardLayout(),
            mapping: nativeKeymap.getKeyMap()
        };
    }
};
exports.ElectronKeyboardLayoutProvider = ElectronKeyboardLayoutProvider;
exports.ElectronKeyboardLayoutProvider = ElectronKeyboardLayoutProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronKeyboardLayoutProvider);
//# sourceMappingURL=electron-keyboard-layout-provider.js.map