import { PluginDeployerFileHandler, PluginDeployerEntry, PluginDeployerFileHandlerContext } from '@theia/plugin-ext';
import { PluginVSCodeEnvironment } from '../common/plugin-vscode-environment';
export declare const isVSCodePluginFile: (pluginPath?: string) => boolean;
export declare class PluginVsCodeFileHandler implements PluginDeployerFileHandler {
    protected readonly environment: PluginVSCodeEnvironment;
    accept(resolvedPlugin: PluginDeployerEntry): Promise<boolean>;
    handle(context: PluginDeployerFileHandlerContext): Promise<void>;
    protected getNormalizedExtensionId(pluginId: string): string;
}
//# sourceMappingURL=plugin-vscode-file-handler.d.ts.map