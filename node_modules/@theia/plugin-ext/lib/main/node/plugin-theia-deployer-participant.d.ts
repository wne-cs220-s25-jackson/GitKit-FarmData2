import { PluginTheiaEnvironment } from '../common/plugin-theia-environment';
import { PluginDeployerParticipant, PluginDeployerStartContext } from '../../common/plugin-protocol';
export declare class PluginTheiaDeployerParticipant implements PluginDeployerParticipant {
    protected readonly environments: PluginTheiaEnvironment;
    onWillStart(context: PluginDeployerStartContext): Promise<void>;
}
//# sourceMappingURL=plugin-theia-deployer-participant.d.ts.map