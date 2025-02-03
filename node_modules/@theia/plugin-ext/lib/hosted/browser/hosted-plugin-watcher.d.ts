import { Event } from '@theia/core/lib/common/event';
import { HostedPluginClient } from '../../common/plugin-protocol';
import { LogPart } from '../../common/types';
export declare class HostedPluginWatcher {
    private onPostMessage;
    private onLogMessage;
    private readonly onDidDeployEmitter;
    readonly onDidDeploy: Event<void>;
    getHostedPluginClient(): HostedPluginClient;
    get onPostMessageEvent(): Event<{
        pluginHostId: string;
        message: Uint8Array;
    }>;
    get onLogMessageEvent(): Event<LogPart>;
}
//# sourceMappingURL=hosted-plugin-watcher.d.ts.map