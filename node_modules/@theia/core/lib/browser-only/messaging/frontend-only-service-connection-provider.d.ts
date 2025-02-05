import { Event, RpcProxy, Channel } from '../../common';
import { ServiceConnectionProvider } from '../../browser/messaging/service-connection-provider';
import { ConnectionSource } from '../../browser/messaging/connection-source';
export declare class FrontendOnlyConnectionSource implements ConnectionSource {
    onConnectionDidOpen: Event<Channel>;
}
export declare class FrontendOnlyServiceConnectionProvider extends ServiceConnectionProvider {
    onSocketDidOpen: Event<any>;
    onSocketDidClose: Event<any>;
    onIncomingMessageActivity: Event<any>;
    createProxy<T extends object>(path: unknown, target?: unknown): RpcProxy<T>;
    listen(path: string, handler: ServiceConnectionProvider.ConnectionHandler, reconnect: boolean): void;
}
//# sourceMappingURL=frontend-only-service-connection-provider.d.ts.map