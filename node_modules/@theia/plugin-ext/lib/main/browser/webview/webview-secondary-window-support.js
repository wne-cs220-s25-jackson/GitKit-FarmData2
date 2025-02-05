"use strict";
// *****************************************************************************
// Copyright (C) 2024 STMicroelectronics and others.
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
exports.WebviewSecondaryWindowSupport = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const secondary_window_handler_1 = require("@theia/core/lib/browser/secondary-window-handler");
const webview_1 = require("./webview");
let WebviewSecondaryWindowSupport = class WebviewSecondaryWindowSupport {
    onStart(app) {
        this.secondaryWindowHandler.onDidAddWidget(([widget, win]) => {
            if (widget instanceof webview_1.WebviewWidget) {
                const script = win.document.createElement('script');
                script.text = `
                        window.addEventListener('message', e => {
                        // Only process messages from Theia main window
                        if (e.source === window.opener) {
                            // Delegate message to iframe
                            const frame = window.document.getElementsByTagName('iframe').item(0);
                            if (frame) {
                                frame.contentWindow?.postMessage({ ...e.data }, '*');
                            }
                        }
                        }); `;
                win.document.head.append(script);
            }
        });
    }
};
exports.WebviewSecondaryWindowSupport = WebviewSecondaryWindowSupport;
tslib_1.__decorate([
    (0, inversify_1.inject)(secondary_window_handler_1.SecondaryWindowHandler),
    tslib_1.__metadata("design:type", secondary_window_handler_1.SecondaryWindowHandler)
], WebviewSecondaryWindowSupport.prototype, "secondaryWindowHandler", void 0);
exports.WebviewSecondaryWindowSupport = WebviewSecondaryWindowSupport = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], WebviewSecondaryWindowSupport);
//# sourceMappingURL=webview-secondary-window-support.js.map