/// <reference types="react" />
import { ReactRenderer } from '@theia/core/lib/browser';
import * as React from '@theia/core/shared/react';
import { FileDialogTree } from './file-dialog-tree';
export declare const HiddenFilesToggleRendererFactory: unique symbol;
export interface HiddenFilesToggleRendererFactory {
    (fileDialogTree: FileDialogTree): FileDialogHiddenFilesToggleRenderer;
}
export declare class FileDialogHiddenFilesToggleRenderer extends ReactRenderer {
    fileDialogTree: FileDialogTree;
    protected init(): void;
    protected readonly handleCheckboxChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
    protected doRender(): React.ReactNode;
    protected onCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>): void;
}
//# sourceMappingURL=file-dialog-hidden-files-renderer.d.ts.map