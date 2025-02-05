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
exports.DebugAdapterSessionFactoryImpl = exports.LaunchBasedDebugAdapterFactory = void 0;
const tslib_1 = require("tslib");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Some entities copied and modified from https://github.com/Microsoft/vscode-debugadapter-node/blob/master/adapter/src/protocol.ts
const net = require("net");
const inversify_1 = require("@theia/core/shared/inversify");
const node_1 = require("@theia/process/lib/node");
const debug_adapter_session_1 = require("../common/debug-adapter-session");
const application_package_1 = require("@theia/core/shared/@theia/application-package");
const stream_debug_adapter_1 = require("./stream-debug-adapter");
const common_1 = require("@theia/core/lib/common");
/**
 * [DebugAdapterFactory](#DebugAdapterFactory) implementation based on
 * launching the debug adapter as separate process.
 */
let LaunchBasedDebugAdapterFactory = class LaunchBasedDebugAdapterFactory {
    start(executable) {
        const process = this.childProcess(executable);
        if (!process.process) {
            throw new Error(`Could not start debug adapter process: ${JSON.stringify(executable)}`);
        }
        // FIXME: propagate onError + onExit
        const provider = new stream_debug_adapter_1.ProcessDebugAdapter(process.process);
        return provider;
    }
    childProcess(executable) {
        const isForkOptions = (forkOptions) => (0, common_1.isObject)(forkOptions) && 'modulePath' in forkOptions;
        const processOptions = { ...executable };
        const options = { stdio: ['pipe', 'pipe', 2] };
        if (isForkOptions(processOptions)) {
            options.stdio.push('ipc');
            options.env = application_package_1.environment.electron.runAsNodeEnv();
            options.execArgv = executable.execArgv;
        }
        processOptions.options = options;
        return this.processFactory(processOptions);
    }
    connect(debugServerPort) {
        const socket = net.createConnection(debugServerPort);
        // FIXME: propagate socket.on('error', ...) + socket.on('close', ...)
        const provider = new stream_debug_adapter_1.SocketDebugAdapter(socket);
        return provider;
    }
};
exports.LaunchBasedDebugAdapterFactory = LaunchBasedDebugAdapterFactory;
tslib_1.__decorate([
    (0, inversify_1.inject)(node_1.RawProcessFactory),
    tslib_1.__metadata("design:type", Function)
], LaunchBasedDebugAdapterFactory.prototype, "processFactory", void 0);
tslib_1.__decorate([
    (0, inversify_1.inject)(node_1.ProcessManager),
    tslib_1.__metadata("design:type", node_1.ProcessManager)
], LaunchBasedDebugAdapterFactory.prototype, "processManager", void 0);
exports.LaunchBasedDebugAdapterFactory = LaunchBasedDebugAdapterFactory = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], LaunchBasedDebugAdapterFactory);
/**
 * [DebugAdapterSessionFactory](#DebugAdapterSessionFactory) implementation.
 */
let DebugAdapterSessionFactoryImpl = class DebugAdapterSessionFactoryImpl {
    get(sessionId, debugAdapter) {
        return new debug_adapter_session_1.DebugAdapterSessionImpl(sessionId, debugAdapter);
    }
};
exports.DebugAdapterSessionFactoryImpl = DebugAdapterSessionFactoryImpl;
exports.DebugAdapterSessionFactoryImpl = DebugAdapterSessionFactoryImpl = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], DebugAdapterSessionFactoryImpl);
//# sourceMappingURL=debug-adapter-factory.js.map