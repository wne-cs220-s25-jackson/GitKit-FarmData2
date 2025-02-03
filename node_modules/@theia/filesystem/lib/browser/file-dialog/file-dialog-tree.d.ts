import { FileTree } from '../file-tree';
import { TreeNode, CompositeTreeNode } from '@theia/core/lib/browser/tree/tree';
import { FileStat } from '../../common/files';
export declare class FileDialogTree extends FileTree {
    protected _showHidden: boolean;
    set showHidden(show: boolean);
    get showHidden(): boolean;
    protected isHiddenFile: (fileStat: FileStat) => boolean;
    /**
     * Extensions for files to be shown
     */
    protected fileExtensions: string[];
    /**
     * Sets extensions for filtering files
     *
     * @param fileExtensions array of extensions
     */
    setFilter(fileExtensions: string[]): void;
    protected toNodes(fileStat: FileStat, parent: CompositeTreeNode): Promise<TreeNode[]>;
    /**
     * Determines whether file or folder can be shown
     *
     * @param fileStat resource to check
     */
    protected isVisible(fileStat: FileStat): boolean;
}
//# sourceMappingURL=file-dialog-tree.d.ts.map