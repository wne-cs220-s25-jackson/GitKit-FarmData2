export declare const ConnectionCloseService: unique symbol;
export declare const connectionCloseServicePath = "/services/ChannelCloseService";
/**
 * These messages are used to negotiate service reconnection between a front ends and back end.
 * Whenever a front end first connects to a back end, it sends the ${@link ConnectionManagementMessages#INITIAL_CONNECT} message
 * together with its front end id.
 * The back end then starts a new front end connection context for that front end. If the back end already had another connection context
 * for the given front end id, it gets discarded.
 * If the front end reconnects after a websocket disconnect, it sends the ${@link ConnectionManagementMessages#RECONNECT} message
 * together with its front end id..
 * If the back end still has a connection context for the front end id, the context is reconnected and the back end replies with the value true.
 * If there is no context anymore, the back end replies with value false. The front end can then either do an initial connect or reload
 * the whole UI.
 */
export declare namespace ConnectionManagementMessages {
    const INITIAL_CONNECT = "initialConnection";
    const RECONNECT = "reconnect";
}
/**
 * A service to mark a front end as unused. As soon as it disconnects from the back end, the connection context will be discarded.
 */
export interface ConnectionCloseService {
    markForClose(frontEndId: string): Promise<void>;
}
//# sourceMappingURL=connection-management.d.ts.map