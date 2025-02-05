import { interfaces, Container } from 'inversify';
import { ContributionProvider } from '../../common';
import { MessagingService } from './messaging-service';
import { Channel } from '../../common/message-rpc/channel';
import { FrontendConnectionService } from './frontend-connection-service';
import { BackendApplicationContribution } from '../backend-application';
export declare const MessagingContainer: unique symbol;
export declare const MainChannel: unique symbol;
export declare class DefaultMessagingService implements MessagingService, BackendApplicationContribution {
    protected readonly container: interfaces.Container;
    protected readonly frontendConnectionService: FrontendConnectionService;
    protected readonly connectionModules: ContributionProvider<interfaces.ContainerModule>;
    protected readonly contributions: ContributionProvider<MessagingService.Contribution>;
    protected readonly channelHandlers: ConnectionHandlers<Channel>;
    initialize(): void;
    registerConnectionHandler(path: string, callback: (params: MessagingService.PathParams, mainChannel: Channel) => void): void;
    registerChannelHandler(spec: string, callback: (params: MessagingService.PathParams, channel: Channel) => void): void;
    protected handleConnection(channel: Channel): void;
    protected createMainChannelContainer(socket: Channel): Container;
    protected getConnectionChannelHandlers(socket: Channel): ConnectionHandlers<Channel>;
}
export declare class ConnectionHandlers<T> {
    protected readonly parent?: ConnectionHandlers<T> | undefined;
    protected readonly handlers: ((path: string, connection: T) => string | false)[];
    constructor(parent?: ConnectionHandlers<T> | undefined);
    push(spec: string, callback: (params: MessagingService.PathParams, connection: T) => void): void;
    route(path: string, connection: T): string | false;
}
//# sourceMappingURL=default-messaging-service.d.ts.map