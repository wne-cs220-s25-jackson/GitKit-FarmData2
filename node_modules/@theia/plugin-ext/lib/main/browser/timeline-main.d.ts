import { interfaces } from '@theia/core/shared/inversify';
import { TimelineMain } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { TimelineProviderDescriptor, TimelineChangeEvent } from '@theia/timeline/lib/common/timeline-model';
export declare class TimelineMainImpl implements TimelineMain {
    private readonly proxy;
    private readonly timelineService;
    private readonly providerEmitters;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    $registerTimelineProvider(provider: TimelineProviderDescriptor): Promise<void>;
    $unregisterTimelineProvider(id: string): Promise<void>;
    $fireTimelineChanged(e: TimelineChangeEvent): Promise<void>;
}
//# sourceMappingURL=timeline-main.d.ts.map