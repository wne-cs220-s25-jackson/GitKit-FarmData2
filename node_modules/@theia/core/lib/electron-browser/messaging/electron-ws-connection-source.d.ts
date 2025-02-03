import { FrontendApplicationContribution } from '../../browser/frontend-application-contribution';
import { WebSocketConnectionSource } from '../../browser/messaging/ws-connection-source';
/**
 * Customized connection provider between the frontend and the backend in electron environment.
 * This customized connection provider makes sure the websocket connection does not try to reconnect
 * once the electron-browser window is refreshed. Otherwise, backend resources are not disposed.
 */
export declare class ElectronWebSocketConnectionSource extends WebSocketConnectionSource implements FrontendApplicationContribution {
    constructor();
    onStop(): void;
}
//# sourceMappingURL=electron-ws-connection-source.d.ts.map