import { BackendApplicationContribution } from '@theia/core/lib/node';
import { PluginDeployer } from '../../common/plugin-protocol';
import { ILogger } from '@theia/core';
export declare class PluginDeployerContribution implements BackendApplicationContribution {
    protected readonly logger: ILogger;
    protected pluginDeployer: PluginDeployer;
    initialize(): Promise<void>;
}
//# sourceMappingURL=plugin-deployer-contribution.d.ts.map