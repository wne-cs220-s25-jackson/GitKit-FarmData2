"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
exports.IPCConnectionProvider = void 0;
const tslib_1 = require("tslib");
const cp = require("child_process");
const inversify_1 = require("inversify");
const path = require("path");
const readline_1 = require("readline");
const common_1 = require("../../common");
const ipc_channel_1 = require("./ipc-channel");
const ipc_protocol_1 = require("./ipc-protocol");
let IPCConnectionProvider = class IPCConnectionProvider {
    listen(options, acceptor) {
        return this.doListen({
            logger: this.logger,
            args: [],
            ...options
        }, acceptor);
    }
    doListen(options, acceptor) {
        const childProcess = this.fork(options);
        const channel = new ipc_channel_1.IPCChannel(childProcess);
        const toStop = new common_1.DisposableCollection();
        const toCancelStop = toStop.push(common_1.Disposable.create(() => childProcess.kill()));
        const errorHandler = options.errorHandler;
        if (errorHandler) {
            let errorCount = 0;
            channel.onError((err) => {
                errorCount++;
                if (errorHandler.shouldStop(err, errorCount)) {
                    toStop.dispose();
                }
            });
            channel.onClose(() => {
                if (toStop.disposed) {
                    return;
                }
                if (errorHandler.shouldRestart()) {
                    toCancelStop.dispose();
                    toStop.push(this.doListen(options, acceptor));
                }
            });
        }
        acceptor(channel);
        return toStop;
    }
    fork(options) {
        const forkOptions = {
            env: (0, ipc_protocol_1.createIpcEnv)(options),
            execArgv: [],
            // 5th element MUST be 'overlapped' for it to work properly on Windows.
            // 'overlapped' works just like 'pipe' on non-Windows platforms.
            // See: https://nodejs.org/docs/latest-v14.x/api/child_process.html#child_process_options_stdio
            // Note: For some reason `@types/node` does not know about 'overlapped'.
            stdio: ['pipe', 'pipe', 'pipe', 'ipc', 'overlapped']
        };
        const inspectArgPrefix = `--${options.serverName}-inspect`;
        const inspectArg = process.argv.find(v => v.startsWith(inspectArgPrefix));
        if (inspectArg !== undefined) {
            forkOptions.execArgv = ['--nolazy', `--inspect${inspectArg.substring(inspectArgPrefix.length)}`];
        }
        const childProcess = cp.fork(path.join(__dirname, 'ipc-bootstrap'), options.args, forkOptions);
        (0, readline_1.createInterface)(childProcess.stdout).on('line', line => this.logger.info(`[${options.serverName}: ${childProcess.pid}] ${line}`));
        (0, readline_1.createInterface)(childProcess.stderr).on('line', line => this.logger.error(`[${options.serverName}: ${childProcess.pid}] ${line}`));
        this.logger.debug(`[${options.serverName}: ${childProcess.pid}] IPC started`);
        childProcess.once('exit', () => this.logger.debug(`[${options.serverName}: ${childProcess.pid}] IPC exited`));
        return childProcess;
    }
};
exports.IPCConnectionProvider = IPCConnectionProvider;
tslib_1.__decorate([
    (0, inversify_1.inject)(common_1.ILogger),
    tslib_1.__metadata("design:type", Object)
], IPCConnectionProvider.prototype, "logger", void 0);
exports.IPCConnectionProvider = IPCConnectionProvider = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], IPCConnectionProvider);
//# sourceMappingURL=ipc-connection-provider.js.map