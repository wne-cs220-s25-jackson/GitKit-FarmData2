import { MaybePromise } from '@theia/core';
import { RemoteCliContext, RemoteCliContribution } from '@theia/core/lib/node/remote/remote-cli-contribution';
import { PluginCliContribution } from './plugin-cli-contribution';
export declare class PluginRemoteCliContribution implements RemoteCliContribution {
    protected readonly pluginCliContribution: PluginCliContribution;
    enhanceArgs(context: RemoteCliContext): MaybePromise<string[]>;
}
//# sourceMappingURL=plugin-remote-cli-contribution.d.ts.map