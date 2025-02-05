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
exports.WindowStateExtImpl = void 0;
const types_impl_1 = require("./types-impl");
const plugin_api_rpc_1 = require("../common/plugin-api-rpc");
const event_1 = require("@theia/core/lib/common/event");
class WindowStateExtImpl {
    constructor(rpc) {
        this.windowStateChangedEmitter = new event_1.Emitter();
        this.onDidChangeWindowState = this.windowStateChangedEmitter.event;
        this.proxy = rpc.getProxy(plugin_api_rpc_1.PLUGIN_RPC_CONTEXT.WINDOW_MAIN);
        this.windowStateCached = { focused: true, active: true }; // supposed tab is active on start
    }
    getWindowState() {
        return this.windowStateCached;
    }
    $onDidChangeWindowFocus(focused) {
        this.onDidChangeWindowProperty('focused', focused);
    }
    $onDidChangeWindowActive(active) {
        this.onDidChangeWindowProperty('active', active);
    }
    onDidChangeWindowProperty(property, value) {
        if (value === this.windowStateCached[property]) {
            return;
        }
        this.windowStateCached = { ...this.windowStateCached, [property]: value };
        this.windowStateChangedEmitter.fire(this.windowStateCached);
    }
    async openUri(uriOrString) {
        let uri;
        if (typeof uriOrString === 'string') {
            uri = types_impl_1.URI.parse(uriOrString);
        }
        else {
            uri = uriOrString;
        }
        if (!uri.scheme.trim().length) {
            throw new Error('Invalid scheme - cannot be empty');
        }
        return this.proxy.$openUri(uri);
    }
    async asExternalUri(target) {
        if (!target.scheme.trim().length) {
            throw new Error('Invalid scheme - cannot be empty');
        }
        const uri = await this.proxy.$asExternalUri(target);
        return types_impl_1.URI.revive(uri);
    }
}
exports.WindowStateExtImpl = WindowStateExtImpl;
//# sourceMappingURL=window-state.js.map