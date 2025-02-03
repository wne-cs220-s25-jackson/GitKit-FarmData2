import { Channel, Event } from '../../common';
export declare const ConnectionSource: unique symbol;
/**
 * A ConnectionSource creates a Channel. The channel is valid until it sends a close event.
 */
export interface ConnectionSource {
    onConnectionDidOpen: Event<Channel>;
}
//# sourceMappingURL=connection-source.d.ts.map