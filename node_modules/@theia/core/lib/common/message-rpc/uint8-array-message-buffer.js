"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint8ArrayReadBuffer = exports.Uint8ArrayWriteBuffer = void 0;
const event_1 = require("../event");
/**
 * The default {@link WriteBuffer} implementation. Uses a {@link Uint8Array} for buffering.
 * The {@link Uint8ArrayWriteBuffer.onCommit} hook can be used to rect to on-commit events.
 * After the {@link Uint8ArrayWriteBuffer.commit} method has been called the buffer is disposed
 * and can no longer be used for writing data. If the writer buffer is no longer needed but the message
 * has not been committed yet it has to be disposed manually.
 */
class Uint8ArrayWriteBuffer {
    constructor(buffer = new Uint8Array(1024), writePosition = 0) {
        this.buffer = buffer;
        this.encoder = new TextEncoder();
        this.isDisposed = false;
        this.onCommitEmitter = new event_1.Emitter();
        this.offset = buffer.byteOffset + writePosition;
        this.msg = new DataView(buffer.buffer);
    }
    ensureCapacity(value) {
        let newLength = this.buffer.byteLength;
        while (newLength < this.offset + value) {
            newLength *= 2;
        }
        if (newLength !== this.buffer.byteLength) {
            const newBuffer = new Uint8Array(newLength);
            newBuffer.set(this.buffer);
            this.buffer = newBuffer;
            this.msg = new DataView(this.buffer.buffer);
        }
        return this;
    }
    writeLength(length) {
        if (length < 0 || (length % 1) !== 0) {
            throw new Error(`Could not write the given length value. '${length}' is not an integer >= 0`);
        }
        if (length < 127) {
            this.writeUint8(length);
        }
        else {
            this.writeUint8(128 + (length & 127));
            this.writeLength(length >> 7);
        }
        return this;
    }
    writeNumber(value) {
        this.ensureCapacity(8);
        this.msg.setFloat64(this.offset, value);
        this.offset += 8;
        return this;
    }
    writeUint8(value) {
        this.ensureCapacity(1);
        this.buffer[this.offset++] = value;
        return this;
    }
    writeRaw(bytes) {
        this.ensureCapacity(bytes.byteLength);
        this.buffer.set(bytes, this.offset);
        this.offset += bytes.byteLength;
        return this;
    }
    writeUint16(value) {
        this.ensureCapacity(2);
        this.msg.setUint16(this.offset, value);
        this.offset += 2;
        return this;
    }
    writeUint32(value) {
        this.ensureCapacity(4);
        this.msg.setUint32(this.offset, value);
        this.offset += 4;
        return this;
    }
    writeString(value) {
        this.ensureCapacity(4 * value.length);
        const result = this.encoder.encodeInto(value, this.buffer.subarray(this.offset + 4));
        this.msg.setUint32(this.offset, result.written);
        this.offset += 4 + result.written;
        return this;
    }
    writeBytes(value) {
        this.writeLength(value.byteLength);
        this.ensureCapacity(value.length);
        this.buffer.set(value, this.offset);
        this.offset += value.length;
        return this;
    }
    get onCommit() {
        return this.onCommitEmitter.event;
    }
    commit() {
        if (this.isDisposed) {
            throw new Error("Could not invoke 'commit'. The WriteBuffer is already disposed.");
        }
        this.onCommitEmitter.fire(this.getCurrentContents());
        this.dispose();
    }
    getCurrentContents() {
        return this.buffer.slice(this.buffer.byteOffset, this.offset);
    }
    dispose() {
        if (!this.isDisposed) {
            this.onCommitEmitter.dispose();
            this.isDisposed = true;
        }
    }
}
exports.Uint8ArrayWriteBuffer = Uint8ArrayWriteBuffer;
/**
 * The default {@link ReadBuffer} implementation. Uses a {@link Uint8Array} for buffering.
 * Is for single message read. A message can only be read once.
 */
class Uint8ArrayReadBuffer {
    constructor(buffer, readPosition = 0) {
        this.buffer = buffer;
        this.offset = 0;
        this.decoder = new TextDecoder();
        this.offset = buffer.byteOffset + readPosition;
        this.msg = new DataView(buffer.buffer);
    }
    readUint8() {
        return this.msg.getUint8(this.offset++);
    }
    readUint16() {
        const result = this.msg.getUint16(this.offset);
        this.offset += 2;
        return result;
    }
    readUint32() {
        const result = this.msg.getUint32(this.offset);
        this.offset += 4;
        return result;
    }
    readLength() {
        let shift = 0;
        let byte = this.readUint8();
        let value = (byte & 127) << shift;
        while (byte > 127) {
            shift += 7;
            byte = this.readUint8();
            value = value + ((byte & 127) << shift);
        }
        return value;
    }
    readNumber() {
        const result = this.msg.getFloat64(this.offset);
        this.offset += 8;
        return result;
    }
    readString() {
        const len = this.readUint32();
        const sliceOffset = this.offset - this.buffer.byteOffset;
        const result = this.decodeString(this.buffer.slice(sliceOffset, sliceOffset + len));
        this.offset += len;
        return result;
    }
    decodeString(buf) {
        return this.decoder.decode(buf);
    }
    readBytes() {
        const length = this.readLength();
        const sliceOffset = this.offset - this.buffer.byteOffset;
        const result = this.buffer.slice(sliceOffset, sliceOffset + length);
        this.offset += length;
        return result;
    }
    sliceAtReadPosition() {
        const sliceOffset = this.offset - this.buffer.byteOffset;
        return new Uint8ArrayReadBuffer(this.buffer, sliceOffset);
    }
}
exports.Uint8ArrayReadBuffer = Uint8ArrayReadBuffer;
//# sourceMappingURL=uint8-array-message-buffer.js.map