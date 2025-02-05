import { Emitter, Event } from '@theia/core';
import { PluginIdentifiers } from '../../common';
export declare class PluginUninstallationManager {
    protected readonly onDidChangeUninstalledPluginsEmitter: Emitter<readonly `${string}.${string}@${string}`[]>;
    get onDidChangeUninstalledPlugins(): Event<readonly PluginIdentifiers.VersionedId[]>;
    protected uninstalledPlugins: PluginIdentifiers.VersionedId[];
    protected fireDidChange(): void;
    markAsUninstalled(...pluginIds: PluginIdentifiers.VersionedId[]): boolean;
    protected markOneAsUninstalled(pluginId: PluginIdentifiers.VersionedId): boolean;
    markAsInstalled(...pluginIds: PluginIdentifiers.VersionedId[]): boolean;
    protected markOneAsInstalled(pluginId: PluginIdentifiers.VersionedId): boolean;
    isUninstalled(pluginId: PluginIdentifiers.VersionedId): boolean;
    getUninstalledPluginIds(): readonly PluginIdentifiers.VersionedId[];
}
//# sourceMappingURL=plugin-uninstallation-manager.d.ts.map