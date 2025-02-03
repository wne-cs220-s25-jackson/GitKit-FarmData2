import { interfaces } from '@theia/core/shared/inversify';
import { MessageService } from '@theia/core/lib/common/message-service';
import { MessageRegistryMain, MainMessageType, MainMessageOptions, MainMessageItem } from '../../common/plugin-api-rpc';
/**
 * A basic implementation of the message registry that does not support the modal option
 * as that requires an UI.
 */
export declare class BasicMessageRegistryMainImpl implements MessageRegistryMain {
    protected readonly messageService: MessageService;
    constructor(container: interfaces.Container);
    $showMessage(type: MainMessageType, message: string, options: MainMessageOptions, actions: MainMessageItem[]): Promise<number | undefined>;
    protected doShowMessage(type: MainMessageType, message: string, options: MainMessageOptions, actions: MainMessageItem[]): Promise<string | undefined>;
}
//# sourceMappingURL=basic-message-registry-main.d.ts.map