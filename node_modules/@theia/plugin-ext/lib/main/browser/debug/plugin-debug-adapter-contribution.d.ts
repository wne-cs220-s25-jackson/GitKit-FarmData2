import { DebugExt } from '../../../common/plugin-api-rpc';
import { DebugConfiguration } from '@theia/debug/lib/common/debug-configuration';
import { MaybePromise } from '@theia/core/lib/common/types';
import { DebuggerDescription } from '@theia/debug/lib/common/debug-service';
import { HostedPluginSupport } from '../../../hosted/browser/hosted-plugin';
/**
 * Plugin [DebugAdapterContribution](#DebugAdapterContribution).
 */
export declare class PluginDebugAdapterContribution {
    protected readonly description: DebuggerDescription;
    protected readonly debugExt: DebugExt;
    protected readonly pluginService: HostedPluginSupport;
    constructor(description: DebuggerDescription, debugExt: DebugExt, pluginService: HostedPluginSupport);
    get type(): string;
    get label(): MaybePromise<string | undefined>;
    createDebugSession(config: DebugConfiguration, workspaceFolder: string | undefined): Promise<string>;
    terminateDebugSession(sessionId: string): Promise<void>;
}
//# sourceMappingURL=plugin-debug-adapter-contribution.d.ts.map