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
const inversify_1 = require("@theia/core/shared/inversify");
const electron_file_dialog_service_1 = require("./electron-file-dialog-service");
const browser_1 = require("../../browser");
exports.default = new inversify_1.ContainerModule((bind, _unbind, _isBound, rebind) => {
    bind(electron_file_dialog_service_1.ElectronFileDialogService).toSelf().inSingletonScope();
    rebind(browser_1.FileDialogService).toService(electron_file_dialog_service_1.ElectronFileDialogService);
});
//# sourceMappingURL=electron-file-dialog-module.js.map