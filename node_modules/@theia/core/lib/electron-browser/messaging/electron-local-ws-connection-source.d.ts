import { Endpoint } from '../../browser/endpoint';
import { WebSocketConnectionSource } from '../../browser/messaging/ws-connection-source';
export declare function getLocalPort(): string | undefined;
export declare function getCurrentPort(): string | undefined;
export declare class ElectronLocalWebSocketConnectionSource extends WebSocketConnectionSource {
    protected createEndpoint(path: string): Endpoint;
}
//# sourceMappingURL=electron-local-ws-connection-source.d.ts.map