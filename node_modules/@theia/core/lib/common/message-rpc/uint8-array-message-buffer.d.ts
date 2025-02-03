import { Disposable } from '../disposable';
import { Event } from '../event';
import { ReadBuffer, WriteBuffer } from './message-buffer';
/**
 * The default {@link WriteBuffer} implementation. Uses a {@link Uint8Array} for buffering.
 * The {@link Uint8ArrayWriteBuffer.onCommit} hook can be used to rect to on-commit events.
 * After the {@link Uint8ArrayWriteBuffer.commit} method has been called the buffer is disposed
 * and can no longer be used for writing data. If the writer buffer is no longer needed but the message
 * has not been committed yet it has to be disposed manually.
 */
export declare class Uint8ArrayWriteBuffer implements WriteBuffer, Disposable {
    private buffer;
    private encoder;
    private msg;
    private isDisposed;
    private offset;
    constructor(buffer?: Uint8Array, writePosition?: number);
    ensureCapacity(value: number): this;
    writeLength(length: number): this;
    writeNumber(value: number): this;
    writeUint8(value: number): this;
    writeRaw(bytes: Uint8Array): this;
    writeUint16(value: number): this;
    writeUint32(value: number): this;
    writeString(value: string): this;
    writeBytes(value: Uint8Array): this;
    private onCommitEmitter;
    get onCommit(): Event<Uint8Array>;
    commit(): void;
    getCurrentContents(): Uint8Array;
    dispose(): void;
}
/**
 * The default {@link ReadBuffer} implementation. Uses a {@link Uint8Array} for buffering.
 * Is for single message read. A message can only be read once.
 */
export declare class Uint8ArrayReadBuffer implements ReadBuffer {
    private readonly buffer;
    private offset;
    private msg;
    private decoder;
    constructor(buffer: Uint8Array, readPosition?: number);
    readUint8(): number;
    readUint16(): number;
    readUint32(): number;
    readLength(): number;
    readNumber(): number;
    readString(): string;
    private decodeString;
    readBytes(): Uint8Array;
    sliceAtReadPosition(): ReadBuffer;
}
//# sourceMappingURL=uint8-array-message-buffer.d.ts.map