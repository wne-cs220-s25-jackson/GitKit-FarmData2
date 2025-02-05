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
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogOutputChannelImpl = void 0;
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
const output_channel_item_1 = require("./output-channel-item");
const types_impl_1 = require("../types-impl");
const core_1 = require("@theia/core");
class LogOutputChannelImpl extends output_channel_item_1.OutputChannelImpl {
    constructor(name, proxy, pluginInfo) {
        super(name, proxy, pluginInfo);
        this.onDidChangeLogLevelEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onDidChangeLogLevel = this.onDidChangeLogLevelEmitter.event;
        this.setLogLevel(types_impl_1.LogLevel.Info);
    }
    setLogLevel(level) {
        if (this.logLevel !== level) {
            this.logLevel = level;
            this.onDidChangeLogLevelEmitter.fire(this.logLevel);
        }
    }
    getLogLevel() {
        return this.logLevel;
    }
    append(value) {
        super.validate();
        this.info(value);
    }
    appendLine(value) {
        super.validate();
        this.append(value + '\n');
    }
    dispose() {
        super.dispose();
        this.onDidChangeLogLevelEmitter.dispose();
    }
    log(level, message) {
        super.validate();
        if (this.checkLogLevel(level)) {
            const now = new Date();
            const eol = message.endsWith('\n') ? '' : '\n';
            const logMessage = `${now.toISOString()} [${types_impl_1.LogLevel[level]}] ${message}${eol}`;
            this.proxy.$append(this.name, logMessage, this.pluginInfo);
        }
    }
    checkLogLevel(level) {
        return this.logLevel <= level;
    }
    trace(message, ...args) {
        this.log(types_impl_1.LogLevel.Trace, this.format(message, args));
    }
    debug(message, ...args) {
        this.log(types_impl_1.LogLevel.Debug, this.format(message, args));
    }
    info(message, ...args) {
        this.log(types_impl_1.LogLevel.Info, this.format(message, args));
    }
    warn(message, ...args) {
        this.log(types_impl_1.LogLevel.Warning, this.format(message, args));
    }
    error(errorMsg, ...args) {
        if (errorMsg instanceof Error) {
            this.log(types_impl_1.LogLevel.Error, this.format(errorMsg.stack || errorMsg.message, args));
        }
        else {
            this.log(types_impl_1.LogLevel.Error, this.format(errorMsg, args));
        }
    }
    format(message, args) {
        if (args.length > 0) {
            return `${message} ${args.map((arg) => (0, core_1.isObject)(arg) || (0, core_1.isArray)(arg) ? JSON.stringify(arg) : arg).join(' ')}`;
        }
        return message;
    }
}
exports.LogOutputChannelImpl = LogOutputChannelImpl;
//# sourceMappingURL=log-output-channel.js.map