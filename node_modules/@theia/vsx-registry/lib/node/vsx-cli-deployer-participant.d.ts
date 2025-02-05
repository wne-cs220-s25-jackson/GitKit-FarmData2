import { PluginDeployerParticipant, PluginDeployerStartContext } from '@theia/plugin-ext';
import { VsxCli } from './vsx-cli';
export declare class VsxCliDeployerParticipant implements PluginDeployerParticipant {
    protected readonly vsxCli: VsxCli;
    onWillStart(context: PluginDeployerStartContext): Promise<void>;
}
//# sourceMappingURL=vsx-cli-deployer-participant.d.ts.map