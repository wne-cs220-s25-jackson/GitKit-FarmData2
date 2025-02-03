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
exports.ContextMenuContext = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const os_1 = require("../../common/os");
let ContextMenuContext = class ContextMenuContext {
    get altPressed() {
        return this._altPressed;
    }
    setAltPressed(altPressed) {
        this._altPressed = altPressed;
    }
    resetAltPressed() {
        this.setAltPressed(false);
    }
    constructor() {
        this._altPressed = false;
        document.addEventListener('keydown', e => this.setAltPressed(e.altKey || (os_1.OS.type() !== os_1.OS.Type.OSX && e.shiftKey)), true);
        document.addEventListener('keyup', () => this.resetAltPressed(), true);
    }
};
exports.ContextMenuContext = ContextMenuContext;
exports.ContextMenuContext = ContextMenuContext = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ContextMenuContext);
//# sourceMappingURL=context-menu-context.js.map