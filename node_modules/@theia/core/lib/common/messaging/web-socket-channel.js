"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
exports.WebSocketChannel = void 0;
const uint8_array_message_buffer_1 = require("../message-rpc/uint8-array-message-buffer");
const channel_1 = require("../message-rpc/channel");
const vscode_languageserver_protocol_1 = require("vscode-languageserver-protocol");
/**
 * A channel that manages the main websocket connection between frontend and backend. All service channels
 * are reusing this main channel. (multiplexing). An {@link IWebSocket} abstraction is used to keep the implementation
 * independent of the actual websocket implementation and its execution context (backend vs. frontend).
 */
class WebSocketChannel extends channel_1.AbstractChannel {
    constructor(socket) {
        super();
        this.socket = socket;
        this.onDidConnectEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onDidConnect = this.onDidConnectEmitter.event;
        socket.on('connect', () => {
            this.onDidConnectEmitter.fire();
        });
        socket.on('disconnect', reason => {
            this.onCloseEmitter.fire({
                reason: reason
            });
        });
        socket.on('error', reason => this.onErrorEmitter.fire(reason));
        socket.on('message', data => {
            // In the browser context socketIO receives binary messages as ArrayBuffers.
            // So we have to convert them to a Uint8Array before delegating the message to the read buffer.
            const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
            this.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(buffer));
        });
    }
    getWriteBuffer() {
        const result = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
        result.onCommit(buffer => {
            if (this.socket.connected) {
                this.socket.send(buffer);
            }
        });
        return result;
    }
    close() {
        this.socket.disconnect();
        super.close();
    }
}
exports.WebSocketChannel = WebSocketChannel;
WebSocketChannel.wsPath = '/services';
//# sourceMappingURL=web-socket-channel.js.map