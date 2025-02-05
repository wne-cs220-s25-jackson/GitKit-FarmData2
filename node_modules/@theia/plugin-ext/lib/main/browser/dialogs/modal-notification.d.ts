import { Message } from '@theia/core/shared/@phosphor/messaging';
import { AbstractDialog } from '@theia/core/lib/browser/dialogs';
import '../../../../src/main/browser/dialogs/style/modal-notification.css';
import { MainMessageItem, MainMessageOptions } from '../../../common/plugin-api-rpc';
export declare enum MessageType {
    Error = "error",
    Warning = "warning",
    Info = "info"
}
export declare class ModalNotification extends AbstractDialog<string | undefined> {
    protected actionTitle: string | undefined;
    constructor();
    protected onCloseRequest(msg: Message): void;
    get value(): string | undefined;
    showDialog(messageType: MessageType, text: string, options: MainMessageOptions, actions: MainMessageItem[]): Promise<string | undefined>;
    protected createMessageNode(messageType: MessageType, text: string, options: MainMessageOptions, actions: MainMessageItem[]): HTMLElement;
    protected toIconClass(icon: MessageType): string[];
}
//# sourceMappingURL=modal-notification.d.ts.map