"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.BufferBufferingStream = exports.StringBufferingStream = exports.BufferingStream = void 0;
const event_1 = require("@theia/core/lib/common/event");
/**
 * This component will buffer whatever is pushed to it and emit chunks back
 * every {@link BufferingStreamOptions.emitInterval}. It will also ensure that
 * the emitted chunks never exceed {@link BufferingStreamOptions.maxChunkSize}.
 */
class BufferingStream {
    constructor(options = {}, concat, slice, length) {
        var _a, _b;
        this.onDataEmitter = new event_1.Emitter();
        this.emitInterval = (_a = options.emitInterval) !== null && _a !== void 0 ? _a : 16; // ms
        this.maxChunkSize = (_b = options.maxChunkSize) !== null && _b !== void 0 ? _b : (256 * 1024); // bytes
        this.concat = concat;
        this.slice = slice;
        this.length = length;
    }
    get onData() {
        return this.onDataEmitter.event;
    }
    push(chunk) {
        if (this.buffer) {
            this.buffer = this.concat(this.buffer, chunk);
        }
        else {
            this.buffer = chunk;
            this.timeout = setTimeout(() => this.emitBufferedChunk(), this.emitInterval);
        }
    }
    dispose() {
        clearTimeout(this.timeout);
        this.buffer = undefined;
        this.onDataEmitter.dispose();
    }
    emitBufferedChunk() {
        this.onDataEmitter.fire(this.slice(this.buffer, 0, this.maxChunkSize));
        if (this.length(this.buffer) <= this.maxChunkSize) {
            this.buffer = undefined;
        }
        else {
            this.buffer = this.slice(this.buffer, this.maxChunkSize);
            this.timeout = setTimeout(() => this.emitBufferedChunk(), this.emitInterval);
        }
    }
}
exports.BufferingStream = BufferingStream;
class StringBufferingStream extends BufferingStream {
    constructor(options = {}) {
        super(options, (left, right) => left.concat(right), (what, start, end) => what.slice(start, end), what => what.length);
    }
}
exports.StringBufferingStream = StringBufferingStream;
class BufferBufferingStream extends BufferingStream {
    constructor(options = {}) {
        super(options, (left, right) => Buffer.concat([left, right]), (what, start, end) => what.slice(start, end), what => what.length);
    }
}
exports.BufferBufferingStream = BufferBufferingStream;
//# sourceMappingURL=buffering-stream.js.map