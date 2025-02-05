import { PluginScanner, PluginEngine, PluginPackage, PluginModel, PluginLifecycle } from '@theia/plugin-ext';
import { TheiaPluginScanner } from '@theia/plugin-ext/lib/hosted/node/scanners/scanner-theia';
export declare class VsCodePluginScanner extends TheiaPluginScanner implements PluginScanner {
    private readonly VSCODE_TYPE;
    get apiType(): PluginEngine;
    getModel(plugin: PluginPackage): PluginModel;
    /**
     * Maps extension dependencies to deployable extension dependencies.
     */
    getDependencies(plugin: PluginPackage): Map<string, string> | undefined;
    getLifecycle(plugin: PluginPackage): PluginLifecycle;
}
//# sourceMappingURL=scanner-vscode.d.ts.map