import { interfaces } from 'inversify';
import { Channel, RpcProxy, RpcProxyFactory } from '../../common';
import { ChannelMultiplexer } from '../../common/message-rpc/channel';
import { ConnectionSource } from './connection-source';
/**
 * Service id for the local connection provider
 */
export declare const LocalConnectionProvider: unique symbol;
/**
 * Service id for the remote connection provider
 */
export declare const RemoteConnectionProvider: unique symbol;
export declare namespace ServiceConnectionProvider {
    type ConnectionHandler = (path: String, channel: Channel) => void;
}
/**
 * This class manages the channels for remote services in the back end.
 *
 * Since we have the ability to use a remote back end via SSH, we need to distinguish
 * between two types of services: those that will be redirected to the remote back end
 * and those which must remain in the local back end. For example the service that manages
 * the remote ssh connections and port forwarding to the remote instance must remain local
 * while e.g. the file system service will run in the remote back end. For each set
 * of services, we will bind an instance of this class to {@linkcode LocalConnectionProvider}
 * and {@linkcode RemoteConnectionProvider} respectively.
 */
export declare class ServiceConnectionProvider {
    static createProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): RpcProxy<T>;
    static createLocalProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): RpcProxy<T>;
    static createHandler(container: interfaces.Container, path: string, arg?: object): void;
    protected readonly channelHandlers: Map<string, ServiceConnectionProvider.ConnectionHandler>;
    /**
     * Create a proxy object to remote interface of T type
     * over a web socket connection for the given path and proxy factory.
     */
    createProxy<T extends object>(path: string, factory: RpcProxyFactory<T>): RpcProxy<T>;
    /**
     * Create a proxy object to remote interface of T type
     * over a web socket connection for the given path.
     *
     * An optional target can be provided to handle
     * notifications and requests from a remote side.
     */
    createProxy<T extends object>(path: string, target?: object): RpcProxy<T>;
    protected channelMultiplexer: ChannelMultiplexer;
    private channelReadyDeferred;
    protected get channelReady(): Promise<void>;
    init(): void;
    protected connectionSource: ConnectionSource;
    /**
     * This method must be invoked by subclasses when they have created the main channel.
     * @param mainChannel
     */
    protected handleChannelCreated(channel: Channel): void;
    handleChannelClosed(channel: Channel): void;
    /**
     * Install a connection handler for the given path.
     */
    listen(path: string, handler: ServiceConnectionProvider.ConnectionHandler, reconnect: boolean): void;
    private openChannel;
}
//# sourceMappingURL=service-connection-provider.d.ts.map