import URI from '@theia/core/lib/common/uri';
import { PluginPackage } from '../../../common';
export declare const PluginUriFactory: unique symbol;
/**
 * Creates URIs for resources used in plugin contributions. Projects where plugin host is not located on the back-end
 * machine and therefor resources cannot be loaded from the local file system in the back end can override the factory.
 */
export interface PluginUriFactory {
    /**
     * Returns a URI that allows a file to be loaded given a plugin package and a path relative to the plugin's package path
     *
     * @param pkg the package this the file is contained in
     * @param pkgRelativePath the path of the file relative to the package path, e.g. 'resources/snippets.json'
     */
    createUri(pkg: PluginPackage, pkgRelativePath?: string): URI;
}
//# sourceMappingURL=plugin-uri-factory.d.ts.map