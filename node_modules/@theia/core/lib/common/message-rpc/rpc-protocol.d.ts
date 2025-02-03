import { CancellationTokenSource } from '../cancellation';
import { DisposableWrapper, DisposableCollection } from '../disposable';
import { Emitter, Event } from '../event';
import { Deferred } from '../promise-util';
import { Channel } from './channel';
import { RpcMessage, RpcMessageDecoder, RpcMessageEncoder } from './rpc-message-encoder';
/**
 * Handles request messages received by the {@link RPCProtocol}.
 */
export type RequestHandler = (method: string, args: any[]) => Promise<any>;
/**
 * Initialization options for a {@link RpcProtocol}.
 */
export interface RpcProtocolOptions {
    /**
     * The message encoder that should be used. If `undefined` the default {@link RpcMessageEncoder} will be used.
     */
    encoder?: RpcMessageEncoder;
    /**
     * The message decoder that should be used. If `undefined` the default {@link RpcMessageDecoder} will be used.
     */
    decoder?: RpcMessageDecoder;
    /**
     * The runtime mode determines whether the RPC protocol is bi-directional (default) or acts as a client or server only.
     */
    mode?: 'default' | 'clientOnly' | 'serverOnly';
}
/**
 * Establish a RPC protocol on top of a given channel. By default the rpc protocol is bi-directional, meaning it is possible to send
 * requests and notifications to the remote side (i.e. acts as client) as well as receiving requests and notifications from the remote side (i.e. acts as a server).
 * Clients can get a promise for a remote request result that will be either resolved or
 * rejected depending on the success of the request. Keeps track of outstanding requests and matches replies to the appropriate request
 * Currently, there is no timeout handling for long running requests implemented.
 * The bi-directional mode can be reconfigured using the {@link RpcProtocolOptions} to construct an RPC protocol instance that acts only as client or server instead.
 */
export declare class RpcProtocol {
    readonly channel: Channel;
    readonly requestHandler: RequestHandler | undefined;
    static readonly CANCELLATION_TOKEN_KEY = "add.cancellation.token";
    protected readonly pendingRequests: Map<number, Deferred<any>>;
    protected readonly pendingRequestCancellationEventListeners: Map<number, DisposableWrapper>;
    protected nextMessageId: number;
    protected readonly encoder: RpcMessageEncoder;
    protected readonly decoder: RpcMessageDecoder;
    protected readonly mode: 'default' | 'clientOnly' | 'serverOnly';
    protected readonly onNotificationEmitter: Emitter<{
        method: string;
        args: any[];
    }>;
    protected readonly cancellationTokenSources: Map<number, CancellationTokenSource>;
    get onNotification(): Event<{
        method: string;
        args: any[];
    }>;
    protected toDispose: DisposableCollection;
    constructor(channel: Channel, requestHandler: RequestHandler | undefined, options?: RpcProtocolOptions);
    handleMessage(message: RpcMessage): void;
    protected handleReply(id: number, value: any): void;
    protected handleReplyErr(id: number, error: any): void;
    protected disposeCancellationEventListener(id: number): void;
    sendRequest<T>(method: string, args: any[]): Promise<T>;
    sendNotification(method: string, args: any[]): void;
    sendCancel(requestId: number): void;
    protected handleCancel(id: number): void;
    protected handleRequest(id: number, method: string, args: any[]): Promise<void>;
    protected handleNotify(method: string, args: any[], id?: number): Promise<void>;
}
//# sourceMappingURL=rpc-protocol.d.ts.map