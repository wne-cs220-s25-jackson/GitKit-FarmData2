import URI from '@theia/core/lib/common/uri';
import { SingleTextInputDialog, SingleTextInputDialogProps, LabelProvider } from '@theia/core/lib/browser';
export declare class WorkspaceInputDialogProps extends SingleTextInputDialogProps {
    /**
     * The parent `URI` for the selection present in the explorer.
     * Used to display the path in which the file/folder is created at.
     */
    parentUri: URI;
}
export declare class WorkspaceInputDialog extends SingleTextInputDialog {
    protected readonly props: WorkspaceInputDialogProps;
    protected readonly labelProvider: LabelProvider;
    constructor(props: WorkspaceInputDialogProps, labelProvider: LabelProvider);
    /**
     * Append the human-readable parent `path` to the dialog.
     * When possible, display the relative path, else display the full path (ex: workspace root).
     */
    protected appendParentPath(): void;
}
//# sourceMappingURL=workspace-input-dialog.d.ts.map