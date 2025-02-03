/// <reference types="node" />
import { ContributionProvider, MaybePromise } from '../../common';
import { Socket } from 'socket.io';
import * as http from 'http';
/**
 * Bind components to this symbol to subscribe to WebSocket events.
 */
export declare const MessagingListenerContribution: unique symbol;
export interface MessagingListenerContribution {
    /**
     * Function invoked when a HTTP connection is upgraded to a websocket.
     *
     * @param request The HTTP connection upgrade request received by the server.
     * @param socket The WebSocket that the connection was upgraded to.
     */
    onDidWebSocketUpgrade(request: http.IncomingMessage, socket: Socket): MaybePromise<void>;
}
/**
 * Handler of Theia messaging system events, dispatching to MessagingListenerContribution instances.
 */
export declare class MessagingListener {
    protected readonly messagingListenerContributions: ContributionProvider<MessagingListenerContribution>;
    /**
     * Notify all the subscribed `MessagingListenerContribution`s that the Websocket was upgraded.
     */
    onDidWebSocketUpgrade(request: http.IncomingMessage, socket: Socket): Promise<void>;
}
//# sourceMappingURL=messaging-listeners.d.ts.map