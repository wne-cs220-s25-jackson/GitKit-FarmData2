"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = void 0;
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
const electron_api_1 = require("../electron-common/electron-api");
// eslint-disable-next-line import/no-extraneous-dependencies
const electron_1 = require("@theia/core/electron-shared/electron");
const api = {
    showOpenDialog: (options) => electron_1.ipcRenderer.invoke(electron_api_1.CHANNEL_SHOW_OPEN, options),
    showSaveDialog: (options) => electron_1.ipcRenderer.invoke(electron_api_1.CHANNEL_SHOW_SAVE, options),
};
function preload() {
    console.log('exposing theia filesystem electron api');
    electron_1.contextBridge.exposeInMainWorld('electronTheiaFilesystem', api);
}
exports.preload = preload;
//# sourceMappingURL=preload.js.map