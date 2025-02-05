"use strict";
// *****************************************************************************
// Copyright (C) 2021 Red Hat, Inc. and others.
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
exports.ForwardingWriteBuffer = void 0;
class ForwardingWriteBuffer {
    constructor(underlying) {
        this.underlying = underlying;
    }
    writeUint8(byte) {
        this.underlying.writeUint8(byte);
        return this;
    }
    writeUint16(value) {
        this.underlying.writeUint16(value);
        return this;
    }
    writeUint32(value) {
        this.underlying.writeUint32(value);
        return this;
    }
    writeLength(value) {
        this.underlying.writeLength(value);
        return this;
    }
    writeString(value) {
        this.underlying.writeString(value);
        return this;
    }
    writeBytes(value) {
        this.underlying.writeBytes(value);
        return this;
    }
    writeNumber(value) {
        this.underlying.writeNumber(value);
        return this;
    }
    writeRaw(bytes) {
        this.underlying.writeRaw(bytes);
        return this;
    }
    commit() {
        this.underlying.commit();
    }
}
exports.ForwardingWriteBuffer = ForwardingWriteBuffer;
//# sourceMappingURL=message-buffer.js.map