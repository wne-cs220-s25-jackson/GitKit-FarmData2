"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.LoggerWatcher = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const event_1 = require("./event");
let LoggerWatcher = class LoggerWatcher {
    constructor() {
        this.onLogLevelChangedEmitter = new event_1.Emitter();
        this.onLogConfigChangedEmitter = new event_1.Emitter();
    }
    getLoggerClient() {
        const logLevelEmitter = this.onLogLevelChangedEmitter;
        const logConfigEmitter = this.onLogConfigChangedEmitter;
        return {
            onLogLevelChanged(event) {
                logLevelEmitter.fire(event);
            },
            onLogConfigChanged() {
                logConfigEmitter.fire();
            },
        };
    }
    get onLogLevelChanged() {
        return this.onLogLevelChangedEmitter.event;
    }
    get onLogConfigChanged() {
        return this.onLogConfigChangedEmitter.event;
    }
};
exports.LoggerWatcher = LoggerWatcher;
exports.LoggerWatcher = LoggerWatcher = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LoggerWatcher);
//# sourceMappingURL=logger-watcher.js.map