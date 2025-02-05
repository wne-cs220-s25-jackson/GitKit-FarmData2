"use strict";
// *****************************************************************************
// Copyright (C) 2018 Red Hat, Inc. and others.
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
exports.WindowStateMain = void 0;
const vscode_uri_1 = require("@theia/core/shared/vscode-uri");
const uri_1 = require("@theia/core/lib/common/uri");
const plugin_api_rpc_1 = require("../../common/plugin-api-rpc");
const disposable_1 = require("@theia/core/lib/common/disposable");
const opener_service_1 = require("@theia/core/lib/browser/opener-service");
const external_uri_service_1 = require("@theia/core/lib/browser/external-uri-service");
const window_activity_tracker_1 = require("./window-activity-tracker");
class WindowStateMain {
    constructor(rpc, container) {
        this.toDispose = new disposable_1.DisposableCollection();
        this.proxy = rpc.getProxy(plugin_api_rpc_1.MAIN_RPC_CONTEXT.WINDOW_STATE_EXT);
        this.openerService = container.get(opener_service_1.OpenerService);
        this.externalUriService = container.get(external_uri_service_1.ExternalUriService);
        const fireDidFocus = () => this.onFocusChanged(true);
        window.addEventListener('focus', fireDidFocus);
        this.toDispose.push(disposable_1.Disposable.create(() => window.removeEventListener('focus', fireDidFocus)));
        const fireDidBlur = () => this.onFocusChanged(false);
        window.addEventListener('blur', fireDidBlur);
        this.toDispose.push(disposable_1.Disposable.create(() => window.removeEventListener('blur', fireDidBlur)));
        const tracker = new window_activity_tracker_1.WindowActivityTracker(window);
        this.toDispose.push(tracker.onDidChangeActiveState(isActive => this.onActiveStateChanged(isActive)));
        this.toDispose.push(tracker);
    }
    dispose() {
        this.toDispose.dispose();
    }
    onFocusChanged(focused) {
        this.proxy.$onDidChangeWindowFocus(focused);
    }
    onActiveStateChanged(isActive) {
        this.proxy.$onDidChangeWindowActive(isActive);
    }
    async $openUri(uriComponent) {
        const uri = vscode_uri_1.URI.revive(uriComponent);
        const url = new uri_1.default(encodeURI(uri.toString(true)));
        try {
            await (0, opener_service_1.open)(this.openerService, url, { openExternalApp: true });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async $asExternalUri(uriComponents) {
        const uri = vscode_uri_1.URI.revive(uriComponents);
        const resolved = await this.externalUriService.resolve(new uri_1.default(uri));
        return vscode_uri_1.URI.parse(resolved.toString());
    }
}
exports.WindowStateMain = WindowStateMain;
//# sourceMappingURL=window-state-main.js.map