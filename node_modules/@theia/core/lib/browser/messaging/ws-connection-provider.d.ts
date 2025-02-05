import { interfaces } from 'inversify';
import { RpcProxy } from '../../common';
/**
 * @deprecated This class serves to keep API compatibility for a while.
 * Use the {@linkcode RemoteConnectionProvider} as the injection symbol and {@linkcode ServiceConnectionProvider} as the type instead.
 */
export declare class WebSocketConnectionProvider {
    private readonly remoteConnectionProvider;
    static createProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): RpcProxy<T>;
    static createLocalProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): RpcProxy<T>;
    static createHandler(container: interfaces.Container, path: string, arg?: object): void;
    createProxy<T extends object>(path: string, target?: object): RpcProxy<T>;
}
//# sourceMappingURL=ws-connection-provider.d.ts.map