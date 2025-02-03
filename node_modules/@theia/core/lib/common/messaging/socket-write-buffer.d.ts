import { WebSocket } from './web-socket-channel';
export declare class SocketWriteBuffer {
    private static DISCONNECTED_BUFFER_SIZE;
    private disconnectedBuffer;
    private bufferWritePosition;
    buffer(data: Uint8Array): void;
    protected ensureWriteBuffer(byteLength: number): void;
    flush(socket: WebSocket): void;
    drain(): void;
}
//# sourceMappingURL=socket-write-buffer.d.ts.map