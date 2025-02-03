/// <reference types="react" />
import { ReactRenderer } from '@theia/core/lib/browser/widgets/react-renderer';
import { FileDialogTree } from './file-dialog-tree';
import * as React from '@theia/core/shared/react';
export declare const FILE_TREE_FILTERS_LIST_CLASS = "theia-FileTreeFiltersList";
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
export declare class FileDialogTreeFilters {
    [name: string]: string[];
}
export declare const FileDialogTreeFiltersRendererFactory: unique symbol;
export interface FileDialogTreeFiltersRendererFactory {
    (options: FileDialogTreeFiltersRendererOptions): FileDialogTreeFiltersRenderer;
}
export declare const FileDialogTreeFiltersRendererOptions: unique symbol;
export interface FileDialogTreeFiltersRendererOptions {
    suppliedFilters: FileDialogTreeFilters;
    fileDialogTree: FileDialogTree;
}
export declare class FileDialogTreeFiltersRenderer extends ReactRenderer {
    readonly options: FileDialogTreeFiltersRendererOptions;
    readonly appliedFilters: FileDialogTreeFilters;
    readonly suppliedFilters: FileDialogTreeFilters;
    readonly fileDialogTree: FileDialogTree;
    constructor(options: FileDialogTreeFiltersRendererOptions);
    protected readonly handleFilterChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    protected doRender(): React.ReactNode;
    protected renderLocation(value: string): React.ReactNode;
    protected onFilterChanged(e: React.ChangeEvent<HTMLSelectElement>): void;
    get locationList(): HTMLSelectElement | undefined;
}
//# sourceMappingURL=file-dialog-tree-filters-renderer.d.ts.map