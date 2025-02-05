import { Channel } from '../../common/message-rpc/';
import { MessagingService } from './messaging-service';
export declare const FrontendConnectionService: unique symbol;
export interface FrontendConnectionService {
    registerConnectionHandler(path: string, callback: (params: MessagingService.PathParams, mainChannel: Channel) => void): void;
}
//# sourceMappingURL=frontend-connection-service.d.ts.map