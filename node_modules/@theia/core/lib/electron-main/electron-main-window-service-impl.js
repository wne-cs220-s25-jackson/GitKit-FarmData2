"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
exports.ElectronMainWindowServiceImpl = void 0;
const tslib_1 = require("tslib");
const electron_1 = require("@theia/electron/shared/electron");
const inversify_1 = require("inversify");
const electron_main_application_1 = require("./electron-main-application");
let ElectronMainWindowServiceImpl = class ElectronMainWindowServiceImpl {
    openNewWindow(url, { external }) {
        if (external) {
            electron_1.shell.openExternal(url);
        }
        else {
            this.app.createWindow().then(electronWindow => {
                electronWindow.loadURL(url);
            });
        }
        return undefined;
    }
    openNewDefaultWindow(params) {
        this.app.openDefaultWindow(params);
    }
};
exports.ElectronMainWindowServiceImpl = ElectronMainWindowServiceImpl;
tslib_1.__decorate([
    (0, inversify_1.inject)(electron_main_application_1.ElectronMainApplication),
    tslib_1.__metadata("design:type", electron_main_application_1.ElectronMainApplication)
], ElectronMainWindowServiceImpl.prototype, "app", void 0);
exports.ElectronMainWindowServiceImpl = ElectronMainWindowServiceImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronMainWindowServiceImpl);
//# sourceMappingURL=electron-main-window-service-impl.js.map