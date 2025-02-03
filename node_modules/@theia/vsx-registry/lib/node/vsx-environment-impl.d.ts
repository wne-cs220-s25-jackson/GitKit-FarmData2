import URI from '@theia/core/lib/common/uri';
import { OVSXRouterConfig } from '@theia/ovsx-client';
import { PluginVsCodeCliContribution } from '@theia/plugin-ext-vscode/lib/node/plugin-vscode-cli-contribution';
import { VSXEnvironment } from '../common/vsx-environment';
import { VsxCli } from './vsx-cli';
export declare class VSXEnvironmentImpl implements VSXEnvironment {
    protected _registryUri: URI;
    protected readonly pluginVscodeCli: PluginVsCodeCliContribution;
    protected vsxCli: VsxCli;
    getRateLimit(): Promise<number>;
    getRegistryUri(): Promise<string>;
    getRegistryApiUri(): Promise<string>;
    getVscodeApiVersion(): Promise<string>;
    getOvsxRouterConfig(): Promise<OVSXRouterConfig | undefined>;
}
//# sourceMappingURL=vsx-environment-impl.d.ts.map