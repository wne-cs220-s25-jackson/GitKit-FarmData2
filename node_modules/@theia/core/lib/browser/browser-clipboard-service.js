"use strict";
// *****************************************************************************
// Copyright (C) 2019 RedHat and others.
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
exports.BrowserClipboardService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const browser_1 = require("./browser");
const logger_1 = require("../common/logger");
const message_service_1 = require("../common/message-service");
const nls_1 = require("../common/nls");
let BrowserClipboardService = class BrowserClipboardService {
    async readText() {
        let permission;
        try {
            permission = await this.queryPermission('clipboard-read');
        }
        catch (e1) {
            this.logger.error('Failed checking a clipboard-read permission.', e1);
            // in FireFox, Clipboard API isn't gated with the permissions
            try {
                return await this.getClipboardAPI().readText();
            }
            catch (e2) {
                this.logger.error('Failed reading clipboard content.', e2);
                if (browser_1.isFirefox) {
                    this.messageService.warn(nls_1.nls.localize('theia/navigator/clipboardWarnFirefox', 
                    // eslint-disable-next-line max-len
                    "Clipboard API is not available. It can be enabled by '{0}' preference on '{1}' page. Then reload Theia. Note, it will allow FireFox getting full access to the system clipboard.", 'dom.events.testing.asyncClipboard', 'about:config'));
                }
                return '';
            }
        }
        if (permission.state === 'denied') {
            // most likely, the user intentionally denied the access
            this.messageService.warn(nls_1.nls.localize('theia/navigator/clipboardWarn', "Access to the clipboard is denied. Check your browser's permission."));
            return '';
        }
        return this.getClipboardAPI().readText();
    }
    async writeText(value) {
        let permission;
        try {
            permission = await this.queryPermission('clipboard-write');
        }
        catch (e1) {
            this.logger.error('Failed checking a clipboard-write permission.', e1);
            // in FireFox, Clipboard API isn't gated with the permissions
            try {
                await this.getClipboardAPI().writeText(value);
                return;
            }
            catch (e2) {
                this.logger.error('Failed writing to the clipboard.', e2);
                if (browser_1.isFirefox) {
                    this.messageService.warn(nls_1.nls.localize('theia/core/navigator/clipboardWarnFirefox', 
                    // eslint-disable-next-line max-len
                    "Clipboard API is not available. It can be enabled by '{0}' preference on '{1}' page. Then reload Theia. Note, it will allow FireFox getting full access to the system clipboard.", 'dom.events.testing.asyncClipboard', 'about:config'));
                }
                return;
            }
        }
        if (permission.state === 'denied') {
            // most likely, the user intentionally denied the access
            this.messageService.warn(nls_1.nls.localize('theia/core/navigator/clipboardWarn', "Access to the clipboard is denied. Check your browser's permission."));
            return;
        }
        return this.getClipboardAPI().writeText(value);
    }
    async queryPermission(name) {
        if ('permissions' in navigator) {
            return navigator['permissions'].query({ name: name });
        }
        throw new Error('Permissions API unavailable');
    }
    getClipboardAPI() {
        if ('clipboard' in navigator) {
            return navigator['clipboard'];
        }
        throw new Error('Async Clipboard API unavailable');
    }
};
exports.BrowserClipboardService = BrowserClipboardService;
tslib_1.__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    tslib_1.__metadata("design:type", message_service_1.MessageService)
], BrowserClipboardService.prototype, "messageService", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(logger_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], BrowserClipboardService.prototype, "logger", void 0);
exports.BrowserClipboardService = BrowserClipboardService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], BrowserClipboardService);
//# sourceMappingURL=browser-clipboard-service.js.map