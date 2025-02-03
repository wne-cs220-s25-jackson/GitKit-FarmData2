import { PluginDeployerImpl } from './plugin-deployer-impl';
import { Deferred } from '@theia/core/lib/common/promise-util';
import { LocalizationServerImpl } from '@theia/core/lib/node/i18n/localization-server';
export declare class PluginLocalizationServer extends LocalizationServerImpl {
    protected readonly pluginDeployer: PluginDeployerImpl;
    protected readonly pluginsDeployed: Deferred<void>;
    initialize(): Promise<void>;
    waitForInitialization(): Promise<void>;
}
//# sourceMappingURL=plugin-localization-server.d.ts.map