import { MessageService } from '@theia/core';
import { Navigatable, SaveableSource, SaveOptions, Widget, OpenerService, LabelProvider } from '@theia/core/lib/browser';
import { SaveableService } from '@theia/core/lib/browser/saveable-service';
import URI from '@theia/core/lib/common/uri';
import { FileService } from './file-service';
import { FileDialogService } from './file-dialog';
export declare class FilesystemSaveableService extends SaveableService {
    protected readonly messageService: MessageService;
    protected readonly fileService: FileService;
    protected readonly fileDialogService: FileDialogService;
    protected readonly openerService: OpenerService;
    protected readonly labelProvider: LabelProvider;
    /**
     * This method ensures a few things about `widget`:
     * - `widget.getResourceUri()` actually returns a URI.
     * - `widget.saveable.createSnapshot` or `widget.saveable.serialize` is defined.
     * - `widget.saveable.revert` is defined.
     */
    canSaveAs(widget: Widget | undefined): widget is Widget & SaveableSource & Navigatable;
    /**
     * Save `sourceWidget` to a new file picked by the user.
     */
    saveAs(sourceWidget: Widget & SaveableSource & Navigatable, options?: SaveOptions): Promise<URI | undefined>;
    /**
     * Saves the current snapshot of the {@link sourceWidget} to the target file
     * and replaces the widget with a new one that contains the snapshot content
     *
     * @param sourceWidget widget to save as `target`.
     * @param target The new URI for the widget.
     * @param overwrite
     */
    protected saveSnapshot(sourceWidget: Widget & SaveableSource & Navigatable, target: URI, overwrite: boolean): Promise<void>;
    confirmOverwrite(uri: URI): Promise<boolean>;
    private isElectron;
}
//# sourceMappingURL=filesystem-saveable-service.d.ts.map