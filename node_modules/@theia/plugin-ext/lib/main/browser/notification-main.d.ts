import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
import { BasicNotificationMainImpl } from '../common/basic-notification-main';
export declare class NotificationMainImpl extends BasicNotificationMainImpl {
    constructor(rpc: RPCProtocol, container: interfaces.Container);
}
//# sourceMappingURL=notification-main.d.ts.map