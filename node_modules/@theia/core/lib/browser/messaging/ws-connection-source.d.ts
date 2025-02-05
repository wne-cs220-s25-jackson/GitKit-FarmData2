import { AbstractChannel, Channel, Emitter, Event } from '../../common';
import { ConnectionSource } from './connection-source';
import { Socket } from 'socket.io-client';
import { Endpoint } from '../endpoint';
import { FrontendIdProvider } from './frontend-id-provider';
export declare class WebSocketConnectionSource implements ConnectionSource {
    static readonly NO_CONNECTION = "<none>";
    protected readonly frontendIdProvider: FrontendIdProvider;
    private readonly writeBuffer;
    private _socket;
    get socket(): Socket;
    protected currentChannel: AbstractChannel;
    protected readonly onConnectionDidOpenEmitter: Emitter<Channel>;
    get onConnectionDidOpen(): Event<Channel>;
    protected readonly onSocketDidOpenEmitter: Emitter<void>;
    get onSocketDidOpen(): Event<void>;
    protected readonly onSocketDidCloseEmitter: Emitter<void>;
    get onSocketDidClose(): Event<void>;
    protected readonly onIncomingMessageActivityEmitter: Emitter<void>;
    get onIncomingMessageActivity(): Event<void>;
    constructor();
    openSocket(): void;
    protected negogiateReconnect(): void;
    protected negotiateInitialConnect(): void;
    protected handleSocketConnected(): void;
    connectNewChannel(): void;
    protected createChannel(): AbstractChannel;
    /**
     * @param path The handler to reach in the backend.
     */
    protected createWebSocketUrl(path: string): string;
    protected createHttpWebSocketUrl(path: string): string;
    protected createEndpoint(path: string): Endpoint;
    /**
     * Creates a web socket for the given url
     */
    protected createWebSocket(url: string): Socket;
    /**
     * Path for Socket.io to make its requests to.
     */
    protected createSocketIoPath(url: string): string | undefined;
}
//# sourceMappingURL=ws-connection-source.d.ts.map