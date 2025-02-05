/**
 * A buffer maintaining a write position capable of writing primitive values
 */
export interface WriteBuffer {
    writeUint8(byte: number): this;
    writeUint16(value: number): this;
    writeUint32(value: number): this;
    writeString(value: string): this;
    writeBytes(value: Uint8Array): this;
    writeNumber(value: number): this;
    writeLength(value: number): this;
    writeRaw(bytes: Uint8Array): this;
    /**
     * Makes any writes to the buffer permanent, for example by sending the writes over a channel.
     * You must obtain a new write buffer after committing
     */
    commit(): void;
}
export declare class ForwardingWriteBuffer implements WriteBuffer {
    protected readonly underlying: WriteBuffer;
    constructor(underlying: WriteBuffer);
    writeUint8(byte: number): this;
    writeUint16(value: number): this;
    writeUint32(value: number): this;
    writeLength(value: number): this;
    writeString(value: string): this;
    writeBytes(value: Uint8Array): this;
    writeNumber(value: number): this;
    writeRaw(bytes: Uint8Array): this;
    commit(): void;
}
/**
 * A buffer maintaining a read position in a buffer containing a received message capable of
 * reading primitive values.
 */
export interface ReadBuffer {
    readUint8(): number;
    readUint16(): number;
    readUint32(): number;
    readString(): string;
    readNumber(): number;
    readLength(): number;
    readBytes(): Uint8Array;
    /**
     * Returns a new read buffer  whose starting read position is the current read position of this buffer.
     * This is useful to create read buffers sub messages.
     * (e.g. when using a multiplexer the beginning of the message might contain some protocol overhead which should not be part
     * of the message reader that is sent to the target channel)
     */
    sliceAtReadPosition(): ReadBuffer;
}
//# sourceMappingURL=message-buffer.d.ts.map