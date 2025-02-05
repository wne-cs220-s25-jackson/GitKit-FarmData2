import { WriteBuffer } from '../message-rpc';
import { AbstractChannel } from '../message-rpc/channel';
import { Socket as ClientSocket } from 'socket.io-client';
import { Socket as ServerSocket } from 'socket.io';
export type WebSocket = ClientSocket | ServerSocket;
/**
 * A channel that manages the main websocket connection between frontend and backend. All service channels
 * are reusing this main channel. (multiplexing). An {@link IWebSocket} abstraction is used to keep the implementation
 * independent of the actual websocket implementation and its execution context (backend vs. frontend).
 */
export declare class WebSocketChannel extends AbstractChannel {
    protected readonly socket: WebSocket;
    static wsPath: string;
    private onDidConnectEmitter;
    onDidConnect: import("vscode-languageserver-protocol").Event<void>;
    constructor(socket: WebSocket);
    getWriteBuffer(): WriteBuffer;
    close(): void;
}
//# sourceMappingURL=web-socket-channel.d.ts.map