import { CancellationToken } from './cancellation';
export declare const messageServicePath = "/services/messageService";
export declare enum MessageType {
    Error = 1,
    Warning = 2,
    Info = 3,
    Log = 4,
    Progress = 5
}
export interface Message {
    /**
     * Type of the message, i.e. error, warning, info, etc.
     */
    readonly type?: MessageType;
    /**
     * Message text.
     */
    readonly text: string;
    /**
     * Actions offered to the user in the context of the message.
     */
    readonly actions?: string[];
    /**
     * Additional options.
     */
    readonly options?: MessageOptions;
    readonly source?: string;
}
export interface ProgressMessage extends Message {
    readonly type?: MessageType.Progress;
    readonly options?: ProgressMessageOptions;
}
export declare namespace ProgressMessage {
    const Cancel: string;
    function isCancelable(message: ProgressMessage): boolean;
}
export interface MessageOptions {
    /**
     * Timeout in milliseconds.
     * `0` and negative values are treated as no timeout.
     */
    readonly timeout?: number;
}
export interface ProgressMessageOptions extends MessageOptions {
    /**
     * Default: `false`
     */
    readonly cancelable?: boolean;
    /**
     * Known values: `notification` | `window` | `scm`
     */
    readonly location?: string;
}
export interface Progress {
    /**
     * Unique progress id.
     */
    readonly id: string;
    /**
     * Update the current progress.
     *
     * @param update the data to update.
     */
    readonly report: (update: ProgressUpdate) => void;
    /**
     * Cancel or complete the current progress.
     */
    readonly cancel: () => void;
    /**
     * Result of the progress.
     *
     * @returns a promise which resolves to either 'Cancel', an alternative action or `undefined`.
     */
    readonly result: Promise<string | undefined>;
}
export interface ProgressUpdate {
    /**
     * Updated message for the progress.
     */
    readonly message?: string;
    /**
     * Updated ratio between steps done so far and total number of steps.
     */
    readonly work?: {
        done: number;
        total: number;
    };
}
export declare class MessageClient {
    /**
     * Show a message of the given type and possible actions to the user.
     * Resolve to a chosen action.
     * Never reject.
     *
     * To be implemented by an extension, e.g. by the messages extension.
     */
    showMessage(message: Message): Promise<string | undefined>;
    /**
     * Show a progress message with possible actions to user.
     *
     * To be implemented by an extension, e.g. by the messages extension.
     */
    showProgress(progressId: string, message: ProgressMessage, cancellationToken: CancellationToken): Promise<string | undefined>;
    /**
     * Update a previously created progress message.
     *
     * To be implemented by an extension, e.g. by the messages extension.
     */
    reportProgress(progressId: string, update: ProgressUpdate, message: ProgressMessage, cancellationToken: CancellationToken): Promise<void>;
}
//# sourceMappingURL=message-service-protocol.d.ts.map