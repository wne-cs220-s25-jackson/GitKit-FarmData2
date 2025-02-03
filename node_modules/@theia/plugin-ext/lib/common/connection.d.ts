import { DebugChannel } from '@theia/debug/lib/common/debug-service';
import { ConnectionExt, ConnectionMain } from './plugin-api-rpc';
/**
 * A channel communicating with a counterpart in a plugin host.
 */
export declare class PluginChannel implements DebugChannel {
    protected readonly id: string;
    protected readonly connection: ConnectionExt | ConnectionMain;
    private messageEmitter;
    private errorEmitter;
    private closedEmitter;
    constructor(id: string, connection: ConnectionExt | ConnectionMain);
    send(content: string): void;
    fireMessageReceived(msg: string): void;
    fireError(error: unknown): void;
    fireClosed(): void;
    onMessage(cb: (message: string) => void): void;
    onError(cb: (reason: any) => void): void;
    onClose(cb: (code: number, reason: string) => void): void;
    close(): void;
}
export declare class ConnectionImpl implements ConnectionMain, ConnectionExt {
    private readonly proxy;
    private readonly connections;
    constructor(proxy: ConnectionMain | ConnectionExt);
    /**
     * Gets the connection between plugin by id and sends string message to it.
     *
     * @param id connection's id
     * @param message incoming message
     */
    $sendMessage(id: string, message: string): Promise<void>;
    /**
     * Instantiates a new connection by the given id.
     * @param id the connection id
     */
    $createConnection(id: string): Promise<void>;
    /**
     * Deletes a connection.
     * @param id the connection id
     */
    $deleteConnection(id: string): Promise<void>;
    /**
     * Returns existed connection or creates a new one.
     * @param id the connection id
     */
    ensureConnection(id: string): Promise<PluginChannel>;
    /**
     * Returns existed connection or creates a new one.
     * @param id the connection id
     */
    doEnsureConnection(id: string): Promise<PluginChannel>;
    protected doCreateConnection(id: string): Promise<PluginChannel>;
}
//# sourceMappingURL=connection.d.ts.map