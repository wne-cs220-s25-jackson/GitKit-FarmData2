import * as streams from './stream';
export declare class BinaryBuffer {
    static alloc(byteLength: number): BinaryBuffer;
    static wrap(actual: Uint8Array): BinaryBuffer;
    static fromString(source: string): BinaryBuffer;
    static concat(buffers: BinaryBuffer[], totalLength?: number): BinaryBuffer;
    readonly buffer: Uint8Array;
    readonly byteLength: number;
    private constructor();
    toString(): string;
    slice(start?: number, end?: number): BinaryBuffer;
    set(array: BinaryBuffer, offset?: number): void;
    set(array: Uint8Array, offset?: number): void;
    readUInt32BE(offset: number): number;
    writeUInt32BE(value: number, offset: number): void;
    readUInt32LE(offset: number): number;
    writeUInt32LE(value: number, offset: number): void;
    readUInt8(offset: number): number;
    writeUInt8(value: number, offset: number): void;
}
export interface BinaryBufferReadable extends streams.Readable<BinaryBuffer> {
}
export declare namespace BinaryBufferReadable {
    function toBuffer(readable: BinaryBufferReadable): BinaryBuffer;
    function fromBuffer(buffer: BinaryBuffer): BinaryBufferReadable;
    function fromReadable(readable: streams.Readable<string>): BinaryBufferReadable;
}
export interface BinaryBufferReadableStream extends streams.ReadableStream<BinaryBuffer> {
}
export declare namespace BinaryBufferReadableStream {
    function toBuffer(stream: BinaryBufferReadableStream): Promise<BinaryBuffer>;
    function fromBuffer(buffer: BinaryBuffer): BinaryBufferReadableStream;
}
export interface BinaryBufferReadableBufferedStream extends streams.ReadableBufferedStream<BinaryBuffer> {
}
export declare namespace BinaryBufferReadableBufferedStream {
    function toBuffer(bufferedStream: streams.ReadableBufferedStream<BinaryBuffer>): Promise<BinaryBuffer>;
}
export interface BinaryBufferWriteableStream extends streams.WriteableStream<BinaryBuffer> {
}
export declare namespace BinaryBufferWriteableStream {
    function create(options?: streams.WriteableStreamOptions): BinaryBufferWriteableStream;
}
//# sourceMappingURL=buffer.d.ts.map