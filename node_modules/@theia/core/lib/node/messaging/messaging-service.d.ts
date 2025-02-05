import { Channel } from '../../common/message-rpc/channel';
export interface MessagingService {
    /**
     * Accept a web socket channel on the given path.
     * A path supports the route syntax: https://github.com/rcs/route-parser#what-can-i-use-in-my-routes.
     */
    registerChannelHandler(path: string, handler: (params: MessagingService.PathParams, channel: Channel) => void): void;
    /**
     * Accept a web socket connection on the given path.
     * A path supports the route syntax: https://github.com/rcs/route-parser#what-can-i-use-in-my-routes.
     *
     * #### Important
     * Prefer using web socket channels over establishing new web socket connection. Clients can handle only limited amount of web sockets
     * and excessive amount can cause performance degradation. All web socket channels share a single web socket connection.
     */
    registerConnectionHandler(path: string, callback: (params: MessagingService.PathParams, mainChannel: Channel) => void): void;
}
export declare namespace MessagingService {
    /** Inversify container identifier for the `MessagingService` component. */
    const Identifier: unique symbol;
    interface PathParams {
        [name: string]: string;
    }
    const Contribution: unique symbol;
    interface Contribution {
        configure(service: MessagingService): void;
    }
}
//# sourceMappingURL=messaging-service.d.ts.map