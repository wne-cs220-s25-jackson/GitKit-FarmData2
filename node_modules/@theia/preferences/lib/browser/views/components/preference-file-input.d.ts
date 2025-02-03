import { interfaces } from '@theia/core/shared/inversify';
import { OpenFileDialogProps } from '@theia/filesystem/lib/browser';
import { FileDialogService } from '@theia/filesystem/lib/browser/file-dialog/file-dialog-service';
import { Preference } from '../../util/preference-types';
import { PreferenceNodeRenderer } from './preference-node-renderer';
import { PreferenceLeafNodeRendererContribution } from './preference-node-renderer-creator';
import { PreferenceStringInputRenderer } from './preference-string-input';
export interface FileNodeTypeDetails {
    isFilepath: true;
    selectionProps?: Partial<OpenFileDialogProps>;
}
export declare namespace FileNodeTypeDetails {
    function is(typeDetails: unknown): typeDetails is FileNodeTypeDetails;
}
export declare class PreferenceSingleFilePathInputRendererContribution extends PreferenceLeafNodeRendererContribution {
    static ID: string;
    id: string;
    canHandleLeafNode(node: Preference.LeafNode): number;
    createLeafNodeRenderer(container: interfaces.Container): PreferenceNodeRenderer;
}
export declare class PreferenceSingleFilePathInputRenderer extends PreferenceStringInputRenderer {
    fileDialogService: FileDialogService;
    get typeDetails(): FileNodeTypeDetails;
    protected createInputWrapper(): HTMLElement;
    protected createInteractable(parent: HTMLElement): void;
    protected createBrowseButton(parent: HTMLElement): void;
    protected browse(): Promise<void>;
    protected setPreferenceImmediately(value: string): Promise<void>;
}
//# sourceMappingURL=preference-file-input.d.ts.map