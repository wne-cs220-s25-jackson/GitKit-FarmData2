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
exports.SocketWriteBuffer = void 0;
class SocketWriteBuffer {
    constructor() {
        this.bufferWritePosition = 0;
    }
    buffer(data) {
        var _a;
        this.ensureWriteBuffer(data.byteLength);
        (_a = this.disconnectedBuffer) === null || _a === void 0 ? void 0 : _a.set(data, this.bufferWritePosition);
        this.bufferWritePosition += data.byteLength;
    }
    ensureWriteBuffer(byteLength) {
        if (!this.disconnectedBuffer) {
            this.disconnectedBuffer = new Uint8Array(SocketWriteBuffer.DISCONNECTED_BUFFER_SIZE);
            this.bufferWritePosition = 0;
        }
        if (this.bufferWritePosition + byteLength > this.disconnectedBuffer.byteLength) {
            throw new Error(`Max disconnected buffer size exceeded by adding ${byteLength} bytes`);
        }
    }
    flush(socket) {
        if (this.disconnectedBuffer) {
            socket.send(this.disconnectedBuffer.slice(0, this.bufferWritePosition));
            this.disconnectedBuffer = undefined;
        }
    }
    drain() {
        this.disconnectedBuffer = undefined;
    }
}
exports.SocketWriteBuffer = SocketWriteBuffer;
SocketWriteBuffer.DISCONNECTED_BUFFER_SIZE = 100 * 1024;
//# sourceMappingURL=socket-write-buffer.js.map