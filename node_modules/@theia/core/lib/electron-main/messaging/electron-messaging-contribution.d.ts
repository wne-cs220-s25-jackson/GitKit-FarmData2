import { WebContents } from '@theia/electron/shared/electron';
import { ConnectionHandlers } from '../../node/messaging/default-messaging-service';
import { AbstractChannel, Channel, MessageProvider } from '../../common/message-rpc/channel';
import { ConnectionHandler, ContributionProvider, Emitter, WriteBuffer } from '../../common';
import { MessagingService } from '../../node';
import { ElectronMessagingService } from './electron-messaging-service';
import { ElectronMainApplicationContribution } from '../electron-main-application';
/**
 * This component replicates the role filled by `MessagingContribution` but for Electron.
 * Unlike the WebSocket based implementation, we do not expect to receive
 * connection events. Instead, we'll create channels based on incoming `open`
 * events on the `ipcMain` channel.
 * This component allows communication between renderer process (frontend) and electron main process.
 */
export declare class ElectronMessagingContribution implements ElectronMainApplicationContribution, ElectronMessagingService {
    protected readonly messagingContributions: ContributionProvider<ElectronMessagingService.Contribution>;
    protected readonly connectionHandlers: ContributionProvider<ConnectionHandler>;
    protected readonly channelHandlers: ConnectionHandlers<Channel>;
    /**
     * Each electron window has a main channel and its own multiplexer to route multiple client messages the same IPC connection.
     */
    protected readonly openChannels: Map<number, ElectronWebContentChannel>;
    protected init(): void;
    ipcChannel(spec: string, callback: (params: any, channel: Channel) => void): void;
    onStart(): void;
    protected handleIpcEvent(sender: WebContents, data: Uint8Array): void;
    protected createWindowChannel(sender: Electron.WebContents): ElectronWebContentChannel;
    protected deleteChannel(senderId: number, reason: string): void;
    protected readonly wsHandlers: ConnectionHandlers<unknown>;
    registerConnectionHandler(spec: string, callback: (params: MessagingService.PathParams, channel: Channel) => void): void;
}
/**
 * Used to establish a connection between the ipcMain and the Electron frontend (window).
 * Messages a transferred via electron IPC.
 */
export declare class ElectronWebContentChannel extends AbstractChannel {
    protected readonly sender: Electron.WebContents;
    readonly onMessageEmitter: Emitter<MessageProvider>;
    constructor(sender: Electron.WebContents);
    getWriteBuffer(): WriteBuffer;
}
//# sourceMappingURL=electron-messaging-contribution.d.ts.map