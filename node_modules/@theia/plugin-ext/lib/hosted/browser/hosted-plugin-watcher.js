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
exports.HostedPluginWatcher = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const event_1 = require("@theia/core/lib/common/event");
let HostedPluginWatcher = class HostedPluginWatcher {
    constructor() {
        this.onPostMessage = new event_1.Emitter();
        this.onLogMessage = new event_1.Emitter();
        this.onDidDeployEmitter = new event_1.Emitter();
        this.onDidDeploy = this.onDidDeployEmitter.event;
    }
    getHostedPluginClient() {
        const messageEmitter = this.onPostMessage;
        const logEmitter = this.onLogMessage;
        return {
            postMessage(pluginHostId, message) {
                messageEmitter.fire({ pluginHostId, message });
                return Promise.resolve();
            },
            log(logPart) {
                logEmitter.fire(logPart);
                return Promise.resolve();
            },
            onDidDeploy: () => this.onDidDeployEmitter.fire(undefined)
        };
    }
    get onPostMessageEvent() {
        return this.onPostMessage.event;
    }
    get onLogMessageEvent() {
        return this.onLogMessage.event;
    }
};
exports.HostedPluginWatcher = HostedPluginWatcher;
exports.HostedPluginWatcher = HostedPluginWatcher = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HostedPluginWatcher);
//# sourceMappingURL=hosted-plugin-watcher.js.map