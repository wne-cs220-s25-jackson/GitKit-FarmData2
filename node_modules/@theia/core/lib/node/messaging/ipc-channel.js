"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics and others.
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
exports.IPCChannel = void 0;
const net_1 = require("net");
const common_1 = require("../../common");
const uint8_array_message_buffer_1 = require("../../common/message-rpc/uint8-array-message-buffer");
const binary_message_pipe_1 = require("./binary-message-pipe");
/**
 * A {@link Channel} to send messages between two processes using a dedicated pipe/fd for binary messages.
 * This fd is opened as 5th channel in addition to the default stdios (stdin, stdout, stderr, ipc). This means the default channels
 * are not blocked and can be used by the respective process for additional custom message handling.
 */
class IPCChannel extends common_1.AbstractChannel {
    constructor(childProcess) {
        super();
        this.ipcErrorListener = error => this.onErrorEmitter.fire(error);
        if (childProcess) {
            this.setupChildProcess(childProcess);
        }
        else {
            this.setupProcess();
        }
        this.messagePipe.onMessage(message => {
            this.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(message));
        });
    }
    setupChildProcess(childProcess) {
        childProcess.once('exit', code => this.onCloseEmitter.fire({ reason: 'Child process has been terminated', code: code !== null && code !== void 0 ? code : undefined }));
        this.messagePipe = new binary_message_pipe_1.BinaryMessagePipe(childProcess.stdio[4]);
        childProcess.on('error', this.ipcErrorListener);
        this.toDispose.push(common_1.Disposable.create(() => {
            childProcess.removeListener('error', this.ipcErrorListener);
            this.messagePipe.dispose();
        }));
    }
    setupProcess() {
        process.once('beforeExit', code => this.onCloseEmitter.fire({ reason: 'Process is about to be terminated', code }));
        this.messagePipe = new binary_message_pipe_1.BinaryMessagePipe(new net_1.Socket({ fd: 4 }));
        process.on('uncaughtException', this.ipcErrorListener);
        this.toDispose.push(common_1.Disposable.create(() => {
            process.removeListener('uncaughtException', this.ipcErrorListener);
            this.messagePipe.dispose();
        }));
    }
    getWriteBuffer() {
        const result = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
        result.onCommit(buffer => {
            this.messagePipe.send(buffer);
        });
        return result;
    }
}
exports.IPCChannel = IPCChannel;
//# sourceMappingURL=ipc-channel.js.map