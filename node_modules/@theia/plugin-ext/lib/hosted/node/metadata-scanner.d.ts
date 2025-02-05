import { PluginPackage, PluginScanner, PluginMetadata } from '../../common/plugin-protocol';
import { PluginUninstallationManager } from '../../main/node/plugin-uninstallation-manager';
export declare class MetadataScanner {
    private scanners;
    protected readonly uninstallationManager: PluginUninstallationManager;
    constructor(scanners: PluginScanner[]);
    getPluginMetadata(plugin: PluginPackage): PluginMetadata;
    /**
     * Returns the first suitable scanner.
     *
     * Throws if no scanner was found.
     *
     * @param {PluginPackage} plugin
     * @returns {PluginScanner}
     */
    getScanner(plugin: PluginPackage): PluginScanner;
}
//# sourceMappingURL=metadata-scanner.d.ts.map