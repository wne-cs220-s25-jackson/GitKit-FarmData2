import URI from '@theia/core/lib/common/uri';
import { Emitter, Event } from '@theia/core/lib/common';
import { TreeNode, SelectableTreeNode } from '@theia/core/lib/browser';
import { FileTreeModel } from '../file-tree';
import { FileDialogTree } from './file-dialog-tree';
export declare class FileDialogModel extends FileTreeModel {
    readonly tree: FileDialogTree;
    protected readonly onDidOpenFileEmitter: Emitter<void>;
    protected _initialLocation: URI | undefined;
    private _disableFileSelection;
    protected init(): void;
    /**
     * Returns the first valid location that was set by calling the `navigateTo` method. Once the initial location has a defined value, it will not change.
     * Can be `undefined`.
     */
    get initialLocation(): URI | undefined;
    set disableFileSelection(isSelectable: boolean);
    navigateTo(nodeOrId: TreeNode | string | undefined): Promise<TreeNode | undefined>;
    get onDidOpenFile(): Event<void>;
    protected doOpenNode(node: TreeNode): void;
    getNextSelectableNode(node?: SelectableTreeNode | undefined): SelectableTreeNode | undefined;
    getPrevSelectableNode(node?: SelectableTreeNode | undefined): SelectableTreeNode | undefined;
    private isFileStatNodeSelectable;
    canNavigateUpward(): boolean;
}
//# sourceMappingURL=file-dialog-model.d.ts.map