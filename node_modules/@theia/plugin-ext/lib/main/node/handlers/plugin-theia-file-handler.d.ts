import { PluginDeployerFileHandler, PluginDeployerEntry, PluginDeployerFileHandlerContext } from '../../../common/plugin-protocol';
import { PluginTheiaEnvironment } from '../../common/plugin-theia-environment';
export declare class PluginTheiaFileHandler implements PluginDeployerFileHandler {
    private readonly systemPluginsDirUri;
    protected readonly environment: PluginTheiaEnvironment;
    constructor();
    accept(resolvedPlugin: PluginDeployerEntry): Promise<boolean>;
    handle(context: PluginDeployerFileHandlerContext): Promise<void>;
    protected getPluginDir(context: PluginDeployerFileHandlerContext): Promise<string>;
}
//# sourceMappingURL=plugin-theia-file-handler.d.ts.map