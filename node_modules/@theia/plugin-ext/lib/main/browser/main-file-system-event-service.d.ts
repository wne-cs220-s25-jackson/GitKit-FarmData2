import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
export declare class MainFileSystemEventService {
    private readonly toDispose;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
}
//# sourceMappingURL=main-file-system-event-service.d.ts.map