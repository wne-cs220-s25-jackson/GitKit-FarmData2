import { PluginVSCodeEnvironment } from '../common/plugin-vscode-environment';
import { PluginDeployerParticipant, PluginDeployerStartContext } from '@theia/plugin-ext/lib/common/plugin-protocol';
export declare class PluginVSCodeDeployerParticipant implements PluginDeployerParticipant {
    protected readonly environments: PluginVSCodeEnvironment;
    onWillStart(context: PluginDeployerStartContext): Promise<void>;
}
//# sourceMappingURL=plugin-vscode-deployer-participant.d.ts.map