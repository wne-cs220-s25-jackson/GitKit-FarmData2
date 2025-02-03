/// <reference types="node" />
import { Duplex } from 'stream';
import { Disposable, Emitter, Event } from '../../common';
/**
 * A `BinaryMessagePipe` is capable of sending and retrieving binary messages i.e. {@link Uint8Array}s over
 * and underlying streamed process pipe/fd. The message length of individual messages is encoding at the beginning of
 * a new message. This makes it possible to extract messages from the streamed data.
 */
export declare class BinaryMessagePipe implements Disposable {
    protected readonly underlyingPipe: Duplex;
    static readonly MESSAGE_START_IDENTIFIER = "<MessageStart>";
    protected dataHandler: (chunk: Uint8Array) => void;
    protected onMessageEmitter: Emitter<Uint8Array>;
    protected cachedMessageData: StreamedMessageData;
    get onMessage(): Event<Uint8Array>;
    constructor(underlyingPipe: Duplex);
    send(message: Uint8Array): void;
    protected handleChunk(chunk: Uint8Array): void;
    protected handleNewMessage(chunk: Uint8Array): void;
    protected handleMessageContentChunk(chunk: Uint8Array): void;
    protected emitCachedMessage(): void;
    /**
     * Encodes the start of a new message into a {@link Uint8Array}.
     * The message start consists of a identifier string and the length of the following message.
     * @returns the buffer contains the encoded message start
     */
    protected encodeMessageStart(message: Uint8Array): Uint8Array;
    protected get messageStartByteLength(): number;
    /**
     * Reads the start of a new message from a stream chunk (or cached message) received from the underlying pipe.
     * The message start is expected to consist of an identifier string and the length of the message.
     * @param chunk The stream chunk.
     * @returns The length of the message content to read.
     * @throws An error if the message start can not be read successfully.
     */
    protected readMessageStart(chunk: Uint8Array): number;
    dispose(): void;
}
interface StreamedMessageData {
    chunks: Uint8Array[];
    missingBytes: number;
    partialMessageStart?: Uint8Array;
}
export {};
//# sourceMappingURL=binary-message-pipe.d.ts.map