import URI from '@theia/core/lib/common/uri';
import { PluginPackage } from '../../../common';
import { PluginUriFactory } from './plugin-uri-factory';
/**
 * The default implementation of PluginUriFactory simply returns a File URI from the concatenated
 * package path and relative path.
 */
export declare class FilePluginUriFactory implements PluginUriFactory {
    createUri(pkg: PluginPackage, pkgRelativePath?: string): URI;
}
//# sourceMappingURL=file-plugin-uri-factory.d.ts.map