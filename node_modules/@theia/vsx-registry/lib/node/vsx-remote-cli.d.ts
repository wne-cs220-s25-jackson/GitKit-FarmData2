import { RemoteCliContext, RemoteCliContribution } from '@theia/core/lib/node/remote/remote-cli-contribution';
import { PluginDeployerHandler } from '@theia/plugin-ext';
export declare class VsxRemoteCli implements RemoteCliContribution {
    protected readonly pluginDeployerHandler: PluginDeployerHandler;
    enhanceArgs(context: RemoteCliContext): Promise<string[]>;
}
//# sourceMappingURL=vsx-remote-cli.d.ts.map