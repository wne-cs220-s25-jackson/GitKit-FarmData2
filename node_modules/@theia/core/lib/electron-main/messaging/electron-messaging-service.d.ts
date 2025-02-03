import { Channel } from '../../common/message-rpc/channel';
export interface ElectronMessagingService {
    /**
     * Accept an ipc channel on the given path.
     * A path supports the route syntax: https://github.com/rcs/route-parser#what-can-i-use-in-my-routes.
     */
    ipcChannel(path: string, callback: (params: ElectronMessagingService.PathParams, socket: Channel) => void): void;
}
export declare namespace ElectronMessagingService {
    interface PathParams {
        [name: string]: string;
    }
    const Contribution: unique symbol;
    interface Contribution {
        configure(service: ElectronMessagingService): void;
    }
}
//# sourceMappingURL=electron-messaging-service.d.ts.map