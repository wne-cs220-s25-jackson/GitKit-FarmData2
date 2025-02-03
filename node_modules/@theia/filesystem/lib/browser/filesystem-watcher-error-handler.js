"use strict";
// *****************************************************************************
// Copyright (C) 2020 Arm and others.
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
exports.FileSystemWatcherErrorHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const environment_1 = require("@theia/core/shared/@theia/application-package/lib/environment");
const core_1 = require("@theia/core");
const window_service_1 = require("@theia/core/lib/browser/window/window-service");
let FileSystemWatcherErrorHandler = class FileSystemWatcherErrorHandler {
    constructor() {
        this.watchHandlesExhausted = false;
    }
    get instructionsLink() {
        return 'https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc';
    }
    async handleError() {
        if (!this.watchHandlesExhausted) {
            this.watchHandlesExhausted = true;
            if (this.isElectron()) {
                const instructionsAction = 'Instructions';
                const action = await this.messageService.warn('Unable to watch for file changes in this large workspace.  Please follow the instructions link to resolve this issue.', { timeout: 60000 }, instructionsAction);
                if (action === instructionsAction) {
                    this.windowService.openNewWindow(this.instructionsLink, { external: true });
                }
            }
            else {
                await this.messageService.warn('Unable to watch for file changes in this large workspace.  The information you see may not include recent file changes.', { timeout: 60000 });
            }
        }
    }
    isElectron() {
        return environment_1.environment.electron.is();
    }
};
exports.FileSystemWatcherErrorHandler = FileSystemWatcherErrorHandler;
tslib_1.__decorate([
    (0, inversify_1.inject)(core_1.MessageService),
    tslib_1.__metadata("design:type", core_1.MessageService)
], FileSystemWatcherErrorHandler.prototype, "messageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    tslib_1.__metadata("design:type", Object)
], FileSystemWatcherErrorHandler.prototype, "windowService", void 0);
exports.FileSystemWatcherErrorHandler = FileSystemWatcherErrorHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], FileSystemWatcherErrorHandler);
//# sourceMappingURL=filesystem-watcher-error-handler.js.map