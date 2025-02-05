"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronApi = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const electron_api_1 = require("../electron-common/electron-api");
const electron_1 = require("@theia/core/electron-shared/electron");
let ElectronApi = class ElectronApi {
    onStart(application) {
        // dialogs
        electron_1.ipcMain.handle(electron_api_1.CHANNEL_SHOW_OPEN, async (event, options) => {
            const properties = [];
            // checking proper combination of file/dir opening is done on the renderer side
            if (options.openFiles) {
                properties.push('openFile');
            }
            if (options.openFolders) {
                properties.push('openDirectory');
            }
            if (options.selectMany === true) {
                properties.push('multiSelections');
            }
            const dialogOpts = {
                defaultPath: options.path,
                buttonLabel: options.buttonLabel,
                filters: options.filters,
                title: options.title,
                properties: properties
            };
            if (options.modal) {
                const win = electron_1.BrowserWindow.fromWebContents(event.sender);
                if (win) {
                    return (await electron_1.dialog.showOpenDialog(win, dialogOpts)).filePaths;
                }
            }
            return (await electron_1.dialog.showOpenDialog(dialogOpts)).filePaths;
        });
        electron_1.ipcMain.handle(electron_api_1.CHANNEL_SHOW_SAVE, async (event, options) => {
            const dialogOpts = {
                defaultPath: options.path,
                buttonLabel: options.buttonLabel,
                filters: options.filters,
                title: options.title
            };
            if (options.modal) {
                const win = electron_1.BrowserWindow.fromWebContents(event.sender);
                if (win) {
                    return (await electron_1.dialog.showSaveDialog(win, dialogOpts)).filePath;
                }
            }
            return (await electron_1.dialog.showSaveDialog(dialogOpts)).filePath;
        });
    }
};
exports.ElectronApi = ElectronApi;
exports.ElectronApi = ElectronApi = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], ElectronApi);
//# sourceMappingURL=electron-api-main.js.map