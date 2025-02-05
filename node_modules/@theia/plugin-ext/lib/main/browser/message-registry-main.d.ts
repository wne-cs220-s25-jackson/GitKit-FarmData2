import { interfaces } from '@theia/core/shared/inversify';
import { MainMessageType, MainMessageOptions, MainMessageItem } from '../../common/plugin-api-rpc';
import { BasicMessageRegistryMainImpl } from '../common/basic-message-registry-main';
/**
 * Message registry implementation that adds support for the model option via dialog in the browser.
 */
export declare class MessageRegistryMainImpl extends BasicMessageRegistryMainImpl {
    constructor(container: interfaces.Container);
    protected doShowMessage(type: MainMessageType, message: string, options: MainMessageOptions, actions: MainMessageItem[]): Promise<string | undefined>;
}
//# sourceMappingURL=message-registry-main.d.ts.map