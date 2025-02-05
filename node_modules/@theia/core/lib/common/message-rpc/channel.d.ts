import { Disposable, DisposableCollection } from '../disposable';
import { Emitter, Event } from '../event';
import { ReadBuffer, WriteBuffer } from './message-buffer';
/**
 * A channel is a bidirectional communications channel with lifecycle and
 * error signalling. Note that creation of channels is specific to particular
 * implementations and thus not part of the protocol.
 */
export interface Channel {
    /**
     * The remote side has closed the channel
     */
    onClose: Event<ChannelCloseEvent>;
    /**
     * An error has occurred while writing to or reading from the channel
     */
    onError: Event<unknown>;
    /**
     * A message has arrived and can be read  by listeners using a {@link MessageProvider}.
     */
    onMessage: Event<MessageProvider>;
    /**
     * Obtain a {@link WriteBuffer} to write a message to the channel.
     */
    getWriteBuffer(): WriteBuffer;
    /**
     * Close this channel. No {@link onClose} event should be sent
     */
    close(): void;
}
/**
 * The event that is emitted when a channel is closed from the remote side.
 */
export interface ChannelCloseEvent {
    reason: string;
    code?: number;
}
/**
 * The `MessageProvider` is emitted when a channel receives a new message.
 * Listeners can invoke the provider to obtain a new {@link ReadBuffer} for the received message.
 * This ensures that each listener has its own isolated {@link ReadBuffer} instance.
 *
 */
export type MessageProvider = () => ReadBuffer;
/**
 *  Reusable abstract {@link Channel} implementation that sets up
 *  the basic channel event listeners and offers a generic close method.
 */
export declare abstract class AbstractChannel implements Channel {
    onCloseEmitter: Emitter<ChannelCloseEvent>;
    get onClose(): Event<ChannelCloseEvent>;
    onErrorEmitter: Emitter<unknown>;
    get onError(): Event<unknown>;
    onMessageEmitter: Emitter<MessageProvider>;
    get onMessage(): Event<MessageProvider>;
    protected toDispose: DisposableCollection;
    constructor();
    close(): void;
    abstract getWriteBuffer(): WriteBuffer;
}
/**
 * A very basic {@link AbstractChannel} implementation which takes a function
 * for retrieving the {@link WriteBuffer} as constructor argument.
 */
export declare class BasicChannel extends AbstractChannel {
    protected writeBufferProvider: () => WriteBuffer;
    constructor(writeBufferProvider: () => WriteBuffer);
    getWriteBuffer(): WriteBuffer;
}
/**
 * Helper class to implement the single channels on a {@link ChannelMultiplexer}. Simply forwards write requests to
 * the given write buffer source i.e. the main channel of the {@link ChannelMultiplexer}.
 */
export declare class ForwardingChannel extends AbstractChannel {
    readonly id: string;
    protected readonly closeHandler: () => void;
    protected readonly writeBufferSource: () => WriteBuffer;
    constructor(id: string, closeHandler: () => void, writeBufferSource: () => WriteBuffer);
    getWriteBuffer(): WriteBuffer;
    close(): void;
}
/**
 * The different message types used in the messaging protocol of the {@link ChannelMultiplexer}
 */
export declare enum MessageTypes {
    Open = 1,
    Close = 2,
    AckOpen = 3,
    Data = 4
}
/**
 * The write buffers in this implementation immediately write to the underlying
 * channel, so we rely on writers to the multiplexed channels to always commit their
 * messages and always in one go.
 */
export declare class ChannelMultiplexer implements Disposable {
    protected readonly underlyingChannel: Channel;
    protected pendingOpen: Map<string, (channel: ForwardingChannel) => void>;
    protected openChannels: Map<string, ForwardingChannel>;
    protected readonly onOpenChannelEmitter: Emitter<{
        id: string;
        channel: Channel;
    }>;
    get onDidOpenChannel(): Event<{
        id: string;
        channel: Channel;
    }>;
    protected toDispose: DisposableCollection;
    constructor(underlyingChannel: Channel);
    protected handleError(error: unknown): void;
    onUnderlyingChannelClose(event?: ChannelCloseEvent): void;
    protected handleMessage(buffer: ReadBuffer): void;
    protected handleAckOpen(id: string): void;
    protected handleOpen(id: string): void;
    protected handleClose(id: string): void;
    protected handleData(id: string, data: ReadBuffer): void;
    protected createChannel(id: string): ForwardingChannel;
    protected prepareWriteBuffer(id: string): WriteBuffer;
    protected closeChannel(id: string): void;
    open(id: string): Promise<Channel>;
    getOpenChannel(id: string): Channel | undefined;
    dispose(): void;
}
//# sourceMappingURL=channel.d.ts.map