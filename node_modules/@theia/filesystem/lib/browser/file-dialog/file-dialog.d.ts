import { Message } from '@theia/core/shared/@phosphor/messaging';
import { MaybeArray } from '@theia/core/lib/common';
import { AbstractDialog, DialogProps, LabelProvider } from '@theia/core/lib/browser';
import { FileStatNode } from '../file-tree';
import { LocationListRenderer, LocationListRendererFactory } from '../location';
import { FileDialogModel } from './file-dialog-model';
import { FileDialogWidget } from './file-dialog-widget';
import { FileDialogTreeFiltersRenderer, FileDialogTreeFilters, FileDialogTreeFiltersRendererFactory } from './file-dialog-tree-filters-renderer';
import URI from '@theia/core/lib/common/uri';
import { Panel } from '@theia/core/shared/@phosphor/widgets';
import { FileDialogHiddenFilesToggleRenderer, HiddenFilesToggleRendererFactory } from './file-dialog-hidden-files-renderer';
export declare const OpenFileDialogFactory: unique symbol;
export interface OpenFileDialogFactory {
    (props: OpenFileDialogProps): OpenFileDialog;
}
export declare const SaveFileDialogFactory: unique symbol;
export interface SaveFileDialogFactory {
    (props: SaveFileDialogProps): SaveFileDialog;
}
export declare const SAVE_DIALOG_CLASS = "theia-SaveFileDialog";
export declare const NAVIGATION_PANEL_CLASS = "theia-NavigationPanel";
export declare const NAVIGATION_BACK_CLASS = "theia-NavigationBack";
export declare const NAVIGATION_FORWARD_CLASS = "theia-NavigationForward";
export declare const NAVIGATION_HOME_CLASS = "theia-NavigationHome";
export declare const NAVIGATION_UP_CLASS = "theia-NavigationUp";
export declare const NAVIGATION_LOCATION_LIST_PANEL_CLASS = "theia-LocationListPanel";
export declare const FILTERS_PANEL_CLASS = "theia-FiltersPanel";
export declare const FILTERS_LABEL_CLASS = "theia-FiltersLabel";
export declare const FILTERS_LIST_PANEL_CLASS = "theia-FiltersListPanel";
export declare const FILENAME_PANEL_CLASS = "theia-FileNamePanel";
export declare const FILENAME_LABEL_CLASS = "theia-FileNameLabel";
export declare const FILENAME_TEXTFIELD_CLASS = "theia-FileNameTextField";
export declare const CONTROL_PANEL_CLASS = "theia-ControlPanel";
export declare const TOOLBAR_ITEM_TRANSFORM_TIMEOUT = 100;
export declare class FileDialogProps extends DialogProps {
    /**
     * A set of file filters that are used by the dialog. Each entry is a human readable label,
     * like "TypeScript", and an array of extensions, e.g.
     * ```ts
     * {
     *  'Images': ['png', 'jpg']
     *  'TypeScript': ['ts', 'tsx']
     * }
     * ```
     */
    filters?: FileDialogTreeFilters;
    /**
     * Determines if the dialog window should be modal.
     * Defaults to `true`.
     */
    modal?: boolean;
}
export declare class OpenFileDialogProps extends FileDialogProps {
    /**
     * A human-readable string for the accept button.
     */
    openLabel?: string;
    /**
     * Allow to select files, defaults to `true`.
     */
    canSelectFiles?: boolean;
    /**
     * Allow to select folders, defaults to `false`.
     */
    canSelectFolders?: boolean;
    /**
     * Allow to select many files or folders.
     */
    canSelectMany?: boolean;
}
export declare class SaveFileDialogProps extends FileDialogProps {
    /**
     * A human-readable string for the accept button.
     */
    saveLabel?: string;
    /**
     * A human-readable value for the input.
     */
    inputValue?: string;
}
export declare abstract class FileDialog<T> extends AbstractDialog<T> {
    readonly props: FileDialogProps;
    protected back: HTMLSpanElement;
    protected forward: HTMLSpanElement;
    protected home: HTMLSpanElement;
    protected up: HTMLSpanElement;
    protected locationListRenderer: LocationListRenderer;
    protected treeFiltersRenderer: FileDialogTreeFiltersRenderer | undefined;
    protected hiddenFilesToggleRenderer: FileDialogHiddenFilesToggleRenderer;
    protected treePanel: Panel;
    readonly widget: FileDialogWidget;
    readonly locationListFactory: LocationListRendererFactory;
    readonly treeFiltersFactory: FileDialogTreeFiltersRendererFactory;
    readonly hiddenFilesToggleFactory: HiddenFilesToggleRendererFactory;
    constructor(props: FileDialogProps);
    init(): void;
    get model(): FileDialogModel;
    protected onUpdateRequest(msg: Message): void;
    protected handleEnter(event: KeyboardEvent): boolean | void;
    protected handleEscape(event: KeyboardEvent): boolean | void;
    protected targetIsDirectoryInput(target: EventTarget | null): boolean;
    protected targetIsInputToggle(target: EventTarget | null): boolean;
    protected appendFiltersPanel(): void;
    protected onAfterAttach(msg: Message): void;
    protected addTransformEffectToIcon(element: HTMLSpanElement): void;
    protected abstract getAcceptButtonLabel(): string;
    protected onActivateRequest(msg: Message): void;
}
export declare class OpenFileDialog extends FileDialog<MaybeArray<FileStatNode>> {
    readonly props: OpenFileDialogProps;
    constructor(props: OpenFileDialogProps);
    init(): void;
    protected getAcceptButtonLabel(): string;
    protected isValid(value: MaybeArray<FileStatNode>): string;
    get value(): MaybeArray<FileStatNode>;
    protected accept(): Promise<void>;
}
export declare class SaveFileDialog extends FileDialog<URI | undefined> {
    readonly props: SaveFileDialogProps;
    protected fileNameField: HTMLInputElement | undefined;
    protected readonly labelProvider: LabelProvider;
    constructor(props: SaveFileDialogProps);
    init(): void;
    protected getAcceptButtonLabel(): string;
    protected onUpdateRequest(msg: Message): void;
    protected isValid(value: URI | undefined): string | boolean;
    get value(): URI | undefined;
    protected onAfterAttach(msg: Message): void;
}
//# sourceMappingURL=file-dialog.d.ts.map