import { RemoteCopyContribution, RemoteCopyRegistry } from '@theia/core/lib/node/remote/remote-copy-contribution';
import { PluginCliContribution } from './plugin-cli-contribution';
export declare class PluginRemoteCopyContribution implements RemoteCopyContribution {
    protected readonly pluginCliContribution: PluginCliContribution;
    copy(registry: RemoteCopyRegistry): Promise<void>;
}
//# sourceMappingURL=plugin-remote-copy-contribution.d.ts.map