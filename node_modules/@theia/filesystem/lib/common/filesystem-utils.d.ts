import { FileStat } from '../common/files';
import URI from '@theia/core/lib/common/uri';
export declare namespace FileSystemUtils {
    const FILE_NAME_SEPARATOR = " ";
    /**
     * Generate unique URI for a given parent which does not collide
     *
     * @param parent the `FileStat` of the parent
     * @param targetUri the initial URI
     * @param isDirectory indicates whether the given targetUri represents a directory
     * @param suffix an optional string to append to the file name, in case of collision (e.g. `copy`)
     */
    function generateUniqueResourceURI(parent: FileStat, targetUri: URI, isDirectory: boolean, suffix?: string): URI;
}
//# sourceMappingURL=filesystem-utils.d.ts.map